-- Child-safe reading progress, bookmarks and one-time server-authoritative rewards.
-- This migration is source-controlled only; it must be reviewed and applied separately.

CREATE TABLE IF NOT EXISTS public.story_catalog (
  story_id text PRIMARY KEY,
  scene_count integer NOT NULL CHECK (scene_count BETWEEN 1 AND 100),
  active boolean NOT NULL DEFAULT true
);

INSERT INTO public.story_catalog (story_id, scene_count, active) VALUES
  ('de-verjaardag', 5, true),
  ('het-huisdier', 5, true),
  ('de-zachte-maan', 4, true),
  ('vrienden-in-het-bos', 4, true),
  ('de-wolkenboot', 5, true),
  ('de-verdwenen-kaart', 5, true),
  ('de-sterrenpost', 5, true),
  ('de-tuin-van-noor', 5, true)
ON CONFLICT (story_id) DO UPDATE
  SET scene_count = EXCLUDED.scene_count,
      active = EXCLUDED.active;

ALTER TABLE public.story_catalog ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read active story catalog" ON public.story_catalog;
CREATE POLICY "Anyone can read active story catalog" ON public.story_catalog
  FOR SELECT USING (active = true);
REVOKE ALL ON public.story_catalog FROM anon, authenticated;
GRANT SELECT ON public.story_catalog TO anon, authenticated;

CREATE TABLE IF NOT EXISTS public.child_story_reading (
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  story_id text NOT NULL REFERENCES public.story_catalog(story_id) ON DELETE CASCADE,
  current_scene integer NOT NULL DEFAULT 0 CHECK (current_scene >= 0),
  bookmarked boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (child_id, story_id)
);

ALTER TABLE public.child_story_reading ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Parents can read their children's story progress" ON public.child_story_reading;
CREATE POLICY "Parents can read their children's story progress" ON public.child_story_reading
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.children c
    WHERE c.id = child_story_reading.child_id AND c.user_id = auth.uid()
  ));
REVOKE ALL ON public.child_story_reading FROM anon, authenticated;
GRANT SELECT ON public.child_story_reading TO authenticated;

CREATE OR REPLACE FUNCTION public.save_story_reading_progress(
  p_child_id uuid,
  p_story_id text,
  p_current_scene integer,
  p_bookmarked boolean
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_scene_count integer;
BEGIN
  IF v_user IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.children c
    WHERE c.id = p_child_id AND c.user_id = v_user
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT scene_count INTO v_scene_count
  FROM public.story_catalog
  WHERE story_id = p_story_id AND active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unknown story';
  END IF;

  IF p_current_scene < 0 OR p_current_scene >= v_scene_count THEN
    RAISE EXCEPTION 'Invalid reading position';
  END IF;

  INSERT INTO public.child_story_reading (child_id, story_id, current_scene, bookmarked)
  VALUES (p_child_id, p_story_id, p_current_scene, COALESCE(p_bookmarked, false))
  ON CONFLICT (child_id, story_id) DO UPDATE
    SET current_scene = EXCLUDED.current_scene,
        bookmarked = EXCLUDED.bookmarked,
        updated_at = now();

  RETURN jsonb_build_object('ok', true);
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_story_reading(
  p_child_id uuid,
  p_story_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_scene_count integer;
  v_progress public.child_story_reading%ROWTYPE;
  v_xp constant integer := 15;
  v_old_level integer;
  v_new_level integer;
BEGIN
  IF v_user IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.children c
    WHERE c.id = p_child_id AND c.user_id = v_user
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT scene_count INTO v_scene_count
  FROM public.story_catalog
  WHERE story_id = p_story_id AND active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unknown story';
  END IF;

  SELECT * INTO v_progress
  FROM public.child_story_reading
  WHERE child_id = p_child_id AND story_id = p_story_id
  FOR UPDATE;

  IF NOT FOUND OR v_progress.current_scene < v_scene_count - 1 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'story_incomplete', 'xp_awarded', 0);
  END IF;
  IF v_progress.completed_at IS NOT NULL THEN
    RETURN jsonb_build_object('ok', true, 'already_completed', true, 'xp_awarded', 0);
  END IF;

  UPDATE public.child_story_reading
  SET completed_at = now(), updated_at = now()
  WHERE child_id = p_child_id AND story_id = p_story_id;

  INSERT INTO public.child_levels (child_id, user_id, xp, level, games_played)
  VALUES (p_child_id, v_user, 0, 1, 0)
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
  VALUES (p_child_id, v_user, 0, 0)
  ON CONFLICT (child_id) DO UPDATE
    SET coins = public.child_coins.coins + v_xp,
        total_earned = public.child_coins.total_earned + v_xp,
        updated_at = now();

  INSERT INTO public.daily_streaks (user_id, child_id, date, xp_earned)
  VALUES (v_user, p_child_id, CURRENT_DATE, v_xp)
  ON CONFLICT (child_id, date) DO UPDATE
    SET xp_earned = public.daily_streaks.xp_earned + v_xp;

  RETURN jsonb_build_object(
    'ok', true,
    'xp_awarded', v_xp,
    'level', COALESCE(v_new_level, 1),
    'leveled_up', COALESCE(v_new_level, 1) > COALESCE(v_old_level, 1)
  );
END;
$$;

REVOKE ALL ON FUNCTION public.save_story_reading_progress(uuid, text, integer, boolean) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.complete_story_reading(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_story_reading_progress(uuid, text, integer, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_story_reading(uuid, text) TO authenticated;
