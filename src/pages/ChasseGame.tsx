import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Star, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameSession } from "@/hooks/useGameSession";

const WORDS = [
  { word: "kat", correct: true, emoji: "🐱" },
  { word: "hond", correct: true, emoji: "🐶" },
  { word: "huis", correct: true, emoji: "🏠" },
  { word: "boom", correct: true, emoji: "🌳" },
  { word: "vis", correct: true, emoji: "🐟" },
  { word: "xyz", correct: false, emoji: "❌" },
  { word: "qwp", correct: false, emoji: "❌" },
  { word: "rrk", correct: false, emoji: "❌" },
  { word: "boek", correct: true, emoji: "📖" },
  { word: "zon", correct: true, emoji: "☀️" },
  { word: "mfk", correct: false, emoji: "❌" },
  { word: "bloem", correct: true, emoji: "🌸" },
];

interface Balloon {
  id: number;
  word: string;
  correct: boolean;
  emoji: string;
  x: number;
  speed: number;
}

const ChasseGame = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [nextId, setNextId] = useState(0);

  const spawnBalloon = useCallback(() => {
    const wordData = WORDS[Math.floor(Math.random() * WORDS.length)];
    const balloon: Balloon = {
      id: nextId,
      ...wordData,
      x: 10 + Math.random() * 70,
      speed: 4 + Math.random() * 4,
    };
    setNextId((n) => n + 1);
    setBalloons((prev) => [...prev, balloon]);

    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
    }, balloon.speed * 1000);
  }, [nextId]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(spawnBalloon, 1500);
    return () => clearInterval(interval);
  }, [spawnBalloon, gameOver]);

  useEffect(() => {
    if (lives <= 0) setGameOver(true);
  }, [lives]);

  const handleClick = (balloon: Balloon) => {
    if (balloon.correct) {
      setScore((s) => s + 1);
    } else {
      setLives((l) => l - 1);
    }
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
  };

  const reset = () => {
    setBalloons([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setNextId(0);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <span className="text-6xl block mb-4">{score >= 5 ? "🎉" : "💪"}</span>
            <h2 className="text-3xl font-bold text-foreground mb-2">{score >= 5 ? "Super !" : "Bien essayé !"}</h2>
            <p className="text-xl text-muted-foreground mb-4">Tu as attrapé {score} mots !</p>
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: Math.min(score, 10) }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-secondary fill-secondary" />
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
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-foreground">⭐ {score}</span>
            <span className="text-lg font-bold text-foreground">
              {"❤️".repeat(lives)}{"🖤".repeat(3 - lives)}
            </span>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-foreground">Clique sur les vrais mots NL ! 🎈</h2>
          <p className="text-sm text-muted-foreground font-dyslexic">Évite les faux mots !</p>
        </div>

        <div className="relative h-[60vh] bg-accent/20 rounded-3xl overflow-hidden border border-border">
          <AnimatePresence>
            {balloons.map((balloon) => (
              <motion.button
                key={balloon.id}
                initial={{ y: "100%", x: `${balloon.x}%`, opacity: 1 }}
                animate={{ y: "-120%" }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: balloon.speed, ease: "linear" }}
                onClick={() => handleClick(balloon)}
                className="absolute flex flex-col items-center cursor-pointer"
                style={{ left: `${balloon.x}%` }}
              >
                <span className="text-3xl mb-1">🎈</span>
                <span className="bg-card px-4 py-2 rounded-xl font-bold font-dyslexic text-foreground kids-shadow-card border border-border text-lg">
                  {balloon.word}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChasseGame;
