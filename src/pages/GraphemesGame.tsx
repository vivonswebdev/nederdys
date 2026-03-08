import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface GraphemeChallenge {
  targetGrapheme: string;
  sound: string; // IPA-ish for display
  exampleWord: string;
  options: string[];
}

const EASY_CHALLENGES: GraphemeChallenge[] = [
  { targetGrapheme: "aa", sound: "/aː/", exampleWord: "maan", options: ["aa", "a", "ee", "oo"] },
  { targetGrapheme: "ee", sound: "/eː/", exampleWord: "been", options: ["ee", "ie", "aa", "eu"] },
  { targetGrapheme: "oo", sound: "/oː/", exampleWord: "boom", options: ["oo", "ou", "oe", "aa"] },
  { targetGrapheme: "uu", sound: "/yː/", exampleWord: "muur", options: ["uu", "ui", "eu", "oe"] },
  { targetGrapheme: "ie", sound: "/iː/", exampleWord: "dier", options: ["ie", "ee", "ei", "ij"] },
  { targetGrapheme: "oe", sound: "/uː/", exampleWord: "boek", options: ["oe", "oo", "ou", "eu"] },
];

const MEDIUM_CHALLENGES: GraphemeChallenge[] = [
  { targetGrapheme: "ui", sound: "/œy/", exampleWord: "huis", options: ["ui", "eu", "uu", "ij"] },
  { targetGrapheme: "eu", sound: "/øː/", exampleWord: "neus", options: ["eu", "ui", "uu", "oe"] },
  { targetGrapheme: "ou", sound: "/ɑu/", exampleWord: "oud", options: ["ou", "au", "oo", "oe"] },
  { targetGrapheme: "au", sound: "/ɑu/", exampleWord: "blauw", options: ["au", "ou", "aa", "oo"] },
  { targetGrapheme: "ei", sound: "/ɛi/", exampleWord: "trein", options: ["ei", "ij", "ie", "ee"] },
  { targetGrapheme: "ij", sound: "/ɛi/", exampleWord: "vrij", options: ["ij", "ei", "ie", "ee"] },
];

const HARD_CHALLENGES: GraphemeChallenge[] = [
  { targetGrapheme: "eu", sound: "/øː/", exampleWord: "keuken", options: ["eu", "ui", "uu", "oe", "ie"] },
  { targetGrapheme: "ui", sound: "/œy/", exampleWord: "buiten", options: ["ui", "eu", "uu", "ou", "ij"] },
  { targetGrapheme: "ij", sound: "/ɛi/", exampleWord: "schrijven", options: ["ij", "ei", "ie", "ee", "aa"] },
  { targetGrapheme: "oe", sound: "/uː/", exampleWord: "groente", options: ["oe", "oo", "ou", "eu", "ui"] },
  { targetGrapheme: "au", sound: "/ɑu/", exampleWord: "sausje", options: ["au", "ou", "oo", "aa", "eu"] },
];

const GraphemesGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("graphemes");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return [...EASY_CHALLENGES, ...MEDIUM_CHALLENGES, ...HARD_CHALLENGES];
    if (difficulty === "medium") return [...EASY_CHALLENGES, ...MEDIUM_CHALLENGES];
    return EASY_CHALLENGES;
  }, [difficulty]);

  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [coins, setCoins] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [bubblePositions, setBubblePositions] = useState<{ x: number; delay: number }[]>([]);

  const challenges = getChallenges();
  const totalRounds = Math.min(challenges.length, 8);
  const [shuffledChallenges, setShuffledChallenges] = useState<GraphemeChallenge[]>([]);

  useEffect(() => {
    const shuffled = [...challenges].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledChallenges(shuffled);
  }, [difficulty]);

  const current = shuffledChallenges[round];

  // Randomize bubble positions each round
  useEffect(() => {
    if (current) {
      setBubblePositions(
        current.options.map(() => ({
          x: Math.random() * 60 - 30,
          delay: Math.random() * 0.5,
        }))
      );
      setFeedback(null);
      setSelectedOption(null);
    }
  }, [round, current]);

  const speak = useCallback(() => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.exampleWord);
    u.lang = "nl-NL";
    u.rate = 0.7;
    speechSynthesis.speak(u);
    sounds.click();
  }, [current]);

  // Auto-speak on new round
  useEffect(() => {
    if (current) {
      const timer = setTimeout(speak, 600);
      return () => clearTimeout(timer);
    }
  }, [round, current]);

  const handleSelect = useCallback(
    (option: string) => {
      if (feedback) return;
      setSelectedOption(option);

      if (option === current.targetGrapheme) {
        setFeedback("correct");
        sounds.correct();
        setScore((s) => s + 1);
        setCoins((c) => c + 1);
        setTimeout(() => {
          if (round + 1 >= totalRounds) {
            setFinished(true);
            sounds.victory();
            saveSession({ score: score + 1, maxScore: totalRounds, errorsCount: errors, completed: true });
          } else {
            setRound((r) => r + 1);
          }
        }, 1200);
      } else {
        setFeedback("wrong");
        sounds.wrong();
        setErrors((e) => e + 1);
        setTimeout(() => {
          setFeedback(null);
          setSelectedOption(null);
        }, 1500);
      }
    },
    [feedback, current, round, totalRounds, score, errors, saveSession]
  );

  const restart = () => {
    setRound(0);
    setScore(0);
    setErrors(0);
    setCoins(0);
    setFinished(false);
    setFeedback(null);
    setSelectedOption(null);
    resetTimer();
    const shuffled = [...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledChallenges(shuffled);
  };

  if (!current && !finished) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-blue-800 to-cyan-900 overflow-hidden">
      {/* Header */}
      <div className="bg-sky-900/80 backdrop-blur border-b border-sky-700 p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-sky-100 hover:text-white hover:bg-sky-800">
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("game.back")}
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-sky-100">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-amber-300">🪙 {coins}</span>
            <span className="text-sky-300 text-sm">|</span>
            <span className="text-lg font-bold text-sky-100">
              {t("game.score")}: {score}/{totalRounds}
            </span>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 relative">
        {/* Floating wave decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-sky-400/20"
              style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
              <div className="text-6xl mb-4">🏴‍☠️</div>
              <h2 className="text-3xl font-bold text-white">{t("game.bravo")}</h2>
              <p className="text-xl text-sky-200">
                {t("game.score")}: {score}/{totalRounds}
              </p>
              <p className="text-lg text-amber-300 font-bold">🪙 {coins} {t("graphemes.coins")}</p>
              <XpGainPopup xpGained={xpGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> {t("game.replay")}
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-sky-400 text-sky-100 hover:bg-sky-800">
                    <Home className="w-4 h-4 mr-2" /> {t("game.home")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-8">
              {/* Pirate ship & parrot instruction */}
              <div className="text-center space-y-3">
                <motion.div
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-5xl"
                >
                  🦜
                </motion.div>
                <h2 className="text-xl font-bold text-white">{t("graphemes.instruction")}</h2>
                <p className="text-sky-200 text-sm">{t("graphemes.listenCarefully")}</p>
              </div>

              {/* Sound display + listen button */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="bg-sky-800/60 backdrop-blur border-2 border-amber-400/50 rounded-2xl px-8 py-5 text-center"
                  animate={{ boxShadow: ["0 0 20px rgba(251,191,36,0.2)", "0 0 40px rgba(251,191,36,0.4)", "0 0 20px rgba(251,191,36,0.2)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-3xl font-bold text-amber-300 font-mono">{current.sound}</span>
                  <p className="text-sky-300 text-sm mt-1">
                    {t("graphemes.example")}: <span className="font-bold text-white">{current.exampleWord}</span>
                  </p>
                </motion.div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={speak}
                  className="gap-2 border-amber-400 text-amber-300 hover:bg-amber-400/20 hover:text-amber-200"
                >
                  <Volume2 className="w-5 h-5" /> {t("graphemes.listen")}
                </Button>
              </div>

              {/* Bubbles */}
              <div className="relative min-h-[250px] flex items-end justify-center gap-4 flex-wrap py-4">
                {/* Water waves at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyan-600/30 to-transparent rounded-b-2xl" />

                {current.options.map((option, i) => {
                  const isSelected = selectedOption === option;
                  const isCorrectAnswer = option === current.targetGrapheme;
                  const showResult = feedback && isSelected;
                  const showCorrectHint = feedback === "wrong" && isCorrectAnswer;

                  return (
                    <motion.button
                      key={`${round}-${option}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        x: [bubblePositions[i]?.x || 0, (bubblePositions[i]?.x || 0) + 8, bubblePositions[i]?.x || 0],
                      }}
                      transition={{
                        y: { duration: 0.6, delay: bubblePositions[i]?.delay || 0 },
                        x: { duration: 3, repeat: Infinity, delay: i * 0.3 },
                      }}
                      onClick={() => handleSelect(option)}
                      disabled={!!feedback}
                      className={`
                        relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center
                        text-xl md:text-2xl font-bold font-mono
                        border-4 transition-all duration-200
                        ${
                          showResult && feedback === "correct"
                            ? "bg-emerald-400 border-emerald-300 text-white scale-110"
                            : showResult && feedback === "wrong"
                            ? "bg-red-400 border-red-300 text-white"
                            : showCorrectHint
                            ? "bg-emerald-400/50 border-emerald-300 text-white ring-4 ring-emerald-400/50"
                            : "bg-sky-400/80 border-sky-300/60 text-white hover:bg-sky-300 hover:scale-110 cursor-pointer"
                        }
                        shadow-lg backdrop-blur-sm
                      `}
                    >
                      {/* Bubble shine */}
                      <div className="absolute top-2 left-3 w-3 h-3 bg-white/40 rounded-full" />
                      <span className="tracking-wider">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-center text-xl font-bold p-4 rounded-xl ${
                      feedback === "correct"
                        ? "bg-emerald-500/30 text-emerald-200"
                        : "bg-red-500/30 text-red-200"
                    }`}
                  >
                    {feedback === "correct"
                      ? `✅ ${t("graphemes.correct")} +1 🪙`
                      : `❌ ${t("graphemes.wrong")} → ${current.targetGrapheme}`}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GraphemesGame;
