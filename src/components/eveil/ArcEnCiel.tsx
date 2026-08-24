import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { EveilLayout } from "./EveilLayout";
import { Confetti } from "@/components/Confetti";
import { sounds } from "@/lib/sounds";
import { recordEveilCompletion, speakFr } from "@/lib/eveil";

interface Props {
  childId: string;
}

const COLORS = [
  { name: "rouge", object: "🍎", className: "bg-red-500" },
  { name: "bleu", object: "🐬", className: "bg-blue-500" },
  { name: "vert", object: "🐸", className: "bg-green-500" },
  { name: "jaune", object: "🍌", className: "bg-yellow-400" },
] as const;

const ROUNDS = 5;
const pickTarget = () => Math.floor(Math.random() * COLORS.length);

export const ArcEnCiel = ({ childId }: Props) => {
  const [round, setRound] = useState(0);
  const [target, setTarget] = useState(pickTarget);
  const [stars, setStars] = useState(0);
  const [shake, setShake] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  const say = () => speakFr(`Touche le ${COLORS[target].name} !`);

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(say, 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, done]);

  const handleSelect = (name: string) => {
    if (done) return;
    if (name === COLORS[target].name) {
      sounds.correct();
      const nextStars = stars + 1;
      setStars(nextStars);
      speakFr("Bravo !");
      window.setTimeout(() => {
        if (round + 1 >= ROUNDS) {
          setDone(true);
          sounds.victory();
          speakFr("Super, tu as réussi !");
          void recordEveilCompletion({
            childId,
            activityId: "arc-en-ciel",
            stars: nextStars,
            maxStars: ROUNDS,
            durationSeconds: (Date.now() - startedAt.current) / 1000,
          });
        } else {
          setRound((r) => r + 1);
          setTarget(pickTarget());
        }
      }, 1000);
    } else {
      sounds.wrong();
      setShake(name);
      window.setTimeout(() => setShake(null), 600);
      window.setTimeout(say, 500);
    }
  };

  return (
    <EveilLayout childId={childId} title="L'Arc-en-ciel" emoji="🌈" stars={stars} maxStars={ROUNDS}>
      {done && <Confetti />}
      {done ? (
        <div className="text-center space-y-6 py-10">
          <p className="text-7xl">🎉</p>
          <p className="text-3xl">{"⭐".repeat(stars)}</p>
          <button
            onClick={() => {
              setRound(0);
              setStars(0);
              setDone(false);
              setTarget(pickTarget());
              startedAt.current = Date.now();
            }}
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
            className="mx-auto flex min-h-[80px] min-w-[80px] items-center justify-center gap-3 rounded-3xl bg-primary/15 px-8 text-primary"
          >
            <Volume2 className="w-10 h-10" />
            <span className="text-5xl">{COLORS[target].object}</span>
          </button>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {COLORS.map((c) => (
              <motion.button
                key={c.name}
                onClick={() => handleSelect(c.name)}
                aria-label={c.name}
                animate={shake === c.name ? { x: [0, -12, 12, -8, 8, 0] } : { x: 0 }}
                whileTap={{ scale: 0.95 }}
                className={`min-h-[120px] rounded-3xl ${c.className} text-6xl shadow-lg`}
              >
                <span aria-hidden>{c.object}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </EveilLayout>
  );
};

export default ArcEnCiel;
