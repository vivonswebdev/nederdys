
ALTER TABLE public.avatar_items
  ADD COLUMN IF NOT EXISTS item_key text,
  ADD COLUMN IF NOT EXISTS description_fr text,
  ADD COLUMN IF NOT EXISTS description_nl text,
  ADD COLUMN IF NOT EXISTS preview_emoji text,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE UNIQUE INDEX IF NOT EXISTS avatar_items_item_key_uidx ON public.avatar_items (item_key) WHERE item_key IS NOT NULL;

ALTER TABLE public.avatar_items DROP CONSTRAINT IF EXISTS avatar_items_category_check;
ALTER TABLE public.avatar_items ADD CONSTRAINT avatar_items_category_check
  CHECK (category = ANY (ARRAY['background','hair','clothing','accessory','hairstyle','avatar','emote','effect']));

GRANT INSERT, UPDATE, DELETE ON public.avatar_items TO authenticated;

DROP POLICY IF EXISTS "Admins manage avatar items" ON public.avatar_items;
CREATE POLICY "Admins manage avatar items" ON public.avatar_items
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS update_avatar_items_updated_at ON public.avatar_items;
CREATE TRIGGER update_avatar_items_updated_at
  BEFORE UPDATE ON public.avatar_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_key text NOT NULL UNIQUE,
  name_fr text NOT NULL,
  name_nl text NOT NULL,
  description_fr text,
  description_nl text,
  required_items text[] NOT NULL,
  reward_xp integer NOT NULL DEFAULT 0,
  reward_coins integer NOT NULL DEFAULT 0,
  reward_badge text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.collections TO authenticated;
GRANT SELECT ON public.collections TO anon;
GRANT ALL ON public.collections TO service_role;

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view collections" ON public.collections
  FOR SELECT USING (true);
CREATE POLICY "Admins manage collections" ON public.collections
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.collection_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  collection_key text NOT NULL,
  reward_xp integer NOT NULL DEFAULT 0,
  reward_coins integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (child_id, collection_key)
);

GRANT SELECT ON public.collection_claims TO authenticated;
GRANT ALL ON public.collection_claims TO service_role;

ALTER TABLE public.collection_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own children claims" ON public.collection_claims
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.children c WHERE c.id = collection_claims.child_id AND c.user_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.claim_collection_reward(p_child_id uuid, p_collection_key text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_col public.collections%ROWTYPE;
  v_owned integer;
  v_required integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.children c WHERE c.id = p_child_id AND c.user_id = auth.uid()) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'not_allowed');
  END IF;

  SELECT * INTO v_col FROM public.collections WHERE collection_key = p_collection_key;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'unknown_collection');
  END IF;

  IF EXISTS (SELECT 1 FROM public.collection_claims WHERE child_id = p_child_id AND collection_key = p_collection_key) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'already_claimed');
  END IF;

  v_required := array_length(v_col.required_items, 1);
  SELECT count(*) INTO v_owned
  FROM public.avatar_owned_items o
  JOIN public.avatar_items i ON i.id = o.item_id
  WHERE o.child_id = p_child_id AND i.item_key = ANY (v_col.required_items);

  IF v_owned < v_required THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'incomplete', 'owned', v_owned, 'required', v_required);
  END IF;

  INSERT INTO public.collection_claims (child_id, collection_key, reward_xp, reward_coins)
  VALUES (p_child_id, p_collection_key, v_col.reward_xp, v_col.reward_coins);

  UPDATE public.child_coins
     SET coins = coins + v_col.reward_coins,
         total_earned = total_earned + v_col.reward_coins,
         updated_at = now()
   WHERE child_id = p_child_id;

  UPDATE public.child_levels
     SET xp = xp + v_col.reward_xp,
         level = GREATEST(1, ((xp + v_col.reward_xp) / 100) + 1),
         updated_at = now()
   WHERE child_id = p_child_id;

  RETURN jsonb_build_object('ok', true, 'xp', v_col.reward_xp, 'coins', v_col.reward_coins, 'badge', v_col.reward_badge);
END;
$$;
