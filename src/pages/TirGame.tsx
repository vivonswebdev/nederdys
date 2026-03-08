import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface TirChallenge {
  target: string;
  distractors: string[];
}

const EASY: TirChallenge[] = [
  { target: "kat", distractors: ["kas", "kat", "kar"] },
  { target: "hond", distractors: ["hond", "hons", "honk"] },
  { target: "boom", distractors: ["boor", "boom", "boot"] },
  { target: "vis", distractors: ["vis", "vit", "vin"] },
  { target: "huis", distractors: ["huil", "huid", "huis"] },
  { target: "zon", distractors: ["zon", "zop", "zor"] },
  { target: "bal", distractors: ["bak", "bal", "bar"] },
  { target: "bed", distractors: ["bed", "ben", "bes"] },
  { target: "maan", distractors: ["maar", "maan", "maat"] },
  { target: "boek", distractors: ["boel", "boek", "boer"] },
];

const MEDIUM: TirChallenge[] = [
  { target: "school", distractors: ["school", "schoor", "schoot", "schoon"] },
  { target: "vlinder", distractors: ["vlinter", "vlinder", "vlinker", "vlinder"] },
  { target: "konijn", distractors: ["konijm", "konijn", "konijs", "konijr"] },
  { target: "sleutel", distractors: ["sleutel", "sleukel", "sleuter", "sleufel"] },
  { target: "bloem", distractors: ["bloen", "bloem", "bloer", "bloes"] },
  { target: "trein", distractors: ["trein", "treil", "treir", "treis"] },
  { target: "fiets", distractors: ["fieks", "fiels", "fiets", "fiers"] },
  { target: "appel", distractors: ["appel", "appek", "apper", "appes"] },
  { target: "water", distractors: ["waker", "water", "waler", "waner"] },
  { target: "tafel", distractors: ["tarel", "takel", "tafel", "tapel"] },
];

const HARD: TirChallenge[] = [
  { target: "bibliotheek", distractors: ["bibliotheek", "biblioteek", "bibliotheep", "bibliotheel", "bibiotheek"] },
  { target: "vliegtuig", distractors: ["vliegtuid", "vliegtuig", "vlietguig", "vliegtuik", "vleigtuig"] },
  { target: "schildpad", distractors: ["schilbad", "schildpad", "schilpad", "schildbad", "schiltpad"] },
  { target: "chocolade", distractors: ["chocolade", "chocolake", "chocodale", "chocolede", "chocolabe"] },
  { target: "paraplu", distractors: ["parablu", "paraplu", "paraply", "paraplo", "parapku"] },
  { target: "verjaardag", distractors: ["verjaardag", "verjaardag", "verjaardak", "verjaardat", "verjaardab"] },
  { target: "zwembad", distractors: ["zwembad", "zwenbar", "zwembat", "zwenbar", "zwembab"] },
  { target: "aardappel", distractors: ["aardapel", "aardappel", "aarbappel", "aardapper", "aardappek"] },
  { target: "olifant", distractors: ["olifant", "olisant", "olifand", "olefant", "olifamt"] },
  { target: "dinosaurus", distractors: ["dinasaurus", "dinosaurus", "dinosaures", "dinusaurus", "dinosaurns"] },
];

const speak = (text: string) => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "nl-NL";
  u.rate = 0.85;
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

const TirGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("tir");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return shuffle([...EASY, ...MEDIUM, ...HARD]).slice(0, 12);
    if (difficulty === "medium") return shuffle([...EASY, ...MEDIUM]).slice(0, 10);
    return shuffle([...EASY]).slice(0, 8);
  }, [difficulty]);

  const [challenges, setChallenges] = useState<TirChallenge[]>(() => getChallenges());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const challenge = challenges[currentIdx];
  const total = challenges.length;
  const timePerWord = difficulty === "hard" ? 5 : difficulty === "medium" ? 7 : 10;

  useEffect(() => {
    if (!challenge || !gameStarted) return;
    // Deduplicate options
    const unique = [...new Set(challenge.distractors)];
    setShuffledOptions(shuffle(unique));
    setFeedback(null);
    setSelectedWord(null);
    setTimeLeft(timePerWord);
    speak(challenge.target);
  }, [currentIdx, challenges, challenge, gameStarted, timePerWord]);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || done || feedback) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - count as error
          sounds.wrong();
          setErrors((e) => e + 1);
          setFeedback("wrong");
          setTimeout(() => {
            setFeedback(null);
            if (currentIdx + 1 >= total) {
              setDone(true);
              saveSession({ score, maxScore: total, errorsCount: errors + 1, completed: true });
            } else {
              setCurrentIdx((i) => i + 1);
            }
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStarted, done, feedback, currentIdx, total, score, errors, saveSession]);

  const handleSelect = (word: string) => {
    if (feedback) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedWord(word);

    const isCorrect = word === challenge.target;
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
      setSelectedWord(null);
      if (isCorrect) {
        if (currentIdx + 1 >= total) {
          setDone(true);
          saveSession({ score: score + 1, maxScore: total, errorsCount: errors, completed: true });
        } else {
          setCurrentIdx((i) => i + 1);
        }
      } else {
        // Wrong: move on anyway (timed game)
        if (currentIdx + 1 >= total) {
          setDone(true);
          saveSession({ score, maxScore: total, errorsCount: errors + 1, completed: true });
        } else {
          setCurrentIdx((i) => i + 1);
        }
      }
    }, 1000);
  };

  const handleListen = () => speak(challenge.target);

  const startGame = () => {
    setGameStarted(true);
  };

  const restart = () => {
    resetTimer();
    if (timerRef.current) clearInterval(timerRef.current);
    const nc = getChallenges();
    setChallenges(nc);
    setCurrentIdx(0);
    setScore(0);
    setErrors(0);
    setDone(false);
    setFeedback(null);
    setSelectedWord(null);
    setGameStarted(false);
  };

  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const progress = (score / total) * 100;
  const timerPercent = (timeLeft / timePerWord) * 100;

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
          🎯 {t("game.tir.title")}
        </motion.h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          {t("tir.instruction")}
        </p>

        {!gameStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-7xl mb-6">🎯</div>
            <p className="text-lg text-muted-foreground mb-4">{t("tir.hint")}</p>
            <p className="text-sm text-muted-foreground mb-8">
              ⏱️ {timePerWord}s {t("tir.perWord")}
            </p>
            <Button onClick={startGame} size="lg" className="text-xl px-10 py-6">
              {t("tir.start")}
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>{t("game.score")}: {score}/{total}</span>
                <span>{currentIdx + 1}/{total}</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>

            {/* Timer bar */}
            {!done && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="w-4 h-4 text-muted-foreground" />
                  <span className={`text-sm font-bold ${timeLeft <= 2 ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full transition-colors ${
                      timeLeft <= 2 ? "bg-red-500" : timeLeft <= 4 ? "bg-yellow-500" : "bg-primary"
                    }`}
                    animate={{ width: `${timerPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {!done ? (
                challenge && (
                  <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center"
                  >
                    {/* Listen button */}
                    <Button variant="outline" onClick={handleListen} className="gap-2 mb-6">
                      <Volume2 className="w-5 h-5" /> {t("tir.listen")}
                    </Button>

                    {/* Word options as targets */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg mb-6">
                      {shuffledOptions.map((word, i) => (
                        <motion.button
                          key={`${word}-${i}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => handleSelect(word)}
                          className={`px-4 py-4 rounded-2xl font-bold text-lg shadow-md border-2 transition-all ${
                            selectedWord === word
                              ? feedback === "correct"
                                ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300"
                                : "bg-red-500/20 border-red-500 text-red-700 dark:text-red-300"
                              : word === challenge.target && feedback === "wrong"
                              ? "bg-green-500/10 border-green-400 text-green-600"
                              : "bg-card text-foreground border-border hover:border-primary/60"
                          }`}
                        >
                          🎯 {word}
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
                          className={`text-center text-xl font-bold p-3 rounded-2xl w-full ${
                            feedback === "correct" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {feedback === "correct" ? t("tir.correct") : `${t("tir.wrong")} "${challenge.target}"`}
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
                  <div className="text-6xl mb-4">🎯✨</div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">{t("game.bravo")}</h2>
                  <p className="text-xl text-muted-foreground mb-2">
                    {t("tir.bravo")}
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
          </>
        )}
      </div>
    </div>
  );
};

export default TirGame;
