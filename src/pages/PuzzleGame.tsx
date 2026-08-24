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

interface PuzzleChallenge {
  sentence: string; // full sentence with ___ for blank
  answer: string;
  options: string[];
  image: string;
}

const EASY: PuzzleChallenge[] = [
  { sentence: "De kat drinkt ___.", answer: "melk", options: ["melk", "brood", "boek"], image: "🐱" },
  { sentence: "De ___ schijnt aan de hemel.", answer: "zon", options: ["maan", "zon", "ster"], image: "☀️" },
  { sentence: "Ik eet een rode ___.", answer: "appel", options: ["appel", "stoel", "huis"], image: "🍎" },
  { sentence: "De hond speelt in het ___.", answer: "park", options: ["bed", "park", "bad"], image: "🐕" },
  { sentence: "Het meisje leest een ___.", answer: "boek", options: ["tafel", "boek", "klok"], image: "📖" },
  { sentence: "Papa rijdt met de ___.", answer: "auto", options: ["auto", "kat", "boom"], image: "🚗" },
  { sentence: "De vogel zit in de ___.", answer: "boom", options: ["boom", "deur", "tas"], image: "🐦" },
  { sentence: "Mama koopt ___ in de winkel.", answer: "brood", options: ["brood", "regen", "dak"], image: "🍞" },
  { sentence: "Het ___ is heel koud.", answer: "water", options: ["vuur", "water", "zand"], image: "💧" },
  { sentence: "De baby ___ in de wieg.", answer: "slaapt", options: ["slaapt", "fietst", "kookt"], image: "👶" },
];

const MEDIUM: PuzzleChallenge[] = [
  { sentence: "De kinderen ___ buiten omdat het mooi weer is.", answer: "spelen", options: ["slapen", "spelen", "eten"], image: "👧" },
  { sentence: "Oma bakt een ___ voor het feest.", answer: "taart", options: ["taart", "fiets", "brief"], image: "🎂" },
  { sentence: "De trein ___ om drie uur naar Amsterdam.", answer: "vertrekt", options: ["vliegt", "vertrekt", "zwemt"], image: "🚆" },
  { sentence: "Het konijn heeft ___ oren.", answer: "lange", options: ["korte", "lange", "groene"], image: "🐰" },
  { sentence: "Lisa ___ een boek in de bibliotheek.", answer: "leest", options: ["leest", "kookt", "bouwt"], image: "📚" },
  { sentence: "De ___ zwemt snel door de rivier.", answer: "vis", options: ["vis", "hond", "vogel"], image: "🐟" },
  { sentence: "We gaan ___ naar de dierentuin.", answer: "morgen", options: ["gisteren", "morgen", "nooit"], image: "🦁" },
  { sentence: "Jan draagt een warme ___ in de winter.", answer: "jas", options: ["jas", "korte broek", "pet"], image: "🧥" },
  { sentence: "De ___ vliegt hoog in de lucht.", answer: "vlinder", options: ["schildpad", "vlinder", "slak"], image: "🦋" },
  { sentence: "Het is ___ buiten, neem een paraplu mee.", answer: "regenachtig", options: ["zonnig", "regenachtig", "warm"], image: "🌧️" },
];

const HARD: PuzzleChallenge[] = [
  { sentence: "Hoewel het regende, ging hij ___ naar school.", answer: "toch", options: ["nooit", "toch", "altijd"], image: "🚲" },
  { sentence: "De bakker staat elke ___ om vier uur op.", answer: "ochtend", options: ["avond", "ochtend", "middag"], image: "🍞" },
  { sentence: "In Nederland ___ veel mensen naar hun werk.", answer: "fietsen", options: ["vliegen", "fietsen", "zwemmen"], image: "🇳🇱" },
  { sentence: "De schildpad is ___ maar won toch de race.", answer: "langzaam", options: ["snel", "langzaam", "groot"], image: "🐢" },
  { sentence: "Opa vertelt ___ verhalen over vroeger.", answer: "graag", options: ["nooit", "graag", "boos"], image: "👴" },
  { sentence: "De dokter zegt dat je veel water moet ___ als je ziek bent.", answer: "drinken", options: ["eten", "drinken", "gooien"], image: "💊" },
  { sentence: "Nadat ze hun huiswerk ___, mochten ze televisie kijken.", answer: "hadden gemaakt", options: ["hadden gemaakt", "vergaten", "haatten"], image: "📺" },
  { sentence: "De ___ was eerst een rups.", answer: "vlinder", options: ["bij", "vlinder", "spin"], image: "🦋" },
  { sentence: "Tijdens de ___ dragen we een muts en handschoenen.", answer: "winter", options: ["zomer", "winter", "lente"], image: "❄️" },
  { sentence: "De slimme vos ___ zich achter de struiken.", answer: "verstopte", options: ["verstopte", "klom", "danste"], image: "🦊" },
];

const PuzzleGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("puzzle");

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
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [piecesPlaced, setPiecesPlaced] = useState(0);

  const totalRounds = 8;
  const [shuffled, setShuffled] = useState<PuzzleChallenge[]>([]);

  useEffect(() => {
    const s = [...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffled(s);
  }, [difficulty]);

  const current = shuffled[round];

  useEffect(() => {
    if (!current) return;
    setFeedback(null);
    setSelectedAnswer(null);
  }, [round, current]);

  const speak = useCallback(() => {
    if (!current) return;
    const fullSentence = current.sentence.replace("___", current.answer);
    const u = new SpeechSynthesisUtterance(fullSentence);
    u.lang = "nl-BE";
    u.rate = 0.6;
    speechSynthesis.speak(u);
    sounds.click();
  }, [current]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (feedback) return;
      setSelectedAnswer(answer);

      if (answer === current.answer) {
        setFeedback("correct");
        sounds.correct();
        setScore((s) => s + 1);
        setPiecesPlaced((p) => p + 1);
        setTimeout(() => {
          if (round + 1 >= totalRounds) {
            setFinished(true);
            sounds.victory();
            saveSession({ score: score + 1, maxScore: totalRounds, errorsCount: errors, completed: true });
          } else {
            setRound((r) => r + 1);
          }
        }, 1500);
      } else {
        setFeedback("wrong");
        sounds.wrong();
        setErrors((e) => e + 1);
        setTimeout(() => {
          setFeedback(null);
          setSelectedAnswer(null);
        }, 2000);
      }
    },
    [feedback, current, round, totalRounds, score, errors, saveSession]
  );

  const restart = () => {
    setRound(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    setFeedback(null);
    setSelectedAnswer(null);
    setPiecesPlaced(0);
    resetTimer();
    setShuffled([...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds));
  };

  if (!current && !finished) return null;

  // Render sentence with blank highlighted
  const renderSentence = () => {
    if (!current) return null;
    const parts = current.sentence.split("___");
    return (
      <p className="text-xl md:text-2xl font-bold text-white leading-relaxed text-center">
        {parts[0]}
        <motion.span
          className={`inline-block mx-1 px-3 py-1 rounded-lg min-w-[80px] text-center border-2 border-dashed ${
            feedback === "correct"
              ? "bg-emerald-500/40 border-emerald-400 text-emerald-100"
              : feedback === "wrong" && selectedAnswer
              ? "bg-red-500/40 border-red-400 text-red-100"
              : "bg-white/10 border-teal-400/50 text-teal-200"
          }`}
          animate={!feedback ? { borderColor: ["rgba(94,234,212,0.3)", "rgba(94,234,212,0.8)", "rgba(94,234,212,0.3)"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {feedback === "correct" ? current.answer : selectedAnswer && feedback === "wrong" ? current.answer : "???"}
        </motion.span>
        {parts[1]}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 via-emerald-950 to-green-950 overflow-hidden">
      {/* Header */}
      <div className="bg-teal-950/80 backdrop-blur border-b border-teal-700/40 p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-teal-200 hover:text-white hover:bg-teal-800/50">
              <ArrowLeft className="w-4 h-4 mr-1" /> <Tb k="game.back" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-teal-200">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <span className="text-lg font-bold text-teal-100">
            <Tb k="game.score" />: {score}/{totalRounds}
          </span>
        </div>
      </div>

      {/* Puzzle progress */}
      <div className="bg-teal-950/50 border-b border-teal-800/30 py-2 px-4">
        <div className="container max-w-2xl flex items-center justify-center gap-2">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                i < piecesPlaced
                  ? "bg-emerald-500/60 text-white"
                  : i === round && !finished
                  ? "bg-teal-500/40 text-teal-200 border border-teal-400/50"
                  : "bg-teal-900/40 text-teal-600"
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: i < piecesPlaced ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {i < piecesPlaced ? "🧩" : i + 1}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 relative">
        {/* Floating puzzle pieces */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{ left: `${8 + i * 16}%`, top: `${15 + (i % 3) * 25}%` }}
              animate={{ y: [0, -15, 10, 0], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7 }}
            >
              🧩
            </motion.div>
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
                🧩
              </motion.div>
              <h2 className="text-3xl font-bold text-white"><Tb k="game.bravo" /></h2>
              <p className="text-xl text-teal-200">
                <Tb k="game.score" />: {score}/{totalRounds}
              </p>
              <p className="text-teal-300"><Tb k="puzzle.bravo" /></p>
              <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> <Tb k="game.replay" />
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-teal-400 text-teal-100 hover:bg-teal-800/50">
                    <Home className="w-4 h-4 mr-2" /> <Tb k="game.home" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-8 mt-8">
              {/* Instruction */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-white"><BilingualInstruction k="puzzle.instruction" /></h2>
                <p className="text-teal-300 text-sm"><Tb k="puzzle.hint" /></p>
              </div>

              {/* Sentence with blank */}
              <motion.div
                className="bg-teal-900/50 backdrop-blur border-2 border-teal-500/30 rounded-2xl p-6 relative overflow-hidden"
                animate={{
                  borderColor: ["rgba(94,234,212,0.3)", "rgba(94,234,212,0.5)", "rgba(94,234,212,0.3)"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl">{current.image}</span>
                  {renderSentence()}
                </div>
              </motion.div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={speak}
                  className="gap-2 border-teal-500/50 text-teal-200 hover:bg-teal-500/20"
                >
                  <Volume2 className="w-4 h-4" /> <Tb k="puzzle.listen" />
                </Button>
              </div>

              {/* Answer options as puzzle pieces */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {current.options.map((option, i) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption = option === current.answer;
                  let style = "bg-teal-800/50 border-teal-500/30 hover:border-teal-300 hover:bg-teal-700/50 cursor-pointer text-white";

                  if (feedback && isSelected) {
                    style = feedback === "correct"
                      ? "bg-emerald-500/50 border-emerald-400 text-white"
                      : "bg-red-500/50 border-red-400 text-white";
                  }
                  if (feedback === "wrong" && isCorrectOption) {
                    style = "bg-emerald-500/30 border-emerald-400/50 text-emerald-200";
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={!feedback ? { scale: 1.05, y: -3 } : {}}
                      whileTap={!feedback ? { scale: 0.95 } : {}}
                      onClick={() => handleAnswer(option)}
                      disabled={!!feedback}
                      className={`px-6 py-3 rounded-xl border-2 text-lg font-bold transition-all ${style}`}
                    >
                      🧩 {option}
                    </motion.button>
                  );
                })}
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
                      {feedback === "correct" ? t("puzzle.correct") : t("puzzle.wrong")}
                    </p>
                    {feedback === "wrong" && (
                      <p className="text-teal-200 text-sm mt-1">
                        <Tb k="puzzle.answerWas" />: <span className="font-bold text-emerald-300">"{current.answer}"</span>
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

export default PuzzleGame;
