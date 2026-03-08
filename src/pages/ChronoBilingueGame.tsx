import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2, Timer, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface ChronoChallenge {
  nl: string;
  fr: string;
  distractors: string[]; // FR distractors
}

const EASY: ChronoChallenge[] = [
  { nl: "kat", fr: "chat", distractors: ["chien", "souris"] },
  { nl: "hond", fr: "chien", distractors: ["chat", "oiseau"] },
  { nl: "huis", fr: "maison", distractors: ["école", "jardin"] },
  { nl: "boom", fr: "arbre", distractors: ["fleur", "herbe"] },
  { nl: "water", fr: "eau", distractors: ["lait", "jus"] },
  { nl: "boek", fr: "livre", distractors: ["cahier", "stylo"] },
  { nl: "zon", fr: "soleil", distractors: ["lune", "étoile"] },
  { nl: "vis", fr: "poisson", distractors: ["oiseau", "tortue"] },
  { nl: "melk", fr: "lait", distractors: ["eau", "soupe"] },
  { nl: "brood", fr: "pain", distractors: ["gâteau", "beurre"] },
  { nl: "bal", fr: "ballon", distractors: ["balle", "vélo"] },
  { nl: "bed", fr: "lit", distractors: ["chaise", "table"] },
];

const MEDIUM: ChronoChallenge[] = [
  { nl: "vlinder", fr: "papillon", distractors: ["abeille", "mouche", "coccinelle"] },
  { nl: "school", fr: "école", distractors: ["maison", "église", "hôpital"] },
  { nl: "fiets", fr: "vélo", distractors: ["voiture", "bus", "moto"] },
  { nl: "trein", fr: "train", distractors: ["avion", "bus", "bateau"] },
  { nl: "bloem", fr: "fleur", distractors: ["arbre", "herbe", "feuille"] },
  { nl: "sleutel", fr: "clé", distractors: ["porte", "serrure", "fenêtre"] },
  { nl: "konijn", fr: "lapin", distractors: ["souris", "hamster", "cochon"] },
  { nl: "kasteel", fr: "château", distractors: ["maison", "tour", "pont"] },
  { nl: "appel", fr: "pomme", distractors: ["poire", "orange", "banane"] },
  { nl: "tafel", fr: "table", distractors: ["chaise", "lit", "armoire"] },
  { nl: "regen", fr: "pluie", distractors: ["neige", "vent", "orage"] },
  { nl: "strand", fr: "plage", distractors: ["montagne", "forêt", "lac"] },
];

const HARD: ChronoChallenge[] = [
  { nl: "vliegtuig", fr: "avion", distractors: ["hélicoptère", "fusée", "ballon", "parachute"] },
  { nl: "schildpad", fr: "tortue", distractors: ["crocodile", "serpent", "lézard", "grenouille"] },
  { nl: "bibliotheek", fr: "bibliothèque", distractors: ["librairie", "musée", "cinéma", "théâtre"] },
  { nl: "verjaardag", fr: "anniversaire", distractors: ["vacances", "mariage", "fête", "cadeau"] },
  { nl: "zwembad", fr: "piscine", distractors: ["plage", "rivière", "lac", "fontaine"] },
  { nl: "ontbijt", fr: "petit-déjeuner", distractors: ["déjeuner", "dîner", "goûter", "souper"] },
  { nl: "handschoen", fr: "gant", distractors: ["chaussette", "écharpe", "bonnet", "manteau"] },
  { nl: "aardbei", fr: "fraise", distractors: ["framboise", "cerise", "mûre", "myrtille"] },
  { nl: "ziekenhuis", fr: "hôpital", distractors: ["pharmacie", "clinique", "cabinet", "école"] },
  { nl: "paraplu", fr: "parapluie", distractors: ["parasol", "imperméable", "capuche", "manteau"] },
  { nl: "schaatsen", fr: "patiner", distractors: ["skier", "glisser", "nager", "courir"] },
  { nl: "boodschappen", fr: "courses", distractors: ["promenade", "voyage", "sortie", "marché"] },
];

const speak = (text: string, lang = "nl-NL") => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
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

const ChronoBilingueGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("chrono");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return shuffle([...EASY, ...MEDIUM, ...HARD]).slice(0, 15);
    if (difficulty === "medium") return shuffle([...EASY, ...MEDIUM]).slice(0, 12);
    return shuffle([...EASY]).slice(0, 10);
  }, [difficulty]);

  const [challenges, setChallenges] = useState<ChronoChallenge[]>(() => getChallenges());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const globalTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const challenge = challenges[currentIdx];
  const total = challenges.length;
  const timePerWord = difficulty === "hard" ? 6 : difficulty === "medium" ? 8 : 12;

  useEffect(() => {
    if (!challenge || !gameStarted) return;
    const allOptions = shuffle([challenge.fr, ...challenge.distractors]);
    setOptions(allOptions);
    setFeedback(null);
    setSelected(null);
    setTimeLeft(timePerWord);
    speak(challenge.nl);
  }, [currentIdx, challenges, challenge, gameStarted, timePerWord]);

  // Per-word timer
  useEffect(() => {
    if (!gameStarted || done || feedback) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          sounds.wrong();
          setErrors((e) => e + 1);
          setFeedback("wrong");
          setTimeout(() => advanceToNext(false), 1200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, done, feedback, currentIdx]);

  // Global timer
  useEffect(() => {
    if (!gameStarted || done) return;
    globalTimerRef.current = setInterval(() => setTotalTime((t) => t + 1), 1000);
    return () => { if (globalTimerRef.current) clearInterval(globalTimerRef.current); };
  }, [gameStarted, done]);

  const advanceToNext = (wasCorrect: boolean) => {
    setFeedback(null);
    setSelected(null);
    if (currentIdx + 1 >= total) {
      setDone(true);
      const finalScore = wasCorrect ? score + 1 : score;
      saveSession({ score: finalScore, maxScore: total, errorsCount: errors + (wasCorrect ? 0 : 0), completed: true });
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const handleSelect = (option: string) => {
    if (feedback) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(option);

    const isCorrect = option === challenge.fr;
    if (isCorrect) {
      sounds.correct();
      setFeedback("correct");
      setScore((s) => s + 1);
    } else {
      sounds.wrong();
      setFeedback("wrong");
      setErrors((e) => e + 1);
    }

    setTimeout(() => advanceToNext(isCorrect), 1000);
  };

  const startGame = () => setGameStarted(true);

  const restart = () => {
    resetTimer();
    if (timerRef.current) clearInterval(timerRef.current);
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    setChallenges(getChallenges());
    setCurrentIdx(0);
    setScore(0);
    setErrors(0);
    setDone(false);
    setTotalTime(0);
    setGameStarted(false);
    setFeedback(null);
    setSelected(null);
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
          ⏱️ {t("game.chrono.title")}
        </motion.h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          {t("chrono.instruction")}
        </p>

        {!gameStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              ⏱️
            </motion.div>
            <p className="text-lg text-muted-foreground mb-4">{t("chrono.hint")}</p>
            <p className="text-sm text-muted-foreground mb-8">
              ⏱️ {timePerWord}s {t("chrono.perWord")} · {total} {t("chrono.words")}
            </p>
            <Button onClick={startGame} size="lg" className="text-xl px-10 py-6 gap-2">
              <Zap className="w-6 h-6" /> {t("chrono.start")}
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Progress & global timer */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>{t("game.score")}: {score}/{total}</span>
                <span className="flex items-center gap-1">
                  <Timer className="w-3 h-3" /> {totalTime}s
                </span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>

            {/* Per-word timer */}
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
                    {/* NL word */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="bg-card border-2 border-primary/30 rounded-2xl px-10 py-6 mb-2 shadow-lg"
                    >
                      <span className="text-4xl md:text-5xl font-bold text-primary">
                        {challenge.nl}
                      </span>
                    </motion.div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speak(challenge.nl)}
                      className="gap-1 mb-4 text-muted-foreground"
                    >
                      <Volume2 className="w-4 h-4" /> {t("chrono.listen")}
                    </Button>

                    <p className="text-sm text-muted-foreground mb-4">
                      🇫🇷 {t("chrono.chooseFR")}
                    </p>

                    {/* FR options */}
                    <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-6">
                      {options.map((option, i) => (
                        <motion.button
                          key={`${option}-${i}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelect(option)}
                          className={`px-4 py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                            selected === option
                              ? feedback === "correct"
                                ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300"
                                : "bg-red-500/20 border-red-500 text-red-700 dark:text-red-300"
                              : option === challenge.fr && feedback === "wrong"
                              ? "bg-green-500/10 border-green-400 text-green-600"
                              : "bg-card text-foreground border-border hover:border-primary/60"
                          }`}
                        >
                          {option}
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
                          className={`text-center text-lg font-bold p-3 rounded-2xl w-full ${
                            feedback === "correct" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {feedback === "correct"
                            ? `${t("chrono.correct")} ${challenge.nl} = ${challenge.fr}`
                            : `${t("chrono.wrong")} ${challenge.fr}`}
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
                  <div className="text-6xl mb-4">⏱️✨</div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">{t("game.bravo")}</h2>
                  <p className="text-xl text-muted-foreground mb-2">{t("chrono.bravo")}</p>
                  <div className="flex justify-center gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{score}/{total}</p>
                      <p className="text-sm text-muted-foreground">{t("game.score")}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{totalTime}s</p>
                      <p className="text-sm text-muted-foreground">{t("chrono.totalTime")}</p>
                    </div>
                  </div>

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

export default ChronoBilingueGame;
