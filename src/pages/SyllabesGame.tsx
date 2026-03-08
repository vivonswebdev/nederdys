import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Volume2, Star, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameSession } from "@/hooks/useGameSession";

const ROUNDS = [
  { audio: "kaatje", syllables: ["kaat", "je"], distractors: ["ka", "tje"] },
  { audio: "konijn", syllables: ["ko", "nijn"], distractors: ["kon", "ij"] },
  { audio: "vlinder", syllables: ["vlin", "der"], distractors: ["vli", "ner"] },
  { audio: "appel", syllables: ["ap", "pel"], distractors: ["a", "ppel"] },
  { audio: "olifant", syllables: ["o", "li", "fant"], distractors: ["ol", "if"] },
];

const SyllabesGame = () => {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { saveSession, resetTimer } = useGameSession("syllabes");
  const errorsRef = useRef(0);
  const savedRef = useRef(false);

  const current = ROUNDS[round];
  const allOptions = [...current.syllables, ...current.distractors].sort(() => Math.random() - 0.5);

  const handleSelect = useCallback((syl: string) => {
    if (feedback) return;
    const newSelected = [...selected, syl];
    setSelected(newSelected);

    if (newSelected.length === current.syllables.length) {
      const isCorrect = newSelected.join("") === current.syllables.join("");
      setFeedback(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        if (round < ROUNDS.length - 1) {
          setRound((r) => r + 1);
          setSelected([]);
          setFeedback(null);
        } else {
          setGameOver(true);
        }
      }, 1200);
    }
  }, [selected, feedback, current, round]);

  const reset = () => {
    setRound(0);
    setSelected([]);
    setScore(0);
    setFeedback(null);
    setGameOver(false);
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(current.audio);
    utterance.lang = "nl-NL";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <span className="text-6xl block mb-4">🎉</span>
            <h2 className="text-3xl font-bold text-foreground mb-2">Bravo !</h2>
            <p className="text-xl text-muted-foreground mb-2">
              Score : {score}/{ROUNDS.length}
            </p>
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: score }).map((_, i) => (
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
        <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((round + 1) / ROUNDS.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-foreground">{round + 1}/{ROUNDS.length}</span>
        </div>

        {/* Word */}
        <motion.div
          key={round}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Découpe le mot en syllabes !</h2>
          <button
            onClick={speakWord}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-xl font-bold font-dyslexic hover:bg-accent/80 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
            {current.audio}
          </button>
        </motion.div>

        {/* Drop zone */}
        <div className="flex gap-2 justify-center mb-8 min-h-[60px]">
          {selected.map((s, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`px-5 py-3 rounded-xl text-lg font-bold font-dyslexic ${
                feedback === "correct"
                  ? "bg-primary text-primary-foreground"
                  : feedback === "wrong"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              <span className="syllable-highlight">{s}</span>
            </motion.div>
          ))}
          {!selected.length && (
            <div className="px-5 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground text-lg">
              Glisse les syllabes ici...
            </div>
          )}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-6"
            >
              <span className="text-4xl">{feedback === "correct" ? "✅ Super !" : "❌ Essaie encore !"}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options */}
        <div className="flex flex-wrap gap-3 justify-center">
          {allOptions.map((syl, i) => {
            const isUsed = selected.includes(syl);
            return (
              <motion.button
                key={`${round}-${syl}-${i}`}
                whileHover={{ scale: isUsed ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => !isUsed && handleSelect(syl)}
                disabled={isUsed || !!feedback}
                className={`px-6 py-3 rounded-xl text-lg font-bold font-dyslexic transition-all ${
                  isUsed
                    ? "bg-muted text-muted-foreground opacity-40"
                    : "bg-secondary text-secondary-foreground kids-shadow-card hover:kids-shadow-hover cursor-pointer"
                }`}
              >
                {syl}
              </motion.button>
            );
          })}
        </div>

        {/* Score */}
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

export default SyllabesGame;
