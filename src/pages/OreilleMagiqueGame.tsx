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

interface EarChallenge {
  word: string;
  correctEmoji: string;
  options: string[]; // emojis including correct one
}

const EASY: EarChallenge[] = [
  { word: "kat", correctEmoji: "🐱", options: ["🐱", "🐕", "🐟"] },
  { word: "hond", correctEmoji: "🐕", options: ["🐱", "🐕", "🐸"] },
  { word: "vis", correctEmoji: "🐟", options: ["🐟", "🐦", "🐛"] },
  { word: "appel", correctEmoji: "🍎", options: ["🍎", "🍌", "🍇"] },
  { word: "zon", correctEmoji: "☀️", options: ["☀️", "🌙", "⭐"] },
  { word: "boom", correctEmoji: "🌳", options: ["🌳", "🌸", "🍄"] },
  { word: "huis", correctEmoji: "🏠", options: ["🏠", "🏫", "⛪"] },
  { word: "boot", correctEmoji: "⛵", options: ["⛵", "🚗", "🚲"] },
  { word: "bal", correctEmoji: "⚽", options: ["⚽", "🎾", "🏀"] },
  { word: "bloem", correctEmoji: "🌸", options: ["🌸", "🌳", "🍃"] },
];

const MEDIUM: EarChallenge[] = [
  { word: "vlinder", correctEmoji: "🦋", options: ["🦋", "🐝", "🐜", "🕷️"] },
  { word: "konijn", correctEmoji: "🐰", options: ["🐰", "🐿️", "🐭", "🐹"] },
  { word: "gitaar", correctEmoji: "🎸", options: ["🎸", "🎹", "🎺", "🥁"] },
  { word: "regen", correctEmoji: "🌧️", options: ["🌧️", "❄️", "☀️", "💨"] },
  { word: "taart", correctEmoji: "🎂", options: ["🎂", "🍪", "🍦", "🍰"] },
  { word: "trein", correctEmoji: "🚆", options: ["🚆", "🚗", "✈️", "🚌"] },
  { word: "schildpad", correctEmoji: "🐢", options: ["🐢", "🐊", "🐍", "🦎"] },
  { word: "wortel", correctEmoji: "🥕", options: ["🥕", "🥔", "🧅", "🍅"] },
  { word: "piano", correctEmoji: "🎹", options: ["🎹", "🎸", "🎻", "🎺"] },
  { word: "paraplu", correctEmoji: "☂️", options: ["☂️", "🌂", "🧤", "🧣"] },
];

const HARD: EarChallenge[] = [
  { word: "helikopter", correctEmoji: "🚁", options: ["🚁", "✈️", "🚀", "🛩️", "🪂"] },
  { word: "aardappel", correctEmoji: "🥔", options: ["🥔", "🥕", "🧅", "🫑", "🌽"] },
  { word: "bibliotheek", correctEmoji: "📚", options: ["📚", "🏫", "🏛️", "🏪", "🏢"] },
  { word: "brandweer", correctEmoji: "🚒", options: ["🚒", "🚑", "🚓", "🚌", "🚕"] },
  { word: "zwembad", correctEmoji: "🏊", options: ["🏊", "🛁", "🌊", "⛵", "🏄"] },
  { word: "verjaardag", correctEmoji: "🎂", options: ["🎂", "🎄", "🎃", "🎁", "🎊"] },
  { word: "slaapkamer", correctEmoji: "🛏️", options: ["🛏️", "🛋️", "🍳", "🛁", "🚿"] },
  { word: "vliegtuig", correctEmoji: "✈️", options: ["✈️", "🚁", "🚀", "🛸", "🪂"] },
  { word: "chocolade", correctEmoji: "🍫", options: ["🍫", "🍬", "🍭", "🍪", "🧁"] },
  { word: "krokodil", correctEmoji: "🐊", options: ["🐊", "🦎", "🐍", "🐢", "🐸"] },
];

const speak = (text: string) => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "nl-NL";
  u.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const OreilleMagiqueGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("oreille");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return shuffle([...EASY, ...MEDIUM, ...HARD]).slice(0, 10);
    if (difficulty === "medium") return shuffle([...EASY, ...MEDIUM]).slice(0, 8);
    return shuffle([...EASY]).slice(0, 6);
  }, [difficulty]);

  const [challenges, setChallenges] = useState<EarChallenge[]>(() => getChallenges());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);

  const challenge = challenges[currentIdx];
  const total = challenges.length;

  useEffect(() => {
    if (!challenge) return;
    setShuffledOptions(shuffle(challenge.options));
    setFeedback(null);
    setSelectedEmoji(null);
    setTimeout(() => speak(challenge.word), 400);
  }, [currentIdx, challenges, challenge]);

  const handleSelect = (emoji: string) => {
    if (feedback) return;
    setSelectedEmoji(emoji);

    const isCorrect = emoji === challenge.correctEmoji;
    if (isCorrect) {
      sounds.correct();
      setFeedback("correct");
      setScore((s) => s + 1);
    } else {
      sounds.wrong();
      setFeedback("wrong");
      setErrors((e) => e + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedEmoji(null);
      if (isCorrect) {
        if (currentIdx + 1 >= total) {
          setDone(true);
          saveSession({ score: score + 1, maxScore: total, errorsCount: errors, completed: true });
        } else {
          setCurrentIdx((i) => i + 1);
        }
      }
    }, 1200);
  };

  const handleListen = () => speak(challenge.word);

  const restart = () => {
    resetTimer();
    const nc = getChallenges();
    setChallenges(nc);
    setCurrentIdx(0);
    setScore(0);
    setErrors(0);
    setDone(false);
    setFeedback(null);
    setSelectedEmoji(null);
  };

  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const progress = (score / total) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("game.back")}
            </Button>
          </Link>
          <DifficultyIndicator difficulty={difficulty} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2"
        >
          👂 {t("game.oreille.title")}
        </motion.h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          {t("oreille.instruction")}
        </p>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>{t("game.score")}: {score}/{total}</span>
            <span>{currentIdx + 1}/{total}</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} className={`text-lg ${i < score ? "opacity-100" : "opacity-30"}`}>
                👂
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            challenge && (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="flex flex-col items-center"
              >
                {/* Big ear animation */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl mb-6"
                >
                  👂
                </motion.div>

                {/* Listen button */}
                <Button variant="outline" onClick={handleListen} size="lg" className="gap-2 mb-4 text-lg">
                  <Volume2 className="w-5 h-5" /> {t("oreille.listen")}
                </Button>

                <p className="text-sm text-muted-foreground mb-6">
                  {t("oreille.hint")}
                </p>

                {/* Emoji options */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
                  {shuffledOptions.map((emoji, i) => (
                    <motion.button
                      key={`${emoji}-${i}`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSelect(emoji)}
                      className={`text-5xl p-4 rounded-2xl border-3 transition-all shadow-lg ${
                        selectedEmoji === emoji
                          ? feedback === "correct"
                            ? "bg-green-500/20 border-green-500 ring-4 ring-green-400/50"
                            : feedback === "wrong"
                            ? "bg-red-500/20 border-red-500 ring-4 ring-red-400/50 animate-shake"
                            : "border-primary"
                          : "bg-card border-border hover:border-primary/50"
                      }`}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-center text-xl font-bold p-4 rounded-2xl w-full ${
                        feedback === "correct" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {feedback === "correct" ? t("oreille.correct") : t("oreille.wrong")}
                      {feedback === "wrong" && (
                        <span className="text-3xl ml-2">{challenge.correctEmoji}</span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">👂✨</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{t("game.bravo")}</h2>
              <p className="text-xl text-muted-foreground mb-2">
                {t("oreille.bravo")}
              </p>
              <p className="text-lg font-bold text-primary mb-6">
                {t("game.score")}: {score}/{total}
              </p>

              <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />

              <div className="flex gap-4 justify-center mt-8">
                <Button onClick={restart} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> {t("game.replay")}
                </Button>
                <Link to="/">
                  <Button variant="outline" className="gap-2">
                    <Home className="w-4 h-4" /> {t("game.home")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OreilleMagiqueGame;
