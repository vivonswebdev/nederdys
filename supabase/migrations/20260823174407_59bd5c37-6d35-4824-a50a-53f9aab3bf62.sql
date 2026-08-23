CREATE TABLE public.chapter_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  chapter_id text NOT NULL,
  difficulty_level integer NOT NULL DEFAULT 1,
  correct_count integer NOT NULL DEFAULT 0,
  total_count integer NOT NULL DEFAULT 0,
  best_score_pct numeric NOT NULL DEFAULT 0,
  xp_earned integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.chapter_sessions TO authenticated;
GRANT ALL ON public.chapter_sessions TO service_role;

ALTER TABLE public.chapter_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chapter sessions" ON public.chapter_sessions
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chapter sessions" ON public.chapter_sessions
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_chapter_sessions_child_chapter_diff
  ON public.chapter_sessions(child_id, chapter_id, difficulty_level);

CREATE OR REPLACE FUNCTION public.get_unlocked_level(p_child_id uuid, p_chapter_id text)
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_l1 numeric;
  v_l2 numeric;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.children WHERE id = p_child_id AND user_id = auth.uid()) THEN
    RETURN 1;
  END IF;

  SELECT COALESCE(MAX(best_score_pct), 0) INTO v_l1
  FROM public.chapter_sessions
  WHERE child_id = p_child_id AND chapter_id = p_chapter_id AND difficulty_level = 1;

  SELECT COALESCE(MAX(best_score_pct), 0) INTO v_l2
  FROM public.chapter_sessions
  WHERE child_id = p_child_id AND chapter_id = p_chapter_id AND difficulty_level = 2;

  IF v_l2 >= 80 THEN RETURN 3;
  ELSIF v_l1 >= 80 THEN RETURN 2;
  ELSE RETURN 1;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.record_exercise_session(
  p_child_id uuid,
  p_chapter_id text,
  p_difficulty integer,
  p_correct integer,
  p_total integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_pct numeric := (GREATEST(p_correct, 0)::numeric / GREATEST(p_total, 1)) * 100;
  v_xp integer := GREATEST(p_correct, 0) * 2 + (CASE WHEN (GREATEST(p_correct, 0)::numeric / GREATEST(p_total, 1)) * 100 >= 80 THEN 10 ELSE 0 END);
  v_old_level integer;
  v_new_level integer;
  v_unlocked integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.children WHERE id = p_child_id AND user_id = v_user) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  INSERT INTO public.chapter_sessions (user_id, child_id, chapter_id, difficulty_level, correct_count, total_count, best_score_pct, xp_earned)
  VALUES (v_user, p_child_id, p_chapter_id, GREATEST(LEAST(p_difficulty, 3), 1), GREATEST(p_correct, 0), GREATEST(p_total, 1), v_pct, v_xp);

  INSERT INTO public.child_levels (child_id, user_id, xp, level, games_played)
  VALUES (p_child_id, v_user, v_xp, GREATEST(1, (v_xp / 100) + 1), 1)
  ON CONFLICT (child_id) DO NOTHING;

  SELECT level INTO v_old_level FROM public.child_levels WHERE child_id = p_child_id;

  UPDATE public.child_levels
  SET xp = xp + v_xp,
      level = GREATEST(1, ((xp + v_xp) / 100) + 1),
      games_played = games_played + 1,
      updated_at = now()
  WHERE child_id = p_child_id
  RETURNING level INTO v_new_level;

  INSERT INTO public.child_coins (child_id, user_id, coins, total_earned)
  VALUES (p_child_id, v_user, v_xp, v_xp)
  ON CONFLICT (child_id) DO UPDATE
    SET coins = public.child_coins.coins + v_xp,
        total_earned = public.child_coins.total_earned + v_xp,
        updated_at = now();

  INSERT INTO public.daily_streaks (user_id, child_id, date, xp_earned)
  VALUES (v_user, p_child_id, CURRENT_DATE, v_xp)
  ON CONFLICT DO NOTHING;

  v_unlocked := public.get_unlocked_level(p_child_id, p_chapter_id);

  RETURN jsonb_build_object(
    'ok', true,
    'xp_awarded', v_xp,
    'score_pct', round(v_pct),
    'level', COALESCE(v_new_level, 1),
    'leveled_up', COALESCE(v_new_level, 1) > COALESCE(v_old_level, 1),
    'unlocked_level', v_unlocked
  );
END;
$$;