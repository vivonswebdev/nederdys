import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Volume2, Star, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameSession } from "@/hooks/useGameSession";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { Difficulty } from "@/lib/database";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

const ROUNDS_BY_DIFFICULTY: Record<Difficulty, { audio: string; syllables: string[]; distractors: string[] }[]> = {
  easy: [
    { audio: "kaatje", syllables: ["kaat", "je"], distractors: ["ka", "tje"] },
    { audio: "appel", syllables: ["ap", "pel"], distractors: ["a", "ppel"] },
    { audio: "mama", syllables: ["ma", "ma"], distractors: ["mam", "a"] },
    { audio: "papa", syllables: ["pa", "pa"], distractors: ["pap", "a"] },
    { audio: "auto", syllables: ["au", "to"], distractors: ["aut", "o"] },
  ],
  medium: [
    { audio: "konijn", syllables: ["ko", "nijn"], distractors: ["kon", "ij"] },
    { audio: "vlinder", syllables: ["vlin", "der"], distractors: ["vli", "ner"] },
    { audio: "koffie", syllables: ["kof", "fie"], distractors: ["ko", "ffie"] },
    { audio: "ballon", syllables: ["bal", "lon"], distractors: ["ba", "llon"] },
    { audio: "tafel", syllables: ["ta", "fel"], distractors: ["taf", "el"] },
  ],
  hard: [
    { audio: "olifant", syllables: ["o", "li", "fant"], distractors: ["ol", "if"] },
    { audio: "chocolade", syllables: ["cho", "co", "la", "de"], distractors: ["choc", "ol"] },
    { audio: "verjaardag", syllables: ["ver", "jaar", "dag"], distractors: ["verj", "aard"] },
    { audio: "bibliotheek", syllables: ["bi", "bli", "o", "theek"], distractors: ["bib", "lio"] },
    { audio: "vliegtuig", syllables: ["vlieg", "tuig"], distractors: ["vlie", "gtu"] },
  ],
};

const SyllabesGame = () => {
  const { t } = useLanguage();
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<{ index: number; value: string }[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("syllabes");
  const errorsRef = useRef(0);
  const savedRef = useRef(false);

  const ROUNDS = ROUNDS_BY_DIFFICULTY[difficulty];

  const allOptions = useMemo(() => {
    const current = ROUNDS[round];
    if (!current) return [];
    return [...current.syllables, ...current.distractors].sort(() => Math.random() - 0.5);
  }, [round, difficulty]);

  const current = ROUNDS[round];

  const handleSelect = useCallback((syl: string, idx: number) => {
    if (feedback || !current) return;
    const newSelected = [...selected, { index: idx, value: syl }];
    setSelected(newSelected);
    if (newSelected.length === current.syllables.length) {
      const isCorrect = newSelected.map(s => s.value).join("") === current.syllables.join("");
      setFeedback(isCorrect ? "correct" : "wrong");
      if (isCorrect) { setScore((s) => s + 1); sounds.correct(); }
      else { errorsRef.current += 1; sounds.wrong(); }
      setTimeout(() => {
        if (round < ROUNDS.length - 1) { setRound((r) => r + 1); setSelected([]); setFeedback(null); }
        else setGameOver(true);
      }, 1200);
    }
  }, [selected, feedback, current, round, ROUNDS]);

  useEffect(() => {
    if (gameOver && !savedRef.current) {
      savedRef.current = true;
      sounds.victory();
      saveSession({ score, maxScore: ROUNDS.length, errorsCount: errorsRef.current, completed: true });
    }
  }, [gameOver, score, saveSession, ROUNDS.length]);

  const reset = () => { setRound(0); setSelected([]); setScore(0); setFeedback(null); setGameOver(false); errorsRef.current = 0; savedRef.current = false; resetTimer(); };

  const speakWord = () => { if (!current) return; const u = new SpeechSynthesisUtterance(current.audio); u.lang = "nl-NL"; u.rate = 0.7; speechSynthesis.speak(u); };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <span className="text-6xl block mb-4">🎉</span>
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("game.bravo")}</h2>
            <p className="text-xl text-muted-foreground mb-2">{t("game.score")} : {score}/{ROUNDS.length}</p>
            <DifficultyIndicator difficulty={difficulty} />
            <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: score }).map((_, i) => (<Star key={i} className="w-8 h-8 text-secondary fill-secondary" />))}
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={reset} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold flex items-center gap-2"><RotateCcw className="w-4 h-4" /> {t("game.replay")}</button>
              <Link to="/" className="bg-card text-foreground border-2 border-border px-6 py-3 rounded-full font-bold">{t("game.home")}</Link>
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
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /> {t("game.back")}</Link>
          <DifficultyIndicator difficulty={difficulty} />
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
            <motion.div className="bg-primary h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${((round + 1) / ROUNDS.length) * 100}%` }} />
          </div>
          <span className="text-sm font-bold text-foreground">{round + 1}/{ROUNDS.length}</span>
        </div>
        <motion.div key={round} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">{t("syllabes.instruction")}</h2>
          <button onClick={speakWord} className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-xl font-bold font-dyslexic hover:bg-accent/80 transition-colors">
            <Volume2 className="w-5 h-5" /> {current.audio}
          </button>
        </motion.div>
        <div className="flex gap-2 justify-center mb-8 min-h-[60px]">
          {selected.map((s, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className={`px-5 py-3 rounded-xl text-lg font-bold font-dyslexic ${feedback === "correct" ? "bg-primary text-primary-foreground" : feedback === "wrong" ? "bg-destructive text-destructive-foreground" : "bg-accent text-accent-foreground"}`}>
              <span className="syllable-highlight">{s.value}</span>
            </motion.div>
          ))}
          {!selected.length && (<div className="px-5 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground text-lg">{t("syllabes.placeholder")}</div>)}
        </div>
        <AnimatePresence>
          {feedback && (<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center mb-6"><span className="text-4xl">{feedback === "correct" ? t("syllabes.correct") : t("syllabes.wrong")}</span></motion.div>)}
        </AnimatePresence>
        <div className="flex flex-wrap gap-3 justify-center">
          {allOptions.map((syl, i) => {
            const isUsed = selected.some(s => s.index === i);
            return (<motion.button key={`${round}-${syl}-${i}`} whileHover={{ scale: isUsed ? 1 : 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => !isUsed && handleSelect(syl, i)} disabled={isUsed || !!feedback} className={`px-6 py-3 rounded-xl text-lg font-bold font-dyslexic transition-all ${isUsed ? "bg-muted text-muted-foreground opacity-40" : "bg-secondary text-secondary-foreground kids-shadow-card hover:kids-shadow-hover cursor-pointer"}`}>{syl}</motion.button>);
          })}
        </div>
        <div className="mt-8 text-center">
          <div className="flex justify-center gap-1">{Array.from({ length: score }).map((_, i) => (<Star key={i} className="w-6 h-6 text-secondary fill-secondary" />))}</div>
        </div>
      </div>
    </div>
  );
};

export default SyllabesGame;
