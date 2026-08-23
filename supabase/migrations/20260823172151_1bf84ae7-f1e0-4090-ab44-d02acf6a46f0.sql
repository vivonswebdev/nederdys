REVOKE EXECUTE ON FUNCTION public.record_game_completion(uuid, text, text, integer, integer, integer, integer, integer, integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.purchase_avatar_item(uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.set_parent_pin(text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.verify_parent_pin(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_parent_pin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.purchase_avatar_item(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_parent_pin(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_parent_pin(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_parent_pin() TO authenticated;