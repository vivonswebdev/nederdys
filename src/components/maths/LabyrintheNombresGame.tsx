import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MathLevel } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { labyrintheNombresChallenges } from "@/data/math/labyrintheNombresChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const LabyrintheNombresGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: labyrintheNombresChallenges,
    level,
    gameId: "labyrinthe-nombres",
    childId,
    backTo,
    size: 3,
  });
  const c = run.challenge;

  const [step, setStep] = useState(0);
  const [mistake, setMistake] = useState(false);
  const [wrongPick, setWrongPick] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setStep(0);
    setMistake(false);
    setWrongPick(null);
    setLocked(false);
  }, [c]);

  if (!c) {
    return (
      <MathGameLayout
        title="Labyrinthe des Nombres"
        emoji="🌀"
        level={level}
        index={run.index}
        total={run.total}
        score={run.score}
        xpPerCorrect={run.xpPerCorrect}
        finished={run.finished}
        backTo={backTo}
      >
        <p className="text-center font-dyslexic"><BilingualText {...biFromFr("Chargement...")} /></p>
      </MathGameLayout>
    );
  }

  const current = c.steps[step];
  const paths = [current.answer, current.wrong].sort(() => (c.id % 2 === 0 ? 1 : -1));

  function choose(value: number) {
    if (locked) return;
    if (value === current.answer) {
      sounds.correct();
      if (step + 1 === c!.steps.length) {
        setLocked(true);
        run.submit(!mistake);
      } else {
        setStep((s) => s + 1);
      }
    } else {
      sounds.wrong();
      setMistake(true);
      setWrongPick(value);
      setTimeout(() => setWrongPick(null), 700);
    }
  }

  return (
    <MathGameLayout
      title="Labyrinthe des Nombres"
      emoji="🌀"
      level={level}
      index={run.index}
      total={run.total}
      score={run.score}
      xpPerCorrect={run.xpPerCorrect}
      finished={run.finished}
      backTo={backTo}
    >
      <p className="text-center font-dyslexic text-muted-foreground mb-4">
        <BilingualText {...biFromFr("Choisis le bon chemin à chaque intersection pour sortir du labyrinthe.")} />
      </p>

      <div className="flex justify-center gap-2 mb-8">
        {c.steps.map((_, i) => (
          <span
            key={i}
            className={`w-10 h-3 rounded-full ${i < step ? "bg-kids-green-dark" : i === step ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      <div className="text-center mb-8">
        <span className="text-4xl block mb-2">🚶</span>
        <p className="text-3xl font-bold">{current.question} = ?</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {paths.map((v) => (
          <motion.button
            key={v}
            whileTap={{ scale: 0.95 }}
            onClick={() => choose(v)}
            className={`h-28 rounded-3xl border-4 text-3xl font-bold kids-shadow-card ${
              wrongPick === v
                ? "bg-destructive/20 border-destructive"
                : "bg-card border-primary hover:bg-muted"
            }`}
          >
            <span className="block text-base font-normal text-muted-foreground"><BilingualText {...biFromFr("Chemin")} /></span>
            {v}
          </motion.button>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Intersection {step + 1} / {c.steps.length}
      </p>
    </MathGameLayout>
  );
};

export default LabyrintheNombresGame;
