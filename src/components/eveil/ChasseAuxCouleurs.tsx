import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { EveilLayout } from "./EveilLayout";
import { Confetti } from "@/components/Confetti";
import { sounds } from "@/lib/sounds";
import { recordEveilCompletion, speakFr } from "@/lib/eveil";

interface Props {
  childId: string;
}

type ColorName = "bleu" | "rouge" | "vert" | "jaune";

const OBJECTS: { visual: string; color: ColorName }[] = [
  { visual: "🐬", color: "bleu" },
  { visual: "🫐", color: "bleu" },
  { visual: "🧊", color: "bleu" },
  { visual: "🍎", color: "rouge" },
  { visual: "🍓", color: "rouge" },
  { visual: "🚗", color: "rouge" },
  { visual: "🐸", color: "vert" },
  { visual: "🥦", color: "vert" },
  { visual: "🌳", color: "vert" },
  { visual: "🍌", color: "jaune" },
  { visual: "🌻", color: "jaune" },
  { visual: "🧀", color: "jaune" },
];

const COLORS: ColorName[] = ["bleu", "rouge", "vert", "jaune"];
const ROUNDS = 3;

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

function buildRound() {
  const target = COLORS[Math.floor(Math.random() * COLORS.length)];
  const targets = shuffle(OBJECTS.filter((o) => o.color === target)).slice(0, 3);
  const others = shuffle(OBJECTS.filter((o) => o.color !== target)).slice(0, 5);
  return { target, items: shuffle([...targets, ...others]) };
}

export const ChasseAuxCouleurs = ({ childId }: Props) => {
  const [round, setRound] = useState(0);
  const [{ target, items }, setData] = useState(buildRound);
  const [found, setFound] = useState<string[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  const targetCount = useMemo(() => items.filter((i) => i.color === target).length, [items, target]);
  const say = () => speakFr(`Touche tout ce qui est ${target} !`);

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(say, 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, done]);

  const handleSelect = (visual: string, color: ColorName) => {
    if (done || found.includes(visual)) return;
    if (color === target) {
      sounds.correct();
      const next = [...found, visual];
      setFound(next);
      if (next.length >= targetCount) {
        const nextStars = stars + 1;
        setStars(nextStars);
        speakFr("Bravo !");
        window.setTimeout(() => {
          if (round + 1 >= ROUNDS) {
            setDone(true);
            sounds.victory();
            speakFr("Super, tu as tout trouvé !");
            void recordEveilCompletion({
              childId,
              activityId: "chasse-aux-couleurs",
              stars: nextStars,
              maxStars: ROUNDS,
              durationSeconds: (Date.now() - startedAt.current) / 1000,
            });
          } else {
            setRound((r) => r + 1);
            setFound([]);
            setData(buildRound());
          }
        }, 1100);
      }
    } else {
      sounds.wrong();
      setShake(visual);
      window.setTimeout(() => setShake(null), 600);
      window.setTimeout(say, 500);
    }
  };

  const restart = () => {
    setRound(0);
    setStars(0);
    setFound([]);
    setDone(false);
    setData(buildRound());
    startedAt.current = Date.now();
  };

  return (
    <EveilLayout childId={childId} title="Chasse aux Couleurs" emoji="🔍" stars={stars} maxStars={ROUNDS}>
      {done && <Confetti />}
      {done ? (
        <div className="text-center space-y-6 py-10">
          <p className="text-7xl">🎉</p>
          <p className="text-3xl">{"⭐".repeat(stars)}</p>
          <button
            onClick={restart}
            className="min-h-[80px] w-full max-w-sm mx-auto rounded-3xl bg-primary text-primary-foreground text-3xl font-bold"
          >
            🔁
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <button
            onClick={say}
            aria-label="Réécouter la consigne"
            className="mx-auto flex min-h-[80px] items-center justify-center gap-3 rounded-3xl bg-primary/15 px-8 text-primary"
          >
            <Volume2 className="w-10 h-10" />
            <span className={`w-12 h-12 rounded-full shadow-inner ${
              target === "bleu" ? "bg-blue-500" : target === "rouge" ? "bg-red-500" : target === "vert" ? "bg-green-500" : "bg-yellow-400"
            }`} aria-hidden />
          </button>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
            {items.map((item) => (
              <motion.button
                key={item.visual}
                onClick={() => handleSelect(item.visual, item.color)}
                aria-label={item.color}
                animate={shake === item.visual ? { x: [0, -12, 12, -8, 8, 0] } : { x: 0 }}
                whileTap={{ scale: 0.94 }}
                className="relative min-h-[100px] rounded-3xl bg-card border-4 border-border text-5xl shadow-md flex items-center justify-center"
              >
                <span aria-hidden>{item.visual}</span>
                {found.includes(item.visual) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 text-3xl"
                    aria-hidden
                  >
                    ⭐
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </EveilLayout>
  );
};

export default ChasseAuxCouleurs;
