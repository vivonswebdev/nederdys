-- Items exclusifs de saison (non achetables en boutique : is_premium = true)
INSERT INTO public.avatar_items (id, name, name_nl, category, dicebear_option, dicebear_value, price, rarity, is_premium, gender)
VALUES
  ('11111111-1111-4111-8111-000000000001', 'Lunettes étoilées dorées', 'Gouden sterrenbril', 'accessory', 'accessories', 'glasses03', 0, 'legendary', true, 'other'),
  ('11111111-1111-4111-8111-000000000002', 'Fond doré de saison', 'Gouden seizoensachtergrond', 'background', 'backgroundColor', 'ffbf00', 0, 'epic', true, 'other'),
  ('11111111-1111-4111-8111-000000000003', 'Cheveux dorés de saison', 'Gouden seizoenshaar', 'hair', 'hairColor', 'e5b95c', 0, 'legendary', true, 'other')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE public.season_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  season_id text NOT NULL,
  coins_at_start integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (child_id, season_id)
);
GRANT SELECT ON public.season_snapshots TO authenticated;
GRANT ALL ON public.season_snapshots TO service_role;
ALTER TABLE public.season_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents view own children snapshots" ON public.season_snapshots
FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.children c WHERE c.id = season_snapshots.child_id AND c.user_id = auth.uid())
);

CREATE TABLE public.season_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  season_id text NOT NULL,
  threshold integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (child_id, season_id, threshold)
);
GRANT SELECT ON public.season_claims TO authenticated;
GRANT ALL ON public.season_claims TO service_role;
ALTER TABLE public.season_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents view own children claims" ON public.season_claims
FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.children c WHERE c.id = season_claims.child_id AND c.user_id = auth.uid())
);

CREATE OR REPLACE FUNCTION public.get_season_progress(p_child_id uuid)
RETURNS TABLE (season_id text, coins_this_season integer, season_ends_at date)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_season_id text := to_char(now(), 'YYYY-MM');
  v_current_total integer;
  v_start_total integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.children c WHERE c.id = p_child_id AND c.user_id = auth.uid()) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT COALESCE(cc.total_earned, 0) INTO v_current_total FROM public.child_coins cc WHERE cc.child_id = p_child_id;
  v_current_total := COALESCE(v_current_total, 0);

  INSERT INTO public.season_snapshots (child_id, season_id, coins_at_start)
  VALUES (p_child_id, v_season_id, v_current_total)
  ON CONFLICT (child_id, season_id) DO NOTHING;

  SELECT s.coins_at_start INTO v_start_total
  FROM public.season_snapshots s WHERE s.child_id = p_child_id AND s.season_id = v_season_id;

  RETURN QUERY SELECT
    v_season_id,
    GREATEST(v_current_total - COALESCE(v_start_total, v_current_total), 0),
    (date_trunc('month', now()) + interval '1 month - 1 day')::date;
END; $$;
REVOKE EXECUTE ON FUNCTION public.get_season_progress(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_season_progress(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.claim_season_reward(p_child_id uuid, p_threshold integer, p_item_id uuid DEFAULT NULL, p_bonus_coins integer DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_season_id text := to_char(now(), 'YYYY-MM');
  v_coins integer;
  v_inserted integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.children c WHERE c.id = p_child_id AND c.user_id = auth.uid()) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'forbidden');
  END IF;

  SELECT g.coins_this_season INTO v_coins FROM public.get_season_progress(p_child_id) g;

  IF COALESCE(v_coins, 0) < COALESCE(p_threshold, 0) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'locked');
  END IF;

  INSERT INTO public.season_claims (child_id, season_id, threshold)
  VALUES (p_child_id, v_season_id, p_threshold)
  ON CONFLICT (child_id, season_id, threshold) DO NOTHING;
  GET DIAGNOSTICS v_inserted = ROW_COUNT;

  IF v_inserted = 0 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'already_claimed');
  END IF;

  IF p_item_id IS NOT NULL THEN
    INSERT INTO public.avatar_owned_items (child_id, item_id)
    VALUES (p_child_id, p_item_id)
    ON CONFLICT (child_id, item_id) DO NOTHING;
  END IF;

  IF COALESCE(p_bonus_coins, 0) > 0 THEN
    UPDATE public.child_coins
    SET coins = coins + p_bonus_coins,
        total_earned = total_earned + p_bonus_coins
    WHERE child_id = p_child_id;
  END IF;

  RETURN jsonb_build_object('ok', true, 'season_id', v_season_id, 'threshold', p_threshold);
END; $$;
REVOKE EXECUTE ON FUNCTION public.claim_season_reward(uuid, integer, uuid, integer) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_season_reward(uuid, integer, uuid, integer) TO authenticated;