import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface MirrorChallenge {
  targetLetter: string;
  sound: string;
  mnemonicEmoji: string;
  mnemonicWord: string;
  options: string[];
}

const EASY_CHALLENGES: MirrorChallenge[] = [
  { targetLetter: "b", sound: "bé", mnemonicEmoji: "⚽", mnemonicWord: "bal", options: ["b", "d"] },
  { targetLetter: "d", sound: "dé", mnemonicEmoji: "🍩", mnemonicWord: "donut", options: ["d", "b"] },
  { targetLetter: "p", sound: "pé", mnemonicEmoji: "🦜", mnemonicWord: "papegaai", options: ["p", "q"] },
  { targetLetter: "q", sound: "ku", mnemonicEmoji: "👑", mnemonicWord: "queen", options: ["q", "p"] },
  { targetLetter: "b", sound: "bé", mnemonicEmoji: "🍌", mnemonicWord: "banaan", options: ["b", "d"] },
  { targetLetter: "d", sound: "dé", mnemonicEmoji: "🐬", mnemonicWord: "dolfijn", options: ["d", "b"] },
];

const MEDIUM_CHALLENGES: MirrorChallenge[] = [
  { targetLetter: "b", sound: "bé", mnemonicEmoji: "📖", mnemonicWord: "boek", options: ["b", "d", "p"] },
  { targetLetter: "d", sound: "dé", mnemonicEmoji: "🚪", mnemonicWord: "deur", options: ["d", "b", "q"] },
  { targetLetter: "p", sound: "pé", mnemonicEmoji: "🎨", mnemonicWord: "penseel", options: ["p", "q", "b"] },
  { targetLetter: "q", sound: "ku", mnemonicEmoji: "❓", mnemonicWord: "quiz", options: ["q", "p", "d"] },
  { targetLetter: "m", sound: "em", mnemonicEmoji: "🌙", mnemonicWord: "maan", options: ["m", "w", "n"] },
  { targetLetter: "w", sound: "wé", mnemonicEmoji: "🌊", mnemonicWord: "water", options: ["w", "m", "v"] },
];

const HARD_CHALLENGES: MirrorChallenge[] = [
  { targetLetter: "b", sound: "bé", mnemonicEmoji: "🌳", mnemonicWord: "boom", options: ["b", "d", "p", "q"] },
  { targetLetter: "d", sound: "dé", mnemonicEmoji: "🦌", mnemonicWord: "dier", options: ["d", "b", "q", "p"] },
  { targetLetter: "p", sound: "pé", mnemonicEmoji: "🐧", mnemonicWord: "pinguïn", options: ["p", "q", "b", "d"] },
  { targetLetter: "q", sound: "ku", mnemonicEmoji: "👑", mnemonicWord: "queen", options: ["q", "p", "d", "b"] },
  { targetLetter: "n", sound: "en", mnemonicEmoji: "👃", mnemonicWord: "neus", options: ["n", "u", "m", "w"] },
  { targetLetter: "u", sound: "u", mnemonicEmoji: "🦉", mnemonicWord: "uil", options: ["u", "n", "v", "w"] },
];

const MiroirGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("miroir");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return [...EASY_CHALLENGES, ...MEDIUM_CHALLENGES, ...HARD_CHALLENGES];
    if (difficulty === "medium") return [...EASY_CHALLENGES, ...MEDIUM_CHALLENGES];
    return EASY_CHALLENGES;
  }, [difficulty]);

  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showMnemonic, setShowMnemonic] = useState<string | null>(null);

  const challenges = getChallenges();
  const totalRounds = Math.min(challenges.length, 8);
  const [shuffledChallenges, setShuffledChallenges] = useState<MirrorChallenge[]>([]);

  useEffect(() => {
    const shuffled = [...challenges].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledChallenges(shuffled);
  }, [difficulty]);

  const current = shuffledChallenges[round];

  useEffect(() => {
    if (current) {
      setFeedback(null);
      setSelectedOption(null);
      setShowMnemonic(null);
    }
  }, [round, current]);

  const speak = useCallback(() => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.sound);
    u.lang = "nl-NL";
    u.rate = 0.6;
    speechSynthesis.speak(u);
    sounds.click();
  }, [current]);

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

      if (option === current.targetLetter) {
        setFeedback("correct");
        sounds.correct();
        setScore((s) => s + 1);
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
        // Show mnemonic for the wrong letter clicked
        const wrongChallenge = challenges.find((c) => c.targetLetter === option);
        if (wrongChallenge) {
          setShowMnemonic(option);
        }
        setTimeout(() => {
          setFeedback(null);
          setSelectedOption(null);
          setShowMnemonic(null);
        }, 2500);
      }
    },
    [feedback, current, round, totalRounds, score, errors, saveSession, challenges]
  );

  const restart = () => {
    setRound(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    setFeedback(null);
    setSelectedOption(null);
    setShowMnemonic(null);
    resetTimer();
    const shuffled = [...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledChallenges(shuffled);
  };

  // Find mnemonic info for a given letter option
  const getMnemonic = (letter: string) => {
    const ch = challenges.find((c) => c.targetLetter === letter);
    return ch ? { emoji: ch.mnemonicEmoji, word: ch.mnemonicWord } : null;
  };

  if (!current && !finished) return null;

  // Color hints for hard mode
  const getLetterColor = (letter: string) => {
    if (difficulty !== "hard") return "";
    const map: Record<string, string> = {
      b: "text-emerald-400",
      d: "text-red-400",
      p: "text-amber-400",
      q: "text-violet-400",
      m: "text-sky-400",
      w: "text-orange-400",
      n: "text-teal-400",
      u: "text-pink-400",
    };
    return map[letter] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-violet-950 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-950/80 backdrop-blur border-b border-purple-700/50 p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white hover:bg-purple-800">
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("game.back")}
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-purple-200">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <span className="text-lg font-bold text-purple-100">
            {t("game.score")}: {score}/{totalRounds}
          </span>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 relative">
        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-purple-400/30"
              style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%` }}
              animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
              <div className="text-6xl mb-4">🪞✨</div>
              <h2 className="text-3xl font-bold text-white">{t("game.bravo")}</h2>
              <p className="text-xl text-purple-200">
                {t("game.score")}: {score}/{totalRounds}
              </p>
              <XpGainPopup xpGained={xpGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> {t("game.replay")}
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-purple-400 text-purple-100 hover:bg-purple-800">
                    <Home className="w-4 h-4 mr-2" /> {t("game.home")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-8">
              {/* Mirror instruction */}
              <div className="text-center space-y-3">
                <motion.div
                  animate={{ rotateY: [0, 180, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="text-5xl inline-block"
                >
                  🪞
                </motion.div>
                <h2 className="text-xl font-bold text-white">{t("miroir.instruction")}</h2>
                <p className="text-purple-200 text-sm">{t("miroir.hint")}</p>
              </div>

              {/* Sound display + listen */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="bg-purple-800/60 backdrop-blur border-2 border-purple-400/50 rounded-2xl px-10 py-6 text-center"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168,85,247,0.2)",
                      "0 0 40px rgba(168,85,247,0.4)",
                      "0 0 20px rgba(168,85,247,0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-4xl font-bold text-purple-200">"{current.sound}"</span>
                </motion.div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={speak}
                  className="gap-2 border-purple-400 text-purple-200 hover:bg-purple-400/20 hover:text-purple-100"
                >
                  <Volume2 className="w-5 h-5" /> {t("miroir.listen")}
                </Button>
              </div>

              {/* Mirror options */}
              <div className="flex items-center justify-center gap-6 flex-wrap py-4">
                {current.options.map((option, i) => {
                  const isSelected = selectedOption === option;
                  const isCorrectAnswer = option === current.targetLetter;
                  const showResult = feedback && isSelected;
                  const showCorrectHint = feedback === "wrong" && isCorrectAnswer;
                  const mnemonic = getMnemonic(option);
                  const showingMnemonic = showMnemonic === option && feedback === "wrong" && isSelected;

                  return (
                    <motion.button
                      key={`${round}-${option}-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
                      whileHover={!feedback ? { scale: 1.1, rotate: [-2, 2, 0] } : {}}
                      onClick={() => handleSelect(option)}
                      disabled={!!feedback}
                      className={`
                        relative w-24 h-28 md:w-28 md:h-32 rounded-2xl flex flex-col items-center justify-center
                        border-4 transition-all duration-300
                        ${
                          showResult && feedback === "correct"
                            ? "bg-emerald-500/80 border-emerald-300 scale-110"
                            : showResult && feedback === "wrong"
                            ? "bg-red-500/60 border-red-400"
                            : showCorrectHint
                            ? "bg-emerald-500/40 border-emerald-300 ring-4 ring-emerald-400/50"
                            : "bg-purple-800/50 border-purple-400/40 hover:border-purple-300 hover:bg-purple-700/60 cursor-pointer"
                        }
                        backdrop-blur-sm shadow-lg
                      `}
                    >
                      {/* Mirror reflection effect */}
                      <div className="absolute top-1 right-2 w-4 h-6 bg-white/10 rounded-full blur-sm" />

                      {showingMnemonic && mnemonic ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="flex flex-col items-center gap-1"
                        >
                          <span className="text-3xl">{mnemonic.emoji}</span>
                          <span className="text-xs text-white font-bold">{mnemonic.word}</span>
                        </motion.div>
                      ) : (
                        <span className={`text-5xl md:text-6xl font-bold ${getLetterColor(option) || "text-white"}`}>
                          {option}
                        </span>
                      )}
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
                      ? `${t("miroir.correct")}`
                      : `${t("miroir.wrong")} → ${current.targetLetter}`}
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

export default MiroirGame;
