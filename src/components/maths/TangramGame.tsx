import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MathLevel, pickSession } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { tangramChallenges, TangramSlot } from "@/data/math/tangramChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const TangramGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: tangramChallenges,
    level,
    gameId: "tangram",
    childId,
    backTo,
  });
  const c = run.challenge;

  const [pieces, setPieces] = useState<TangramSlot[]>([]);
  const [placed, setPlaced] = useState<Record<string, TangramSlot>>({});
  const [selected, setSelected] = useState<TangramSlot | null>(null);
  const [mistake, setMistake] = useState(false);
  const [wrongSlot, setWrongSlot] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!c) return;
    setPieces(pickSession(c.slots, c.slots.length));
    setPlaced({});
    setSelected(null);
    setMistake(false);
    setWrongSlot(null);
    setLocked(false);
  }, [c]);

  if (!c) {
    return (
      <MathGameLayout
        title="Tangram"
        emoji="🧩"
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

  function dropOn(slot: TangramSlot) {
    if (locked || !selected || placed[slot.id]) return;
    if (selected.id === slot.id) {
      sounds.correct();
      const next = { ...placed, [slot.id]: selected };
      setPlaced(next);
      setPieces((p) => p.filter((x) => x.id !== selected.id));
      setSelected(null);
      if (Object.keys(next).length === c!.slots.length) {
        setLocked(true);
        run.submit(!mistake);
      }
    } else {
      sounds.wrong();
      setMistake(true);
      setWrongSlot(slot.id);
      setTimeout(() => setWrongSlot(null), 700);
    }
  }

  return (
    <MathGameLayout
      title="Tangram"
      emoji="🧩"
      level={level}
      index={run.index}
      total={run.total}
      score={run.score}
      xpPerCorrect={run.xpPerCorrect}
      finished={run.finished}
      backTo={backTo}
    >
      <div className="text-center mb-6">
        <span className="text-5xl block">{c.emoji}</span>
        <h2 className="text-xl font-bold mt-1">Reconstitue : {c.name}</h2>
        <p className="font-dyslexic text-muted-foreground text-sm mt-1">
          Choisis une pièce, puis clique sur l'emplacement qui lui correspond.
        </p>
      </div>

      <section className="bg-card border-2 border-dashed border-border rounded-3xl p-5 mb-6">
        <div className="flex flex-wrap justify-center gap-3">
          {c.slots.map((s) => {
            const filled = placed[s.id];
            return (
              <button
                key={s.id}
                onClick={() => dropOn(s)}
                disabled={!!filled || locked}
                className={`w-28 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-colors ${
                  filled
                    ? "bg-kids-green-light border-kids-green-dark"
                    : wrongSlot === s.id
                      ? "border-destructive bg-destructive/10"
                      : "border-border bg-muted"
                }`}
              >
                <span className="text-3xl">{filled ? s.emoji : "❓"}</span>
                <span className="text-[11px] text-muted-foreground font-dyslexic text-center px-1">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-bold text-muted-foreground mb-3 text-center">
          Pièces disponibles
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {pieces.map((p) => (
            <motion.button
              key={p.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sounds.click();
                setSelected(p);
              }}
              className={`w-24 h-20 rounded-2xl text-3xl shadow transition-transform ${
                selected?.id === p.id ? "bg-primary/20 border-2 border-primary scale-105" : "bg-card border border-border"
              }`}
            >
              {p.emoji}
            </motion.button>
          ))}
          {pieces.length === 0 && (
            <p className="font-dyslexic text-muted-foreground">Bravo, la forme est complète ! 🎉</p>
          )}
        </div>
      </section>
    </MathGameLayout>
  );
};

export default TangramGame;
