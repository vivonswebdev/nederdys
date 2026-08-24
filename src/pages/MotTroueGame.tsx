import { useState, useCallback, useEffect } from "react";
import { speakTarget } from "@/lib/bilingual";
import { Tb, BilingualInstruction } from "@/components/ui/BilingualText";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface HoleChallenge {
  word: string;
  display: string; // e.g. "k_t" 
  missingLetters: string; // e.g. "a"
  options: string[];
}

const EASY: HoleChallenge[] = [
  { word: "kat", display: "k_t", missingLetters: "a", options: ["a", "o", "e"] },
  { word: "hond", display: "h_nd", missingLetters: "o", options: ["o", "a", "u"] },
  { word: "vis", display: "v_s", missingLetters: "i", options: ["i", "a", "u"] },
  { word: "boom", display: "b__m", missingLetters: "oo", options: ["oo", "aa", "ee"] },
  { word: "maan", display: "m__n", missingLetters: "aa", options: ["aa", "oo", "ee"] },
  { word: "zon", display: "z_n", missingLetters: "o", options: ["o", "a", "u"] },
  { word: "bed", display: "b_d", missingLetters: "e", options: ["e", "a", "i"] },
  { word: "bal", display: "b_l", missingLetters: "a", options: ["a", "o", "e"] },
  { word: "huis", display: "h__s", missingLetters: "ui", options: ["ui", "oi", "ei"] },
  { word: "boek", display: "b__k", missingLetters: "oe", options: ["oe", "oo", "ee"] },
];

const MEDIUM: HoleChallenge[] = [
  { word: "school", display: "sch__l", missingLetters: "oo", options: ["oo", "oe", "ou", "aa"] },
  { word: "bloem", display: "bl__m", missingLetters: "oe", options: ["oe", "oo", "ee", "aa"] },
  { word: "trein", display: "tr__n", missingLetters: "ei", options: ["ei", "ee", "ui", "ij"] },
  { word: "fiets", display: "f__ts", missingLetters: "ie", options: ["ie", "ee", "ei", "ij"] },
  { word: "vuur", display: "v__r", missingLetters: "uu", options: ["uu", "oo", "aa", "ee"] },
  { word: "deur", display: "d__r", missingLetters: "eu", options: ["eu", "oe", "ou", "ui"] },
  { word: "muis", display: "m__s", missingLetters: "ui", options: ["ui", "oi", "ei", "uu"] },
  { word: "koud", display: "k__d", missingLetters: "ou", options: ["ou", "oe", "au", "oo"] },
  { word: "bijl", display: "b__l", missingLetters: "ij", options: ["ij", "ei", "ie", "ui"] },
  { word: "kauw", display: "k__w", missingLetters: "au", options: ["au", "ou", "oo", "aa"] },
];

const HARD: HoleChallenge[] = [
  { word: "vlinder", display: "vl_nd_r", missingLetters: "i-e", options: ["i-e", "e-i", "a-e", "i-a"] },
  { word: "chocolade", display: "ch_c_lade", missingLetters: "o-o", options: ["o-o", "a-o", "o-a", "e-o"] },
  { word: "paraplu", display: "p_r_plu", missingLetters: "a-a", options: ["a-a", "a-e", "e-a", "o-a"] },
  { word: "olifant", display: "_lif_nt", missingLetters: "o-a", options: ["o-a", "a-o", "o-e", "e-a"] },
  { word: "konijn", display: "k_n_jn", missingLetters: "o-i", options: ["o-i", "o-e", "a-i", "o-a"] },
  { word: "schildpad", display: "sch_ldp_d", missingLetters: "i-a", options: ["i-a", "i-e", "e-a", "a-a"] },
  { word: "krokodil", display: "kr_k_dil", missingLetters: "o-o", options: ["o-o", "a-o", "o-a", "e-o"] },
  { word: "giraf", display: "g_r_f", missingLetters: "i-a", options: ["i-a", "e-a", "i-e", "a-a"] },
  { word: "papegaai", display: "p_peg__i", missingLetters: "a-aa", options: ["a-aa", "a-oo", "e-aa", "a-ee"] },
  { word: "kasteel", display: "k_st__l", missingLetters: "a-ee", options: ["a-ee", "a-oo", "e-ee", "a-aa"] },
];

const speak = (text: string) => {
  speakTarget(text, undefined, 0.8);
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const MotTroueGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("mottroue");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return shuffle([...EASY, ...MEDIUM, ...HARD]).slice(0, 10);
    if (difficulty === "medium") return shuffle([...EASY, ...MEDIUM]).slice(0, 8);
    return shuffle([...EASY]).slice(0, 6);
  }, [difficulty]);

  const [challenges, setChallenges] = useState<HoleChallenge[]>(() => getChallenges());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);

  const challenge = challenges[currentIdx];
  const total = challenges.length;

  useEffect(() => {
    if (!challenge) return;
    setShuffledOptions(shuffle(challenge.options));
    setFeedback(null);
    setSelectedOption(null);
    setTimeout(() => speak(challenge.word), 400);
  }, [currentIdx, challenges, challenge]);

  const handleSelect = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);

    const isCorrect = option === challenge.missingLetters;
    if (isCorrect) {
      sounds.correct();
      setFeedback("correct");
      setScore((s) => s + 1);
      speak(challenge.word);
    } else {
      sounds.wrong();
      setFeedback("wrong");
      setErrors((e) => e + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
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
    setSelectedOption(null);
  };

  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const progress = (score / total) * 100;

  // Build display with highlighted holes
  const renderWord = () => {
    const parts = challenge.display.split("_");
    return (
      <div className="flex items-center justify-center text-4xl md:text-6xl font-bold tracking-wider">
        {parts.map((part, i) => (
          <span key={i}>
            <span className="text-foreground">{part}</span>
            {i < parts.length - 1 && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block w-8 md:w-10 h-12 md:h-16 mx-0.5 bg-primary/10 border-b-4 border-primary rounded-sm"
              />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> <Tb k="game.back" />
            </Button>
          </Link>
          <DifficultyIndicator difficulty={difficulty} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2"
        >
          🕳️ <Tb k="game.mottroue.title" />
        </motion.h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          <BilingualInstruction k="mottroue.instruction" />
        </p>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span><Tb k="game.score" />: {score}/{total}</span>
            <span>{currentIdx + 1}/{total}</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} className={`text-lg ${i < score ? "opacity-100" : "opacity-30"}`}>
                🕳️
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
                {/* Listen */}
                <Button variant="outline" onClick={handleListen} className="gap-2 mb-6">
                  <Volume2 className="w-5 h-5" /> <Tb k="mottroue.listen" />
                </Button>

                {/* Word with holes */}
                <div className="bg-card border border-border rounded-2xl p-8 mb-6 shadow-lg w-full text-center">
                  {renderWord()}
                </div>

                <p className="text-sm text-muted-foreground mb-4"><Tb k="mottroue.hint" /></p>

                {/* Letter options */}
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {shuffledOptions.map((option, i) => (
                    <motion.button
                      key={`${option}-${i}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSelect(option)}
                      className={`px-6 py-4 rounded-2xl font-bold text-2xl shadow-md border-2 transition-all min-w-[70px] ${
                        selectedOption === option
                          ? feedback === "correct"
                            ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300"
                            : feedback === "wrong"
                            ? "bg-red-500/20 border-red-500 text-red-700 dark:text-red-300"
                            : "border-primary"
                          : "bg-card text-foreground border-border hover:border-primary/50"
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
                      className={`text-center text-xl font-bold p-4 rounded-2xl w-full ${
                        feedback === "correct" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {feedback === "correct"
                        ? `$<Tb k="mottroue.correct" /> ${challenge.word}`
                        : t("mottroue.wrong")}
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
              <div className="text-6xl mb-4">🕳️✨</div>
              <h2 className="text-3xl font-bold text-foreground mb-2"><Tb k="game.bravo" /></h2>
              <p className="text-xl text-muted-foreground mb-2">
                <Tb k="mottroue.bravo" />
              </p>
              <p className="text-lg font-bold text-primary mb-6">
                <Tb k="game.score" />: {score}/{total}
              </p>

              <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />

              <div className="flex gap-4 justify-center mt-8">
                <Button onClick={restart} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> <Tb k="game.replay" />
                </Button>
                <Link to="/">
                  <Button variant="outline" className="gap-2">
                    <Home className="w-4 h-4" /> <Tb k="game.home" />
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

export default MotTroueGame;
