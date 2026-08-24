import { useState, useCallback, useEffect } from "react";
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

interface SortWord {
  word: string;
  category: string;
}

interface SortChallenge {
  categories: string[];
  categoryLabels: Record<string, string>;
  words: SortWord[];
}

const EASY: SortChallenge[] = [
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "kat", category: "de" },
      { word: "hond", category: "de" },
      { word: "huis", category: "het" },
      { word: "boek", category: "het" },
      { word: "boom", category: "de" },
      { word: "kind", category: "het" },
    ],
  },
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "school", category: "de" },
      { word: "auto", category: "de" },
      { word: "meisje", category: "het" },
      { word: "paard", category: "het" },
      { word: "tafel", category: "de" },
      { word: "bed", category: "het" },
    ],
  },
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "stoel", category: "de" },
      { word: "fiets", category: "de" },
      { word: "ei", category: "het" },
      { word: "raam", category: "het" },
      { word: "maan", category: "de" },
      { word: "water", category: "het" },
    ],
  },
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "vogel", category: "de" },
      { word: "bloem", category: "de" },
      { word: "dier", category: "het" },
      { word: "brood", category: "het" },
      { word: "deur", category: "de" },
      { word: "licht", category: "het" },
    ],
  },
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "zon", category: "de" },
      { word: "vis", category: "de" },
      { word: "glas", category: "het" },
      { word: "hart", category: "het" },
      { word: "bal", category: "de" },
      { word: "oog", category: "het" },
    ],
  },
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "tuin", category: "de" },
      { word: "kerk", category: "de" },
      { word: "been", category: "het" },
      { word: "jaar", category: "het" },
      { word: "neus", category: "de" },
      { word: "oor", category: "het" },
    ],
  },
];

const MEDIUM: SortChallenge[] = [
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "vlinder", category: "de" },
      { word: "konijn", category: "het" },
      { word: "sleutel", category: "de" },
      { word: "kasteel", category: "het" },
      { word: "rivier", category: "de" },
      { word: "verhaal", category: "het" },
      { word: "trein", category: "de" },
      { word: "gebouw", category: "het" },
    ],
  },
  {
    categories: ["enkelvoud", "meervoud"],
    categoryLabels: { enkelvoud: "Enkelvoud 1️⃣", meervoud: "Meervoud 🔢" },
    words: [
      { word: "kat", category: "enkelvoud" },
      { word: "katten", category: "meervoud" },
      { word: "hond", category: "enkelvoud" },
      { word: "honden", category: "meervoud" },
      { word: "boom", category: "enkelvoud" },
      { word: "bomen", category: "meervoud" },
      { word: "vis", category: "enkelvoud" },
      { word: "vissen", category: "meervoud" },
    ],
  },
  {
    categories: ["enkelvoud", "meervoud"],
    categoryLabels: { enkelvoud: "Enkelvoud 1️⃣", meervoud: "Meervoud 🔢" },
    words: [
      { word: "bloem", category: "enkelvoud" },
      { word: "bloemen", category: "meervoud" },
      { word: "stoel", category: "enkelvoud" },
      { word: "stoelen", category: "meervoud" },
      { word: "boek", category: "enkelvoud" },
      { word: "boeken", category: "meervoud" },
      { word: "huis", category: "enkelvoud" },
      { word: "huizen", category: "meervoud" },
    ],
  },
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "broek", category: "de" },
      { word: "probleem", category: "het" },
      { word: "lamp", category: "de" },
      { word: "geheim", category: "het" },
      { word: "winkel", category: "de" },
      { word: "monster", category: "het" },
      { word: "straat", category: "de" },
      { word: "feest", category: "het" },
    ],
  },
  {
    categories: ["enkelvoud", "meervoud"],
    categoryLabels: { enkelvoud: "Enkelvoud 1️⃣", meervoud: "Meervoud 🔢" },
    words: [
      { word: "dier", category: "enkelvoud" },
      { word: "dieren", category: "meervoud" },
      { word: "kind", category: "enkelvoud" },
      { word: "kinderen", category: "meervoud" },
      { word: "ei", category: "enkelvoud" },
      { word: "eieren", category: "meervoud" },
      { word: "stad", category: "enkelvoud" },
      { word: "steden", category: "meervoud" },
    ],
  },
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "leraar", category: "de" },
      { word: "meisje", category: "het" },
      { word: "computer", category: "de" },
      { word: "avontuur", category: "het" },
      { word: "familie", category: "de" },
      { word: "cadeau", category: "het" },
      { word: "keuken", category: "de" },
      { word: "recept", category: "het" },
    ],
  },
];

const HARD: SortChallenge[] = [
  {
    categories: ["zelfstandig", "bijvoeglijk", "werkwoord"],
    categoryLabels: { zelfstandig: "Zelfst. 📦", bijvoeglijk: "Bijv. 🎨", werkwoord: "Werkw. ⚡" },
    words: [
      { word: "huis", category: "zelfstandig" },
      { word: "groot", category: "bijvoeglijk" },
      { word: "lopen", category: "werkwoord" },
      { word: "school", category: "zelfstandig" },
      { word: "mooi", category: "bijvoeglijk" },
      { word: "spelen", category: "werkwoord" },
      { word: "boom", category: "zelfstandig" },
      { word: "klein", category: "bijvoeglijk" },
      { word: "eten", category: "werkwoord" },
    ],
  },
  {
    categories: ["zelfstandig", "bijvoeglijk", "werkwoord"],
    categoryLabels: { zelfstandig: "Zelfst. 📦", bijvoeglijk: "Bijv. 🎨", werkwoord: "Werkw. ⚡" },
    words: [
      { word: "fiets", category: "zelfstandig" },
      { word: "snel", category: "bijvoeglijk" },
      { word: "zwemmen", category: "werkwoord" },
      { word: "tafel", category: "zelfstandig" },
      { word: "oud", category: "bijvoeglijk" },
      { word: "lezen", category: "werkwoord" },
      { word: "kat", category: "zelfstandig" },
      { word: "lief", category: "bijvoeglijk" },
      { word: "schrijven", category: "werkwoord" },
    ],
  },
  {
    categories: ["de", "het"],
    categoryLabels: { de: "de 🔵", het: "het 🟡" },
    words: [
      { word: "bibliotheek", category: "de" },
      { word: "laboratorium", category: "het" },
      { word: "universiteit", category: "de" },
      { word: "experiment", category: "het" },
      { word: "hypotheek", category: "de" },
      { word: "reglement", category: "het" },
      { word: "chocolade", category: "de" },
      { word: "aquarium", category: "het" },
      { word: "discussie", category: "de" },
      { word: "document", category: "het" },
    ],
  },
  {
    categories: ["zelfstandig", "bijvoeglijk", "werkwoord"],
    categoryLabels: { zelfstandig: "Zelfst. 📦", bijvoeglijk: "Bijv. 🎨", werkwoord: "Werkw. ⚡" },
    words: [
      { word: "vliegtuig", category: "zelfstandig" },
      { word: "gevaarlijk", category: "bijvoeglijk" },
      { word: "vliegen", category: "werkwoord" },
      { word: "avontuur", category: "zelfstandig" },
      { word: "spannend", category: "bijvoeglijk" },
      { word: "ontdekken", category: "werkwoord" },
      { word: "dokter", category: "zelfstandig" },
      { word: "gezond", category: "bijvoeglijk" },
      { word: "genezen", category: "werkwoord" },
    ],
  },
  {
    categories: ["enkelvoud", "meervoud"],
    categoryLabels: { enkelvoud: "Enkelvoud 1️⃣", meervoud: "Meervoud 🔢" },
    words: [
      { word: "museum", category: "enkelvoud" },
      { word: "musea", category: "meervoud" },
      { word: "datum", category: "enkelvoud" },
      { word: "data", category: "meervoud" },
      { word: "man", category: "enkelvoud" },
      { word: "mannen", category: "meervoud" },
      { word: "blad", category: "enkelvoud" },
      { word: "bladeren", category: "meervoud" },
      { word: "koe", category: "enkelvoud" },
      { word: "koeien", category: "meervoud" },
    ],
  },
  {
    categories: ["zelfstandig", "bijvoeglijk", "werkwoord"],
    categoryLabels: { zelfstandig: "Zelfst. 📦", bijvoeglijk: "Bijv. 🎨", werkwoord: "Werkw. ⚡" },
    words: [
      { word: "computer", category: "zelfstandig" },
      { word: "digitaal", category: "bijvoeglijk" },
      { word: "programmeren", category: "werkwoord" },
      { word: "robot", category: "zelfstandig" },
      { word: "automatisch", category: "bijvoeglijk" },
      { word: "bouwen", category: "werkwoord" },
      { word: "wetenschap", category: "zelfstandig" },
      { word: "nieuwsgierig", category: "bijvoeglijk" },
      { word: "onderzoeken", category: "werkwoord" },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  de: "bg-blue-500/20 border-blue-400 text-blue-700 dark:text-blue-300",
  het: "bg-yellow-500/20 border-yellow-400 text-yellow-700 dark:text-yellow-300",
  enkelvoud: "bg-emerald-500/20 border-emerald-400 text-emerald-700 dark:text-emerald-300",
  meervoud: "bg-purple-500/20 border-purple-400 text-purple-700 dark:text-purple-300",
  zelfstandig: "bg-orange-500/20 border-orange-400 text-orange-700 dark:text-orange-300",
  bijvoeglijk: "bg-pink-500/20 border-pink-400 text-pink-700 dark:text-pink-300",
  werkwoord: "bg-cyan-500/20 border-cyan-400 text-cyan-700 dark:text-cyan-300",
};

const speak = (text: string) => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "nl-BE";
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

const TrieurGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("trieur");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return shuffle([...EASY, ...MEDIUM, ...HARD]).slice(0, 8);
    if (difficulty === "medium") return shuffle([...EASY, ...MEDIUM]).slice(0, 6);
    return shuffle([...EASY]).slice(0, 5);
  }, [difficulty]);

  const [challenges, setChallenges] = useState<SortChallenge[]>(() => getChallenges());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<SortWord[]>([]);
  const [sorted, setSorted] = useState<Record<string, SortWord[]>>({});
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedWord, setSelectedWord] = useState<SortWord | null>(null);

  const challenge = challenges[currentIdx];
  const total = challenges.length;

  // Initialize shuffled words when challenge changes
  useEffect(() => {
    if (!challenge) return;
    setShuffledWords(shuffle(challenge.words));
    const empty: Record<string, SortWord[]> = {};
    challenge.categories.forEach((c) => (empty[c] = []));
    setSorted(empty);
    setSelectedWord(null);
    setFeedback(null);
  }, [currentIdx, challenges, challenge]);

  const handleWordClick = (word: SortWord) => {
    if (feedback) return;
    setSelectedWord(word);
    speak(word.word);
  };

  const handleCategoryClick = (category: string) => {
    if (!selectedWord || feedback) return;

    const isCorrect = selectedWord.category === category;

    if (isCorrect) {
      sounds.correct();
      setFeedback("correct");
      setSorted((prev) => ({
        ...prev,
        [category]: [...prev[category], selectedWord],
      }));
      setShuffledWords((prev) => prev.filter((w) => w.word !== selectedWord.word));
      setScore((s) => s + 1);
    } else {
      sounds.wrong();
      setFeedback("wrong");
      setErrors((e) => e + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedWord(null);

      // Check if all words sorted in this challenge
      if (isCorrect) {
        const remaining = shuffledWords.length - 1; // -1 because we just sorted one
        if (remaining <= 0) {
          // Move to next challenge
          if (currentIdx + 1 >= total) {
            setDone(true);
            const finalScore = score + 1;
            const maxScore = challenges.reduce((sum, c) => sum + c.words.length, 0);
            saveSession({ score: finalScore, maxScore, errorsCount: errors, completed: true });
          } else {
            setCurrentIdx((i) => i + 1);
          }
        }
      }
    }, 800);
  };

  const restart = () => {
    resetTimer();
    const newChallenges = getChallenges();
    setChallenges(newChallenges);
    setCurrentIdx(0);
    setScore(0);
    setErrors(0);
    setDone(false);
    setFeedback(null);
    setSelectedWord(null);
  };

  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const maxScore = challenges.reduce((sum, c) => sum + c.words.length, 0);
  const progress = ((score) / maxScore) * 100;

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
          🗂️ <Tb k="game.trieur.title" />
        </motion.h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          <BilingualInstruction k="trieur.instruction" />
        </p>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span><Tb k="game.score" />: {score}/{maxScore}</span>
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
              <span key={i} className={`text-lg ${i < currentIdx ? "opacity-100" : i === currentIdx ? "animate-pulse" : "opacity-30"}`}>
                🗂️
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
                {/* Category bins */}
                <div className={`grid gap-4 mb-6 ${challenge.categories.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {challenge.categories.map((cat) => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleCategoryClick(cat)}
                      className={`rounded-2xl border-2 border-dashed p-4 min-h-[120px] flex flex-col items-center transition-all ${
                        CATEGORY_COLORS[cat] || "bg-muted border-border"
                      } ${selectedWord ? "cursor-pointer ring-2 ring-primary/30" : "cursor-default"}`}
                    >
                      <span className="font-bold text-sm mb-2">
                        {challenge.categoryLabels[cat]}
                      </span>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {sorted[cat]?.map((w) => (
                          <motion.span
                            key={w.word}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-card text-foreground text-xs px-2 py-1 rounded-full shadow-sm border border-border"
                          >
                            {w.word}
                          </motion.span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Hint */}
                <p className="text-center text-sm text-muted-foreground mb-4">
                  <Tb k="trieur.hint" />
                </p>

                {/* Words to sort */}
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {shuffledWords.map((word) => (
                    <motion.button
                      key={word.word}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWordClick(word)}
                      className={`px-5 py-3 rounded-xl font-bold text-lg shadow-md transition-all border-2 ${
                        selectedWord?.word === word.word
                          ? "bg-primary text-primary-foreground border-primary scale-105"
                          : "bg-card text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 opacity-50" />
                        {word.word}
                      </div>
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
                      className={`text-center text-xl font-bold p-3 rounded-2xl ${
                        feedback === "correct" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {feedback === "correct" ? t("trieur.correct") : t("trieur.wrong")}
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
              <div className="text-6xl mb-4">🗂️✨</div>
              <h2 className="text-3xl font-bold text-foreground mb-2"><Tb k="game.bravo" /></h2>
              <p className="text-xl text-muted-foreground mb-2">
                <Tb k="trieur.bravo" />
              </p>
              <p className="text-lg font-bold text-primary mb-6">
                <Tb k="game.score" />: {score}/{maxScore}
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

export default TrieurGame;
