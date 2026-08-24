import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Tb, BilingualInstruction } from "@/components/ui/BilingualText";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Star, RotateCcw, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameSession } from "@/hooks/useGameSession";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { Difficulty } from "@/lib/database";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface PhonemeRound {
  sound: string;
  phonemes: string[];
  distractors: string[];
}

const ROUNDS_BY_DIFFICULTY: Record<Difficulty, PhonemeRound[]> = {
  easy: [
    { sound: "kat", phonemes: ["/k/", "/a/", "/t/"], distractors: ["/p/", "/o/"] },
    { sound: "vis", phonemes: ["/v/", "/ɪ/", "/s/"], distractors: ["/f/", "/u/"] },
    { sound: "zon", phonemes: ["/z/", "/ɔ/", "/n/"], distractors: ["/s/", "/a/"] },
    { sound: "huis", phonemes: ["/h/", "/œy/", "/s/"], distractors: ["/g/", "/i/"] },
    { sound: "boom", phonemes: ["/b/", "/o:/", "/m/"], distractors: ["/p/", "/u/"] },
  ],
  medium: [
    { sound: "bloem", phonemes: ["/b/", "/l/", "/u/", "/m/"], distractors: ["/r/", "/a/"] },
    { sound: "stoel", phonemes: ["/s/", "/t/", "/u/", "/l/"], distractors: ["/k/", "/ɛ/"] },
    { sound: "fiets", phonemes: ["/f/", "/i:/", "/t/", "/s/"], distractors: ["/v/", "/ɔ/"] },
    { sound: "trein", phonemes: ["/t/", "/r/", "/ɛi/", "/n/"], distractors: ["/d/", "/a/"] },
    { sound: "groen", phonemes: ["/ɣ/", "/r/", "/u/", "/n/"], distractors: ["/g/", "/ɛ/"] },
  ],
  hard: [
    { sound: "vlinder", phonemes: ["/v/", "/l/", "/ɪ/", "/n/", "/d/", "/ər/"], distractors: ["/f/", "/a/", "/t/"] },
    { sound: "schrijven", phonemes: ["/s/", "/x/", "/r/", "/ɛi/", "/v/", "/ən/"], distractors: ["/k/", "/o/", "/p/"] },
    { sound: "ochtend", phonemes: ["/ɔ/", "/x/", "/t/", "/ɛ/", "/n/", "/t/"], distractors: ["/a/", "/g/", "/s/"] },
    { sound: "verjaardag", phonemes: ["/v/", "/ər/", "/j/", "/a:/", "/r/", "/d/", "/ɑx/"], distractors: ["/f/", "/i/"] },
    { sound: "lucht", phonemes: ["/l/", "/ʏ/", "/x/", "/t/"], distractors: ["/r/", "/a/", "/s/"] },
  ],
};

const PhonemesGame = () => {
  const { t } = useLanguage();
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("phonemes");
  const errorsRef = useRef(0);
  const savedRef = useRef(false);

  const ROUNDS = ROUNDS_BY_DIFFICULTY[difficulty];
  const current = ROUNDS[round];

  const allOptions = useMemo(() => {
    if (!current) return [];
    return [...current.phonemes, ...current.distractors].sort(() => Math.random() - 0.5);
  }, [round, difficulty]);

  const speakWord = () => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.sound);
    u.lang = "nl-BE";
    u.rate = 0.6;
    speechSynthesis.speak(u);
  };

  const handleSelect = useCallback((ph: string) => {
    if (feedback || !current) return;
    const newSelected = [...selected, ph];
    setSelected(newSelected);

    if (newSelected.length === current.phonemes.length) {
      const isCorrect = JSON.stringify(newSelected) === JSON.stringify(current.phonemes);
      setFeedback(isCorrect ? "correct" : "wrong");
      if (isCorrect) { setScore((s) => s + 1); sounds.correct(); }
      else { errorsRef.current += 1; sounds.wrong(); }

      setTimeout(() => {
        if (round < ROUNDS.length - 1) {
          setRound((r) => r + 1);
          setSelected([]);
          setFeedback(null);
        } else {
          setGameOver(true);
        }
      }, 1200);
    }
  }, [selected, feedback, current, round, ROUNDS]);

  useEffect(() => {
    if (gameOver && !savedRef.current) {
      savedRef.current = true;
      saveSession({ score, maxScore: ROUNDS.length, errorsCount: errorsRef.current, completed: true });
    }
  }, [gameOver, score, saveSession, ROUNDS.length]);

  const reset = () => {
    setRound(0);
    setSelected([]);
    setScore(0);
    setFeedback(null);
    setGameOver(false);
    errorsRef.current = 0;
    savedRef.current = false;
    resetTimer();
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <span className="text-6xl block mb-4">💃</span>
            <h2 className="text-3xl font-bold text-foreground mb-2"><Tb k="game.bravo" /></h2>
            <p className="text-xl text-muted-foreground mb-2"><Tb k="game.score" /> : {score}/{ROUNDS.length}</p>
            <DifficultyIndicator difficulty={difficulty} />
            <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: score }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-secondary fill-secondary" />
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={reset} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> <Tb k="game.replay" />
              </button>
              <Link to="/" className="bg-card text-foreground border-2 border-border px-6 py-3 rounded-full font-bold"><Tb k="game.home" /></Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> <Tb k="game.back" />
          </Link>
          <DifficultyIndicator difficulty={difficulty} />
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
            <motion.div className="bg-primary h-full rounded-full" animate={{ width: `${((round + 1) / ROUNDS.length) * 100}%` }} />
          </div>
          <span className="text-sm font-bold text-foreground">{round + 1}/{ROUNDS.length}</span>
        </div>

        <motion.div key={round} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2"><BilingualInstruction k="phonemes.instruction" /></h2>
          <button onClick={speakWord} className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-xl font-bold font-dyslexic hover:bg-accent/80 transition-colors">
            <Volume2 className="w-5 h-5" /> {current.sound}
          </button>
          <p className="text-sm text-muted-foreground mt-2">({current.phonemes.length} <Tb k="phonemes.count" />)</p>
        </motion.div>

        {/* Selected phonemes */}
        <div className="flex gap-2 justify-center mb-8 min-h-[56px] flex-wrap">
          {selected.map((ph, i) => (
            <motion.div key={i} initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
              className={`px-4 py-2 rounded-xl text-lg font-bold font-dyslexic ${
                feedback === "correct" ? "bg-primary text-primary-foreground" : feedback === "wrong" ? "bg-destructive text-destructive-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              {ph}
            </motion.div>
          ))}
          {!selected.length && (
            <div className="px-5 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground"><Tb k="phonemes.placeholder" /></div>
          )}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center mb-6">
              <span className="text-4xl">{feedback === "correct" ? t("phonemes.perfect") : t("phonemes.notquite")}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phoneme options as dancing buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {allOptions.map((ph, i) => {
            const isUsed = selected.includes(ph);
            return (
              <motion.button
                key={`${round}-${ph}-${i}`}
                animate={{ y: [0, -5, 0], rotate: [0, i % 2 === 0 ? 3 : -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                whileHover={{ scale: isUsed ? 1 : 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => !isUsed && handleSelect(ph)}
                disabled={isUsed || !!feedback}
                className={`px-5 py-3 rounded-2xl text-lg font-bold font-dyslexic transition-all ${
                  isUsed ? "bg-muted text-muted-foreground opacity-40" : "bg-kids-pink text-foreground kids-shadow-card cursor-pointer hover:kids-shadow-hover"
                }`}
              >
                {ph}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="flex justify-center gap-1">
            {Array.from({ length: score }).map((_, i) => (
              <Star key={i} className="w-6 h-6 text-secondary fill-secondary" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonemesGame;
