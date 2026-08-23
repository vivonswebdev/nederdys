CREATE OR REPLACE FUNCTION public.get_top_games(p_child_id uuid, p_limit integer DEFAULT 5, p_days integer DEFAULT NULL)
RETURNS TABLE (
  game_id text,
  subject text,
  times_played bigint,
  success_rate numeric,
  last_session timestamptz
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
  SELECT
    s.game_type AS game_id,
    s.subject,
    COUNT(*)::bigint AS times_played,
    COALESCE(
      ROUND(AVG(s.score::numeric / NULLIF(s.max_score, 0) * 100), 1),
      0
    ) AS success_rate,
    MAX(s.created_at) AS last_session
  FROM public.game_sessions s
  WHERE s.child_id = p_child_id
    AND (p_days IS NULL OR s.created_at >= now() - make_interval(days => p_days))
  GROUP BY s.game_type, s.subject
  ORDER BY times_played DESC, last_session DESC
  LIMIT GREATEST(1, COALESCE(p_limit, 5));
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_top_games(uuid, integer, integer) TO authenticated;