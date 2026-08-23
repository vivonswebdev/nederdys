import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MathLevel, pickSession } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { memoryCalculChallenges } from "@/data/math/memoryCalculChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

interface Card {
  key: string;
  label: string;
  pairId: number;
}

export const MemoryCalculGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: memoryCalculChallenges,
    level,
    gameId: "memory-calcul",
    childId,
    backTo,
    size: 3,
  });
  const c = run.challenge;

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [found, setFound] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!c) return;
    const deck: Card[] = c.pairs.flatMap((p, i) => [
      { key: `op-${i}`, label: p.operation, pairId: i },
      { key: `res-${i}`, label: String(p.result), pairId: i },
    ]);
    setCards(pickSession(deck, deck.length));
    setFlipped([]);
    setFound([]);
    setMistakes(0);
    setBusy(false);
  }, [c]);

  useEffect(() => {
    if (!c || found.length === 0) return;
    if (found.length === c.pairs.length) {
      setBusy(true);
      const t = setTimeout(() => run.submit(mistakes <= 1), 600);
      return () => clearTimeout(t);
    }
  }, [found, c, mistakes, run]);

  function flip(card: Card) {
    if (busy || flipped.includes(card.key) || found.includes(card.pairId)) return;
    sounds.click();
    const next = [...flipped, card.key];
    setFlipped(next);
    if (next.length === 2) {
      setBusy(true);
      const [a, b] = next.map((k) => cards.find((x) => x.key === k)!);
      const match = a.pairId === b.pairId;
      setTimeout(() => {
        if (match) {
          sounds.correct();
          setFound((f) => [...f, a.pairId]);
        } else {
          sounds.wrong();
          setMistakes((m) => m + 1);
        }
        setFlipped([]);
        setBusy(false);
      }, 700);
    }
  }

  return (
    <MathGameLayout
      title="Memory Calcul"
      emoji="🃏"
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
          <p className="text-center font-dyslexic text-muted-foreground mb-5">
            Retourne les cartes deux par deux : associe chaque calcul à son résultat.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            {cards.map((card) => {
              const open = flipped.includes(card.key) || found.includes(card.pairId);
              return (
                <motion.button
                  key={card.key}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => flip(card)}
                  className={`h-24 rounded-2xl text-xl font-bold border-4 transition-colors ${
                    found.includes(card.pairId)
                      ? "bg-kids-green-light border-kids-green-dark"
                      : open
                        ? "bg-card border-primary"
                        : "bg-primary/80 border-primary text-primary-foreground"
                  }`}
                >
                  {open ? card.label : "?"}
                </motion.button>
              );
            })}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Erreurs : {mistakes} (1 maximum pour gagner le point)
          </p>
        </>
      )}
    </MathGameLayout>
  );
};

export default MemoryCalculGame;
