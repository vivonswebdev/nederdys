import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface TrainChallenge {
  word: string;
  syllables: string[];
}

const EASY_WORDS: TrainChallenge[] = [
  { word: "banaan", syllables: ["ba", "naan"] },
  { word: "appel", syllables: ["ap", "pel"] },
  { word: "water", syllables: ["wa", "ter"] },
  { word: "mama", syllables: ["ma", "ma"] },
  { word: "papa", syllables: ["pa", "pa"] },
  { word: "boter", syllables: ["bo", "ter"] },
  { word: "tafel", syllables: ["ta", "fel"] },
  { word: "lopen", syllables: ["lo", "pen"] },
  { word: "eten", syllables: ["e", "ten"] },
  { word: "deken", syllables: ["de", "ken"] },
];

const MEDIUM_WORDS: TrainChallenge[] = [
  { word: "keuken", syllables: ["keu", "ken"] },
  { word: "chocolade", syllables: ["cho", "co", "la", "de"] },
  { word: "olifant", syllables: ["o", "li", "fant"] },
  { word: "computer", syllables: ["com", "pu", "ter"] },
  { word: "vlinder", syllables: ["vlin", "der"] },
  { word: "konijn", syllables: ["ko", "nijn"] },
  { word: "paraplu", syllables: ["pa", "ra", "plu"] },
  { word: "vakantie", syllables: ["va", "kan", "tie"] },
];

const HARD_WORDS: TrainChallenge[] = [
  { word: "ziekenhuis", syllables: ["zie", "ken", "huis"] },
  { word: "boodschappen", syllables: ["bood", "schap", "pen"] },
  { word: "verjaardag", syllables: ["ver", "jaar", "dag"] },
  { word: "schoolmeester", syllables: ["school", "mees", "ter"] },
  { word: "huiswerk", syllables: ["huis", "werk"] },
  { word: "zwembad", syllables: ["zwem", "bad"] },
  { word: "fietsenstalling", syllables: ["fiet", "sen", "stal", "ling"] },
  { word: "tandenborstel", syllables: ["tan", "den", "bor", "stel"] },
];

interface Wagon {
  id: string;
  syllable: string;
  correctIndex: number;
}

const TrainGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("train");

  const getWords = useCallback(() => {
    if (difficulty === "hard") return [...EASY_WORDS, ...MEDIUM_WORDS, ...HARD_WORDS];
    if (difficulty === "medium") return [...EASY_WORDS, ...MEDIUM_WORDS];
    return EASY_WORDS;
  }, [difficulty]);

  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [hintIndex, setHintIndex] = useState<number | null>(null);
  const [trainDeparting, setTrainDeparting] = useState(false);

  const totalRounds = 6;
  const [shuffledWords, setShuffledWords] = useState<TrainChallenge[]>([]);

  useEffect(() => {
    const words = getWords();
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledWords(shuffled);
  }, [difficulty]);

  const current = shuffledWords[round];
  const [wagons, setWagons] = useState<Wagon[]>([]);

  useEffect(() => {
    if (current) {
      const w = current.syllables.map((s, i) => ({
        id: `w${i}-${s}`,
        syllable: s,
        correctIndex: i,
      }));
      // Shuffle wagons
      const shuffled = [...w].sort(() => Math.random() - 0.5);
      // Ensure not already correct
      if (shuffled.every((wg, i) => wg.correctIndex === i) && shuffled.length > 1) {
        [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
      }
      setWagons(shuffled);
      setFeedback(null);
      setHintIndex(null);
      setTrainDeparting(false);
    }
  }, [round, current]);

  const speakWord = useCallback(() => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.word);
    u.lang = "nl-NL";
    u.rate = 0.75;
    speechSynthesis.speak(u);
    sounds.click();
  }, [current]);

  const speakSyllable = useCallback((syllable: string) => {
    const u = new SpeechSynthesisUtterance(syllable);
    u.lang = "nl-NL";
    u.rate = 0.6;
    speechSynthesis.speak(u);
    sounds.click();
  }, []);

  // Auto-speak on new round
  useEffect(() => {
    if (current) {
      const timer = setTimeout(speakWord, 500);
      return () => clearTimeout(timer);
    }
  }, [round, current]);

  const checkOrder = useCallback(() => {
    if (!current || feedback === "correct") return;
    const isCorrect = wagons.every((w, i) => w.correctIndex === i);

    if (isCorrect) {
      setFeedback("correct");
      sounds.correct();
      setScore((s) => s + 1);
      setTrainDeparting(true);

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
      // Hint: highlight first wagon position
      setHintIndex(0);
      setTimeout(() => {
        setFeedback(null);
        setTimeout(() => setHintIndex(null), 2000);
      }, 1500);
    }
  }, [wagons, current, round, totalRounds, score, errors, saveSession, feedback]);

  const restart = () => {
    setRound(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    setFeedback(null);
    setHintIndex(null);
    setTrainDeparting(false);
    resetTimer();
    const words = getWords();
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledWords(shuffled);
  };

  if (!current && !finished) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-green-50 to-sky-100 dark:from-emerald-950 dark:via-green-950 dark:to-sky-950 overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-700 dark:bg-emerald-900 border-b border-emerald-600 p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-emerald-100 hover:text-white hover:bg-emerald-600">
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("game.back")}
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-emerald-100">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <div className="text-lg font-bold text-emerald-100">
            {t("game.score")}: {score}/{totalRounds}
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-8 px-4">
        {/* Railroad tracks decoration */}
        <div className="absolute left-0 right-0 bottom-32 h-4 pointer-events-none opacity-20">
          <div className="h-1 bg-amber-800 mx-4" />
          <div className="flex justify-between mx-4 mt-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-amber-800" />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
              <motion.div
                className="text-6xl"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                🚂💨
              </motion.div>
              <h2 className="text-3xl font-bold text-foreground">{t("game.bravo")}</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl">🐸</span>
                <p className="text-xl text-muted-foreground font-bold">Goed gedaan!</p>
              </div>
              <p className="text-lg text-muted-foreground">
                {t("game.score")}: {score}/{totalRounds}
              </p>
              <XpGainPopup xpGained={xpGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> {t("game.replay")}
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg">
                    <Home className="w-4 h-4 mr-2" /> {t("game.home")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-8">
              {/* Conductor frog */}
              <div className="text-center space-y-3">
                <motion.div
                  className="text-5xl inline-block"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🐸🧢
                </motion.div>
                <h2 className="text-xl font-bold text-foreground">{t("train.instruction")}</h2>
                <p className="text-muted-foreground text-sm">{t("train.hint")}</p>
              </div>

              {/* Listen to full word */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={speakWord}
                  className="gap-2 border-emerald-400 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900"
                >
                  <Volume2 className="w-5 h-5" /> {t("train.listenWord")}
                </Button>
              </div>

              {/* Train track area */}
              <div className="relative">
                {/* Rails */}
                <div className="absolute bottom-0 left-0 right-0 h-3 flex flex-col gap-0.5">
                  <div className="h-1 bg-amber-700/40 rounded" />
                  <div className="h-1 bg-amber-700/40 rounded" />
                </div>

                {/* Locomotive */}
                <div className="flex items-end gap-0 overflow-hidden pb-4">
                  <motion.div
                    className="flex-shrink-0 text-4xl md:text-5xl"
                    animate={trainDeparting ? { x: [0, 600], opacity: [1, 1, 0] } : { x: 0 }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                  >
                    🚂
                  </motion.div>

                  {/* Wagons - reorderable */}
                  <Reorder.Group
                    axis="x"
                    values={wagons}
                    onReorder={setWagons}
                    className="flex gap-2 items-end flex-1 overflow-x-auto pb-1"
                  >
                    {wagons.map((wagon, i) => {
                      const isHinted = hintIndex !== null && wagon.correctIndex === hintIndex;
                      return (
                        <Reorder.Item key={wagon.id} value={wagon}>
                          <motion.div
                            animate={
                              trainDeparting
                                ? { x: [0, 600], opacity: [1, 1, 0] }
                                : isHinted
                                ? { scale: [1, 1.08, 1], borderColor: ["#10b981", "#34d399", "#10b981"] }
                                : {}
                            }
                            transition={
                              trainDeparting
                                ? { duration: 1.5, ease: "easeIn", delay: (i + 1) * 0.1 }
                                : isHinted
                                ? { duration: 1, repeat: Infinity }
                                : {}
                            }
                            className={`
                              relative bg-amber-400 dark:bg-amber-500 rounded-lg border-4 border-amber-600 dark:border-amber-700
                              px-4 py-3 md:px-6 md:py-4 cursor-grab active:cursor-grabbing
                              shadow-lg select-none min-w-[60px] text-center
                              hover:bg-amber-300 dark:hover:bg-amber-400 transition-colors
                            `}
                            onClick={() => speakSyllable(wagon.syllable)}
                          >
                            {/* Wagon wheels */}
                            <div className="absolute -bottom-2 left-2 w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-500" />
                            <div className="absolute -bottom-2 right-2 w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-500" />
                            {/* Coupling */}
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-2 bg-gray-500 rounded" />

                            <span className="text-lg md:text-2xl font-bold text-amber-900 font-mono tracking-wider">
                              {wagon.syllable}
                            </span>
                            <div className="text-amber-700 text-xs mt-0.5">🔊</div>
                          </motion.div>
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                </div>
              </div>

              {/* Validate button */}
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  onClick={checkOrder}
                  disabled={feedback === "correct"}
                  className="text-lg px-8 py-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {t("train.depart")} 🚂💨
                </Button>
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
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                        : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {feedback === "correct"
                      ? `✅ ${t("train.correct")} → ${current.word}`
                      : `🚃💨 ${t("train.wrong")}`}
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

export default TrainGame;
