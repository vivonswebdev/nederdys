-- Security hardening: reward balances must only be changed by trusted database functions.
-- This migration removes direct client INSERT/UPDATE RLS policies for coin and level balances.
-- It is committed for review only and has NOT been applied to any database.

BEGIN;

DROP POLICY IF EXISTS "Users can insert own child coins" ON public.child_coins;
DROP POLICY IF EXISTS "Users can update own child coins" ON public.child_coins;
DROP POLICY IF EXISTS "Users can insert own child levels" ON public.child_levels;
DROP POLICY IF EXISTS "Users can update own child levels" ON public.child_levels;

-- Existing owner-scoped SELECT policies are intentionally preserved.
-- SECURITY DEFINER RPCs should perform validated writes after checking auth.uid()
-- and ownership. Verify all application flows before applying this migration.

COMMIT;

-- Remaining security work (not changed by this migration):
-- * Derive seasonal reward item/bonus amounts from trusted server-side definitions.
-- * Validate correct answers do not exceed total questions in record_exercise_session.
-- * Prevent repeated forged XP in record_game_completion.
-- * Restrict leaderboard fields and visibility to an explicit, privacy-preserving design.
-- * Replace direct client mutation policies for achievements, streaks, and challenges
--   with validated server-side transitions.
