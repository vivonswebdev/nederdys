import { useState, useCallback, useEffect } from "react";
import { Tb, BilingualInstruction } from "@/components/ui/BilingualText";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { useLanguage } from "@/contexts/LanguageContext";
import { sounds } from "@/lib/sounds";

interface SoundChallenge {
  word: string;
  syllables: string[];
  stressIndex: number; // which syllable is stressed
  phonemeHighlight?: string; // special NL phoneme to highlight
}

const EASY: SoundChallenge[] = [
  { word: "banaan", syllables: ["ba", "naan"], stressIndex: 1 },
  { word: "water", syllables: ["wa", "ter"], stressIndex: 0 },
  { word: "appel", syllables: ["ap", "pel"], stressIndex: 0 },
  { word: "mama", syllables: ["ma", "ma"], stressIndex: 0 },
  { word: "papa", syllables: ["pa", "pa"], stressIndex: 0 },
  { word: "tafel", syllables: ["ta", "fel"], stressIndex: 0 },
  { word: "bloem", syllables: ["bloem"], stressIndex: 0, phonemeHighlight: "oe" },
  { word: "huis", syllables: ["huis"], stressIndex: 0, phonemeHighlight: "ui" },
  { word: "boek", syllables: ["boek"], stressIndex: 0, phonemeHighlight: "oe" },
  { word: "muur", syllables: ["muur"], stressIndex: 0, phonemeHighlight: "uu" },
];

const MEDIUM: SoundChallenge[] = [
  { word: "olifant", syllables: ["o", "li", "fant"], stressIndex: 0 },
  { word: "computer", syllables: ["com", "pu", "ter"], stressIndex: 1 },
  { word: "vakantie", syllables: ["va", "kan", "tie"], stressIndex: 1 },
  { word: "chocolade", syllables: ["cho", "co", "la", "de"], stressIndex: 2 },
  { word: "konijn", syllables: ["ko", "nijn"], stressIndex: 1, phonemeHighlight: "ij" },
  { word: "plafond", syllables: ["pla", "fond"], stressIndex: 1 },
  { word: "schuur", syllables: ["schuur"], stressIndex: 0, phonemeHighlight: "uu" },
  { word: "veulen", syllables: ["veu", "len"], stressIndex: 0, phonemeHighlight: "eu" },
  { word: "pruimen", syllables: ["prui", "men"], stressIndex: 0, phonemeHighlight: "ui" },
  { word: "neuzen", syllables: ["neu", "zen"], stressIndex: 0, phonemeHighlight: "eu" },
];

const HARD: SoundChallenge[] = [
  { word: "bibliotheek", syllables: ["bi", "bli", "o", "theek"], stressIndex: 3 },
  { word: "ziekenhuis", syllables: ["zie", "ken", "huis"], stressIndex: 0, phonemeHighlight: "ui" },
  { word: "verjaardag", syllables: ["ver", "jaar", "dag"], stressIndex: 1 },
  { word: "huiswerk", syllables: ["huis", "werk"], stressIndex: 0, phonemeHighlight: "ui" },
  { word: "buurman", syllables: ["buur", "man"], stressIndex: 0, phonemeHighlight: "uu" },
  { word: "vliegtuig", syllables: ["vlieg", "tuig"], stressIndex: 0, phonemeHighlight: "ui" },
  { word: "schoorsteen", syllables: ["schoor", "steen"], stressIndex: 0, phonemeHighlight: "oo" },
  { word: "schrijven", syllables: ["schrij", "ven"], stressIndex: 0, phonemeHighlight: "ij" },
  { word: "groente", syllables: ["groen", "te"], stressIndex: 0, phonemeHighlight: "oe" },
  { word: "gebruiken", syllables: ["ge", "brui", "ken"], stressIndex: 1, phonemeHighlight: "ui" },
];

const COLORS = [
  "bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400",
  "bg-purple-400", "bg-pink-400", "bg-orange-400", "bg-cyan-400",
];

const PeintreGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("peintre");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return [...EASY, ...MEDIUM, ...HARD];
    if (difficulty === "medium") return [...EASY, ...MEDIUM];
    return EASY;
  }, [difficulty]);

  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedSyllable, setSelectedSyllable] = useState<number | null>(null);
  const [paintedSyllables, setPaintedSyllables] = useState<Record<number, string>>({});

  const totalRounds = 8;
  const [shuffled, setShuffled] = useState<SoundChallenge[]>([]);

  useEffect(() => {
    const s = [...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffled(s);
  }, [difficulty]);

  const current = shuffled[round];

  useEffect(() => {
    if (!current) return;
    setFeedback(null);
    setSelectedSyllable(null);
    setPaintedSyllables({});
  }, [round, current]);

  const speak = useCallback((text?: string) => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(text || current.word);
    u.lang = "nl-BE";
    u.rate = 0.6;
    speechSynthesis.speak(u);
    sounds.click();
  }, [current]);

  useEffect(() => {
    if (current) {
      const timer = setTimeout(() => speak(), 600);
      return () => clearTimeout(timer);
    }
  }, [round, current]);

  const handlePaintSyllable = useCallback((index: number) => {
    if (feedback) return;

    // Cycle through colors or select
    setPaintedSyllables((prev) => {
      const currentColor = prev[index];
      const colorIdx = currentColor ? COLORS.indexOf(currentColor) : -1;
      const nextIdx = (colorIdx + 1) % COLORS.length;
      return { ...prev, [index]: COLORS[nextIdx] };
    });
    setSelectedSyllable(index);

    // Speak the syllable
    if (current) {
      const u = new SpeechSynthesisUtterance(current.syllables[index]);
      u.lang = "nl-BE";
      u.rate = 0.5;
      speechSynthesis.speak(u);
    }
  }, [feedback, current]);

  const handleValidate = useCallback(() => {
    if (feedback || !current) return;

    // Check if the stressed syllable has a distinct color
    const stressedColor = paintedSyllables[current.stressIndex];
    const otherColors = current.syllables
      .map((_, i) => i !== current.stressIndex ? paintedSyllables[i] : null)
      .filter(Boolean);

    // Correct if stressed syllable is painted AND has a different color from others
    const isCorrect = stressedColor && !otherColors.includes(stressedColor);

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
      }, 1800);
    } else {
      setFeedback("wrong");
      sounds.wrong();
      setErrors((e) => e + 1);
      // Show correct answer by highlighting
      setPaintedSyllables((prev) => ({
        ...prev,
        [current.stressIndex]: "bg-yellow-400 ring-4 ring-yellow-300",
      }));
      setTimeout(() => {
        setFeedback(null);
        setSelectedSyllable(null);
        setPaintedSyllables({});
      }, 2500);
    }
  }, [feedback, current, paintedSyllables, round, totalRounds, score, errors, saveSession]);

  const restart = () => {
    setRound(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    setFeedback(null);
    setSelectedSyllable(null);
    setPaintedSyllables({});
    resetTimer();
    setShuffled([...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds));
  };

  if (!current && !finished) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-950 via-fuchsia-950 to-violet-950 overflow-hidden">
      {/* Header */}
      <div className="bg-rose-950/80 backdrop-blur border-b border-pink-700/40 p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-pink-200 hover:text-white hover:bg-pink-800/50">
              <ArrowLeft className="w-4 h-4 mr-1" /> <Tb k="game.back" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-pink-200">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <span className="text-lg font-bold text-pink-100">
            <Tb k="game.score" />: {score}/{totalRounds}
          </span>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 relative">
        {/* Floating paint splashes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-16 h-16 rounded-full ${COLORS[i % COLORS.length]} opacity-10 blur-xl`}
              style={{ left: `${10 + i * 15}%`, top: `${10 + (i % 3) * 30}%` }}
              animate={{ scale: [1, 1.3, 1], x: [0, 20, -10, 0], y: [0, -10, 15, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 mt-16">
              <motion.div
                className="text-7xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎨
              </motion.div>
              <h2 className="text-3xl font-bold text-white"><Tb k="game.bravo" /></h2>
              <p className="text-xl text-pink-200">
                <Tb k="game.score" />: {score}/{totalRounds}
              </p>
              <p className="text-pink-300"><Tb k="peintre.bravo" /></p>
              <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> <Tb k="game.replay" />
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-pink-400 text-pink-100 hover:bg-pink-800/50">
                    <Home className="w-4 h-4 mr-2" /> <Tb k="game.home" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-8 mt-8">
              {/* Instruction */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-white"><BilingualInstruction k="peintre.instruction" /></h2>
                <p className="text-pink-300 text-sm"><Tb k="peintre.hint" /></p>
              </div>

              {/* Word display with listen button */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="bg-rose-900/50 backdrop-blur border-2 border-pink-500/30 rounded-2xl px-8 py-5 text-center"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(236,72,153,0.2)",
                      "0 0 40px rgba(236,72,153,0.4)",
                      "0 0 20px rgba(236,72,153,0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-wider">
                    {current.word}
                  </span>
                  {current.phonemeHighlight && (
                    <p className="text-pink-300 text-sm mt-2">
                      🔊 <Tb k="peintre.specialSound" />: <span className="font-bold text-yellow-300">"{current.phonemeHighlight}"</span>
                    </p>
                  )}
                </motion.div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => speak()}
                  className="gap-2 border-pink-500/50 text-pink-200 hover:bg-pink-500/20"
                >
                  <Volume2 className="w-4 h-4" /> <Tb k="peintre.listen" />
                </Button>
              </div>

              {/* Paint palette */}
              <div className="flex justify-center gap-2 flex-wrap">
                {COLORS.map((color, i) => (
                  <motion.div
                    key={i}
                    className={`w-8 h-8 rounded-full ${color} cursor-pointer border-2 border-white/30`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Syllable blocks to paint */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {current.syllables.map((syl, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePaintSyllable(i)}
                    className={`
                      relative px-6 py-4 rounded-2xl border-3 text-xl md:text-2xl font-bold transition-all min-w-[70px]
                      ${paintedSyllables[i]
                        ? `${paintedSyllables[i]} text-white border-white/30`
                        : "bg-white/10 text-white/70 border-pink-500/30 hover:border-pink-300"
                      }
                    `}
                  >
                    {syl}
                    {selectedSyllable === i && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                        layoutId="selector"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <p className="text-center text-pink-200/80 text-sm">
                <Tb k="peintre.tapHint" />
              </p>

              {/* Validate */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleValidate}
                  disabled={Object.keys(paintedSyllables).length === 0 || !!feedback}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8"
                >
                  <Palette className="w-5 h-5 mr-2" />
                  <Tb k="peintre.validate" />
                </Button>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-center p-4 rounded-xl ${
                      feedback === "correct"
                        ? "bg-emerald-500/30 border border-emerald-400/30"
                        : "bg-red-500/30 border border-red-400/30"
                    }`}
                  >
                    <p className="text-lg font-bold text-white">
                      {feedback === "correct" ? t("peintre.correct") : t("peintre.wrong")}
                    </p>
                    {feedback === "wrong" && (
                      <p className="text-pink-200 text-sm mt-1">
                        <Tb k="peintre.stressHint" />: <span className="font-bold text-yellow-300">"{current.syllables[current.stressIndex]}"</span>
                      </p>
                    )}
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

export default PeintreGame;
