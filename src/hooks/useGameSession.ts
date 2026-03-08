import { useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getChildren, saveGameSession } from "@/lib/database";

export const useGameSession = (gameType: string) => {
  const { user } = useAuth();
  const startTime = useRef(Date.now());

  const { data: children = [] } = useQuery({
    queryKey: ["children", user?.id],
    queryFn: () => getChildren(user!.id),
    enabled: !!user,
  });

  const activeChild = children[0]; // Use first child by default

  const resetTimer = useCallback(() => {
    startTime.current = Date.now();
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
    },
    [user, activeChild, gameType]
  );

  return { saveSession, resetTimer, hasChild: !!activeChild };
};
