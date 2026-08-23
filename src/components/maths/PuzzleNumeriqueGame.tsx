import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MathLevel, pickSession } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { puzzleNumeriqueChallenges } from "@/data/math/puzzleNumeriqueChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const PuzzleNumeriqueGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: puzzleNumeriqueChallenges,
    level,
    gameId: "puzzle-numerique",
    childId,
    backTo,
  });
  const c = run.challenge;

  const [remaining, setRemaining] = useState<number[]>([]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [mistake, setMistake] = useState(false);
  const [shake, setShake] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!c) return;
    setRemaining(pickSession(c.tiles, c.tiles.length));
    setPlaced([]);
    setMistake(false);
    setLocked(false);
  }, [c]);

  function place(value: number) {
    if (!c || locked) return;
    const expected = c.tiles[placed.length];
    if (value === expected) {
      sounds.correct();
      const nextPlaced = [...placed, value];
      setPlaced(nextPlaced);
      setRemaining((r) => r.filter((v) => v !== value));
      if (nextPlaced.length === c.tiles.length) {
        setLocked(true);
        run.submit(!mistake);
      }
    } else {
      sounds.wrong();
      setMistake(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  const cols = c && c.tiles.length > 4 ? "grid-cols-3" : "grid-cols-2";

  return (
    <MathGameLayout
      title="Puzzle Numérique"
      emoji="🧮"
      level={level}
      index={run.index}
      total={run.total}
      score={run.score}
      xpPerCorrect={run.xpPerCorrect}
      finished={run.finished}
      backTo={backTo}
    >
      {!c ? (
        <p className="text-center font-dyslexic">Chargement...</p>
      ) : (
        <>
          <div className="text-center mb-5">
            <span className="text-5xl block">{c.emoji}</span>
            <p className="font-dyslexic text-muted-foreground mt-1">
              {c.label} — place les pièces de la plus petite à la plus grande.
            </p>
          </div>

          <motion.div
            animate={shake ? { x: [0, -8, 8, -6, 0] } : { x: 0 }}
            className={`grid ${cols} gap-3 max-w-sm mx-auto mb-8`}
          >
            {c.tiles.map((_, i) => (
              <div
                key={i}
                className={`h-20 rounded-2xl border-4 flex items-center justify-center text-2xl font-bold ${
                  placed[i] !== undefined
                    ? "bg-kids-green-light border-kids-green-dark"
                    : "bg-muted border-dashed border-border text-muted-foreground"
                }`}
              >
                {placed[i] !== undefined ? placed[i] : c.emoji}
              </div>
            ))}
          </motion.div>

          <h3 className="text-sm font-bold text-muted-foreground text-center mb-3">
            Pièces restantes
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {remaining.map((v) => (
              <motion.button
                key={v}
                whileTap={{ scale: 0.94 }}
                onClick={() => place(v)}
                className="w-16 h-16 rounded-2xl bg-card border-4 border-primary text-xl font-bold kids-shadow-card"
              >
                {v}
              </motion.button>
            ))}
            {remaining.length === 0 && (
              <p className="font-dyslexic text-muted-foreground">Puzzle terminé ! 🎉</p>
            )}
          </div>
        </>
      )}
    </MathGameLayout>
  );
};

export default PuzzleNumeriqueGame;
