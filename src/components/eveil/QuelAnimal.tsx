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

const ANIMALS = [
  { id: "chat", visual: "🐱", cry: "Miaou, miaou !" },
  { id: "chien", visual: "🐶", cry: "Ouaf, ouaf !" },
  { id: "vache", visual: "🐮", cry: "Meuh !" },
  { id: "canard", visual: "🦆", cry: "Coin, coin !" },
  { id: "mouton", visual: "🐑", cry: "Bêêê !" },
  { id: "coq", visual: "🐔", cry: "Cocorico !" },
];

const ROUNDS = 5;
const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

function buildRound() {
  const picked = shuffle(ANIMALS).slice(0, 4);
  return { target: picked[Math.floor(Math.random() * picked.length)], options: picked };
}

export const QuelAnimal = ({ childId }: Props) => {
  const [round, setRound] = useState(0);
  const [{ target, options }, setData] = useState(buildRound);
  const [shake, setShake] = useState<string | null>(null);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  const say = () => speakFr(target.cry);

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(say, 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, done]);

  const handleSelect = (id: string) => {
    if (done) return;
    if (id === target.id) {
      sounds.correct();
      const nextStars = stars + 1;
      setStars(nextStars);
      speakFr("Bravo !");
      window.setTimeout(() => {
        if (round + 1 >= ROUNDS) {
          setDone(true);
          sounds.victory();
          speakFr("Super, tu connais les animaux !");
          void recordEveilCompletion({
            childId,
            activityId: "quel-animal",
            stars: nextStars,
            maxStars: ROUNDS,
            durationSeconds: (Date.now() - startedAt.current) / 1000,
          });
        } else {
          setRound((r) => r + 1);
          setData(buildRound());
        }
      }, 1000);
    } else {
      sounds.wrong();
      setShake(id);
      window.setTimeout(() => setShake(null), 600);
      window.setTimeout(say, 500);
    }
  };

  const restart = () => {
    setRound(0);
    setStars(0);
    setDone(false);
    setData(buildRound());
    startedAt.current = Date.now();
  };

  return (
    <EveilLayout childId={childId} title="Quel Animal ?" emoji="🐾" stars={stars} maxStars={ROUNDS}>
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
            aria-label="Réécouter le cri de l'animal"
            className="mx-auto flex min-h-[90px] items-center justify-center gap-3 rounded-3xl bg-primary/15 px-10 text-primary"
          >
            <Volume2 className="w-12 h-12" />
            <span className="text-5xl" aria-hidden>🔊</span>
          </button>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {options.map((a) => (
              <motion.button
                key={a.id}
                onClick={() => handleSelect(a.id)}
                aria-label={a.id}
                animate={shake === a.id ? { x: [0, -12, 12, -8, 8, 0] } : { x: 0 }}
                whileTap={{ scale: 0.94 }}
                className="min-h-[130px] rounded-3xl bg-card border-4 border-border text-7xl shadow-md"
              >
                <span aria-hidden>{a.visual}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </EveilLayout>
  );
};

export default QuelAnimal;
