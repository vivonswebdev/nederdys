CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Table dédiée au code PIN parent (hash bcrypt, jamais lisible côté client)
CREATE TABLE IF NOT EXISTS public.parent_pin (
  parent_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  pin_hash text NOT NULL,
  failed_attempts integer NOT NULL DEFAULT 0,
  locked_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Aucun accès direct pour le client : tout passe par des fonctions SECURITY DEFINER
GRANT ALL ON public.parent_pin TO service_role;
ALTER TABLE public.parent_pin ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No direct client access to parent_pin"
  ON public.parent_pin FOR SELECT TO authenticated USING (false);

CREATE TRIGGER update_parent_pin_updated_at
  BEFORE UPDATE ON public.parent_pin
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Un PIN est-il déjà défini ?
CREATE OR REPLACE FUNCTION public.has_parent_pin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT EXISTS (SELECT 1 FROM public.parent_pin WHERE parent_id = auth.uid());
$$;

-- Définir / changer le PIN (ancien PIN requis s'il existe déjà)
CREATE OR REPLACE FUNCTION public.set_parent_pin(new_pin text, old_pin text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  uid uuid := auth.uid();
  existing text;
BEGIN
  IF uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'unauthenticated');
  END IF;
  IF new_pin !~ '^[0-9]{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid_format');
  END IF;

  SELECT pin_hash INTO existing FROM public.parent_pin WHERE parent_id = uid;

  IF existing IS NOT NULL THEN
    IF old_pin IS NULL OR extensions.crypt(old_pin, existing) <> existing THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'wrong_old_pin');
    END IF;
    UPDATE public.parent_pin
      SET pin_hash = extensions.crypt(new_pin, extensions.gen_salt('bf')),
          failed_attempts = 0,
          locked_until = NULL
      WHERE parent_id = uid;
  ELSE
    INSERT INTO public.parent_pin (parent_id, pin_hash)
    VALUES (uid, extensions.crypt(new_pin, extensions.gen_salt('bf')));
  END IF;

  RETURN jsonb_build_object('ok', true);
END;
$$;

-- Vérifier le PIN : 3 essais max puis blocage 5 minutes
CREATE OR REPLACE FUNCTION public.verify_parent_pin(input_pin text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  uid uuid := auth.uid();
  rec public.parent_pin%ROWTYPE;
  attempts integer;
  max_attempts constant integer := 3;
BEGIN
  IF uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'unauthenticated');
  END IF;

  SELECT * INTO rec FROM public.parent_pin WHERE parent_id = uid;
  IF rec.parent_id IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'no_pin');
  END IF;

  IF rec.locked_until IS NOT NULL AND rec.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'locked', 'locked_until', rec.locked_until);
  END IF;

  IF extensions.crypt(input_pin, rec.pin_hash) = rec.pin_hash THEN
    UPDATE public.parent_pin
      SET failed_attempts = 0, locked_until = NULL
      WHERE parent_id = uid;
    RETURN jsonb_build_object('ok', true);
  END IF;

  attempts := rec.failed_attempts + 1;
  IF attempts >= max_attempts THEN
    UPDATE public.parent_pin
      SET failed_attempts = 0, locked_until = now() + interval '5 minutes'
      WHERE parent_id = uid;
    RETURN jsonb_build_object('ok', false, 'reason', 'locked', 'locked_until', now() + interval '5 minutes');
  END IF;

  UPDATE public.parent_pin SET failed_attempts = attempts WHERE parent_id = uid;
  RETURN jsonb_build_object('ok', false, 'reason', 'wrong', 'attempts_left', max_attempts - attempts);
END;
$$;

REVOKE ALL ON FUNCTION public.has_parent_pin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.set_parent_pin(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.verify_parent_pin(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_parent_pin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_parent_pin(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_parent_pin(text) TO authenticated;

-- L'ancien hash SHA-256 stocké côté parent_settings n'a plus lieu d'être
UPDATE public.parent_settings SET pin_hash = NULL;

-- Backfill : profils manquants pour les comptes déjà existants
INSERT INTO public.profiles (user_id, email)
SELECT u.id, u.email
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = u.id);