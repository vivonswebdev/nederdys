import { useRef, useCallback, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChildren,
  saveGameSession,
  calculateXpGain,
  upsertChildLevel,
  getGameDifficulty,
  updateGameDifficulty,
  Difficulty,
} from "@/lib/database";

export const useGameSession = (gameType: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const startTime = useRef(Date.now());
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [xpGained, setXpGained] = useState<number | null>(null);
  const [leveledUp, setLeveledUp] = useState(false);

  const { data: children = [] } = useQuery({
    queryKey: ["children", user?.id],
    queryFn: () => getChildren(user!.id),
    enabled: !!user,
  });

  const activeChild = children[0];

  // Load difficulty on mount
  useEffect(() => {
    if (!activeChild) return;
    getGameDifficulty(activeChild.id, gameType).then(setDifficulty);
  }, [activeChild, gameType]);

  const resetTimer = useCallback(() => {
    startTime.current = Date.now();
    setXpGained(null);
    setLeveledUp(false);
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

      // Adapt difficulty
      const errorRate = maxScore > 0 ? errorsCount / maxScore : 0;
      const newDiff = await updateGameDifficulty(user.id, activeChild.id, gameType, errorRate);
      setDifficulty(newDiff);

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["childLevel"] });
    },
    [user, activeChild, gameType, queryClient]
  );

  return { saveSession, resetTimer, hasChild: !!activeChild, difficulty, xpGained, leveledUp };
};
