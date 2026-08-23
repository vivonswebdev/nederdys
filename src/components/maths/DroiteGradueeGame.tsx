import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MathLevel } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { droiteGradueeChallenges } from "@/data/math/droiteGradueeChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const DroiteGradueeGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: droiteGradueeChallenges,
    level,
    gameId: "droite_graduee",
    childId,
    backTo,
  });
  const c = run.challenge;
  const trackRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    setPos(null);
    setFeedback(null);
  }, [c?.id]);

  if (!c) {
    return (
      <MathGameLayout
        title="Droite Graduée"
        emoji="📍"
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

  const ticks = Math.min(11, Math.round((c.max - c.min) / c.step) + 1);

  function valueFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el || !c) return null;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(c.min + ratio * (c.max - c.min));
  }

  function handlePointer(e: React.PointerEvent) {
    if (feedback) return;
    const v = valueFromClientX(e.clientX);
    if (v !== null) setPos(v);
  }

  function validate() {
    if (pos === null || feedback || !c) return;
    const ok = Math.abs(pos - c.target) <= c.tolerance;
    setFeedback(ok ? "correct" : "wrong");
    if (!ok) sounds.wrong();
    run.submit(ok);
  }

  const ratio = pos === null ? 0 : (pos - c.min) / (c.max - c.min);
  const targetRatio = (c.target - c.min) / (c.max - c.min);

  return (
    <MathGameLayout
      title="Droite Graduée"
      emoji="📍"
      level={level}
      index={run.index}
      total={run.total}
      score={run.score}
      xpPerCorrect={run.xpPerCorrect}
      finished={run.finished}
      backTo={backTo}
    >
      <p className="text-center font-dyslexic text-muted-foreground mb-2">
        Place le nombre sur la droite (glisse ou clique) :
      </p>
      <p className="text-center text-5xl font-bold text-primary mb-10 tabular-nums">{c.target}</p>

      <div
        ref={trackRef}
        onPointerDown={handlePointer}
        onPointerMove={(e) => e.buttons === 1 && handlePointer(e)}
        role="slider"
        aria-label="Droite graduée"
        aria-valuemin={c.min}
        aria-valuemax={c.max}
        aria-valuenow={pos ?? c.min}
        tabIndex={0}
        className="relative h-24 mx-2 cursor-pointer select-none touch-none"
      >
        <div className="absolute top-12 left-0 right-0 h-2 bg-muted rounded-full" />
        {Array.from({ length: ticks }).map((_, i) => {
          const r = i / (ticks - 1);
          const val = Math.round(c.min + r * (c.max - c.min));
          return (
            <div key={i} className="absolute top-9 -translate-x-1/2" style={{ left: `${r * 100}%` }}>
              <div className="w-0.5 h-8 bg-border mx-auto" />
              <span className="text-xs text-muted-foreground tabular-nums">{val}</span>
            </div>
          );
        })}
        {feedback && (
          <div
            className="absolute top-4 -translate-x-1/2 text-2xl"
            style={{ left: `${targetRatio * 100}%` }}
          >
            🎯
          </div>
        )}
        {pos !== null && (
          <motion.div
            className="absolute top-6 -translate-x-1/2 flex flex-col items-center"
            animate={{ left: `${ratio * 100}%` }}
            style={{ left: `${ratio * 100}%` }}
          >
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold tabular-nums ${
                feedback === "correct"
                  ? "bg-kids-green-dark text-primary-foreground"
                  : feedback === "wrong"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-kids-orange text-foreground"
              }`}
            >
              {pos}
            </span>
            <div className="w-1 h-10 bg-kids-orange rounded-full" />
          </motion.div>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={validate}
          disabled={pos === null || feedback !== null}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl kids-shadow-card disabled:opacity-60"
        >
          <Check className="w-5 h-5" /> Valider ma position
        </button>
      </div>
    </MathGameLayout>
  );
};

export default DroiteGradueeGame;
