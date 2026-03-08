
-- Child levels table for global XP/level tracking
CREATE TABLE public.child_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  xp integer NOT NULL DEFAULT 0,
  level integer NOT NULL DEFAULT 1,
  games_played integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(child_id)
);

ALTER TABLE public.child_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own child levels" ON public.child_levels FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own child levels" ON public.child_levels FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own child levels" ON public.child_levels FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_child_levels_updated_at BEFORE UPDATE ON public.child_levels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Game difficulty tracking per game per child
CREATE TABLE public.game_difficulties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  game_type text NOT NULL,
  difficulty text NOT NULL DEFAULT 'easy',
  recent_error_rate real NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(child_id, game_type)
);

ALTER TABLE public.game_difficulties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own game difficulties" ON public.game_difficulties FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own game difficulties" ON public.game_difficulties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own game difficulties" ON public.game_difficulties FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_game_difficulties_updated_at BEFORE UPDATE ON public.game_difficulties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
