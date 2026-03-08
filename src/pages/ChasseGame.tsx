import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Star, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameSession } from "@/hooks/useGameSession";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { Difficulty } from "@/lib/database";
import { useLanguage } from "@/contexts/LanguageContext";

const WORDS_BY_DIFFICULTY: Record<Difficulty, { word: string; correct: boolean; emoji: string }[]> = {
  easy: [
    { word: "kat", correct: true, emoji: "🐱" }, { word: "hond", correct: true, emoji: "🐶" },
    { word: "huis", correct: true, emoji: "🏠" }, { word: "vis", correct: true, emoji: "🐟" },
    { word: "zon", correct: true, emoji: "☀️" }, { word: "xyz", correct: false, emoji: "❌" },
    { word: "qwp", correct: false, emoji: "❌" }, { word: "rrk", correct: false, emoji: "❌" },
  ],
  medium: [
    { word: "boom", correct: true, emoji: "🌳" }, { word: "boek", correct: true, emoji: "📖" },
    { word: "bloem", correct: true, emoji: "🌸" }, { word: "stoel", correct: true, emoji: "🪑" },
    { word: "fiets", correct: true, emoji: "🚲" }, { word: "trein", correct: true, emoji: "🚂" },
    { word: "mfk", correct: false, emoji: "❌" }, { word: "plxz", correct: false, emoji: "❌" },
    { word: "brkn", correct: false, emoji: "❌" }, { word: "zwtl", correct: false, emoji: "❌" },
  ],
  hard: [
    { word: "vlinder", correct: true, emoji: "🦋" }, { word: "konijn", correct: true, emoji: "🐰" },
    { word: "olifant", correct: true, emoji: "🐘" }, { word: "schildpad", correct: true, emoji: "🐢" },
    { word: "vliegtuig", correct: true, emoji: "✈️" }, { word: "bibliotheek", correct: true, emoji: "📚" },
    { word: "grntk", correct: false, emoji: "❌" }, { word: "vlpxm", correct: false, emoji: "❌" },
    { word: "schldp", correct: false, emoji: "❌" }, { word: "bblthk", correct: false, emoji: "❌" },
    { word: "krstms", correct: false, emoji: "❌" },
  ],
};

interface Balloon { id: number; word: string; correct: boolean; emoji: string; x: number; speed: number; }

const ChasseGame = () => {
  const { t } = useLanguage();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [nextId, setNextId] = useState(0);
  const { saveSession, resetTimer, difficulty, xpGained, leveledUp } = useGameSession("chasse");
  const errorsRef = useRef(0);
  const savedRef = useRef(false);

  const WORDS = WORDS_BY_DIFFICULTY[difficulty];
  const spawnSpeed = difficulty === "easy" ? 2000 : difficulty === "medium" ? 1500 : 1000;
  const balloonBaseSpeed = difficulty === "easy" ? 5 : difficulty === "medium" ? 4 : 3;

  const spawnBalloon = useCallback(() => {
    const wordData = WORDS[Math.floor(Math.random() * WORDS.length)];
    const balloon: Balloon = { id: nextId, ...wordData, x: 10 + Math.random() * 70, speed: balloonBaseSpeed + Math.random() * 3 };
    setNextId((n) => n + 1);
    setBalloons((prev) => [...prev, balloon]);
    setTimeout(() => { setBalloons((prev) => prev.filter((b) => b.id !== balloon.id)); }, balloon.speed * 1000);
  }, [nextId, WORDS, balloonBaseSpeed]);

  useEffect(() => { if (gameOver) return; const interval = setInterval(spawnBalloon, spawnSpeed); return () => clearInterval(interval); }, [spawnBalloon, gameOver, spawnSpeed]);
  useEffect(() => { if (lives <= 0) setGameOver(true); }, [lives]);
  useEffect(() => { if (gameOver && !savedRef.current) { savedRef.current = true; saveSession({ score, maxScore: Math.max(score + errorsRef.current, 1), errorsCount: errorsRef.current, completed: true }); } }, [gameOver, score, saveSession]);

  const handleClick = (balloon: Balloon) => { if (balloon.correct) setScore((s) => s + 1); else { setLives((l) => l - 1); errorsRef.current += 1; } setBalloons((prev) => prev.filter((b) => b.id !== balloon.id)); };
  const reset = () => { setBalloons([]); setScore(0); setLives(3); setGameOver(false); setNextId(0); errorsRef.current = 0; savedRef.current = false; resetTimer(); };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <span className="text-6xl block mb-4">{score >= 5 ? "🎉" : "💪"}</span>
            <h2 className="text-3xl font-bold text-foreground mb-2">{score >= 5 ? t("chasse.super") : t("chasse.tryagain")}</h2>
            <p className="text-xl text-muted-foreground mb-2">{t("chasse.caught")} {score} {t("chasse.words")}</p>
            <DifficultyIndicator difficulty={difficulty} />
            <XpGainPopup xpGained={xpGained} leveledUp={leveledUp} />
            <div className="flex justify-center gap-1 mb-6">{Array.from({ length: Math.min(score, 10) }).map((_, i) => (<Star key={i} className="w-6 h-6 text-secondary fill-secondary" />))}</div>
            <div className="flex gap-4 justify-center">
              <button onClick={reset} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold flex items-center gap-2"><RotateCcw className="w-4 h-4" /> {t("game.replay")}</button>
              <Link to="/" className="bg-card text-foreground border-2 border-border px-6 py-3 rounded-full font-bold">{t("game.home")}</Link>
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
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /> {t("game.back")}</Link>
          <DifficultyIndicator difficulty={difficulty} />
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-foreground">⭐ {score}</span>
            <span className="text-lg font-bold text-foreground">{"❤️".repeat(lives)}{"🖤".repeat(3 - lives)}</span>
          </div>
        </div>
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-foreground">{t("chasse.instruction")}</h2>
          <p className="text-sm text-muted-foreground font-dyslexic">{t("chasse.avoid")}</p>
        </div>
        <div className="relative h-[60vh] bg-accent/20 rounded-3xl overflow-hidden border border-border">
          <AnimatePresence>
            {balloons.map((balloon) => (
              <motion.button key={balloon.id} initial={{ y: "100%", x: `${balloon.x}%`, opacity: 1 }} animate={{ y: "-120%" }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: balloon.speed, ease: "linear" }} onClick={() => handleClick(balloon)} className="absolute flex flex-col items-center cursor-pointer" style={{ left: `${balloon.x}%` }}>
                <span className="text-3xl mb-1">🎈</span>
                <span className="bg-card px-4 py-2 rounded-xl font-bold font-dyslexic text-foreground kids-shadow-card border border-border text-lg">{balloon.word}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChasseGame;
