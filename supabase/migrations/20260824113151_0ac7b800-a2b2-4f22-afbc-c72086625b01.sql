CREATE OR REPLACE FUNCTION public.get_subject_breakdown(p_child_id UUID)
RETURNS TABLE (
  subject TEXT,
  sessions_count BIGINT,
  success_rate NUMERIC,
  weak_games TEXT[],
  strong_games TEXT[]
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
  WITH by_game AS (
    SELECT
      s.subject,
      s.game_type,
      AVG(s.score::numeric / NULLIF(s.max_score, 0)) AS rate,
      COUNT(*) AS n
    FROM public.game_sessions s
    WHERE s.child_id = p_child_id
    GROUP BY s.subject, s.game_type
  )
  SELECT
    bg.subject,
    SUM(bg.n)::bigint AS sessions_count,
    ROUND(AVG(bg.rate) * 100, 1) AS success_rate,
    ARRAY(
      SELECT game_type FROM by_game g2
      WHERE g2.subject = bg.subject AND g2.rate < 0.5
      ORDER BY g2.rate ASC LIMIT 3
    ) AS weak_games,
    ARRAY(
      SELECT game_type FROM by_game g2
      WHERE g2.subject = bg.subject AND g2.rate > 0.8
      ORDER BY g2.rate DESC LIMIT 3
    ) AS strong_games
  FROM by_game bg
  GROUP BY bg.subject;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_subject_breakdown(uuid) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.get_subject_breakdown(uuid) FROM anon, public;