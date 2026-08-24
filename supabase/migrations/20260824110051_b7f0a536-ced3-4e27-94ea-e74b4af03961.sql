-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Admin logs
CREATE TABLE public.admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id uuid REFERENCES public.children(id) ON DELETE CASCADE,
  action text NOT NULL,
  page text,
  error_message text,
  stack_trace text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.admin_logs TO authenticated;
GRANT ALL ON public.admin_logs TO service_role;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users insert own logs" ON public.admin_logs
FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins read logs" ON public.admin_logs
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX idx_admin_logs_user ON public.admin_logs(user_id);
CREATE INDEX idx_admin_logs_child ON public.admin_logs(child_id);
CREATE INDEX idx_admin_logs_action ON public.admin_logs(action);
CREATE INDEX idx_admin_logs_created ON public.admin_logs(created_at);

-- Error reports
CREATE TABLE public.error_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  error_type text NOT NULL,
  description text,
  page_url text,
  browser_info text,
  stack_trace text,
  resolved boolean NOT NULL DEFAULT false,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.error_reports TO authenticated;
GRANT ALL ON public.error_reports TO service_role;
ALTER TABLE public.error_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users report errors" ON public.error_reports
FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins read reports" ON public.error_reports
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins resolve reports" ON public.error_reports
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX idx_error_reports_type ON public.error_reports(error_type);
CREATE INDEX idx_error_reports_resolved ON public.error_reports(resolved);
CREATE INDEX idx_error_reports_created ON public.error_reports(created_at);

-- Admin stats
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS TABLE (
  total_children bigint, total_parents bigint, active_today bigint, active_week bigint,
  total_games_played bigint, total_exercises_completed bigint, avg_session_minutes numeric,
  top_game text, top_exercise text, error_count_24h bigint
) LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Not authorized'; END IF;
  RETURN QUERY SELECT
    (SELECT COUNT(*) FROM public.children),
    (SELECT COUNT(*) FROM public.profiles),
    (SELECT COUNT(DISTINCT child_id) FROM public.game_sessions WHERE created_at >= now() - interval '1 day'),
    (SELECT COUNT(DISTINCT child_id) FROM public.game_sessions WHERE created_at >= now() - interval '7 day'),
    (SELECT COUNT(*) FROM public.game_sessions),
    (SELECT COUNT(*) FROM public.chapter_sessions),
    (SELECT COALESCE(ROUND(AVG(duration_seconds) / 60.0, 1), 0) FROM public.game_sessions),
    (SELECT gs.game_type FROM public.game_sessions gs GROUP BY gs.game_type ORDER BY COUNT(*) DESC LIMIT 1),
    (SELECT cs.chapter_id FROM public.chapter_sessions cs GROUP BY cs.chapter_id ORDER BY COUNT(*) DESC LIMIT 1),
    (SELECT COUNT(*) FROM public.error_reports WHERE created_at >= now() - interval '24 hour');
END; $$;
REVOKE EXECUTE ON FUNCTION public.get_admin_stats() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated;

-- Top games (admin-wide)
CREATE OR REPLACE FUNCTION public.get_admin_top_games(p_days integer DEFAULT 7)
RETURNS TABLE (game_type text, play_count bigint, unique_players bigint, avg_score numeric, avg_duration_seconds numeric)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Not authorized'; END IF;
  RETURN QUERY
  SELECT gs.game_type, COUNT(*)::bigint, COUNT(DISTINCT gs.child_id)::bigint,
    COALESCE(ROUND(AVG(gs.score::numeric / NULLIF(gs.max_score, 0) * 100), 1), 0),
    COALESCE(ROUND(AVG(gs.duration_seconds), 1), 0)
  FROM public.game_sessions gs
  WHERE gs.created_at >= now() - make_interval(days => GREATEST(p_days, 1))
  GROUP BY gs.game_type
  ORDER BY COUNT(*) DESC
  LIMIT 20;
END; $$;
REVOKE EXECUTE ON FUNCTION public.get_admin_top_games(integer) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_admin_top_games(integer) TO authenticated;

-- Error heatmap based on exercise_mistakes + chapter_sessions
CREATE OR REPLACE FUNCTION public.get_error_heatmap(p_days integer DEFAULT 7)
RETURNS TABLE (exercise_id text, chapter_id text, subject text, total_attempts bigint, errors bigint, error_rate numeric)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Not authorized'; END IF;
  RETURN QUERY
  WITH mistakes AS (
    SELECT em.exercise_id, em.chapter_id, em.subject, COUNT(*)::bigint AS errors
    FROM public.exercise_mistakes em
    WHERE em.created_at >= now() - make_interval(days => GREATEST(p_days, 1))
    GROUP BY em.exercise_id, em.chapter_id, em.subject
  ),
  attempts AS (
    SELECT cs.chapter_id, SUM(cs.total_count)::bigint AS total_attempts
    FROM public.chapter_sessions cs
    WHERE cs.created_at >= now() - make_interval(days => GREATEST(p_days, 1))
    GROUP BY cs.chapter_id
  )
  SELECT m.exercise_id, m.chapter_id, m.subject,
    COALESCE(a.total_attempts, m.errors) AS total_attempts,
    m.errors,
    ROUND(m.errors::numeric / GREATEST(COALESCE(a.total_attempts, m.errors), 1) * 100, 1)
  FROM mistakes m
  LEFT JOIN attempts a ON a.chapter_id = m.chapter_id
  WHERE m.errors >= 1
  ORDER BY m.errors DESC
  LIMIT 50;
END; $$;
REVOKE EXECUTE ON FUNCTION public.get_error_heatmap(integer) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_error_heatmap(integer) TO authenticated;

-- Admin users listing
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (kind text, id uuid, label text, school_level text, parent_email text, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Not authorized'; END IF;
  RETURN QUERY
  SELECT 'parent'::text, p.user_id, COALESCE(p.display_name, p.email, 'Parent'), NULL::text, p.email, p.created_at
  FROM public.profiles p
  UNION ALL
  SELECT 'child'::text, c.id, c.first_name, c.school_level, pr.email, c.created_at
  FROM public.children c
  LEFT JOIN public.profiles pr ON pr.user_id = c.user_id
  ORDER BY 6 DESC
  LIMIT 500;
END; $$;
REVOKE EXECUTE ON FUNCTION public.get_admin_users() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;