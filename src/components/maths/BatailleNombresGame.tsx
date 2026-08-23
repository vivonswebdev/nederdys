import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { MathLevel } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { batailleNombresChallenges } from "@/data/math/batailleNombresChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

const CHOICES = [">", "=", "<"];

export const BatailleNombresGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: batailleNombresChallenges,
    level,
    gameId: "bataille_nombres",
    childId,
    backTo,
  });
  const c = run.challenge;
  const [answered, setAnswered] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!c) return;
    setAnswered(null);
    setTimeLeft(c.timeLimit);
  }, [c]);

  useEffect(() => {
    if (!c || answered) return;
    if (timeLeft <= 0) {
      setAnswered("timeout");
      sounds.wrong();
      run.submit(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, answered, c, run]);

  if (!c) {
    return (
      <MathGameLayout
        title="Bataille des Nombres"
        emoji="⚔️"
        level={level}
        index={run.index}
        total={run.total}
        score={run.score}
        xpPerCorrect={run.xpPerCorrect}
        finished={run.finished}
        backTo={backTo}
      >
        <p className="text-center font-dyslexic">Chargement...</p>
      </MathGameLayout>
    );
  }

  const correct = c.leftValue > c.rightValue ? ">" : c.leftValue < c.rightValue ? "<" : "=";

  function answer(choice: string) {
    if (answered) return;
    setAnswered(choice);
    run.submit(choice === correct);
  }

  return (
    <MathGameLayout
      title="Bataille des Nombres"
      emoji="⚔️"
      level={level}
      index={run.index}
      total={run.total}
      score={run.score}
      xpPerCorrect={run.xpPerCorrect}
      finished={run.finished}
      backTo={backTo}
    >
      <div className="flex justify-center mb-6">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-bold tabular-nums ${
            timeLeft <= 3 ? "bg-destructive/15 text-destructive" : "bg-muted text-foreground"
          }`}
        >
          <Timer className="w-4 h-4" /> {timeLeft}s
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="bg-kids-blue rounded-3xl p-6 text-center shadow">
          <p className="text-3xl font-bold text-foreground">{c.left}</p>
          {answered && <p className="text-xl font-bold mt-2 tabular-nums">= {c.leftValue}</p>}
        </div>
        <span className="text-3xl font-bold text-muted-foreground">?</span>
        <div className="bg-kids-orange rounded-3xl p-6 text-center shadow">
          <p className="text-3xl font-bold text-foreground">{c.right}</p>
          {answered && <p className="text-xl font-bold mt-2 tabular-nums">= {c.rightValue}</p>}
        </div>
      </div>

      <p className="text-center font-dyslexic text-muted-foreground mt-6">
        Quel signe va au milieu ?
      </p>

      <div className="flex justify-center gap-4 mt-4">
        {CHOICES.map((s) => (
          <motion.button
            key={s}
            whileTap={{ scale: 0.94 }}
            onClick={() => answer(s)}
            disabled={!!answered}
            className={`w-20 h-20 rounded-2xl text-3xl font-bold shadow transition-colors ${
              answered && s === correct
                ? "bg-kids-green-dark text-primary-foreground"
                : answered === s
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-card border-2 border-border text-foreground"
            }`}
          >
            {s}
          </motion.button>
        ))}
      </div>
    </MathGameLayout>
  );
};

export default BatailleNombresGame;
