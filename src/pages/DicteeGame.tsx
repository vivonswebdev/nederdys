import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Star, RotateCcw, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGameSession } from "@/hooks/useGameSession";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { Difficulty } from "@/lib/database";

interface DicteeRound {
  audio: string;
  correct: number;
  options: string[];
}

const ROUNDS_BY_DIFFICULTY: Record<Difficulty, DicteeRound[]> = {
  easy: [
    { audio: "De kat is klein.", options: ["De kat is klein.", "De ket is klein.", "De kat is klijn.", "De kat is kleen."], correct: 0 },
    { audio: "Ik heb een hond.", options: ["Ik hep een hond.", "Ik heb een hond.", "Ik heb een hont.", "Ik hab een hond."], correct: 1 },
    { audio: "De zon schijnt.", options: ["De son schijnt.", "De zon schijnt.", "De zon scheint.", "De zun schijnt."], correct: 1 },
    { audio: "Ik zie een vis.", options: ["Ik zie een vis.", "Ik sie een vis.", "Ik zie een fis.", "Ik zij een vis."], correct: 0 },
    { audio: "Het huis is groot.", options: ["Het huys is groot.", "Het huis is grot.", "Het huis is groot.", "Het huis is groet."], correct: 2 },
  ],
  medium: [
    { audio: "De vlinder vliegt.", options: ["De vlinder vlegt.", "De vlinder vliegt.", "De vlinder vlieght.", "De flinder vliegt."], correct: 1 },
    { audio: "Wij gaan naar school.", options: ["Wij gaan naar school.", "Wij gaan nar school.", "Wij gaan naar schol.", "Wij gan naar school."], correct: 0 },
    { audio: "Het boek is leuk.", options: ["Het boek is leuk.", "Het boek is loek.", "Het book is leuk.", "Het boek is luik."], correct: 0 },
    { audio: "Mijn fiets is rood.", options: ["Mijn fiets is rod.", "Mijn fiets is roood.", "Mijn fiets is rood.", "Mijn feets is rood."], correct: 2 },
    { audio: "De trein is snel.", options: ["De trein is snel.", "De trijn is snel.", "De trein is snell.", "De trien is snel."], correct: 0 },
  ],
  hard: [
    { audio: "De bibliotheek is dichtbij.", options: ["De biblioteek is dichtbij.", "De bibliotheek is dichtbij.", "De bibliotheek is dichtbei.", "De biblietheek is dichtbij."], correct: 1 },
    { audio: "Zij schrijft een brief.", options: ["Zij schrijft een brief.", "Zij schijft een brief.", "Zij schrijft een briev.", "Zij schrijft een breef."], correct: 0 },
    { audio: "De verjaardag is morgen.", options: ["De verjaardag is morgen.", "De verjaardagh is morgen.", "De verjaardag is morgun.", "De ferjaardag is morgen."], correct: 0 },
    { audio: "Hij gebruikt de computer.", options: ["Hij gebriukt de computer.", "Hij gebruikt de komputer.", "Hij gebruikt de computer.", "Hij gebruukt de computer."], correct: 2 },
    { audio: "Wij luisteren naar muziek.", options: ["Wij luisteren naar musiek.", "Wij luisteren naar muziek.", "Wij luistren naar muziek.", "Wij luisteren nar muziek."], correct: 1 },
  ],
};

const DicteeGame = () => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { saveSession, resetTimer, difficulty, xpGained, leveledUp } = useGameSession("dictee");
  const errorsRef = useRef(0);
  const savedRef = useRef(false);

  const ROUNDS = ROUNDS_BY_DIFFICULTY[difficulty];
  const current = ROUNDS[round];

  const speakSentence = () => {
    if (!current) return;
    const u = new SpeechSynthesisUtterance(current.audio);
    u.lang = "nl-NL";
    u.rate = 0.6;
    speechSynthesis.speak(u);
  };

  // Auto-speak on new round
  useEffect(() => {
    if (!gameOver && current) {
      const timer = setTimeout(speakSentence, 500);
      return () => clearTimeout(timer);
    }
  }, [round, gameOver]);

  const handleSelect = (index: number) => {
    if (feedback) return;
    setSelectedOption(index);
    const isCorrect = index === current.correct;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
    else errorsRef.current += 1;

    setTimeout(() => {
      if (round < ROUNDS.length - 1) {
        setRound((r) => r + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  useEffect(() => {
    if (gameOver && !savedRef.current) {
      savedRef.current = true;
      saveSession({ score, maxScore: ROUNDS.length, errorsCount: errorsRef.current, completed: true });
    }
  }, [gameOver, score, saveSession, ROUNDS.length]);

  const reset = () => {
    setRound(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
    setGameOver(false);
    errorsRef.current = 0;
    savedRef.current = false;
    resetTimer();
  };

  // Highlight syllables in text
  const highlightSyllables = (text: string) => {
    return text.split(" ").map((word, wi) => (
      <span key={wi}>
        {wi > 0 && " "}
        <span className="syllable-highlight">{word}</span>
      </span>
    ));
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-lg mx-auto px-4 py-16 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <span className="text-6xl block mb-4">📝</span>
            <h2 className="text-3xl font-bold text-foreground mb-2">Bravo !</h2>
            <p className="text-xl text-muted-foreground mb-2">Score : {score}/{ROUNDS.length}</p>
            <DifficultyIndicator difficulty={difficulty} />
            <XpGainPopup xpGained={xpGained} leveledUp={leveledUp} />
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: score }).map((_, i) => (
                <Star key={i} className="w-8 h-8 text-secondary fill-secondary" />
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={reset} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Rejouer
              </button>
              <Link to="/" className="bg-card text-foreground border-2 border-border px-6 py-3 rounded-full font-bold">Accueil</Link>
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
            <ArrowLeft className="w-4 h-4" /> Retour
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
          <h2 className="text-2xl font-bold text-foreground mb-4">Écoute et choisis la bonne phrase ! 📝</h2>
          <button onClick={speakSentence} className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full text-lg font-bold hover:bg-accent/80 transition-colors">
            <Volume2 className="w-6 h-6" /> Écouter la phrase
          </button>
        </motion.div>

        <div className="flex flex-col gap-3">
          {current.options.map((option, i) => {
            let optionClass = "bg-card border-border hover:border-primary cursor-pointer";
            if (feedback && selectedOption === i) {
              optionClass = i === current.correct
                ? "bg-primary/20 border-primary"
                : "bg-destructive/20 border-destructive";
            } else if (feedback && i === current.correct) {
              optionClass = "bg-primary/20 border-primary";
            }

            return (
              <motion.button
                key={`${round}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSelect(i)}
                disabled={!!feedback}
                className={`w-full text-left p-4 rounded-2xl border-2 font-dyslexic text-lg text-foreground transition-all ${optionClass}`}
              >
                <span className="font-bold text-muted-foreground mr-2">{String.fromCharCode(65 + i)}.</span>
                {highlightSyllables(option)}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center mt-6">
              <span className="text-3xl">{feedback === "correct" ? "✅ Correct !" : "❌ Ce n'est pas ça !"}</span>
            </motion.div>
          )}
        </AnimatePresence>

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

export default DicteeGame;
