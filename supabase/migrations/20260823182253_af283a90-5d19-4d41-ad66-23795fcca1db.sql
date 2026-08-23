CREATE OR REPLACE FUNCTION public.get_game_detail_stats(
  p_child_id UUID, p_game_type TEXT, p_weeks INTEGER DEFAULT 8
)
RETURNS TABLE (
  week_start DATE,
  sessions_count BIGINT,
  avg_success_rate NUMERIC,
  difficulty TEXT,
  difficulty_sessions BIGINT,
  difficulty_success_rate NUMERIC
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.children c WHERE c.id = p_child_id AND c.user_id = auth.uid()) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  WITH weekly AS (
    SELECT
      date_trunc('week', s.created_at)::date AS week_start,
      COUNT(*) AS sessions_count,
      ROUND(AVG(s.score::numeric / NULLIF(s.max_score, 0) * 100), 1) AS avg_success_rate
    FROM public.game_sessions s
    WHERE s.child_id = p_child_id AND s.game_type = p_game_type
      AND s.created_at >= now() - make_interval(weeks => p_weeks)
    GROUP BY 1
  ),
  by_difficulty AS (
    SELECT
      gd.difficulty,
      COUNT(s.id) AS difficulty_sessions,
      ROUND(AVG(s.score::numeric / NULLIF(s.max_score, 0) * 100), 1) AS difficulty_success_rate
    FROM public.game_sessions s
    LEFT JOIN public.game_difficulties gd
      ON gd.child_id = s.child_id AND gd.game_type = s.game_type
    WHERE s.child_id = p_child_id AND s.game_type = p_game_type
      AND s.created_at >= now() - make_interval(weeks => p_weeks)
    GROUP BY gd.difficulty
  )
  SELECT w.week_start, w.sessions_count, w.avg_success_rate,
         d.difficulty, d.difficulty_sessions, d.difficulty_success_rate
  FROM weekly w
  CROSS JOIN by_difficulty d
  ORDER BY w.week_start;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_game_detail_stats(uuid, text, integer) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.get_game_detail_stats(uuid, text, integer) FROM anon, public;