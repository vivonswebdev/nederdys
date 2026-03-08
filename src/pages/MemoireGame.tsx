import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Star, RotateCcw, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameSession } from "@/hooks/useGameSession";

const PAIRS = [
  { word: "huis", emoji: "🏠" },
  { word: "boom", emoji: "🌳" },
  { word: "kat", emoji: "🐱" },
  { word: "zon", emoji: "☀️" },
  { word: "vis", emoji: "🐟" },
  { word: "bloem", emoji: "🌸" },
];

interface Card {
  id: number;
  word: string;
  emoji: string;
  pairId: number;
  flipped: boolean;
  matched: boolean;
}

const MemoireGame = () => {
  const cards = useMemo(() => {
    const deck: Card[] = [];
    PAIRS.forEach((pair, i) => {
      deck.push({ id: i * 2, word: pair.word, emoji: pair.emoji, pairId: i, flipped: false, matched: false });
      deck.push({ id: i * 2 + 1, word: pair.word, emoji: pair.emoji, pairId: i, flipped: false, matched: false });
    });
    return deck.sort(() => Math.random() - 0.5);
  }, []);

  const [gameCards, setGameCards] = useState<Card[]>(cards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const { saveSession, resetTimer } = useGameSession("memoire");
  const savedRef = useRef(false);

  const gameOver = matches === PAIRS.length;

  useEffect(() => {
    if (gameOver && !savedRef.current) {
      savedRef.current = true;
      const stars = moves <= 8 ? 5 : moves <= 12 ? 4 : moves <= 16 ? 3 : 2;
      const errorsCount = moves - PAIRS.length; // moves beyond perfect
      saveSession({ score: stars, maxScore: 5, errorsCount: Math.max(errorsCount, 0), completed: true });
    }
  }, [gameOver, moves, saveSession]);

  const handleFlip = (id: number) => {
    if (locked) return;
    const card = gameCards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = gameCards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setGameCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [first, second] = newFlipped.map((fid) => newCards.find((c) => c.id === fid)!);
      
      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setGameCards((prev) => prev.map((c) => (c.pairId === first.pairId ? { ...c, matched: true } : c)));
          setMatches((m) => m + 1);
          setFlippedIds([]);
          setLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          setGameCards((prev) => prev.map((c) => (newFlipped.includes(c.id) ? { ...c, flipped: false } : c)));
          setFlippedIds([]);
          setLocked(false);
        }, 1000);
      }
    }
  };

  const speakWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "nl-NL";
    u.rate = 0.7;
    speechSynthesis.speak(u);
  };

  const reset = () => {
    const reshuffled = [...cards].sort(() => Math.random() - 0.5).map(c => ({ ...c, flipped: false, matched: false }));
    setGameCards(reshuffled);
    setFlippedIds([]);
    setMatches(0);
    setMoves(0);
    setLocked(false);
    savedRef.current = false;
    resetTimer();
  };

  if (gameOver) {
    const stars = moves <= 8 ? 5 : moves <= 12 ? 4 : moves <= 16 ? 3 : 2;
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <span className="text-6xl block mb-4">🎉</span>
            <h2 className="text-3xl font-bold text-foreground mb-2">Toutes les paires trouvées !</h2>
            <p className="text-xl text-muted-foreground mb-2">En {moves} coups</p>
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-secondary fill-secondary" />
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={reset} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Rejouer
              </button>
              <Link to="/" className="bg-card text-foreground border-2 border-border px-6 py-3 rounded-full font-bold">
                Accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <span className="text-lg font-bold text-foreground">Coups : {moves}</span>
        </div>

        <h2 className="text-2xl font-bold text-foreground text-center mb-2">Mémoire Sonore 🔊</h2>
        <p className="text-center text-muted-foreground mb-6 font-dyslexic">Trouve les paires de mots NL !</p>

        <div className="grid grid-cols-3 gap-3">
          {gameCards.map((card) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: card.matched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-lg font-bold font-dyslexic transition-all border-2 ${
                card.matched
                  ? "bg-primary/20 border-primary text-primary"
                  : card.flipped
                  ? "bg-secondary border-secondary text-secondary-foreground"
                  : "bg-card border-border text-foreground kids-shadow-card cursor-pointer hover:border-primary"
              }`}
            >
              {card.flipped || card.matched ? (
                <>
                  <span className="text-2xl mb-1">{card.emoji}</span>
                  <span className="text-sm">{card.word}</span>
                  <button onClick={(e) => speakWord(card.word, e)} className="mt-1">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </>
              ) : (
                <span className="text-3xl">❓</span>
              )}
            </motion.button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">Paires trouvées : {matches}/{PAIRS.length}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoireGame;
