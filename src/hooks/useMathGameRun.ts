import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sounds } from "@/lib/sounds";
import { MathLevel, XP_PER_LEVEL, pickSession, recordGameCompletion } from "@/lib/mathSession";

interface Base {
  id: number;
  difficulty: 1 | 2 | 3;
}

/**
 * Boucle commune aux jeux maths animés :
 * session = N défis tirés au hasard dans le pool du niveau choisi,
 * enregistrement via record_game_completion à la fin.
 */
export function useMathGameRun<T extends Base>(opts: {
  pool: T[];
  level: MathLevel;
  gameId: string;
  childId: string;
  backTo: string;
  size?: number;
}) {
  const { pool, level, gameId, childId, backTo, size = 5 } = opts;
  const navigate = useNavigate();
  const session = useMemo(
    () => pickSession(pool.filter((c) => c.difficulty === level), size),
    [pool, level, size]
  );

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());
  const saved = useRef(false);

  useEffect(() => {
    setIndex(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    saved.current = false;
    startTime.current = Date.now();
  }, [level]);

  const xpPerCorrect = XP_PER_LEVEL[level];
  const challenge = session[index] as T | undefined;
  const total = session.length;

  const finish = useCallback(
    async (finalScore: number, finalErrors: number) => {
      if (saved.current) return;
      saved.current = true;
      setFinished(true);
      sounds.victory();
      const xp = finalScore * xpPerCorrect;
      const result = await recordGameCompletion({
        childId,
        gameId,
        subject: "math",
        difficulty: level,
        xpEarned: xp,
        score: finalScore,
        maxScore: total,
        durationSeconds: Math.round((Date.now() - startTime.current) / 1000),
        errorsCount: finalErrors,
      });
      if (!result.ok) toast.error("Erreur lors de l'enregistrement");
      else toast.success(`+${result.xp_awarded ?? xp} XP & pièces ! 🎉`);
      setTimeout(() => navigate(backTo), 2500);
    },
    [childId, gameId, level, total, xpPerCorrect, navigate, backTo]
  );

  /** À appeler quand le défi courant est résolu (ou raté). */
  const submit = useCallback(
    (correct: boolean) => {
      const newScore = correct ? score + 1 : score;
      const newErrors = correct ? errors : errors + 1;
      if (correct) {
        sounds.correct();
        setScore(newScore);
      } else {
        sounds.wrong();
        setErrors(newErrors);
      }
      setTimeout(() => {
        if (index >= total - 1) finish(newScore, newErrors);
        else setIndex((i) => i + 1);
      }, 1400);
    },
    [score, errors, index, total, finish]
  );

  return { session, challenge, index, total, score, errors, finished, xpPerCorrect, submit };
}
