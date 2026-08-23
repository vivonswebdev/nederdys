CREATE TABLE public.parent_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  pin_hash TEXT,
  parent_email TEXT,
  weekly_email BOOLEAN NOT NULL DEFAULT false,
  stagnation_alert BOOLEAN NOT NULL DEFAULT false,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.parent_settings TO authenticated;
GRANT ALL ON public.parent_settings TO service_role;
ALTER TABLE public.parent_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own parent settings" ON public.parent_settings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own parent settings" ON public.parent_settings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own parent settings" ON public.parent_settings FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own parent settings" ON public.parent_settings FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_parent_settings_updated_at BEFORE UPDATE ON public.parent_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.child_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  child_id UUID NOT NULL UNIQUE REFERENCES public.children(id) ON DELETE CASCADE,
  timer_enabled BOOLEAN NOT NULL DEFAULT true,
  dyslexic_font BOOLEAN NOT NULL DEFAULT true,
  sound_effects BOOLEAN NOT NULL DEFAULT true,
  reduced_motion BOOLEAN NOT NULL DEFAULT false,
  colorblind_mode BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.child_settings TO authenticated;
GRANT ALL ON public.child_settings TO service_role;
ALTER TABLE public.child_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own child settings" ON public.child_settings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own child settings" ON public.child_settings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own child settings" ON public.child_settings FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own child settings" ON public.child_settings FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_child_settings_updated_at BEFORE UPDATE ON public.child_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_game_sessions_child_created ON public.game_sessions (child_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_daily_streaks_child_date ON public.daily_streaks (child_id, date DESC);