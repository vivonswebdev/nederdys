INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users ORDER BY created_at LIMIT 1
ON CONFLICT (user_id, role) DO NOTHING;