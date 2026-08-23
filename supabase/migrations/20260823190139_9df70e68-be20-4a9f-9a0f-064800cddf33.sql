CREATE TABLE public.exercise_mistakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  subject text NOT NULL DEFAULT 'math',
  chapter_id text NOT NULL,
  exercise_id text NOT NULL,
  difficulty smallint NOT NULL DEFAULT 1,
  question text NOT NULL,
  given_answer text,
  correct_answer text NOT NULL,
  resolved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.exercise_mistakes TO authenticated;
GRANT ALL ON public.exercise_mistakes TO service_role;

ALTER TABLE public.exercise_mistakes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents manage own children mistakes"
ON public.exercise_mistakes FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.children c WHERE c.id = child_id AND c.user_id = auth.uid()));

CREATE INDEX idx_exercise_mistakes_child ON public.exercise_mistakes (child_id, resolved, created_at DESC);