import { useEffect, useRef, useState } from "react";
import { Volume2, Mic } from "lucide-react";
import { EveilLayout } from "./EveilLayout";
import { Confetti } from "@/components/Confetti";
import { sounds } from "@/lib/sounds";
import { recordEveilCompletion, speakFr } from "@/lib/eveil";

interface Props {
  childId: string;
}

const WORDS = [
  { fr: "chat", emoji: "🐱" },
  { fr: "chien", emoji: "🐶" },
  { fr: "pomme", emoji: "🍎" },
  { fr: "maison", emoji: "🏠" },
  { fr: "soleil", emoji: "☀️" },
];

export const MonPremierMot = ({ childId }: Props) => {
  const [index, setIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());
  const word = WORDS[index];

  const say = () => speakFr(word.fr);

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(say, 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, done]);

  const handleAttempt = () => {
    sounds.xp();
    const nextStars = stars + 1;
    setStars(nextStars);
    speakFr("Bravo !");
    window.setTimeout(() => {
      if (index + 1 >= WORDS.length) {
        setDone(true);
        sounds.victory();
        void recordEveilCompletion({
          childId,
          activityId: "mon-premier-mot",
          stars: nextStars,
          maxStars: WORDS.length,
          durationSeconds: (Date.now() - startedAt.current) / 1000,
        });
      } else {
        setIndex((i) => i + 1);
      }
    }, 900);
  };

  return (
    <EveilLayout
      childId={childId}
      title="Mon Premier Mot"
      emoji="🗣️"
      stars={stars}
      maxStars={WORDS.length}
    >
      {done && <Confetti />}
      {done ? (
        <div className="text-center space-y-6 py-10">
          <p className="text-7xl">🎉</p>
          <p className="text-3xl">{"⭐".repeat(stars)}</p>
          <button
            onClick={() => {
              setIndex(0);
              setStars(0);
              setDone(false);
              startedAt.current = Date.now();
            }}
            className="min-h-[80px] w-full max-w-sm mx-auto rounded-3xl bg-primary text-primary-foreground text-3xl font-bold"
          >
            🔁
          </button>
        </div>
      ) : (
        <div className="space-y-8 text-center">
          <div className="mx-auto flex h-56 w-full max-w-sm items-center justify-center rounded-3xl bg-card border-4 border-primary/30 text-[7rem]">
            <span aria-label={word.fr}>{word.emoji}</span>
          </div>

          <button
            onClick={say}
            aria-label="Écouter le mot"
            className="min-h-[80px] w-full max-w-sm mx-auto flex items-center justify-center gap-3 rounded-3xl bg-primary/15 text-primary text-2xl font-bold"
          >
            <Volume2 className="w-9 h-9" /> Écouter
          </button>

          <button
            onClick={handleAttempt}
            aria-label="J'ai dit le mot"
            className="min-h-[80px] w-full max-w-sm mx-auto flex items-center justify-center gap-3 rounded-3xl bg-primary text-primary-foreground text-2xl font-bold"
          >
            <Mic className="w-9 h-9" /> J'ai dit le mot !
          </button>
        </div>
      )}
    </EveilLayout>
  );
};

export default MonPremierMot;
