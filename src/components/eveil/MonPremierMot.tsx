import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { useEffect, useRef, useState } from "react";
import { Volume2, Mic } from "lucide-react";
import { EveilLayout } from "./EveilLayout";
import { Confetti } from "@/components/Confetti";
import { sounds } from "@/lib/sounds";
import { PRAISE, recordEveilCompletion, speakFr, speakNl } from "@/lib/eveil";

interface Props {
  childId: string;
}

const speakBilingualHelper = () => {
  speakNl(PRAISE.nl);
  window.setTimeout(() => speakFr(PRAISE.fr), 900);
};

const WORDS = [
  { fr: "chat", nl: "kat", emoji: "🐱" },
  { fr: "chien", nl: "hond", emoji: "🐶" },
  { fr: "pomme", nl: "appel", emoji: "🍎" },
  { fr: "maison", nl: "huis", emoji: "🏠" },
  { fr: "soleil", nl: "zon", emoji: "☀️" },
];

const speakBilingualPraise = () => speakBilingualHelper();

export const MonPremierMot = ({ childId }: Props) => {
  const [index, setIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());
  const word = WORDS[index];

  const sayNl = () => speakNl(word.nl);
  const sayFr = () => speakFr(word.fr);
  const say = sayNl;

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
    speakBilingualPraise();
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
      titleNl="Mijn Eerste Woord"
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

          <div className="mx-auto flex w-full max-w-sm gap-3">
            <button
              onClick={sayNl}
              aria-label="Luister in het Nederlands"
              className="min-h-[80px] flex-1 flex items-center justify-center gap-2 rounded-3xl bg-primary/15 text-primary text-2xl font-bold"
            >
              <Volume2 className="w-8 h-8" /> NL
            </button>
            <button
              onClick={sayFr}
              aria-label="Écouter en français"
              className="min-h-[80px] flex-1 flex items-center justify-center gap-2 rounded-3xl bg-secondary/20 text-secondary-foreground text-2xl font-bold"
            >
              <Volume2 className="w-8 h-8" /> FR
            </button>
          </div>

          <button
            onClick={handleAttempt}
            aria-label="J'ai dit le mot"
            className="min-h-[80px] w-full max-w-sm mx-auto flex items-center justify-center gap-3 rounded-3xl bg-primary text-primary-foreground text-2xl font-bold"
          >
            <Mic className="w-9 h-9" /> <BilingualText {...biFromFr("J'ai dit le mot !")} single />
          </button>
        </div>
      )}
    </EveilLayout>
  );
};

export default MonPremierMot;
