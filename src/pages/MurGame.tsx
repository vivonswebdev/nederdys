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

interface WallChallenge {
  sentence: string;
  words: string[]; // correct order
}

const EASY: WallChallenge[] = [
  { sentence: "De kat slaapt.", words: ["De", "kat", "slaapt."] },
  { sentence: "Ik drink melk.", words: ["Ik", "drink", "melk."] },
  { sentence: "De hond blaft.", words: ["De", "hond", "blaft."] },
  { sentence: "Hij eet brood.", words: ["Hij", "eet", "brood."] },
  { sentence: "Zij leest een boek.", words: ["Zij", "leest", "een", "boek."] },
  { sentence: "Wij spelen buiten.", words: ["Wij", "spelen", "buiten."] },
  { sentence: "De zon schijnt.", words: ["De", "zon", "schijnt."] },
  { sentence: "Ik ga naar school.", words: ["Ik", "ga", "naar", "school."] },
  { sentence: "De vis zwemt.", words: ["De", "vis", "zwemt."] },
  { sentence: "Mama kookt eten.", words: ["Mama", "kookt", "eten."] },
];

const MEDIUM: WallChallenge[] = [
  { sentence: "De kinderen spelen in de tuin.", words: ["De", "kinderen", "spelen", "in", "de", "tuin."] },
  { sentence: "Mijn kat eet graag vis.", words: ["Mijn", "kat", "eet", "graag", "vis."] },
  { sentence: "Wij gaan morgen naar het park.", words: ["Wij", "gaan", "morgen", "naar", "het", "park."] },
  { sentence: "De leraar leest een verhaal voor.", words: ["De", "leraar", "leest", "een", "verhaal", "voor."] },
  { sentence: "Het meisje tekent een bloem.", words: ["Het", "meisje", "tekent", "een", "bloem."] },
  { sentence: "Papa rijdt met de auto.", words: ["Papa", "rijdt", "met", "de", "auto."] },
  { sentence: "De vogel zingt in de boom.", words: ["De", "vogel", "zingt", "in", "de", "boom."] },
  { sentence: "Ik heb een rode fiets.", words: ["Ik", "heb", "een", "rode", "fiets."] },
  { sentence: "De hond rent door het bos.", words: ["De", "hond", "rent", "door", "het", "bos."] },
  { sentence: "Zij zwemt elke dag in het zwembad.", words: ["Zij", "zwemt", "elke", "dag", "in", "het", "zwembad."] },
];

const HARD: WallChallenge[] = [
  { sentence: "De kleine jongen heeft een grote rode bal.", words: ["De", "kleine", "jongen", "heeft", "een", "grote", "rode", "bal."] },
  { sentence: "Gisteren hebben wij een film gekeken.", words: ["Gisteren", "hebben", "wij", "een", "film", "gekeken."] },
  { sentence: "De kat springt op de tafel en drinkt melk.", words: ["De", "kat", "springt", "op", "de", "tafel", "en", "drinkt", "melk."] },
  { sentence: "Morgen gaan we met de trein naar Amsterdam.", words: ["Morgen", "gaan", "we", "met", "de", "trein", "naar", "Amsterdam."] },
  { sentence: "Het regent buiten maar ik heb geen paraplu.", words: ["Het", "regent", "buiten", "maar", "ik", "heb", "geen", "paraplu."] },
  { sentence: "De dokter zegt dat ik gezond ben.", words: ["De", "dokter", "zegt", "dat", "ik", "gezond", "ben."] },
  { sentence: "Kun je mij helpen met mijn huiswerk?", words: ["Kun", "je", "mij", "helpen", "met", "mijn", "huiswerk?"] },
  { sentence: "De bibliotheek is gesloten op zondag.", words: ["De", "bibliotheek", "is", "gesloten", "op", "zondag."] },
  { sentence: "Ik wil graag een boterham met kaas.", words: ["Ik", "wil", "graag", "een", "boterham", "met", "kaas."] },
  { sentence: "Na school gaan de kinderen naar huis.", words: ["Na", "school", "gaan", "de", "kinderen", "naar", "huis."] },
];

const BRICK_COLORS = [
  "bg-red-400/80 border-red-500",
  "bg-amber-400/80 border-amber-500",
  "bg-emerald-400/80 border-emerald-500",
  "bg-blue-400/80 border-blue-500",
  "bg-violet-400/80 border-violet-500",
  "bg-pink-400/80 border-pink-500",
  "bg-cyan-400/80 border-cyan-500",
  "bg-orange-400/80 border-orange-500",
  "bg-lime-400/80 border-lime-500",
  "bg-rose-400/80 border-rose-500",
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

const MurGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("mur");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return shuffle([...EASY, ...MEDIUM, ...HARD]).slice(0, 8);
    if (difficulty === "medium") return shuffle([...EASY, ...MEDIUM]).slice(0, 6);
    return shuffle([...EASY]).slice(0, 5);
  }, [difficulty]);

  const [challenges, setChallenges] = useState<WallChallenge[]>(() => getChallenges());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const challenge = challenges[currentIdx];
  const total = challenges.length;

  useEffect(() => {
    if (!challenge) return;
    setShuffledWords(shuffle(challenge.words));
    setPlacedWords([]);
    setFeedback(null);
    setShowCorrect(false);
    // Auto-speak the sentence
    setTimeout(() => speak(challenge.sentence), 400);
  }, [currentIdx, challenges, challenge]);

  const handleWordClick = (word: string, idx: number) => {
    if (feedback) return;
    sounds.click();
    setPlacedWords((prev) => [...prev, word]);
    setShuffledWords((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePlacedClick = (idx: number) => {
    if (feedback) return;
    const word = placedWords[idx];
    setShuffledWords((prev) => [...prev, word]);
    setPlacedWords((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleValidate = () => {
    if (placedWords.length !== challenge.words.length) return;

    const isCorrect = placedWords.every((w, i) => w === challenge.words[i]);

    if (isCorrect) {
      sounds.correct();
      setFeedback("correct");
      setScore((s) => s + 1);
      speak(challenge.sentence);
      setTimeout(() => {
        setFeedback(null);
        if (currentIdx + 1 >= total) {
          setDone(true);
          saveSession({ score: score + 1, maxScore: total, errorsCount: errors, completed: true });
        } else {
          setCurrentIdx((i) => i + 1);
        }
      }, 1500);
    } else {
      sounds.wrong();
      setFeedback("wrong");
      setErrors((e) => e + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setFeedback(null);
        setShowCorrect(false);
        // Reset the words
        setShuffledWords(shuffle(challenge.words));
        setPlacedWords([]);
      }, 2500);
    }
  };

  const handleListen = () => speak(challenge.sentence);

  const restart = () => {
    resetTimer();
    const newChallenges = getChallenges();
    setChallenges(newChallenges);
    setCurrentIdx(0);
    setScore(0);
    setErrors(0);
    setDone(false);
    setFeedback(null);
    setShowCorrect(false);
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
          🧱 {t("game.mur.title")}
        </motion.h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          {t("mur.instruction")}
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
          {/* Brick wall progress */}
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} className={`text-lg ${i < score ? "opacity-100" : "opacity-30"}`}>
                🧱
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
              >
                {/* Listen button */}
                <div className="text-center mb-4">
                  <Button variant="outline" onClick={handleListen} className="gap-2">
                    <Volume2 className="w-5 h-5" /> {t("mur.listen")}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mb-4">
                  {t("mur.hint")}
                </p>

                {/* Wall: placed words */}
                <div className="bg-card border-2 border-dashed border-border rounded-2xl p-4 min-h-[80px] mb-6 flex flex-wrap gap-2 items-center justify-center">
                  {placedWords.length === 0 && (
                    <span className="text-muted-foreground text-sm italic">
                      {t("mur.wallEmpty")}
                    </span>
                  )}
                  {placedWords.map((word, i) => (
                    <motion.button
                      key={`placed-${i}`}
                      initial={{ scale: 0, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlacedClick(i)}
                      className={`px-4 py-2 rounded-lg font-bold text-foreground shadow-md border-2 transition-all cursor-pointer ${BRICK_COLORS[i % BRICK_COLORS.length]}`}
                    >
                      {word}
                    </motion.button>
                  ))}
                </div>

                {/* Available words (bricks) */}
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {shuffledWords.map((word, i) => (
                    <motion.button
                      key={`avail-${word}-${i}`}
                      layout
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWordClick(word, i)}
                      className="px-5 py-3 bg-card text-foreground rounded-xl font-bold text-lg shadow-md border-2 border-border hover:border-primary/50 transition-all cursor-pointer"
                    >
                      {word}
                    </motion.button>
                  ))}
                </div>

                {/* Validate button */}
                {placedWords.length === challenge.words.length && !feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <Button onClick={handleValidate} size="lg" className="text-lg px-8 py-4">
                      {t("mur.validate")}
                    </Button>
                  </motion.div>
                )}

                {/* Feedback */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-center text-xl font-bold p-4 rounded-2xl mt-4 ${
                        feedback === "correct" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {feedback === "correct" ? t("mur.correct") : t("mur.wrong")}
                      {showCorrect && (
                        <p className="text-sm mt-2 text-muted-foreground font-normal">
                          {challenge.sentence}
                        </p>
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
              <div className="text-6xl mb-4">🧱✨</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{t("game.bravo")}</h2>
              <p className="text-xl text-muted-foreground mb-2">
                {t("mur.bravo")}
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

export default MurGame;
