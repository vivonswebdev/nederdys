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

interface MoutonChallenge {
  category: string; // e.g. "Dieren" (animals)
  words: string[];  // 3-4 words from the category + 1 intruder
  intruder: string;  // the odd one out
}

const EASY: MoutonChallenge[] = [
  { category: "Dieren", words: ["kat", "hond", "vis", "tafel"], intruder: "tafel" },
  { category: "Fruit", words: ["appel", "banaan", "kers", "stoel"], intruder: "stoel" },
  { category: "Kleuren", words: ["rood", "blauw", "groen", "boom"], intruder: "boom" },
  { category: "Lichaam", words: ["oog", "neus", "mond", "boek"], intruder: "boek" },
  { category: "Familie", words: ["mama", "papa", "zus", "auto"], intruder: "auto" },
  { category: "Eten", words: ["brood", "kaas", "melk", "fiets"], intruder: "fiets" },
  { category: "Kleding", words: ["broek", "jas", "schoen", "zon"], intruder: "zon" },
  { category: "School", words: ["pen", "boek", "tafel", "appel"], intruder: "appel" },
  { category: "Natuur", words: ["boom", "bloem", "zon", "bed"], intruder: "bed" },
  { category: "Huis", words: ["deur", "raam", "bed", "vis"], intruder: "vis" },
];

const MEDIUM: MoutonChallenge[] = [
  { category: "Vervoer", words: ["auto", "fiets", "trein", "boot", "taart"], intruder: "taart" },
  { category: "Weer", words: ["regen", "sneeuw", "wind", "bliksem", "gitaar"], intruder: "gitaar" },
  { category: "Sport", words: ["voetbal", "tennis", "zwemmen", "skiën", "piano"], intruder: "piano" },
  { category: "Muziek", words: ["piano", "gitaar", "viool", "trompet", "wortel"], intruder: "wortel" },
  { category: "Groenten", words: ["wortel", "aardappel", "ui", "tomaat", "vlinder"], intruder: "vlinder" },
  { category: "Insecten", words: ["vlinder", "bij", "mier", "spin", "kasteel"], intruder: "kasteel" },
  { category: "Beroepen", words: ["dokter", "leraar", "kok", "politie", "regen"], intruder: "regen" },
  { category: "Meubels", words: ["stoel", "tafel", "kast", "bank", "hond"], intruder: "hond" },
  { category: "Seizoenen", words: ["lente", "zomer", "herfst", "winter", "schoen"], intruder: "schoen" },
  { category: "Feesten", words: ["kerstmis", "pasen", "carnaval", "sinterklaas", "fiets"], intruder: "fiets" },
];

const HARD: MoutonChallenge[] = [
  { category: "Werkwoorden van beweging", words: ["lopen", "rennen", "springen", "zwemmen", "slapen"], intruder: "slapen" },
  { category: "Emoties", words: ["blij", "verdrietig", "boos", "bang", "groot"], intruder: "groot" },
  { category: "Keuken", words: ["pan", "bord", "vork", "mes", "boek"], intruder: "boek" },
  { category: "Badkamer", words: ["zeep", "handdoek", "tandenborstel", "spiegel", "brood"], intruder: "brood" },
  { category: "Vormen", words: ["cirkel", "driehoek", "vierkant", "ster", "leraar"], intruder: "leraar" },
  { category: "Planeten", words: ["aarde", "mars", "venus", "jupiter", "appel"], intruder: "appel" },
  { category: "Materialen", words: ["hout", "metaal", "glas", "plastic", "dinsdag"], intruder: "dinsdag" },
  { category: "Dagen", words: ["maandag", "dinsdag", "woensdag", "vrijdag", "blauw"], intruder: "blauw" },
  { category: "Maanden", words: ["januari", "maart", "juni", "december", "stoel"], intruder: "stoel" },
  { category: "Zintuigen", words: ["zien", "horen", "ruiken", "proeven", "lopen"], intruder: "lopen" },
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

const MoutonNoirGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("mouton");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return shuffle([...EASY, ...MEDIUM, ...HARD]).slice(0, 10);
    if (difficulty === "medium") return shuffle([...EASY, ...MEDIUM]).slice(0, 8);
    return shuffle([...EASY]).slice(0, 6);
  }, [difficulty]);

  const [challenges, setChallenges] = useState<MoutonChallenge[]>(() => getChallenges());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);

  const challenge = challenges[currentIdx];
  const total = challenges.length;

  useEffect(() => {
    if (!challenge) return;
    setShuffledWords(shuffle(challenge.words));
    setFeedback(null);
    setSelected(null);
  }, [currentIdx, challenges, challenge]);

  const handleSelect = (word: string) => {
    if (feedback) return;
    setSelected(word);
    speak(word);

    const isCorrect = word === challenge.intruder;
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
      setSelected(null);
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

  const restart = () => {
    resetTimer();
    setChallenges(getChallenges());
    setCurrentIdx(0);
    setScore(0);
    setErrors(0);
    setDone(false);
    setFeedback(null);
    setSelected(null);
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
          🐑 {t("game.mouton.title")}
        </motion.h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          {t("mouton.instruction")}
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
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} className={`text-lg ${i < score ? "opacity-100" : "opacity-30"}`}>
                {i < score ? "🐑" : "🐑"}
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
                {/* Category hint */}
                <div className="bg-primary/10 text-primary rounded-full px-5 py-2 font-bold text-sm mb-4">
                  📁 {challenge.category}
                </div>

                <p className="text-sm text-muted-foreground mb-6">{t("mouton.hint")}</p>

                {/* Word options */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-6">
                  {shuffledWords.map((word, i) => {
                    const isIntruder = word === challenge.intruder;
                    const isSelected = selected === word;
                    return (
                      <motion.button
                        key={`${word}-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleSelect(word)}
                        className={`px-4 py-5 rounded-2xl font-bold text-lg border-2 transition-all shadow-md ${
                          isSelected
                            ? feedback === "correct"
                              ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300"
                              : "bg-red-500/20 border-red-500 text-red-700 dark:text-red-300"
                            : feedback === "wrong" && isIntruder
                            ? "bg-green-500/10 border-green-400 text-green-600"
                            : "bg-card text-foreground border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Volume2 className="w-4 h-4 opacity-40" />
                          {word}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-center text-lg font-bold p-4 rounded-2xl w-full ${
                        feedback === "correct" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {feedback === "correct"
                        ? `${t("mouton.correct")} "${challenge.intruder}" 🐑🖤`
                        : `${t("mouton.wrong")}`}
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
              <div className="text-6xl mb-4">🐑✨</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{t("game.bravo")}</h2>
              <p className="text-xl text-muted-foreground mb-2">{t("mouton.bravo")}</p>
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

export default MoutonNoirGame;
