ALTER TABLE public.chapter_sessions
  ADD COLUMN IF NOT EXISTS duration_seconds INTEGER NOT NULL DEFAULT 0;

DROP FUNCTION IF EXISTS public.record_exercise_session(uuid, text, integer, integer, integer);

CREATE OR REPLACE FUNCTION public.record_exercise_session(
  p_child_id uuid,
  p_chapter_id text,
  p_difficulty integer,
  p_correct integer,
  p_total integer,
  p_duration_seconds integer DEFAULT 0
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_user uuid := auth.uid();
  v_pct numeric := (GREATEST(p_correct, 0)::numeric / GREATEST(p_total, 1)) * 100;
  v_xp integer := GREATEST(p_correct, 0) * 2 + (CASE WHEN (GREATEST(p_correct, 0)::numeric / GREATEST(p_total, 1)) * 100 >= 80 THEN 10 ELSE 0 END);
  v_old_level integer;
  v_new_level integer;
  v_unlocked integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.children WHERE id = p_child_id AND user_id = v_user) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  INSERT INTO public.chapter_sessions (user_id, child_id, chapter_id, difficulty_level, correct_count, total_count, best_score_pct, xp_earned, duration_seconds)
  VALUES (v_user, p_child_id, p_chapter_id, GREATEST(LEAST(p_difficulty, 3), 1), GREATEST(p_correct, 0), GREATEST(p_total, 1), v_pct, v_xp, GREATEST(COALESCE(p_duration_seconds, 0), 0));

  INSERT INTO public.child_levels (child_id, user_id, xp, level, games_played)
  VALUES (p_child_id, v_user, v_xp, GREATEST(1, (v_xp / 100) + 1), 1)
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
  VALUES (p_child_id, v_user, v_xp, v_xp)
  ON CONFLICT (child_id) DO UPDATE
    SET coins = public.child_coins.coins + v_xp,
        total_earned = public.child_coins.total_earned + v_xp,
        updated_at = now();

  INSERT INTO public.daily_streaks (user_id, child_id, date, xp_earned)
  VALUES (v_user, p_child_id, CURRENT_DATE, v_xp)
  ON CONFLICT DO NOTHING;

  v_unlocked := public.get_unlocked_level(p_child_id, p_chapter_id);

  RETURN jsonb_build_object(
    'ok', true,
    'xp_awarded', v_xp,
    'score_pct', round(v_pct),
    'level', COALESCE(v_new_level, 1),
    'leveled_up', COALESCE(v_new_level, 1) > COALESCE(v_old_level, 1),
    'unlocked_level', v_unlocked
  );
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.record_exercise_session(uuid, text, integer, integer, integer, integer) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.record_exercise_session(uuid, text, integer, integer, integer, integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_time_tracking(
  p_child_id uuid,
  p_days integer DEFAULT 30
)
RETURNS TABLE (day date, minutes_played numeric, sessions_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.children c
    WHERE c.id = p_child_id AND c.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  WITH all_sessions AS (
    SELECT s.created_at, COALESCE(s.duration_seconds, 0) AS secs
    FROM public.game_sessions s
    WHERE s.child_id = p_child_id
      AND s.created_at >= now() - make_interval(days => p_days)
    UNION ALL
    SELECT cs.created_at, COALESCE(cs.duration_seconds, 0)
    FROM public.chapter_sessions cs
    WHERE cs.child_id = p_child_id
      AND cs.created_at >= now() - make_interval(days => p_days)
  )
  SELECT
    a.created_at::date AS day,
    ROUND(SUM(a.secs) / 60.0, 1) AS minutes_played,
    COUNT(*)::bigint AS sessions_count
  FROM all_sessions a
  GROUP BY 1
  ORDER BY 1;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_time_tracking(uuid, integer) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_time_tracking(uuid, integer) TO authenticated;