CREATE TABLE public.daily_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  challenge_type text NOT NULL,
  target_value integer NOT NULL DEFAULT 3,
  current_value integer NOT NULL DEFAULT 0,
  xp_reward integer NOT NULL DEFAULT 20,
  date date NOT NULL DEFAULT CURRENT_DATE,
  is_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (child_id, date)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_challenges TO authenticated;
GRANT ALL ON public.daily_challenges TO service_role;

ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own child challenges" ON public.daily_challenges
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own child challenges" ON public.daily_challenges
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own child challenges" ON public.daily_challenges
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own child challenges" ON public.daily_challenges
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_daily_challenges_updated_at BEFORE UPDATE ON public.daily_challenges
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();