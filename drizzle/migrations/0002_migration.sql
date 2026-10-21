CREATE TABLE IF NOT EXISTS public.daily_challenge_rewards (
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  date date NOT NULL,
  xp integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (child_id, date)
);
GRANT SELECT ON public.daily_challenge_rewards TO authenticated;
GRANT ALL ON public.daily_challenge_rewards TO service_role;
ALTER TABLE public.daily_challenge_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents read own children rewards" ON public.daily_challenge_rewards FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM children c WHERE c.id = child_id AND c.user_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.claim_daily_challenge_xp(p_child_id uuid)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_xp integer; v_ins integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM children WHERE id = p_child_id AND user_id = auth.uid()) THEN RETURN 0; END IF;
  SELECT LEAST(GREATEST(xp_reward,0), 20) INTO v_xp FROM daily_challenges
   WHERE child_id = p_child_id AND date = CURRENT_DATE AND is_completed LIMIT 1;
  IF COALESCE(v_xp,0) = 0 THEN RETURN 0; END IF;
  INSERT INTO daily_challenge_rewards (child_id, date, xp) VALUES (p_child_id, CURRENT_DATE, v_xp) ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS v_ins = ROW_COUNT;
  IF v_ins = 0 THEN RETURN 0; END IF;
  UPDATE child_levels SET xp = xp + v_xp, level = GREATEST(1, (xp + v_xp)/100 + 1) WHERE child_id = p_child_id;
  RETURN v_xp;
END $$;
REVOKE EXECUTE ON FUNCTION public.claim_daily_challenge_xp(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_daily_challenge_xp(uuid) TO authenticated;