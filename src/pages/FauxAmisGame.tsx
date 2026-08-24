import { useState, useCallback, useEffect } from "react";
import { Tb, BilingualInstruction } from "@/components/ui/BilingualText";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface FauxAmiChallenge {
  word: string;
  frMeaning: string;
  nlMeaning: string;
  isFauxAmi: boolean; // true = faux-ami (meanings differ), false = vrai ami
  emoji: string;
  nlEmoji: string;
}

const EASY_CHALLENGES: FauxAmiChallenge[] = [
  { word: "boom", frMeaning: "💥 explosion", nlMeaning: "🌳 arbre / boom", isFauxAmi: true, emoji: "💥", nlEmoji: "🌳" },
  { word: "kat", frMeaning: "🐱 chat", nlMeaning: "🐱 chat / kat", isFauxAmi: false, emoji: "🐱", nlEmoji: "🐱" },
  { word: "rok", frMeaning: "🪨 roc", nlMeaning: "👗 jupe / rok", isFauxAmi: true, emoji: "🪨", nlEmoji: "👗" },
  { word: "pot", frMeaning: "🏺 pot", nlMeaning: "🏺 pot / pot", isFauxAmi: false, emoji: "🏺", nlEmoji: "🏺" },
  { word: "room", frMeaning: "🛋️ pièce (anglais)", nlMeaning: "🍦 crème / room", isFauxAmi: true, emoji: "🛋️", nlEmoji: "🍦" },
  { word: "lamp", frMeaning: "💡 lampe", nlMeaning: "💡 lampe / lamp", isFauxAmi: false, emoji: "💡", nlEmoji: "💡" },
];

const MEDIUM_CHALLENGES: FauxAmiChallenge[] = [
  { word: "bril", frMeaning: "💎 brillant", nlMeaning: "👓 lunettes / bril", isFauxAmi: true, emoji: "💎", nlEmoji: "👓" },
  { word: "chocolade", frMeaning: "🍫 chocolat", nlMeaning: "🍫 chocolat / chocolade", isFauxAmi: false, emoji: "🍫", nlEmoji: "🍫" },
  { word: "brand", frMeaning: "🏷️ marque", nlMeaning: "🔥 incendie / brand", isFauxAmi: true, emoji: "🏷️", nlEmoji: "🔥" },
  { word: "bank", frMeaning: "🏦 banque", nlMeaning: "🛋️ canapé / bank", isFauxAmi: true, emoji: "🏦", nlEmoji: "🛋️" },
  { word: "film", frMeaning: "🎬 film", nlMeaning: "🎬 film / film", isFauxAmi: false, emoji: "🎬", nlEmoji: "🎬" },
  { word: "tas", frMeaning: "📦 tas", nlMeaning: "👜 sac / tas", isFauxAmi: true, emoji: "📦", nlEmoji: "👜" },
];

const HARD_CHALLENGES: FauxAmiChallenge[] = [
  { word: "slim", frMeaning: "🤏 mince", nlMeaning: "🧠 intelligent / slim", isFauxAmi: true, emoji: "🤏", nlEmoji: "🧠" },
  { word: "vers", frMeaning: "📝 vers (poésie)", nlMeaning: "🥬 frais / vers", isFauxAmi: true, emoji: "📝", nlEmoji: "🥬" },
  { word: "telefoon", frMeaning: "📞 téléphone", nlMeaning: "📞 téléphone / telefoon", isFauxAmi: false, emoji: "📞", nlEmoji: "📞" },
  { word: "raar", frMeaning: "💎 rare", nlMeaning: "🤪 bizarre / raar", isFauxAmi: true, emoji: "💎", nlEmoji: "🤪" },
  { word: "lopen", frMeaning: "🐺 louper", nlMeaning: "🚶 marcher / lopen", isFauxAmi: true, emoji: "🐺", nlEmoji: "🚶" },
  { word: "garage", frMeaning: "🚗 garage", nlMeaning: "🚗 garage / garage", isFauxAmi: false, emoji: "🚗", nlEmoji: "🚗" },
];

const FauxAmisGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("fauxamis");

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
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);

  const challenges = getChallenges();
  const totalRounds = Math.min(challenges.length, 8);
  const [shuffledChallenges, setShuffledChallenges] = useState<FauxAmiChallenge[]>([]);

  useEffect(() => {
    const shuffled = [...challenges].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledChallenges(shuffled);
  }, [difficulty]);

  const current = shuffledChallenges[round];

  useEffect(() => {
    if (current) {
      setFeedback(null);
      setUserAnswer(null);
    }
  }, [round, current]);

  const speak = useCallback(() => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.word);
    u.lang = "nl-BE";
    u.rate = 0.7;
    speechSynthesis.speak(u);
    sounds.click();
  }, [current]);

  useEffect(() => {
    if (current) {
      const timer = setTimeout(speak, 600);
      return () => clearTimeout(timer);
    }
  }, [round, current]);

  const handleAnswer = useCallback(
    (answeredFauxAmi: boolean) => {
      if (feedback) return;
      setUserAnswer(answeredFauxAmi);

      const isCorrect = answeredFauxAmi === current.isFauxAmi;

      if (isCorrect) {
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
        }, 2000);
      } else {
        setFeedback("wrong");
        sounds.wrong();
        setErrors((e) => e + 1);
        setTimeout(() => {
          setFeedback(null);
          setUserAnswer(null);
        }, 3000);
      }
    },
    [feedback, current, round, totalRounds, score, errors, saveSession]
  );

  const restart = () => {
    setRound(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    setFeedback(null);
    setUserAnswer(null);
    resetTimer();
    const shuffled = [...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledChallenges(shuffled);
  };

  if (!current && !finished) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 via-orange-900 to-red-950 overflow-hidden">
      {/* Header */}
      <div className="bg-amber-950/80 backdrop-blur border-b border-amber-700/50 p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-amber-200 hover:text-white hover:bg-amber-800">
              <ArrowLeft className="w-4 h-4 mr-1" /> <Tb k="game.back" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-amber-200">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <span className="text-lg font-bold text-amber-100">
            <Tb k="game.score" />: {score}/{totalRounds}
          </span>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{ left: `${8 + i * 16}%`, top: `${10 + (i % 3) * 30}%` }}
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.5 }}
            >
              {i % 2 === 0 ? "🇫🇷" : "🇳🇱"}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
              <div className="text-6xl mb-4">🤝</div>
              <h2 className="text-3xl font-bold text-white"><Tb k="game.bravo" /></h2>
              <p className="text-xl text-amber-200">
                <Tb k="game.score" />: {score}/{totalRounds}
              </p>
              <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> <Tb k="game.replay" />
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-amber-400 text-amber-100 hover:bg-amber-800">
                    <Home className="w-4 h-4 mr-2" /> <Tb k="game.home" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-8">
              {/* Instruction */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-white"><BilingualInstruction k="fauxamis.instruction" /></h2>
                <p className="text-amber-200 text-sm"><Tb k="fauxamis.hint" /></p>
              </div>

              {/* Word card */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="bg-amber-800/60 backdrop-blur border-2 border-amber-400/50 rounded-3xl px-12 py-8 text-center"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(251,191,36,0.2)",
                      "0 0 40px rgba(251,191,36,0.4)",
                      "0 0 20px rgba(251,191,36,0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-5xl md:text-6xl font-bold text-white tracking-wider">{current.word}</span>
                </motion.div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={speak}
                  className="gap-2 border-amber-400 text-amber-200 hover:bg-amber-400/20 hover:text-amber-100"
                >
                  <Volume2 className="w-5 h-5" /> <Tb k="fauxamis.listen" />
                </Button>
              </div>

              {/* Question */}
              <div className="text-center">
                <p className="text-lg text-amber-100 font-bold"><Tb k="fauxamis.question" /></p>
              </div>

              {/* Answer buttons */}
              <div className="flex items-stretch justify-center gap-4 md:gap-6">
                {/* Vrai Ami button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(false)}
                  disabled={!!feedback}
                  className={`
                    flex-1 max-w-[200px] rounded-2xl p-6 border-4 flex flex-col items-center gap-3 transition-all
                    ${
                      feedback && userAnswer === false
                        ? feedback === "correct"
                          ? "bg-emerald-500/60 border-emerald-300"
                          : "bg-red-500/60 border-red-400"
                        : "bg-emerald-900/40 border-emerald-500/40 hover:border-emerald-300 hover:bg-emerald-800/50 cursor-pointer"
                    }
                  `}
                >
                  <ThumbsUp className="w-10 h-10 text-emerald-300" />
                  <span className="text-lg font-bold text-emerald-200"><Tb k="fauxamis.vraiAmi" /></span>
                  <span className="text-xs text-emerald-300/70"><Tb k="fauxamis.vraiAmiDesc" /></span>
                </motion.button>

                {/* Faux Ami button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(true)}
                  disabled={!!feedback}
                  className={`
                    flex-1 max-w-[200px] rounded-2xl p-6 border-4 flex flex-col items-center gap-3 transition-all
                    ${
                      feedback && userAnswer === true
                        ? feedback === "correct"
                          ? "bg-emerald-500/60 border-emerald-300"
                          : "bg-red-500/60 border-red-400"
                        : "bg-red-900/40 border-red-500/40 hover:border-red-300 hover:bg-red-800/50 cursor-pointer"
                    }
                  `}
                >
                  <ThumbsDown className="w-10 h-10 text-red-300" />
                  <span className="text-lg font-bold text-red-200"><Tb k="fauxamis.fauxAmi" /></span>
                  <span className="text-xs text-red-300/70"><Tb k="fauxamis.fauxAmiDesc" /></span>
                </motion.button>
              </div>

              {/* Feedback with explanation */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-center p-5 rounded-2xl space-y-3 ${
                      feedback === "correct"
                        ? "bg-emerald-500/30 border border-emerald-400/30"
                        : "bg-red-500/30 border border-red-400/30"
                    }`}
                  >
                    <p className="text-xl font-bold text-white">
                      {feedback === "correct" ? t("fauxamis.correct") : t("fauxamis.wrong")}
                    </p>
                    <div className="flex items-center justify-center gap-6">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{current.emoji}</span>
                        <span className="text-sm text-amber-200">🇫🇷 {current.frMeaning}</span>
                      </div>
                      <span className="text-2xl text-white">→</span>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{current.nlEmoji}</span>
                        <span className="text-sm text-amber-200">🇳🇱 {current.nlMeaning}</span>
                      </div>
                    </div>
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

export default FauxAmisGame;
