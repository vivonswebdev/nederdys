-- P0: no direct client writes on coins/levels
DROP POLICY IF EXISTS "Users can insert own child coins" ON public.child_coins;
DROP POLICY IF EXISTS "Users can update own child coins" ON public.child_coins;
DROP POLICY IF EXISTS "Users can insert own child levels" ON public.child_levels;
DROP POLICY IF EXISTS "Users can update own child levels" ON public.child_levels;
REVOKE INSERT, UPDATE, DELETE ON public.child_coins, public.child_levels FROM anon, authenticated;

-- Sibling challenges: read/create/delete only; results via RPC
DROP POLICY IF EXISTS "Parents manage challenges between their own children" ON public.sibling_challenges;
CREATE POLICY "Parents read own children challenges" ON public.sibling_challenges FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM children c WHERE c.id = challenger_id AND c.user_id = auth.uid())
   AND EXISTS (SELECT 1 FROM children c WHERE c.id = challenged_id AND c.user_id = auth.uid()));
CREATE POLICY "Parents create pending challenges" ON public.sibling_challenges FOR INSERT TO authenticated
WITH CHECK (status = 'pending' AND winner_id IS NULL AND challenger_session_id IS NULL AND challenged_session_id IS NULL
   AND challenger_id <> challenged_id
   AND EXISTS (SELECT 1 FROM children c WHERE c.id = challenger_id AND c.user_id = auth.uid())
   AND EXISTS (SELECT 1 FROM children c WHERE c.id = challenged_id AND c.user_id = auth.uid()));
CREATE POLICY "Parents delete own challenges" ON public.sibling_challenges FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM children c WHERE c.id = challenger_id AND c.user_id = auth.uid()));
REVOKE UPDATE ON public.sibling_challenges FROM anon, authenticated;

-- Server-side game rewards (XP + coins computed from score)
CREATE OR REPLACE FUNCTION public.award_game_rewards(p_child_id uuid, p_score integer, p_max_score integer, p_streak integer DEFAULT 0)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_ratio numeric;
  v_xp integer; v_coins integer; v_stars integer;
  v_old integer; v_new integer; v_xp_total integer; v_coins_total integer;
BEGIN
  IF v_uid IS NULL OR NOT EXISTS (SELECT 1 FROM children WHERE id = p_child_id AND user_id = v_uid) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF COALESCE(p_max_score,0) <= 0 THEN v_ratio := 0;
  ELSE v_ratio := LEAST(GREATEST(COALESCE(p_score,0),0)::numeric / p_max_score, 1); END IF;
  v_xp := CASE WHEN p_max_score IS NULL OR p_max_score <= 0 THEN 5 WHEN v_ratio >= 0.9 THEN 30 WHEN v_ratio >= 0.7 THEN 20 WHEN v_ratio >= 0.5 THEN 10 ELSE 5 END;
  v_stars := CASE WHEN v_ratio >= 0.9 THEN 3 WHEN v_ratio >= 0.7 THEN 2 WHEN v_ratio >= 0.4 THEN 1 ELSE 0 END;
  v_coins := 10 + v_stars * 5 + CASE WHEN COALESCE(p_streak,0) >= 3 THEN 6 WHEN COALESCE(p_streak,0) >= 2 THEN 3 ELSE 0 END;

  SELECT level INTO v_old FROM child_levels WHERE child_id = p_child_id;
  INSERT INTO child_levels (child_id, user_id, xp, level, games_played)
  VALUES (p_child_id, v_uid, v_xp, GREATEST(1, v_xp/100 + 1), 1)
  ON CONFLICT (child_id) DO UPDATE SET xp = child_levels.xp + v_xp,
    level = GREATEST(1, (child_levels.xp + v_xp)/100 + 1), games_played = child_levels.games_played + 1
  RETURNING xp, level INTO v_xp_total, v_new;

  INSERT INTO child_coins (user_id, child_id, coins, total_earned) VALUES (v_uid, p_child_id, v_coins, v_coins)
  ON CONFLICT (child_id) DO UPDATE SET coins = child_coins.coins + v_coins, total_earned = child_coins.total_earned + v_coins
  RETURNING coins INTO v_coins_total;

  RETURN jsonb_build_object('ok', true, 'xp', v_xp, 'coins', v_coins, 'total_xp', v_xp_total, 'level', v_new,
    'games_played', 0, 'leveled_up', v_new > COALESCE(v_old, v_new), 'balance', v_coins_total);
END $$;

CREATE OR REPLACE FUNCTION public.spend_child_coins(p_child_id uuid, p_amount integer)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE v_bal integer;
BEGIN
  IF p_amount IS NULL OR p_amount <= 0 THEN RETURN false; END IF;
  IF NOT EXISTS (SELECT 1 FROM children WHERE id = p_child_id AND user_id = auth.uid()) THEN RETURN false; END IF;
  SELECT coins INTO v_bal FROM child_coins WHERE child_id = p_child_id FOR UPDATE;
  IF v_bal IS NULL OR v_bal < p_amount THEN RETURN false; END IF;
  UPDATE child_coins SET coins = coins - p_amount WHERE child_id = p_child_id;
  RETURN true;
END $$;

CREATE OR REPLACE FUNCTION public.reset_child_level(p_child_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM children WHERE id = p_child_id AND user_id = auth.uid()) THEN RETURN false; END IF;
  UPDATE child_levels SET xp = 0, level = 1, games_played = 0 WHERE child_id = p_child_id;
  RETURN true;
END $$;

-- Season rewards defined server-side; client-supplied item/coins ignored
CREATE OR REPLACE FUNCTION public.claim_season_reward(p_child_id uuid, p_threshold integer, p_item_id uuid DEFAULT NULL, p_bonus_coins integer DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE
  v_season_id text := to_char(now(), 'YYYY-MM');
  v_coins integer; v_inserted integer;
  v_bonus integer := CASE p_threshold WHEN 50 THEN 20 WHEN 300 THEN 50 ELSE 0 END;
  v_item uuid := CASE p_threshold
    WHEN 150 THEN '0a1b2c3d-0001-4000-8000-000000000001'::uuid
    WHEN 500 THEN '0a1b2c3d-0001-4000-8000-000000000002'::uuid
    WHEN 800 THEN '0a1b2c3d-0001-4000-8000-000000000003'::uuid
    ELSE NULL END;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM children c WHERE c.id = p_child_id AND c.user_id = auth.uid()) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'forbidden');
  END IF;
  IF p_threshold NOT IN (50,150,300,500,800) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'unknown_tier');
  END IF;
  SELECT g.coins_this_season INTO v_coins FROM get_season_progress(p_child_id) g;
  IF COALESCE(v_coins,0) < p_threshold THEN RETURN jsonb_build_object('ok', false, 'reason', 'locked'); END IF;
  INSERT INTO season_claims (child_id, season_id, threshold) VALUES (p_child_id, v_season_id, p_threshold)
  ON CONFLICT (child_id, season_id, threshold) DO NOTHING;
  GET DIAGNOSTICS v_inserted = ROW_COUNT;
  IF v_inserted = 0 THEN RETURN jsonb_build_object('ok', false, 'reason', 'already_claimed'); END IF;
  IF v_item IS NOT NULL AND EXISTS (SELECT 1 FROM avatar_items WHERE id = v_item) THEN
    INSERT INTO avatar_owned_items (child_id, item_id) VALUES (p_child_id, v_item) ON CONFLICT (child_id, item_id) DO NOTHING;
  END IF;
  IF v_bonus > 0 THEN
    UPDATE child_coins SET coins = coins + v_bonus, total_earned = total_earned + v_bonus WHERE child_id = p_child_id;
  END IF;
  RETURN jsonb_build_object('ok', true, 'season_id', v_season_id, 'threshold', p_threshold);
END $$;

-- Bound exercise session inputs
CREATE OR REPLACE FUNCTION public.record_exercise_session(p_child_id uuid, p_chapter_id text, p_difficulty integer, p_correct integer, p_total integer, p_duration_seconds integer DEFAULT 0)
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $function$
DECLARE
  v_user uuid := auth.uid();
  v_total integer := LEAST(GREATEST(COALESCE(p_total,1), 1), 50);
  v_correct integer := LEAST(GREATEST(COALESCE(p_correct,0), 0), LEAST(GREATEST(COALESCE(p_total,1), 1), 50));
  v_pct numeric; v_xp integer; v_old_level integer; v_new_level integer; v_unlocked integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.children WHERE id = p_child_id AND user_id = v_user) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  v_pct := (v_correct::numeric / v_total) * 100;
  v_xp := v_correct * 2 + (CASE WHEN v_pct >= 80 THEN 10 ELSE 0 END);

  INSERT INTO public.chapter_sessions (user_id, child_id, chapter_id, difficulty_level, correct_count, total_count, best_score_pct, xp_earned, duration_seconds)
  VALUES (v_user, p_child_id, p_chapter_id, GREATEST(LEAST(p_difficulty, 3), 1), v_correct, v_total, v_pct, v_xp, GREATEST(COALESCE(p_duration_seconds, 0), 0));

  INSERT INTO public.child_levels (child_id, user_id, xp, level, games_played)
  VALUES (p_child_id, v_user, 0, 1, 0) ON CONFLICT (child_id) DO NOTHING;
  SELECT level INTO v_old_level FROM public.child_levels WHERE child_id = p_child_id;
  UPDATE public.child_levels SET xp = xp + v_xp, level = GREATEST(1, ((xp + v_xp) / 100) + 1),
      games_played = games_played + 1, updated_at = now()
  WHERE child_id = p_child_id RETURNING level INTO v_new_level;

  INSERT INTO public.child_coins (child_id, user_id, coins, total_earned) VALUES (p_child_id, v_user, v_xp, v_xp)
  ON CONFLICT (child_id) DO UPDATE SET coins = public.child_coins.coins + v_xp,
        total_earned = public.child_coins.total_earned + v_xp, updated_at = now();

  INSERT INTO public.daily_streaks (user_id, child_id, date, xp_earned) VALUES (v_user, p_child_id, CURRENT_DATE, v_xp)
  ON CONFLICT DO NOTHING;

  v_unlocked := public.get_unlocked_level(p_child_id, p_chapter_id);
  RETURN jsonb_build_object('ok', true, 'xp_awarded', v_xp, 'score_pct', round(v_pct),
    'level', COALESCE(v_new_level, 1), 'leveled_up', COALESCE(v_new_level, 1) > COALESCE(v_old_level, 1), 'unlocked_level', v_unlocked);
END; $function$;

-- No anonymous execution of app functions
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM anon, public;
GRANT EXECUTE ON FUNCTION public.award_game_rewards(uuid,integer,integer,integer), public.spend_child_coins(uuid,integer), public.reset_child_level(uuid) TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated, service_role;