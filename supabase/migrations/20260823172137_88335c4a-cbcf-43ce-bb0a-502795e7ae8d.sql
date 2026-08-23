CREATE OR REPLACE FUNCTION public.record_game_completion(
  p_child_id uuid,
  p_game_id text,
  p_subject text,
  p_difficulty integer,
  p_xp_earned integer,
  p_score integer DEFAULT 0,
  p_max_score integer DEFAULT 0,
  p_duration_seconds integer DEFAULT 0,
  p_errors_count integer DEFAULT 0
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_xp integer;
  v_old_level integer;
  v_new_xp integer;
  v_new_level integer;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.children WHERE id = p_child_id AND user_id = v_uid) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  v_xp := GREATEST(0, LEAST(COALESCE(p_xp_earned, 0), 180));

  INSERT INTO public.game_sessions (child_id, user_id, game_type, subject, score, max_score, duration_seconds, errors_count, completed)
  VALUES (p_child_id, v_uid, p_game_id, COALESCE(p_subject, 'math'), COALESCE(p_score, 0), COALESCE(p_max_score, 0), COALESCE(p_duration_seconds, 0), COALESCE(p_errors_count, 0), true);

  INSERT INTO public.child_levels (child_id, user_id, xp, level, games_played)
  VALUES (p_child_id, v_uid, v_xp, GREATEST(1, (v_xp / 100) + 1), 1)
  ON CONFLICT (child_id) DO UPDATE
    SET xp = child_levels.xp + v_xp,
        level = GREATEST(1, ((child_levels.xp + v_xp) / 100) + 1),
        games_played = child_levels.games_played + 1
  RETURNING xp, level INTO v_new_xp, v_new_level;

  v_old_level := GREATEST(1, ((v_new_xp - v_xp) / 100) + 1);

  INSERT INTO public.child_coins (user_id, child_id, coins, total_earned)
  VALUES (v_uid, p_child_id, v_xp, v_xp)
  ON CONFLICT (child_id) DO UPDATE
    SET coins = child_coins.coins + v_xp,
        total_earned = child_coins.total_earned + v_xp;

  INSERT INTO public.daily_streaks (user_id, child_id, date, xp_earned)
  VALUES (v_uid, p_child_id, CURRENT_DATE, v_xp)
  ON CONFLICT (child_id, date) DO UPDATE
    SET xp_earned = daily_streaks.xp_earned + v_xp;

  RETURN jsonb_build_object('ok', true, 'xp_awarded', v_xp, 'level', v_new_level, 'leveled_up', v_new_level > v_old_level);
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_game_completion(uuid, text, text, integer, integer, integer, integer, integer, integer) TO authenticated;