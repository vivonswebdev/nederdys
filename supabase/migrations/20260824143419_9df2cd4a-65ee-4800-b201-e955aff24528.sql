CREATE TABLE public.code_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  track_id text NOT NULL,
  episode_id text NOT NULL,
  best_score_pct integer NOT NULL DEFAULT 0,
  passed boolean NOT NULL DEFAULT false,
  attempts integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (child_id, episode_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.code_progress TO authenticated;
GRANT ALL ON public.code_progress TO service_role;

ALTER TABLE public.code_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own code progress" ON public.code_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own code progress" ON public.code_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.user_id = auth.uid()));
CREATE POLICY "Users can update own code progress" ON public.code_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX code_progress_child_idx ON public.code_progress (child_id);