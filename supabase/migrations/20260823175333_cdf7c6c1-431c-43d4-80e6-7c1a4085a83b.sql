-- 1) Aucun accès de lecture pour les visiteurs non connectés
REVOKE SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM anon;

-- 2) Fonctions internes : jamais appelables depuis l'API
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE ALL ON FUNCTION public.assign_starter_items() FROM anon, authenticated, public;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;

-- 3) Fonctions applicatives : réservées aux utilisateurs connectés
REVOKE ALL ON FUNCTION public.get_top_games(uuid, integer, integer) FROM anon, public;
REVOKE ALL ON FUNCTION public.get_unlocked_level(uuid, text) FROM anon, public;
REVOKE ALL ON FUNCTION public.record_exercise_session(uuid, text, integer, integer, integer) FROM anon, public;
REVOKE ALL ON FUNCTION public.record_game_completion(uuid, text, text, integer, integer, integer, integer, integer, integer) FROM anon, public;
REVOKE ALL ON FUNCTION public.purchase_avatar_item(uuid, uuid) FROM anon, public;
REVOKE ALL ON FUNCTION public.has_parent_pin() FROM anon, public;
REVOKE ALL ON FUNCTION public.set_parent_pin(text, text) FROM anon, public;
REVOKE ALL ON FUNCTION public.verify_parent_pin(text) FROM anon, public;

GRANT EXECUTE ON FUNCTION public.get_top_games(uuid, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_unlocked_level(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_exercise_session(uuid, text, integer, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_game_completion(uuid, text, text, integer, integer, integer, integer, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.purchase_avatar_item(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_parent_pin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_parent_pin(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_parent_pin(text) TO authenticated;

-- 4) Le catalogue d'avatars devient réservé aux comptes connectés
DROP POLICY IF EXISTS "Catalogue lisible par tous" ON public.avatar_items;
CREATE POLICY "Catalogue lisible par les comptes connectes" ON public.avatar_items
FOR SELECT TO authenticated USING (true);