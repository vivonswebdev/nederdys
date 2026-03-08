import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Star, RotateCcw, Volume2, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameSession } from "@/hooks/useGameSession";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { Difficulty } from "@/lib/database";

interface LetterRound {
  word: string;
  emoji: string;
  hint: string;
}

const ROUNDS_BY_DIFFICULTY: Record<Difficulty, LetterRound[]> = {
  easy: [
    { word: "kat", emoji: "🐱", hint: "Un animal qui miaule" },
    { word: "vis", emoji: "🐟", hint: "Il nage dans l'eau" },
    { word: "zon", emoji: "☀️", hint: "Brille dans le ciel" },
    { word: "huis", emoji: "🏠", hint: "On y habite" },
    { word: "boom", emoji: "🌳", hint: "Grand et vert" },
  ],
  medium: [
    { word: "bloem", emoji: "🌸", hint: "Belle et colorée" },
    { word: "fiets", emoji: "🚲", hint: "Deux roues, on pédale" },
    { word: "trein", emoji: "🚂", hint: "Sur des rails" },
    { word: "stoel", emoji: "🪑", hint: "Pour s'asseoir" },
    { word: "groen", emoji: "💚", hint: "Couleur de l'herbe" },
  ],
  hard: [
    { word: "school", emoji: "🏫", hint: "On y apprend" },
    { word: "vlinder", emoji: "🦋", hint: "Insecte coloré qui vole" },
    { word: "konijn", emoji: "🐰", hint: "Longues oreilles" },
    { word: "schip", emoji: "🚢", hint: "Navigue sur la mer" },
    { word: "straat", emoji: "🛣️", hint: "On y marche" },
  ],
};

const LettresGame = () => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [placed, setPlaced] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { saveSession, resetTimer, difficulty, xpGained, leveledUp } = useGameSession("lettres");
  const errorsRef = useRef(0);
  const savedRef = useRef(false);

  const ROUNDS = ROUNDS_BY_DIFFICULTY[difficulty];
  const current = ROUNDS[round];

  // Shuffle letters for current round
  useEffect(() => {
    if (current) {
      const letters = current.word.split("");
      const extraLetters = difficulty === "easy" ? ["x", "q"] : difficulty === "medium" ? ["x", "q", "z"] : ["x", "q", "z", "w"];
      const all = [...letters, ...extraLetters.slice(0, Math.min(2, 3))].sort(() => Math.random() - 0.5);
      setAvailable(all);
      setPlaced([]);
      setFeedback(null);
    }
  }, [round, difficulty]);

  const speakWord = () => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.word);
    u.lang = "nl-NL";
    u.rate = 0.6;
    speechSynthesis.speak(u);
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (feedback) return;
    const newAvailable = [...available];
    newAvailable.splice(index, 1);
    setAvailable(newAvailable);
    setPlaced([...placed, letter]);
  };

  const handlePlacedClick = (letter: string, index: number) => {
    if (feedback) return;
    const newPlaced = [...placed];
    newPlaced.splice(index, 1);
    setPlaced(newPlaced);
    setAvailable([...available, letter]);
  };

  const handleSubmit = () => {
    if (feedback || !current) return;
    const word = placed.join("");
    const isCorrect = word === current.word;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
    else errorsRef.current += 1;

    setTimeout(() => {
      if (round < ROUNDS.length - 1) {
        setRound((r) => r + 1);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  useEffect(() => {
    if (gameOver && !savedRef.current) {
      savedRef.current = true;
      saveSession({ score, maxScore: ROUNDS.length, errorsCount: errorsRef.current, completed: true });
    }
  }, [gameOver, score, saveSession, ROUNDS.length]);

  const reset = () => {
    setRound(0);
    setScore(0);
    setPlaced([]);
    setAvailable([]);
    setFeedback(null);
    setGameOver(false);
    errorsRef.current = 0;
    savedRef.current = false;
    resetTimer();
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <span className="text-6xl block mb-4">🧲</span>
            <h2 className="text-3xl font-bold text-foreground mb-2">Super travail !</h2>
            <p className="text-xl text-muted-foreground mb-2">Score : {score}/{ROUNDS.length}</p>
            <DifficultyIndicator difficulty={difficulty} />
            <XpGainPopup xpGained={xpGained} leveledUp={leveledUp} />
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: score }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-secondary fill-secondary" />
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={reset} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Rejouer
              </button>
              <Link to="/" className="bg-card text-foreground border-2 border-border px-6 py-3 rounded-full font-bold">Accueil</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <DifficultyIndicator difficulty={difficulty} />
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
            <motion.div className="bg-primary h-full rounded-full" animate={{ width: `${((round + 1) / ROUNDS.length) * 100}%` }} />
          </div>
          <span className="text-sm font-bold text-foreground">{round + 1}/{ROUNDS.length}</span>
        </div>

        <motion.div key={round} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-3">Construis le mot ! 🧲</h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl">{current.emoji}</span>
            <button onClick={speakWord} className="bg-accent text-accent-foreground p-3 rounded-full hover:bg-accent/80 transition-colors">
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
          <p className="text-muted-foreground font-dyslexic">{current.hint}</p>
        </motion.div>

        {/* Drop zone - placed letters */}
        <div className="flex gap-2 justify-center mb-6 min-h-[64px] flex-wrap">
          {placed.length > 0 ? (
            placed.map((letter, i) => (
              <motion.button
                key={`placed-${i}`}
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={() => handlePlacedClick(letter, i)}
                className={`w-14 h-14 rounded-xl text-2xl font-bold font-dyslexic flex items-center justify-center border-2 transition-all cursor-pointer ${
                  feedback === "correct"
                    ? "bg-primary/20 border-primary text-primary"
                    : feedback === "wrong"
                    ? "bg-destructive/20 border-destructive text-destructive"
                    : "bg-accent border-accent text-accent-foreground hover:border-primary"
                }`}
              >
                {letter.toUpperCase()}
              </motion.button>
            ))
          ) : (
            <div className="flex gap-2">
              {current.word.split("").map((_, i) => (
                <div key={i} className="w-14 h-14 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-xl">
                  _
                </div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center mb-4">
              <span className="text-3xl">
                {feedback === "correct" ? "✅ Magnifique !" : `❌ C'était "${current.word}"`}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit button */}
        {placed.length > 0 && !feedback && (
          <div className="text-center mb-6">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" /> Valider
            </motion.button>
          </div>
        )}

        {/* Available letters */}
        <div className="flex flex-wrap gap-3 justify-center">
          {available.map((letter, i) => (
            <motion.button
              key={`avail-${i}-${letter}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.15, rotate: [-2, 2, 0] }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleLetterClick(letter, i)}
              disabled={!!feedback}
              className="w-14 h-14 rounded-xl text-2xl font-bold font-dyslexic bg-secondary text-secondary-foreground kids-shadow-card cursor-pointer hover:kids-shadow-hover flex items-center justify-center border-2 border-secondary transition-all"
            >
              {letter.toUpperCase()}
            </motion.button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="flex justify-center gap-1">
            {Array.from({ length: score }).map((_, i) => (
              <Star key={i} className="w-6 h-6 text-secondary fill-secondary" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LettresGame;
