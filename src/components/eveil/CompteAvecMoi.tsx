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

const OBJECTS = ["🍎", "🐤", "⚽", "🌸", "🐟", "🚗"];
const WORDS_FR = ["", "un", "deux", "trois", "quatre", "cinq", "six"];
const WORDS_NL = ["", "een", "twee", "drie", "vier", "vijf", "zes"];
const ROUNDS = 4;

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

function buildRound() {
  const count = 2 + Math.floor(Math.random() * 4); // 2..5
  const visual = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  const wrongs = shuffle([1, 2, 3, 4, 5, 6].filter((n) => n !== count)).slice(0, 2);
  return { count, visual, options: shuffle([count, ...wrongs]) };
}

export const CompteAvecMoi = ({ childId }: Props) => {
  const [round, setRound] = useState(0);
  const [{ count, visual, options }, setData] = useState(buildRound);
  const [lit, setLit] = useState(0);
  const [phase, setPhase] = useState<"counting" | "question">("counting");
  const [shake, setShake] = useState<number | null>(null);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  const runCount = () => {
    setPhase("counting");
    setLit(0);
    let i = 0;
    const step = () => {
      i += 1;
      setLit(i);
      speakBilingual({ nl: WORDS_NL[i], fr: WORDS_FR[i] });
      sounds.click();
      if (i < count) {
        window.setTimeout(step, 1500);
      } else {
        window.setTimeout(() => {
          setPhase("question");
          speakBilingual({ nl: "Hoeveel zijn er?", fr: "Combien y en a-t-il ?" });
        }, 1000);
      }
    };
    window.setTimeout(step, 600);
  };

  useEffect(() => {
    if (done) return;
    runCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done]);

  const handleAnswer = (n: number) => {
    if (done || phase !== "question") return;
    if (n === count) {
      sounds.correct();
      const nextStars = stars + 1;
      setStars(nextStars);
      speakBilingual(PRAISE);
      window.setTimeout(() => {
        if (round + 1 >= ROUNDS) {
          setDone(true);
          sounds.victory();
          speakBilingual({ nl: "Super, je kan tellen!", fr: "Super, tu sais compter !" });
          void recordEveilCompletion({
            childId,
            activityId: "compte-avec-moi",
            stars: nextStars,
            maxStars: ROUNDS,
            durationSeconds: (Date.now() - startedAt.current) / 1000,
          });
        } else {
          setData(buildRound());
          setRound((r) => r + 1);
        }
      }, 1100);
    } else {
      sounds.wrong();
      setShake(n);
      window.setTimeout(() => setShake(null), 600);
      window.setTimeout(runCount, 600);
    }
  };

  const restart = () => {
    setStars(0);
    setDone(false);
    setData(buildRound());
    setRound(0);
    startedAt.current = Date.now();
  };

  return (
    <EveilLayout childId={childId} title="Compte avec Moi" titleNl="Tel met Mij" emoji="🔢" stars={stars} maxStars={ROUNDS}>
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
            onClick={runCount}
            aria-label="Recompter"
            className="mx-auto flex min-h-[80px] items-center justify-center gap-3 rounded-3xl bg-primary/15 px-8 text-primary"
          >
            <Volume2 className="w-10 h-10" />
            <span className="text-4xl" aria-hidden>{visual}</span>
          </button>

          <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: count }).map((_, i) => (
              <motion.span
                key={i}
                animate={{ scale: i < lit ? 1.15 : 0.9, opacity: i < lit ? 1 : 0.25 }}
                className="text-6xl sm:text-7xl"
                aria-hidden
              >
                {visual}
              </motion.span>
            ))}
          </div>

          {phase === "question" && (
            <div className="grid grid-cols-3 gap-4">
              {options.map((n) => (
                <motion.button
                  key={n}
                  onClick={() => handleAnswer(n)}
                  aria-label={String(n)}
                  animate={shake === n ? { x: [0, -12, 12, -8, 8, 0] } : { x: 0 }}
                  whileTap={{ scale: 0.94 }}
                  className="min-h-[110px] rounded-full bg-primary/90 text-primary-foreground text-6xl font-black shadow-lg"
                >
                  {n}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}
    </EveilLayout>
  );
};

export default CompteAvecMoi;
