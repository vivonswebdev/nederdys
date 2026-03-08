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

interface ReadingChallenge {
  sentence: string;
  question: string;
  options: string[];
  correctIndex: number;
  image: string;
}

const EASY: ReadingChallenge[] = [
  { sentence: "De kat zit op de mat.", question: "Waar zit de kat?", options: ["Op de mat", "In de boom", "Op het dak"], correctIndex: 0, image: "🐱" },
  { sentence: "Het meisje eet een appel.", question: "Wat eet het meisje?", options: ["Een banaan", "Een appel", "Een koek"], correctIndex: 1, image: "🍎" },
  { sentence: "De hond speelt in het park.", question: "Waar speelt de hond?", options: ["In huis", "Op school", "In het park"], correctIndex: 2, image: "🐕" },
  { sentence: "De zon schijnt vandaag.", question: "Wat schijnt er?", options: ["De maan", "De zon", "De ster"], correctIndex: 1, image: "☀️" },
  { sentence: "Jan drinkt een glas melk.", question: "Wat drinkt Jan?", options: ["Water", "Sap", "Melk"], correctIndex: 2, image: "🥛" },
  { sentence: "De vogel zingt in de boom.", question: "Wat doet de vogel?", options: ["Hij slaapt", "Hij zingt", "Hij vliegt"], correctIndex: 1, image: "🐦" },
];

const MEDIUM: ReadingChallenge[] = [
  { sentence: "De kinderen spelen buiten omdat het mooi weer is.", question: "Waarom spelen de kinderen buiten?", options: ["Ze hebben vakantie", "Het is mooi weer", "Ze zijn moe"], correctIndex: 1, image: "👧" },
  { sentence: "Mama koopt brood en kaas in de winkel.", question: "Wat koopt mama?", options: ["Brood en kaas", "Melk en eieren", "Fruit en groente"], correctIndex: 0, image: "🧀" },
  { sentence: "Het konijn heeft lange oren en een kort staartje.", question: "Wat heeft het konijn?", options: ["Korte oren", "Lange oren", "Geen oren"], correctIndex: 1, image: "🐰" },
  { sentence: "De trein vertrekt om drie uur naar Amsterdam.", question: "Hoe laat vertrekt de trein?", options: ["Om twee uur", "Om drie uur", "Om vier uur"], correctIndex: 1, image: "🚆" },
  { sentence: "Lisa leest een boek over dieren in de bibliotheek.", question: "Waar leest Lisa?", options: ["Op school", "In de bibliotheek", "Thuis"], correctIndex: 1, image: "📚" },
  { sentence: "De vis zwemt snel door het water van de rivier.", question: "Waar zwemt de vis?", options: ["In de zee", "In het zwembad", "In de rivier"], correctIndex: 2, image: "🐟" },
];

const HARD: ReadingChallenge[] = [
  { sentence: "Hoewel het regende, ging de jongen toch naar school op de fiets.", question: "Hoe ging de jongen naar school?", options: ["Met de bus", "Te voet", "Op de fiets"], correctIndex: 2, image: "🚲" },
  { sentence: "De bakker staat elke ochtend om vier uur op om vers brood te bakken.", question: "Hoe laat staat de bakker op?", options: ["Om zes uur", "Om vier uur", "Om vijf uur"], correctIndex: 1, image: "🍞" },
  { sentence: "In Nederland fietsen veel mensen naar hun werk, zelfs als het regent.", question: "Wat doen veel mensen in Nederland?", options: ["Ze nemen de auto", "Ze fietsen naar hun werk", "Ze blijven thuis"], correctIndex: 1, image: "🇳🇱" },
  { sentence: "De schildpad is langzaam maar won toch de race tegen het konijn.", question: "Wie won de race?", options: ["Het konijn", "De schildpad", "De hond"], correctIndex: 1, image: "🐢" },
  { sentence: "Opa vertelt graag verhalen over vroeger toen hij jong was.", question: "Waarover vertelt opa?", options: ["Over het weer", "Over vroeger", "Over zijn werk"], correctIndex: 1, image: "👴" },
  { sentence: "De vlinder was eerst een rups voordat hij mooie vleugels kreeg.", question: "Wat was de vlinder eerst?", options: ["Een bij", "Een rups", "Een vogel"], correctIndex: 1, image: "🦋" },
];

const PhareGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, leveledUp } = useGameSession("phare");

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showSentence, setShowSentence] = useState(false);
  const [fogLevel, setFogLevel] = useState(1); // 1 = fully fogged, 0 = clear

  const totalRounds = 6;
  const [shuffled, setShuffled] = useState<ReadingChallenge[]>([]);

  useEffect(() => {
    const s = [...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffled(s);
  }, [difficulty]);

  const current = shuffled[round];

  // Reveal sentence progressively (fog clears)
  useEffect(() => {
    if (!current) return;
    setShowSentence(false);
    setFogLevel(1);
    setFeedback(null);
    setSelectedIndex(null);

    const revealTimer = setTimeout(() => {
      setShowSentence(true);
      // Gradually clear the fog
      let level = 1;
      const interval = setInterval(() => {
        level -= 0.05;
        if (level <= 0) {
          level = 0;
          clearInterval(interval);
        }
        setFogLevel(level);
      }, 80);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(revealTimer);
  }, [round, current]);

  const speak = useCallback(() => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.sentence);
    u.lang = "nl-NL";
    u.rate = 0.65;
    speechSynthesis.speak(u);
    sounds.click();
  }, [current]);

  useEffect(() => {
    if (current && showSentence) {
      const timer = setTimeout(speak, 800);
      return () => clearTimeout(timer);
    }
  }, [showSentence, current]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (feedback) return;
      setSelectedIndex(index);

      if (index === current.correctIndex) {
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
        setTimeout(() => {
          setFeedback(null);
          setSelectedIndex(null);
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
    setSelectedIndex(null);
    resetTimer();
    setShuffled([...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds));
  };

  if (!current && !finished) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-cyan-950 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur border-b border-cyan-700/40 p-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-cyan-200 hover:text-white hover:bg-cyan-800/50">
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("game.back")}
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <DifficultyIndicator difficulty={difficulty} />
            <span className="text-sm font-bold text-cyan-200">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <span className="text-lg font-bold text-cyan-100">
            {t("game.score")}: {score}/{totalRounds}
          </span>
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 relative">
        {/* Lighthouse beam animation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
          <motion.div
            className="w-1 h-32 bg-gradient-to-b from-yellow-300/60 to-transparent mx-auto"
            animate={{ opacity: [0.3, 1, 0.3], scaleX: [1, 3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="text-5xl text-center -mt-2">🏠</div>
        </div>

        {/* Floating fog particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 rounded-full bg-cyan-200/5 blur-xl"
              style={{ left: `${5 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ x: [0, 30, -20, 0], y: [0, -15, 10, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 mt-20">
              <motion.div
                className="text-7xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏠
              </motion.div>
              <h2 className="text-3xl font-bold text-white">{t("game.bravo")}</h2>
              <p className="text-xl text-cyan-200">
                {t("game.score")}: {score}/{totalRounds}
              </p>
              <p className="text-cyan-300">{t("phare.bravo")}</p>
              <XpGainPopup xpGained={xpGained} leveledUp={leveledUp} />
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={restart} size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> {t("game.replay")}
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="border-cyan-400 text-cyan-100 hover:bg-cyan-800/50">
                    <Home className="w-4 h-4 mr-2" /> {t("game.home")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key={round} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-6 mt-16">
              {/* Instruction */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-white">{t("phare.instruction")}</h2>
                <p className="text-cyan-300 text-sm">{t("phare.hint")}</p>
              </div>

              {/* Sentence card with fog effect */}
              <div className="relative">
                <motion.div
                  className="bg-slate-800/70 backdrop-blur border-2 border-cyan-500/30 rounded-2xl p-6 text-center relative overflow-hidden"
                  animate={{
                    borderColor: fogLevel < 0.3 
                      ? ["rgba(34,211,238,0.5)", "rgba(34,211,238,0.8)", "rgba(34,211,238,0.5)"]
                      : "rgba(34,211,238,0.2)",
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Fog overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 transition-opacity duration-300 z-10 pointer-events-none"
                    style={{ opacity: fogLevel * 0.9 }}
                  />
                  
                  <div className="flex items-center justify-center gap-4 relative z-20">
                    <span className="text-4xl">{current.image}</span>
                    <p className="text-xl md:text-2xl font-bold text-white leading-relaxed tracking-wide">
                      {current.sentence}
                    </p>
                  </div>
                </motion.div>

                <div className="flex justify-center mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={speak}
                    className="gap-2 border-cyan-500/50 text-cyan-200 hover:bg-cyan-500/20"
                  >
                    <Volume2 className="w-4 h-4" /> {t("phare.listen")}
                  </Button>
                </div>
              </div>

              {/* Question */}
              <div className="text-center">
                <motion.p
                  className="text-lg font-bold text-yellow-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: fogLevel < 0.3 ? 1 : 0 }}
                >
                  {current.question}
                </motion.p>
              </div>

              {/* Answer options */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: fogLevel < 0.2 ? 1 : 0 }}
              >
                {current.options.map((option, i) => {
                  const isSelected = selectedIndex === i;
                  const isCorrectOption = i === current.correctIndex;
                  let optionStyle = "bg-slate-700/60 border-cyan-500/30 hover:border-cyan-300 hover:bg-slate-600/60 cursor-pointer";

                  if (feedback && isSelected) {
                    optionStyle = feedback === "correct"
                      ? "bg-emerald-500/40 border-emerald-400"
                      : "bg-red-500/40 border-red-400";
                  }
                  if (feedback === "wrong" && isCorrectOption) {
                    optionStyle = "bg-emerald-500/20 border-emerald-400/50";
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={!feedback ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!feedback ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={!!feedback}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionStyle}`}
                    >
                      <span className="text-base font-medium text-white">{option}</span>
                    </motion.button>
                  );
                })}
              </motion.div>

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
                      {feedback === "correct" ? t("phare.correct") : t("phare.wrong")}
                    </p>
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

export default PhareGame;
