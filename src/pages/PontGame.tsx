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

interface BridgeChallenge {
  words: { nl: string; emoji: string }[];
  // words[i] pairs with emojis[i]
}

const EASY: BridgeChallenge[] = [
  { words: [{ nl: "kat", emoji: "🐱" }, { nl: "hond", emoji: "🐕" }, { nl: "vis", emoji: "🐟" }] },
  { words: [{ nl: "appel", emoji: "🍎" }, { nl: "banaan", emoji: "🍌" }, { nl: "kers", emoji: "🍒" }] },
  { words: [{ nl: "zon", emoji: "☀️" }, { nl: "maan", emoji: "🌙" }, { nl: "ster", emoji: "⭐" }] },
  { words: [{ nl: "boom", emoji: "🌳" }, { nl: "bloem", emoji: "🌸" }, { nl: "blad", emoji: "🍃" }] },
  { words: [{ nl: "auto", emoji: "🚗" }, { nl: "fiets", emoji: "🚲" }, { nl: "boot", emoji: "⛵" }] },
  { words: [{ nl: "huis", emoji: "🏠" }, { nl: "school", emoji: "🏫" }, { nl: "winkel", emoji: "🏪" }] },
];

const MEDIUM: BridgeChallenge[] = [
  { words: [{ nl: "vlinder", emoji: "🦋" }, { nl: "bij", emoji: "🐝" }, { nl: "spin", emoji: "🕷️" }, { nl: "mier", emoji: "🐜" }] },
  { words: [{ nl: "piano", emoji: "🎹" }, { nl: "gitaar", emoji: "🎸" }, { nl: "trompet", emoji: "🎺" }, { nl: "viool", emoji: "🎻" }] },
  { words: [{ nl: "taart", emoji: "🎂" }, { nl: "koek", emoji: "🍪" }, { nl: "ijs", emoji: "🍦" }, { nl: "snoep", emoji: "🍬" }] },
  { words: [{ nl: "regen", emoji: "🌧️" }, { nl: "sneeuw", emoji: "❄️" }, { nl: "wind", emoji: "💨" }, { nl: "bliksem", emoji: "⚡" }] },
  { words: [{ nl: "voetbal", emoji: "⚽" }, { nl: "tennis", emoji: "🎾" }, { nl: "zwemmen", emoji: "🏊" }, { nl: "skiën", emoji: "⛷️" }] },
  { words: [{ nl: "oog", emoji: "👁️" }, { nl: "oor", emoji: "👂" }, { nl: "neus", emoji: "👃" }, { nl: "mond", emoji: "👄" }] },
];

const HARD: BridgeChallenge[] = [
  { words: [{ nl: "schildpad", emoji: "🐢" }, { nl: "krokodil", emoji: "🐊" }, { nl: "slang", emoji: "🐍" }, { nl: "hagedis", emoji: "🦎" }, { nl: "kikker", emoji: "🐸" }] },
  { words: [{ nl: "aardappel", emoji: "🥔" }, { nl: "wortel", emoji: "🥕" }, { nl: "ui", emoji: "🧅" }, { nl: "paprika", emoji: "🫑" }, { nl: "tomaat", emoji: "🍅" }] },
  { words: [{ nl: "dokter", emoji: "👨‍⚕️" }, { nl: "leraar", emoji: "👨‍🏫" }, { nl: "kok", emoji: "👨‍🍳" }, { nl: "politie", emoji: "👮" }, { nl: "brandweer", emoji: "🧑‍🚒" }] },
  { words: [{ nl: "trein", emoji: "🚆" }, { nl: "vliegtuig", emoji: "✈️" }, { nl: "helikopter", emoji: "🚁" }, { nl: "raket", emoji: "🚀" }, { nl: "tram", emoji: "🚋" }] },
  { words: [{ nl: "slaapkamer", emoji: "🛏️" }, { nl: "keuken", emoji: "🍳" }, { nl: "badkamer", emoji: "🛁" }, { nl: "tuin", emoji: "🌿" }, { nl: "garage", emoji: "🏗️" }] },
  { words: [{ nl: "verjaardag", emoji: "🎂" }, { nl: "kerstmis", emoji: "🎄" }, { nl: "pasen", emoji: "🥚" }, { nl: "sinterklaas", emoji: "🎅" }, { nl: "carnaval", emoji: "🎭" }] },
];

const PontGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("pont");

  const getChallenges = useCallback(() => {
    if (difficulty === "hard") return [...EASY, ...MEDIUM, ...HARD];
    if (difficulty === "medium") return [...EASY, ...MEDIUM];
    return EASY;
  }, [difficulty]);

  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState(false);
  const [shuffledEmojis, setShuffledEmojis] = useState<number[]>([]);
  const [bridgesBuilt, setBridgesBuilt] = useState(0);

  const totalRounds = 6;
  const [shuffled, setShuffled] = useState<BridgeChallenge[]>([]);

  useEffect(() => {
    const s = [...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffled(s);
  }, [difficulty]);

  const current = shuffled[round];

  useEffect(() => {
    if (!current) return;
    setSelectedWord(null);
    setSelectedEmoji(null);
    setMatched(new Set());
    setWrongPair(false);
    // Shuffle emoji order
    const indices = current.words.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledEmojis(indices);
  }, [round, current]);

  const speak = useCallback((word: string) => {
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "nl-BE";
    u.rate = 0.6;
    speechSynthesis.speak(u);
    sounds.click();
  }, []);

  const handleWordClick = useCallback((wordIdx: number) => {
    if (matched.has(wordIdx) || wrongPair) return;
    speak(current.words[wordIdx].nl);
    setSelectedWord(wordIdx);

    if (selectedEmoji !== null) {
      // Check match: shuffledEmojis[selectedEmoji] === wordIdx
      const emojiOriginalIdx = shuffledEmojis[selectedEmoji];
      if (emojiOriginalIdx === wordIdx) {
        // Match!
        sounds.correct();
        const newMatched = new Set(matched);
        newMatched.add(wordIdx);
        setMatched(newMatched);
        setSelectedWord(null);
        setSelectedEmoji(null);

        if (newMatched.size === current.words.length) {
          // Round complete
          setScore((s) => s + 1);
          setBridgesBuilt((b) => b + 1);
          setTimeout(() => {
            if (round + 1 >= totalRounds) {
              setFinished(true);
              sounds.victory();
              saveSession({ score: score + 1, maxScore: totalRounds, errorsCount: errors, completed: true });
            } else {
              setRound((r) => r + 1);
            }
          }, 1000);
        }
      } else {
        // Wrong
        sounds.wrong();
        setWrongPair(true);
        setErrors((e) => e + 1);
        setTimeout(() => {
          setSelectedWord(null);
          setSelectedEmoji(null);
          setWrongPair(false);
        }, 800);
      }
    }
  }, [current, matched, wrongPair, selectedEmoji, shuffledEmojis, round, totalRounds, score, errors, saveSession, speak]);

  const handleEmojiClick = useCallback((emojiShuffledIdx: number) => {
    const originalIdx = shuffledEmojis[emojiShuffledIdx];
    if (matched.has(originalIdx) || wrongPair) return;
    setSelectedEmoji(emojiShuffledIdx);

    if (selectedWord !== null) {
      // Check match
      if (originalIdx === selectedWord) {
        sounds.correct();
        const newMatched = new Set(matched);
        newMatched.add(selectedWord);
        setMatched(newMatched);
        setSelectedWord(null);
        setSelectedEmoji(null);

        if (newMatched.size === current.words.length) {
          setScore((s) => s + 1);
          setBridgesBuilt((b) => b + 1);
          setTimeout(() => {
            if (round + 1 >= totalRounds) {
              setFinished(true);
              sounds.victory();
              saveSession({ score: score + 1, maxScore: totalRounds, errorsCount: errors, completed: true });
            } else {
              setRound((r) => r + 1);
            }
          }, 1000);
        }
      } else {
        sounds.wrong();
        setWrongPair(true);
        setErrors((e) => e + 1);
        setTimeout(() => {
          setSelectedWord(null);
          setSelectedEmoji(null);
          setWrongPair(false);
        }, 800);
      }
    }
  }, [current, matched, wrongPair, selectedWord, shuffledEmojis, round, totalRounds, score, errors, saveSession]);

  const restart = () => {
    setRound(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    setSelectedWord(null);
    setSelectedEmoji(null);
    setMatched(new Set());
    setWrongPair(false);
    setBridgesBuilt(0);
    resetTimer();
    setShuffled([...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds));
  };

  if (!current && !finished) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-sky-950 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-950/80 backdrop-blur border-b border-indigo-700/40 p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-indigo-200 hover:text-white hover:bg-indigo-800/50">
              <ArrowLeft className="w-4 h-4 mr-1" /> <Tb k="game.back" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-indigo-200">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <span className="text-lg font-bold text-indigo-100">
            <Tb k="game.score" />: {score}/{totalRounds}
          </span>
        </div>
      </div>

      {/* Bridge progress */}
      <div className="bg-indigo-950/50 border-b border-indigo-800/30 py-2 px-4">
        <div className="container max-w-2xl flex items-center justify-center gap-2">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <motion.div
              key={i}
              className={`text-xl ${i < bridgesBuilt ? "" : "grayscale opacity-30"}`}
              animate={i < bridgesBuilt ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              🌉
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 relative">
        {/* Floating decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-15"
              style={{ left: `${10 + i * 18}%`, top: `${10 + (i % 3) * 30}%` }}
              animate={{ y: [0, -12, 8, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.6 }}
            >
              🔗
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 mt-16">
              <motion.div className="text-7xl mb-4" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🌉
              </motion.div>
              <h2 className="text-3xl font-bold text-white"><Tb k="game.bravo" /></h2>
              <p className="text-xl text-indigo-200"><Tb k="game.score" />: {score}/{totalRounds}</p>
              <p className="text-indigo-300"><Tb k="pont.bravo" /></p>
              <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> <Tb k="game.replay" />
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-indigo-400 text-indigo-100 hover:bg-indigo-800/50">
                    <Home className="w-4 h-4 mr-2" /> <Tb k="game.home" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-8 mt-8">
              {/* Instruction */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-white"><BilingualInstruction k="pont.instruction" /></h2>
                <p className="text-indigo-300 text-sm"><Tb k="pont.hint" /></p>
              </div>

              {/* Game area: words on left, emojis on right */}
              <div className="grid grid-cols-2 gap-6">
                {/* Words column */}
                <div className="space-y-3">
                  <p className="text-center text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <Tb k="pont.words" />
                  </p>
                  {current.words.map((w, i) => {
                    const isMatched = matched.has(i);
                    const isSelected = selectedWord === i;
                    const isWrong = wrongPair && isSelected;

                    return (
                      <motion.button
                        key={i}
                        whileHover={!isMatched ? { scale: 1.03 } : {}}
                        whileTap={!isMatched ? { scale: 0.97 } : {}}
                        onClick={() => handleWordClick(i)}
                        disabled={isMatched}
                        className={`w-full p-3 rounded-xl border-2 text-lg font-bold transition-all flex items-center gap-2 justify-center ${
                          isMatched
                            ? "bg-emerald-500/30 border-emerald-400/50 text-emerald-200"
                            : isWrong
                            ? "bg-red-500/40 border-red-400 text-white"
                            : isSelected
                            ? "bg-indigo-500/50 border-indigo-300 text-white"
                            : "bg-indigo-900/40 border-indigo-500/30 text-white hover:border-indigo-300"
                        }`}
                      >
                        <Volume2 className="w-4 h-4 opacity-50" />
                        {w.nl}
                        {isMatched && <span className="ml-1">✅</span>}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Emojis column */}
                <div className="space-y-3">
                  <p className="text-center text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <Tb k="pont.images" />
                  </p>
                  {shuffledEmojis.map((originalIdx, shuffledIdx) => {
                    const isMatched = matched.has(originalIdx);
                    const isSelected = selectedEmoji === shuffledIdx;
                    const isWrong = wrongPair && isSelected;

                    return (
                      <motion.button
                        key={shuffledIdx}
                        whileHover={!isMatched ? { scale: 1.05 } : {}}
                        whileTap={!isMatched ? { scale: 0.95 } : {}}
                        onClick={() => handleEmojiClick(shuffledIdx)}
                        disabled={isMatched}
                        className={`w-full p-3 rounded-xl border-2 text-3xl transition-all flex items-center justify-center ${
                          isMatched
                            ? "bg-emerald-500/30 border-emerald-400/50"
                            : isWrong
                            ? "bg-red-500/40 border-red-400"
                            : isSelected
                            ? "bg-indigo-500/50 border-indigo-300"
                            : "bg-indigo-900/40 border-indigo-500/30 hover:border-indigo-300"
                        }`}
                      >
                        {current.words[originalIdx].emoji}
                        {isMatched && <span className="text-lg ml-2">✅</span>}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Match count */}
              <p className="text-center text-indigo-200 text-sm">
                {matched.size}/{current.words.length} <Tb k="pont.linked" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PontGame;
