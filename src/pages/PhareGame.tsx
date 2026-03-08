import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Home, Volume2, Ship, Anchor } from "lucide-react";
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
  { sentence: "De bal is rood.", question: "Welke kleur heeft de bal?", options: ["Blauw", "Groen", "Rood"], correctIndex: 2, image: "🔴" },
  { sentence: "Papa leest de krant.", question: "Wat leest papa?", options: ["Een boek", "De krant", "Een brief"], correctIndex: 1, image: "📰" },
  { sentence: "Het regent buiten.", question: "Wat doet het buiten?", options: ["Het sneeuwt", "Het regent", "Het waait"], correctIndex: 1, image: "🌧️" },
  { sentence: "De baby slaapt in de wieg.", question: "Waar slaapt de baby?", options: ["In bed", "In de wieg", "Op de bank"], correctIndex: 1, image: "👶" },
];

const MEDIUM: ReadingChallenge[] = [
  { sentence: "De kinderen spelen buiten omdat het mooi weer is.", question: "Waarom spelen de kinderen buiten?", options: ["Ze hebben vakantie", "Het is mooi weer", "Ze zijn moe"], correctIndex: 1, image: "👧" },
  { sentence: "Mama koopt brood en kaas in de winkel.", question: "Wat koopt mama?", options: ["Brood en kaas", "Melk en eieren", "Fruit en groente"], correctIndex: 0, image: "🧀" },
  { sentence: "Het konijn heeft lange oren en een kort staartje.", question: "Wat heeft het konijn?", options: ["Korte oren", "Lange oren", "Geen oren"], correctIndex: 1, image: "🐰" },
  { sentence: "De trein vertrekt om drie uur naar Amsterdam.", question: "Hoe laat vertrekt de trein?", options: ["Om twee uur", "Om drie uur", "Om vier uur"], correctIndex: 1, image: "🚆" },
  { sentence: "Lisa leest een boek over dieren in de bibliotheek.", question: "Waar leest Lisa?", options: ["Op school", "In de bibliotheek", "Thuis"], correctIndex: 1, image: "📚" },
  { sentence: "De vis zwemt snel door het water van de rivier.", question: "Waar zwemt de vis?", options: ["In de zee", "In het zwembad", "In de rivier"], correctIndex: 2, image: "🐟" },
  { sentence: "Oma bakt een taart voor het feest van Pieter.", question: "Voor wie is de taart?", options: ["Voor Lisa", "Voor Pieter", "Voor mama"], correctIndex: 1, image: "🎂" },
  { sentence: "De eend zwemt in de vijver met haar kuikens.", question: "Met wie zwemt de eend?", options: ["Met de vis", "Met haar kuikens", "Alleen"], correctIndex: 1, image: "🦆" },
  { sentence: "Tom speelt viool en zijn zus speelt piano.", question: "Wat speelt Tom?", options: ["Piano", "Gitaar", "Viool"], correctIndex: 2, image: "🎻" },
  { sentence: "We gaan morgen naar de dierentuin om de olifanten te zien.", question: "Welke dieren gaan ze zien?", options: ["Leeuwen", "Olifanten", "Apen"], correctIndex: 1, image: "🐘" },
];

const HARD: ReadingChallenge[] = [
  { sentence: "Hoewel het regende, ging de jongen toch naar school op de fiets.", question: "Hoe ging de jongen naar school?", options: ["Met de bus", "Te voet", "Op de fiets"], correctIndex: 2, image: "🚲" },
  { sentence: "De bakker staat elke ochtend om vier uur op om vers brood te bakken.", question: "Hoe laat staat de bakker op?", options: ["Om zes uur", "Om vier uur", "Om vijf uur"], correctIndex: 1, image: "🍞" },
  { sentence: "In Nederland fietsen veel mensen naar hun werk, zelfs als het regent.", question: "Wat doen veel mensen in Nederland?", options: ["Ze nemen de auto", "Ze fietsen naar hun werk", "Ze blijven thuis"], correctIndex: 1, image: "🇳🇱" },
  { sentence: "De schildpad is langzaam maar won toch de race tegen het konijn.", question: "Wie won de race?", options: ["Het konijn", "De schildpad", "De hond"], correctIndex: 1, image: "🐢" },
  { sentence: "Opa vertelt graag verhalen over vroeger toen hij jong was.", question: "Waarover vertelt opa?", options: ["Over het weer", "Over vroeger", "Over zijn werk"], correctIndex: 1, image: "👴" },
  { sentence: "De vlinder was eerst een rups voordat hij mooie vleugels kreeg.", question: "Wat was de vlinder eerst?", options: ["Een bij", "Een rups", "Een vogel"], correctIndex: 1, image: "🦋" },
  { sentence: "De dokter zegt dat je veel water moet drinken als je ziek bent.", question: "Wat moet je drinken als je ziek bent?", options: ["Sap", "Koffie", "Water"], correctIndex: 2, image: "💧" },
  { sentence: "Tijdens de winter dragen de kinderen een warme muts en handschoenen.", question: "Wat dragen de kinderen in de winter?", options: ["Een zonnebril", "Een muts en handschoenen", "Een regenjas"], correctIndex: 1, image: "🧤" },
  { sentence: "De slimme vos verstopte zich achter de struiken om het konijn te verrassen.", question: "Waar verstopte de vos zich?", options: ["In een boom", "Achter de struiken", "In een grot"], correctIndex: 1, image: "🦊" },
  { sentence: "Nadat ze hun huiswerk hadden gemaakt, mochten de kinderen televisie kijken.", question: "Wat moesten de kinderen eerst doen?", options: ["Eten", "Hun huiswerk maken", "Buiten spelen"], correctIndex: 1, image: "📺" },
];

// Boat component for gamification
const BoatIcon = ({ saved, index }: { saved: boolean; index: number }) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <motion.span
      className={`text-2xl block ${saved ? "" : "grayscale opacity-40"}`}
      animate={saved ? { y: [0, -3, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
    >
      ⛵
    </motion.span>
    {saved && (
      <motion.span
        className="absolute -top-1 -right-1 text-xs"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        ✅
      </motion.span>
    )}
  </motion.div>
);

const PhareGame = () => {
  const { t } = useLanguage();
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } = useGameSession("phare");

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
  const [fogLevel, setFogLevel] = useState(1);
  const [boatsSaved, setBoatsSaved] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);

  const totalRounds = 6;
  const [shuffled, setShuffled] = useState<ReadingChallenge[]>([]);

  useEffect(() => {
    const s = [...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds);
    setShuffled(s);
    setBoatsSaved(new Array(totalRounds).fill(false));
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
        setStreak((s) => s + 1);
        setBoatsSaved((prev) => {
          const updated = [...prev];
          updated[round] = true;
          return updated;
        });
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
        setStreak(0);
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
    setStreak(0);
    setBoatsSaved(new Array(totalRounds).fill(false));
    resetTimer();
    setShuffled([...getChallenges()].sort(() => Math.random() - 0.5).slice(0, totalRounds));
  };

  if (!current && !finished) return null;

  const starRating = score === totalRounds ? 3 : score >= totalRounds * 0.7 ? 2 : score >= totalRounds * 0.4 ? 1 : 0;

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
            {streak >= 2 && (
              <motion.span
                className="text-sm font-bold text-orange-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={streak}
              >
                🔥 x{streak}
              </motion.span>
            )}
            <span className="text-sm font-bold text-cyan-200">
              {round + 1}/{totalRounds}
            </span>
          </div>
          <span className="text-lg font-bold text-cyan-100">
            {t("game.score")}: {score}/{totalRounds}
          </span>
        </div>
      </div>

      {/* Boat progress bar */}
      <div className="bg-slate-900/50 border-b border-cyan-800/30 py-2 px-4">
        <div className="container max-w-2xl flex items-center justify-center gap-3">
          <Anchor className="w-4 h-4 text-cyan-400" />
          <div className="flex items-center gap-2">
            {boatsSaved.map((saved, i) => (
              <BoatIcon key={i} saved={saved} index={i} />
            ))}
          </div>
          <Ship className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      <div className="container max-w-2xl py-8 px-4 relative">
        {/* Lighthouse beam animation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
          <motion.div
            className="w-2 h-40 mx-auto origin-bottom"
            style={{
              background: "linear-gradient(to bottom, rgba(253,224,71,0.7), transparent)",
            }}
            animate={{ opacity: [0.3, 1, 0.3], scaleX: [1, 4, 1], rotate: [-15, 15, -15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-5xl text-center -mt-2">🏠</div>
        </div>

        {/* Floating fog particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-200/5 blur-xl"
              style={{
                width: `${40 + i * 15}px`,
                height: `${40 + i * 15}px`,
                left: `${3 + i * 10}%`,
                top: `${15 + (i % 4) * 20}%`,
              }}
              animate={{ x: [0, 40, -30, 0], y: [0, -20, 15, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6 + i * 0.8, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 mt-16">
              {/* Lighthouse celebration */}
              <motion.div
                className="text-7xl mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏠
              </motion.div>

              {/* Stars */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((star) => (
                  <motion.span
                    key={star}
                    className={`text-4xl ${star <= starRating ? "" : "grayscale opacity-30"}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + star * 0.2, type: "spring", stiffness: 200 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-white">{t("game.bravo")}</h2>
              <p className="text-xl text-cyan-200">
                {t("game.score")}: {score}/{totalRounds}
              </p>

              {/* Boats summary */}
              <div className="bg-slate-800/50 rounded-2xl p-4 inline-block">
                <p className="text-cyan-300 text-sm mb-2">{t("phare.boatsSaved")}</p>
                <div className="flex items-center justify-center gap-2">
                  {boatsSaved.map((saved, i) => (
                    <motion.span
                      key={i}
                      className={`text-3xl ${saved ? "" : "grayscale opacity-30"}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      ⛵
                    </motion.span>
                  ))}
                </div>
              </div>

              <p className="text-cyan-300">{t("phare.bravo")}</p>
              <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />

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
            <motion.div key={round} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-6 mt-12">
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
                  <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(51,65,85,0.95), rgba(71,85,105,0.9), rgba(51,65,85,0.95))",
                      opacity: fogLevel * 0.92,
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
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
                    {feedback === "correct" && (
                      <motion.p
                        className="text-cyan-200 text-sm mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        ⛵ {t("phare.boatSaved")}
                      </motion.p>
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

export default PhareGame;
