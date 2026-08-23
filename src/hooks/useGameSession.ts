import { useRef, useCallback, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { useQueryClient } from "@tanstack/react-query";
import {
  saveGameSession,
  calculateXpGain,
  upsertChildLevel,
  getGameDifficulty,
  updateGameDifficulty,
  calculateCoinsGain,
  addCoins,
  Difficulty,
} from "@/lib/database";
import { recordDailyActivity, unlockBadge } from "@/lib/gamification";
import { progressDailyChallenge } from "@/lib/challenges";

export const useGameSession = (gameType: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const startTime = useRef(Date.now());
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [xpGained, setXpGained] = useState<number | null>(null);
  const [coinsGained, setCoinsGained] = useState<number | null>(null);
  const [leveledUp, setLeveledUp] = useState(false);
  const streakRef = useRef(0);

  const { activeChild } = useChild();


  // Load difficulty on mount
  useEffect(() => {
    if (!activeChild) return;
    getGameDifficulty(activeChild.id, gameType).then(setDifficulty);
  }, [activeChild, gameType]);

  const resetTimer = useCallback(() => {
    startTime.current = Date.now();
    setXpGained(null);
    setCoinsGained(null);
    setLeveledUp(false);
    streakRef.current = 0;
  }, []);

  const setStreak = useCallback((s: number) => {
    streakRef.current = s;
  }, []);

  const saveSession = useCallback(
    async ({
      score,
      maxScore,
      errorsCount,
      completed,
    }: {
      score: number;
      maxScore: number;
      errorsCount: number;
      completed: boolean;
    }) => {
      if (!user || !activeChild) return;
      const durationSeconds = Math.round((Date.now() - startTime.current) / 1000);

      // Save session
      await saveGameSession({
        userId: user.id,
        childId: activeChild.id,
        gameType,
        score,
        maxScore,
        durationSeconds,
        errorsCount,
        completed,
      });

      // Update XP & level
      const xp = calculateXpGain(score, maxScore);
      const result = await upsertChildLevel(user.id, activeChild.id, xp);
      setXpGained(xp);
      setLeveledUp(result.leveledUp);

      // Award Mouche-Coins
      const coins = calculateCoinsGain(score, maxScore, streakRef.current);
      await addCoins(user.id, activeChild.id, coins);
      setCoinsGained(coins);

      // Adapt difficulty
      const errorRate = maxScore > 0 ? errorsCount / maxScore : 0;
      const newDiff = await updateGameDifficulty(user.id, activeChild.id, gameType, errorRate);
      setDifficulty(newDiff);

      // Série quotidienne & badges
      await recordDailyActivity(user.id, activeChild.id, xp);
      await unlockBadge(user.id, activeChild.id, "first_steps");
      if (maxScore > 0 && errorsCount === 0 && newDiff === "hard") {
        await unlockBadge(user.id, activeChild.id, "perfectionist");
      }
      if (durationSeconds >= 1800) {
        await unlockBadge(user.id, activeChild.id, "marathon");
      }

      // Défi du jour
      const challenge = await progressDailyChallenge(user.id, activeChild.id, {
        xp,
        errors: errorsCount,
        maxScore,
        durationSeconds,
      });
      if (challenge.completed && challenge.xpReward > 0) {
        await upsertChildLevel(user.id, activeChild.id, challenge.xpReward);
        toast.success(`Défi du jour réussi ! +${challenge.xpReward} XP 🎉`);
      }
      queryClient.invalidateQueries({ queryKey: ["dailyChallenge"] });

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["childLevel"] });
      queryClient.invalidateQueries({ queryKey: ["childCoins"] });
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      queryClient.invalidateQueries({ queryKey: ["streaks"] });

    },
    [user, activeChild, gameType, queryClient]
  );

  return { saveSession, resetTimer, setStreak, hasChild: !!activeChild, difficulty, xpGained, coinsGained, leveledUp };
};
