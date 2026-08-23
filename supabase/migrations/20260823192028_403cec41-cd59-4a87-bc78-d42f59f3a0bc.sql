REVOKE SELECT, INSERT, UPDATE, DELETE ON public.exercise_mistakes FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.exercise_mistakes TO authenticated;
GRANT ALL ON public.exercise_mistakes TO service_role;