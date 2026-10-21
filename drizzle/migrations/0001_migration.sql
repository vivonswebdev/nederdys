DO $$
DECLARE d text;
BEGIN
  d := pg_get_functiondef('public.claim_season_reward(uuid,integer,uuid,integer)'::regprocedure);
  d := replace(d, '0a1b2c3d-0001-4000-8000-', '11111111-1111-4111-8111-');
  EXECUTE d;
END $$;