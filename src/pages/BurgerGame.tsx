import { useState, useCallback, useEffect } from "react";
import { Tb, BilingualInstruction } from "@/components/ui/BilingualText";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface Ingredient {
  id: string;
  label: string;
  type: "subject" | "verb" | "complement" | "end";
  color: string;
  emoji: string;
}

interface SentenceChallenge {
  sentence: string;
  ingredients: Ingredient[];
  correctOrder: string[];
}

const EASY_SENTENCES: SentenceChallenge[] = [
  {
    sentence: "De kat slaapt.",
    ingredients: [
      { id: "s1", label: "De kat", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "v1", label: "slaapt", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["s1", "v1", "e1"],
  },
  {
    sentence: "Ik eet brood.",
    ingredients: [
      { id: "s1", label: "Ik", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "v1", label: "eet", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "c1", label: "brood", type: "complement", color: "bg-green-400", emoji: "🥬" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["s1", "v1", "c1", "e1"],
  },
  {
    sentence: "De hond loopt snel.",
    ingredients: [
      { id: "s1", label: "De hond", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "v1", label: "loopt", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "c1", label: "snel", type: "complement", color: "bg-green-400", emoji: "🥬" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["s1", "v1", "c1", "e1"],
  },
  {
    sentence: "Zij leest een boek.",
    ingredients: [
      { id: "s1", label: "Zij", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "v1", label: "leest", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "c1", label: "een boek", type: "complement", color: "bg-green-400", emoji: "🥬" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["s1", "v1", "c1", "e1"],
  },
];

const MEDIUM_SENTENCES: SentenceChallenge[] = [
  {
    sentence: "Vandaag speelt hij buiten.",
    ingredients: [
      { id: "t1", label: "Vandaag", type: "complement", color: "bg-green-400", emoji: "🥬" },
      { id: "v1", label: "speelt", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "s1", label: "hij", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "c1", label: "buiten", type: "complement", color: "bg-green-400", emoji: "🧀" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["t1", "v1", "s1", "c1", "e1"],
  },
  {
    sentence: "Morgen gaan wij naar school.",
    ingredients: [
      { id: "t1", label: "Morgen", type: "complement", color: "bg-green-400", emoji: "🥬" },
      { id: "v1", label: "gaan", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "s1", label: "wij", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "c1", label: "naar school", type: "complement", color: "bg-green-400", emoji: "🧀" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["t1", "v1", "s1", "c1", "e1"],
  },
  {
    sentence: "In de tuin speelt het kind.",
    ingredients: [
      { id: "t1", label: "In de tuin", type: "complement", color: "bg-green-400", emoji: "🥬" },
      { id: "v1", label: "speelt", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "s1", label: "het kind", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["t1", "v1", "s1", "e1"],
  },
];

const HARD_SENTENCES: SentenceChallenge[] = [
  {
    sentence: "Als het regent, blijven wij binnen.",
    ingredients: [
      { id: "t1", label: "Als het regent", type: "complement", color: "bg-green-400", emoji: "🥬" },
      { id: "v1", label: "blijven", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "s1", label: "wij", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "c1", label: "binnen", type: "complement", color: "bg-green-400", emoji: "🧀" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["t1", "v1", "s1", "c1", "e1"],
  },
  {
    sentence: "Gisteren heeft zij een taart gebakken.",
    ingredients: [
      { id: "t1", label: "Gisteren", type: "complement", color: "bg-green-400", emoji: "🥬" },
      { id: "v1", label: "heeft", type: "verb", color: "bg-red-400", emoji: "🥩" },
      { id: "s1", label: "zij", type: "subject", color: "bg-sky-400", emoji: "🍞" },
      { id: "c1", label: "een taart", type: "complement", color: "bg-green-400", emoji: "🧀" },
      { id: "v2", label: "gebakken", type: "verb", color: "bg-red-400", emoji: "🌶️" },
      { id: "e1", label: ".", type: "end", color: "bg-amber-600", emoji: "🍞" },
    ],
    correctOrder: ["t1", "v1", "s1", "c1", "v2", "e1"],
  },
];

const BurgerGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("burger");

  const getSentences = useCallback(() => {
    if (difficulty === "hard") return [...EASY_SENTENCES, ...MEDIUM_SENTENCES, ...HARD_SENTENCES];
    if (difficulty === "medium") return [...EASY_SENTENCES, ...MEDIUM_SENTENCES];
    return EASY_SENTENCES;
  }, [difficulty]);

  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [shakeIds, setShakeIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const sentences = getSentences();
  const totalRounds = Math.min(sentences.length, 5);
  const [shuffledSentences, setShuffledSentences] = useState<SentenceChallenge[]>([]);

  useEffect(() => {
    const shuffled = [...sentences].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledSentences(shuffled);
  }, [difficulty]);

  const current = shuffledSentences[round];
  const [items, setItems] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (current) {
      setItems([...current.ingredients].sort(() => Math.random() - 0.5));
      setFeedback(null);
      setShakeIds([]);
      setShowHint(false);
    }
  }, [round, current]);

  const speak = useCallback(() => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.sentence);
    u.lang = "nl-BE";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }, [current]);

  const checkOrder = useCallback(() => {
    if (!current) return;
    const currentIds = items.map((i) => i.id);
    const isCorrect = currentIds.every((id, idx) => id === current.correctOrder[idx]);

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
      }, 1200);
    } else {
      setFeedback("wrong");
      sounds.wrong();
      setErrors((e) => e + 1);
      // Find wrong positions and shake them
      const wrongIds = currentIds.filter((id, idx) => id !== current.correctOrder[idx]);
      setShakeIds(wrongIds);
      setShowHint(true);
      setTimeout(() => {
        setFeedback(null);
        setShakeIds([]);
      }, 1500);
    }
  }, [items, current, round, totalRounds, score, errors, saveSession]);

  const restart = () => {
    setRound(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    setFeedback(null);
    setShakeIds([]);
    setShowHint(false);
    resetTimer();
    const shuffled = [...getSentences()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffledSentences(shuffled);
  };

  if (!current && !finished) return null;

  const typeLabel: Record<string, string> = {
    subject: "Sujet / Onderwerp",
    verb: "Verbe / Werkwoord",
    complement: "Complément / Aanvulling",
    end: "Punt",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> <Tb k="game.back" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-foreground">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <div className="text-lg font-bold text-primary">
            <Tb k="game.score" />: {score}/{totalRounds}
          </div>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4">
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
              <div className="text-6xl mb-4">🍔</div>
              <h2 className="text-3xl font-bold text-foreground"><Tb k="game.bravo" /></h2>
              <p className="text-xl text-muted-foreground">
                <Tb k="game.score" />: {score}/{totalRounds}
              </p>
              <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg">
                  <RotateCcw className="w-4 h-4 mr-2" /> <Tb k="game.replay" />
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg">
                    <Home className="w-4 h-4 mr-2" /> <Tb k="game.home" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-6">
              {/* Instruction */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground"><BilingualInstruction k="burger.instruction" /></h2>
                <p className="text-muted-foreground"><Tb k="burger.hint" /></p>
              </div>

              {/* Listen button */}
              <div className="flex justify-center">
                <Button variant="outline" size="lg" onClick={speak} className="gap-2">
                  <Volume2 className="w-5 h-5" /> <Tb k="burger.listen" />
                </Button>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-2 justify-center text-xs">
                {[
                  { emoji: "🍞", label: "Sujet", color: "bg-sky-400" },
                  { emoji: "🥩", label: "Verbe", color: "bg-red-400" },
                  { emoji: "🥬", label: "Complément", color: "bg-green-400" },
                ].map((l) => (
                  <span key={l.label} className={`${l.color} text-white px-2 py-1 rounded-full font-bold`}>
                    {l.emoji} {l.label}
                  </span>
                ))}
              </div>

              {/* Burger assembly area */}
              <div className="bg-card rounded-2xl border-2 border-dashed border-border p-6 min-h-[280px]">
                <div className="text-center text-sm text-muted-foreground mb-4"><Tb k="burger.drag" /></div>
                <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
                  {items.map((item) => (
                    <Reorder.Item key={item.id} value={item}>
                      <motion.div
                        animate={
                          shakeIds.includes(item.id)
                            ? { x: [0, -10, 10, -10, 10, 0] }
                            : {}
                        }
                        transition={{ duration: 0.4 }}
                        className={`${item.color} rounded-xl p-4 cursor-grab active:cursor-grabbing flex items-center gap-3 shadow-md border-2 border-white/30 select-none ${
                          showHint ? "ring-2 ring-offset-2" : ""
                        }`}
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1">
                          <span className="text-white font-bold text-lg">{item.label}</span>
                          {showHint && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="block text-white/70 text-xs"
                            >
                              {typeLabel[item.type]}
                            </motion.span>
                          )}
                        </div>
                        <span className="text-white/50 text-xl">☰</span>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>

              {/* Validate */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={checkOrder}
                  disabled={feedback === "correct"}
                  className="text-lg px-8 py-6 rounded-full"
                >
                  <Tb k="burger.serve" /> 🍔
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
                        ? "bg-primary/20 text-primary"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {feedback === "correct" ? t("burger.correct") : t("burger.wrong")}
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

export default BurgerGame;
