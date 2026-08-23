import { useMemo, useState } from "react";
import { MathLevel, pickSession } from "@/lib/mathSession";

export interface MathChallengeBase {
  id: number;
  difficulty: MathLevel;
}

/**
 * Hook commun à TOUS les jeux maths.
 * Une session = `size` défis tirés au hasard DANS le sous-ensemble filtré par
 * `difficulty` (jamais un index séquentiel sur le pool complet).
 */
export function useMathSession<T extends MathChallengeBase>(
  pool: T[],
  level: MathLevel,
  size = 5
) {
  const session = useMemo(
    () => pickSession(pool.filter((c) => c.difficulty === level), size),
    [pool, level, size]
  );

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);

  const challenge = session[index] as T | undefined;
  const isLast = index >= session.length - 1;

  const next = () => setIndex((i) => i + 1);
  const reset = () => {
    setIndex(0);
    setScore(0);
    setErrors(0);
  };

  return {
    session,
    challenge,
    index,
    total: session.length,
    score,
    setScore,
    errors,
    setErrors,
    isLast,
    next,
    reset,
  };
}
