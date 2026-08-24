import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { EveilLayout } from "./EveilLayout";
import { Confetti } from "@/components/Confetti";
import { sounds } from "@/lib/sounds";
import { PRAISE, recordEveilCompletion, speakBilingual } from "@/lib/eveil";

interface Props {
  childId: string;
}

const SHAPES = [
  { id: "cercle", label: "rond", labelNl: "rondje", className: "rounded-full bg-red-500" },
  { id: "carre", label: "carré", labelNl: "vierkant", className: "rounded-lg bg-blue-500" },
  { id: "triangle", label: "triangle", labelNl: "driehoek", className: "bg-green-500 [clip-path:polygon(50%_0,100%_100%,0_100%)]" },
  { id: "etoile", label: "étoile", labelNl: "ster", className: "bg-yellow-400 [clip-path:polygon(50%_0,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]" },
];

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export const PuzzleFormes = ({ childId }: Props) => {
  const [slots] = useState(() => shuffle(SHAPES));
  const [pieces, setPieces] = useState(() => shuffle(SHAPES));
  const [selected, setSelected] = useState<string | null>(null);
  const [placed, setPlaced] = useState<string[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const t = window.setTimeout(() => speakBilingual({ nl: "Sleep elke vorm in het juiste vak!", fr: "Glisse chaque forme dans le bon trou !" }), 500);
    return () => window.clearTimeout(t);
  }, []);

  const handleSlot = (slotId: string) => {
    if (done || !selected || placed.includes(slotId)) return;
    if (selected === slotId) {
      sounds.correct();
      const next = [...placed, slotId];
      setPlaced(next);
      setPieces((p) => p.filter((piece) => piece.id !== slotId));
      setSelected(null);
      speakBilingual(PRAISE);
      if (next.length === SHAPES.length) {
        setDone(true);
        sounds.victory();
        window.setTimeout(() => speakBilingual({ nl: "Super, de puzzel is klaar!", fr: "Super, le puzzle est fini !" }), 700);
        void recordEveilCompletion({
          childId,
          activityId: "puzzle-formes",
          stars: SHAPES.length,
          maxStars: SHAPES.length,
          durationSeconds: (Date.now() - startedAt.current) / 1000,
        });
      }
    } else {
      sounds.wrong();
      setShake(slotId);
      window.setTimeout(() => setShake(null), 600);
    }
  };

  const restart = () => {
    setPieces(shuffle(SHAPES));
    setPlaced([]);
    setSelected(null);
    setDone(false);
    startedAt.current = Date.now();
  };

  return (
    <EveilLayout
      childId={childId}
      title="Puzzle des Formes"
      titleNl="Vormenpuzzel"
      emoji="🧩"
      stars={placed.length}
      maxStars={SHAPES.length}
    >
      {done && <Confetti />}
      {done ? (
        <div className="text-center space-y-6 py-10">
          <p className="text-7xl">🎉</p>
          <p className="text-3xl">{"⭐".repeat(SHAPES.length)}</p>
          <button
            onClick={restart}
            className="min-h-[80px] w-full max-w-sm mx-auto rounded-3xl bg-primary text-primary-foreground text-3xl font-bold"
          >
            🔁
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          <button
            onClick={() => speakBilingual({ nl: "Sleep elke vorm in het juiste vak!", fr: "Glisse chaque forme dans le bon trou !" })}
            aria-label="Réécouter la consigne"
            className="mx-auto flex min-h-[72px] items-center justify-center gap-3 rounded-3xl bg-primary/15 px-8 text-primary"
          >
            <Volume2 className="w-9 h-9" />
            <span className="text-4xl" aria-hidden>🧩</span>
          </button>

          {/* Emplacements */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {slots.map((s) => (
              <motion.button
                key={s.id}
                onClick={() => handleSlot(s.id)}
                aria-label={`emplacement ${s.label}`}
                animate={shake === s.id ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
                className="min-h-[120px] rounded-3xl border-4 border-dashed border-border bg-muted/40 flex items-center justify-center"
              >
                <span
                  className={`w-16 h-16 ${s.className} ${placed.includes(s.id) ? "opacity-100" : "opacity-20"}`}
                  aria-hidden
                />
              </motion.button>
            ))}
          </div>

          {/* Pièces à placer */}
          <div className="flex flex-wrap justify-center gap-4">
            {pieces.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => {
                  setSelected(p.id);
                  sounds.click();
                  speakBilingual({ nl: p.labelNl, fr: p.label });
                }}
                aria-label={p.label}
                whileTap={{ scale: 0.92 }}
                animate={{ scale: selected === p.id ? 1.15 : 1 }}
                className={`min-h-[100px] min-w-[100px] rounded-3xl bg-card border-4 flex items-center justify-center shadow-md ${
                  selected === p.id ? "border-primary" : "border-border"
                }`}
              >
                <span className={`w-14 h-14 ${p.className}`} aria-hidden />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </EveilLayout>
  );
};

export default PuzzleFormes;
