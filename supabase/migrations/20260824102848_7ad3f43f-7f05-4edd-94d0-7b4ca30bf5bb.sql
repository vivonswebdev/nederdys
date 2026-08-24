ALTER TABLE public.children
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'nl';

ALTER TABLE public.children
  DROP CONSTRAINT IF EXISTS children_language_check;

ALTER TABLE public.children
  ADD CONSTRAINT children_language_check CHECK (language IN ('nl','fr'));