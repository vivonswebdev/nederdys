CREATE TABLE public.sibling_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenger_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  challenged_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  game_type TEXT,
  chapter_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  challenger_session_id UUID,
  challenged_session_id UUID,
  winner_id UUID REFERENCES public.children(id),
  xp_reward INTEGER NOT NULL DEFAULT 25,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  CHECK (challenger_id != challenged_id),
  CHECK ((game_type IS NOT NULL) != (chapter_id IS NOT NULL))
);

CREATE INDEX idx_sibling_challenges_challenger ON public.sibling_challenges(challenger_id);
CREATE INDEX idx_sibling_challenges_challenged ON public.sibling_challenges(challenged_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sibling_challenges TO authenticated;
GRANT ALL ON public.sibling_challenges TO service_role;

ALTER TABLE public.sibling_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents manage challenges between their own children"
  ON public.sibling_challenges
  FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.children c WHERE c.id = sibling_challenges.challenger_id AND c.user_id = auth.uid())
    AND EXISTS (SELECT 1 FROM public.children c WHERE c.id = sibling_challenges.challenged_id AND c.user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.children c WHERE c.id = sibling_challenges.challenger_id AND c.user_id = auth.uid())
    AND EXISTS (SELECT 1 FROM public.children c WHERE c.id = sibling_challenges.challenged_id AND c.user_id = auth.uid())
  );

CREATE OR REPLACE FUNCTION public.complete_sibling_challenge(
  p_challenge_id UUID,
  p_child_id UUID,
  p_session_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_challenge RECORD;
  v_session_id UUID := p_session_id;
  v_session_score NUMERIC;
  v_challenger_score NUMERIC;
  v_challenged_score NUMERIC;
  v_is_challenger BOOLEAN;
  v_winner_id UUID;
BEGIN
  SELECT * INTO v_challenge FROM public.sibling_challenges WHERE id = p_challenge_id;
  IF v_challenge IS NULL OR v_challenge.status <> 'pending' THEN
    RETURN jsonb_build_object('success', false, 'reason', 'invalid_challenge');
  END IF;

  IF v_challenge.expires_at < now() THEN
    UPDATE public.sibling_challenges SET status = 'expired' WHERE id = p_challenge_id;
    RETURN jsonb_build_object('success', false, 'reason', 'expired');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.children c WHERE c.id = p_child_id AND c.user_id = auth.uid()) THEN
    RETURN jsonb_build_object('success', false, 'reason', 'not_authorized');
  END IF;

  v_is_challenger := (p_child_id = v_challenge.challenger_id);
  IF NOT v_is_challenger AND p_child_id <> v_challenge.challenged_id THEN
    RETURN jsonb_build_object('success', false, 'reason', 'not_participant');
  END IF;

  -- Récupère (ou choisit) une session réellement jouée pour ce jeu/chapitre
  IF v_challenge.game_type IS NOT NULL THEN
    IF v_session_id IS NULL THEN
      SELECT id INTO v_session_id
      FROM public.game_sessions
      WHERE child_id = p_child_id
        AND game_type = v_challenge.game_type
        AND created_at >= v_challenge.created_at
      ORDER BY (score::numeric / NULLIF(max_score, 0)) DESC NULLS LAST, created_at DESC
      LIMIT 1;
    END IF;
    SELECT (score::numeric / NULLIF(max_score, 0)) INTO v_session_score
    FROM public.game_sessions
    WHERE id = v_session_id AND child_id = p_child_id AND game_type = v_challenge.game_type;
  ELSE
    IF v_session_id IS NULL THEN
      SELECT id INTO v_session_id
      FROM public.chapter_sessions
      WHERE child_id = p_child_id
        AND chapter_id = v_challenge.chapter_id
        AND created_at >= v_challenge.created_at
      ORDER BY best_score_pct DESC, created_at DESC
      LIMIT 1;
    END IF;
    SELECT best_score_pct / 100.0 INTO v_session_score
    FROM public.chapter_sessions
    WHERE id = v_session_id AND child_id = p_child_id AND chapter_id = v_challenge.chapter_id;
  END IF;

  IF v_session_score IS NULL THEN
    RETURN jsonb_build_object('success', false, 'reason', 'no_session');
  END IF;

  IF v_is_challenger THEN
    UPDATE public.sibling_challenges SET challenger_session_id = v_session_id WHERE id = p_challenge_id;
  ELSE
    UPDATE public.sibling_challenges SET challenged_session_id = v_session_id WHERE id = p_challenge_id;
  END IF;

  SELECT * INTO v_challenge FROM public.sibling_challenges WHERE id = p_challenge_id;

  IF v_challenge.challenger_session_id IS NULL OR v_challenge.challenged_session_id IS NULL THEN
    RETURN jsonb_build_object('success', true, 'status', 'pending', 'score', v_session_score);
  END IF;

  IF v_challenge.game_type IS NOT NULL THEN
    SELECT (score::numeric / NULLIF(max_score, 0)) INTO v_challenger_score
    FROM public.game_sessions WHERE id = v_challenge.challenger_session_id;
    SELECT (score::numeric / NULLIF(max_score, 0)) INTO v_challenged_score
    FROM public.game_sessions WHERE id = v_challenge.challenged_session_id;
  ELSE
    SELECT best_score_pct / 100.0 INTO v_challenger_score
    FROM public.chapter_sessions WHERE id = v_challenge.challenger_session_id;
    SELECT best_score_pct / 100.0 INTO v_challenged_score
    FROM public.chapter_sessions WHERE id = v_challenge.challenged_session_id;
  END IF;

  IF v_challenger_score > v_challenged_score THEN
    v_winner_id := v_challenge.challenger_id;
  ELSIF v_challenged_score > v_challenger_score THEN
    v_winner_id := v_challenge.challenged_id;
  ELSE
    v_winner_id := NULL;
  END IF;

  UPDATE public.sibling_challenges
  SET status = 'completed', completed_at = now(), winner_id = v_winner_id
  WHERE id = p_challenge_id;

  -- XP pour les deux participants (le perdant aussi), via child_levels
  UPDATE public.child_levels
  SET xp = xp + v_challenge.xp_reward,
      level = GREATEST(1, ((xp + v_challenge.xp_reward) / 100) + 1),
      updated_at = now()
  WHERE child_id IN (v_challenge.challenger_id, v_challenge.challenged_id);

  IF v_winner_id IS NOT NULL THEN
    UPDATE public.child_levels
    SET xp = xp + 10,
        level = GREATEST(1, ((xp + 10) / 100) + 1),
        updated_at = now()
    WHERE child_id = v_winner_id;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'status', 'completed',
    'winner_id', v_winner_id,
    'challenger_score', v_challenger_score,
    'challenged_score', v_challenged_score
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.complete_sibling_challenge(uuid, uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_sibling_challenge(uuid, uuid, uuid) TO authenticated;