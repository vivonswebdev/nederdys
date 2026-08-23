REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES ON public.avatar_owned_items FROM authenticated, anon;
REVOKE SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES ON public.parent_pin FROM authenticated, anon;
GRANT ALL ON public.avatar_owned_items TO service_role;
GRANT ALL ON public.parent_pin TO service_role;