import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { sounds } from "@/lib/sounds";
import { BilingualText } from "@/components/ui/BilingualText";
import { bi, useChildLanguage } from "@/lib/bilingual";
import { toast } from "sonner";

const EMOJI_SET = ["🐶", "🐱", "🐰", "🦁", "🐸", "🦋", "🌟", "🎈"];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function buildDeck(): Card[] {
  const pairs = [...EMOJI_SET, ...EMOJI_SET];
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
}

const UI = {
  title: bi("Pauze Memory", "Pause Memory"),
  subtitle: bi("Vind alle paren!", "Trouve toutes les paires !"),
  moves: bi("zetten", "coups"),
  win: bi("Goed gedaan!", "Bravo !"),
  replay: bi("Opnieuw spelen", "Rejouer"),
  back: bi("Terug", "Retour"),
  pauseToast: bi("Fijne pauze! 🎉", "Belle pause ! 🎉"),
};

const MiniGamePause = () => {
  const { id } = useParams<{ id: string }>();
  const primary = useChildLanguage();
  const [deck, setDeck] = useState(buildDeck);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const allMatched = useMemo(() => deck.every((c) => c.matched), [deck]);

  useEffect(() => {
    if (allMatched && !hasCelebrated) {
      setHasCelebrated(true);
      sounds.victory();
      toast(primary === "nl" ? UI.pauseToast.nl : UI.pauseToast.fr);
    }
  }, [allMatched, hasCelebrated, primary]);

  useEffect(() => {
    if (selected.length !== 2) return;
    const [a, b] = selected;
    const cardA = deck.find((c) => c.id === a);
    const cardB = deck.find((c) => c.id === b);
    if (!cardA || !cardB) return;

    setMoves((m) => m + 1);

    if (cardA.emoji === cardB.emoji) {
      sounds.match();
      setTimeout(() => {
        setDeck((d) =>
          d.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c))
        );
        setSelected([]);
      }, 500);
    } else {
      setTimeout(() => {
        setDeck((d) =>
          d.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c))
        );
        setSelected([]);
      }, 900);
    }
  }, [selected, deck]);

  function handleFlip(cardId: number) {
    if (selected.length === 2) return;
    const card = deck.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;
    sounds.flip();
    setDeck((d) => d.map((c) => (c.id === cardId ? { ...c, flipped: true } : c)));
    setSelected((s) => [...s, cardId]);
  }

  function reset() {
    setDeck(buildDeck());
    setSelected([]);
    setMoves(0);
    setHasCelebrated(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/child/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <BilingualText {...UI.back} />
          </Link>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            aria-label={UI.replay[primary === "nl" ? "nl" : "fr"]}
          >
            <RotateCcw className="w-4 h-4" />
            <BilingualText {...UI.replay} />
          </button>
        </div>

        <div className="text-center mb-6">
          <span className="text-5xl mb-2 block">🎮</span>
          <h1 className="text-2xl font-bold text-foreground">
            <BilingualText {...UI.title} />
          </h1>
          <p className="text-muted-foreground font-dyslexic mt-1">
            <BilingualText {...UI.subtitle} />
          </p>
        </div>

        <div className="bg-card/60 border border-border rounded-3xl p-4 sm:p-6">
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {deck.map((card) => (
              <motion.button
                key={card.id}
                onClick={() => handleFlip(card.id)}
                whileTap={{ scale: 0.92 }}
                disabled={card.flipped || card.matched || selected.length === 2}
                className={`aspect-square min-h-[3rem] min-w-[3rem] rounded-2xl shadow-md flex items-center justify-center text-3xl sm:text-4xl transition-colors touch-target
                  ${
                    card.flipped || card.matched
                      ? "bg-white dark:bg-slate-800 border-2 border-primary"
                      : "bg-primary/20 hover:bg-primary/30 border-2 border-transparent"
                  }
                  ${card.matched ? "opacity-60" : ""}
                `}
                aria-label={card.matched ? "gevonden" : "kaart"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {card.flipped || card.matched ? (
                    <motion.span
                      key="front"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: -90 }}
                      transition={{ duration: 0.15 }}
                    >
                      {card.emoji}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="back"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: -90 }}
                      transition={{ duration: 0.15 }}
                      className="text-2xl"
                    >
                      ❓
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              <BilingualText {...UI.moves} />: <strong className="text-foreground">{moves}</strong>
            </span>
            <span className="text-xs bg-muted px-3 py-1 rounded-full">
              🧘 {primary === "nl" ? "Geen punten, gewoon plezier!" : "Pas de points, juste du fun !"}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {allMatched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 bg-kids-green-light/30 border-4 border-kids-green-light rounded-3xl p-6 text-center"
            >
              <span className="text-4xl block mb-2">🎉</span>
              <p className="text-xl font-bold text-foreground mb-1">
                <BilingualText {...UI.win} /> — {moves} <BilingualText {...UI.moves} />
              </p>
              <button
                onClick={reset}
                className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2 font-bold hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="w-4 h-4" />
                <BilingualText {...UI.replay} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MiniGamePause;
