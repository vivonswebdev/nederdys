import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { Tb, Bi, BilingualInstruction, BilingualText } from "@/components/ui/BilingualText";
import { UI, speakTarget } from "@/lib/bilingual";
import { sounds } from "@/lib/sounds";
import { cirqueDesMotsChallenges, CirqueDesMotsChallenge } from "@/data/nl/cirqueDesMotsChallenges";

const LEVEL_OF = { easy: 1, medium: 2, hard: 3 } as const;
const BUBBLE_COLORS = ["bg-kids-blue", "bg-kids-pink", "bg-kids-yellow", "bg-kids-orange", "bg-kids-purple"];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const SESSION_SIZE = 6;

const CirqueMotsGame = () => {
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } =
    useGameSession("cirquemots");
  const level = LEVEL_OF[difficulty] ?? 1;

  const build = useCallback(
    () => shuffle(cirqueDesMotsChallenges.filter((c) => c.difficulty === level)).slice(0, SESSION_SIZE),
    [level]
  );

  const [session, setSession] = useState<CirqueDesMotsChallenge[]>(() => build());
  const [index, setIndex] = useState(0);
  const [bubbles, setBubbles] = useState<string[]>([]);
  const [popped, setPopped] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);

  const challenge = session[index];
  const total = session.length;

  const restart = useCallback(() => {
    resetTimer();
    setSession(build());
    setIndex(0);
    setScore(0);
    setErrors(0);
    setDone(false);
    setFeedback(null);
    setPopped([]);
  }, [build, resetTimer]);

  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  useEffect(() => {
    if (!challenge) return;
    setBubbles(shuffle(challenge.bubbleWords));
    setPopped([]);
    setFeedback(null);
    const t = window.setTimeout(() => speakTarget(challenge.theme), 400);
    return () => window.clearTimeout(t);
  }, [challenge]);

  const handlePop = (word: string) => {
    if (!challenge || feedback) return;
    const ok = word === challenge.targetWord;
    setPopped((p) => [...p, word]);
    if (ok) {
      sounds.correct();
      setFeedback("correct");
      speakTarget(challenge.targetWord);
      setScore((s) => s + 1);
    } else {
      sounds.wrong();
      setFeedback("wrong");
      setErrors((e) => e + 1);
    }
    window.setTimeout(() => {
      if (index + 1 >= total) {
        setDone(true);
        sounds.victory();
        saveSession({
          score: ok ? score + 1 : score,
          maxScore: total,
          errorsCount: ok ? errors : errors + 1,
          completed: true,
        });
      } else {
        setIndex((i) => i + 1);
      }
    }, 1300);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/jouer">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> <Bi phrase={UI.back} />
            </Button>
          </Link>
          <DifficultyIndicator difficulty={difficulty} />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          🎪 <Tb k="game.cirquemots.title" />
        </h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          <BilingualInstruction k="cirquemots.instruction" />
        </p>

        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>
            <Bi phrase={UI.score} /> : {score}/{total}
          </span>
          <span>
            {Math.min(index + 1, total)}/{total}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!done && challenge ? (
            <motion.div key={challenge.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-card border border-border rounded-2xl p-5 mb-6 text-center font-dyslexic">
                <p className="text-xl font-bold">
                  <BilingualText nl={`Thema: ${challenge.theme}`} fr={`Thème : ${challenge.themeFr}`} stacked />
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 mt-3 min-h-[44px]"
                  onClick={() => speakTarget(challenge.theme)}
                >
                  <Volume2 className="w-4 h-4" /> <Bi phrase={UI.listenAgain} />
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {bubbles.map((word, i) => {
                  const isPopped = popped.includes(word);
                  return (
                    <motion.button
                      key={word}
                      disabled={!!feedback}
                      onClick={() => handlePop(word)}
                      animate={isPopped ? { scale: 0, opacity: 0 } : { y: [0, -10, 0] }}
                      transition={isPopped ? { duration: 0.3 } : { duration: 2.4 + i * 0.3, repeat: Infinity }}
                      className={`${BUBBLE_COLORS[i % BUBBLE_COLORS.length]} rounded-full aspect-square min-h-[96px] flex items-center justify-center text-lg font-bold font-dyslexic border-4 border-white/40 shadow-lg`}
                    >
                      {word}
                    </motion.button>
                  );
                })}
              </div>

              {feedback === "wrong" && (
                <p className="mt-4 text-center text-sm font-dyslexic text-muted-foreground">
                  <BilingualText nl="Juist antwoord:" fr="Bonne réponse :" />{" "}
                  <strong>{challenge.targetWord}</strong>
                </p>
              )}
            </motion.div>
          ) : done ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="text-2xl font-bold mb-2">
                <Bi phrase={UI.sessionDone} stacked />
              </h2>
              <p className="text-muted-foreground font-dyslexic mb-6">
                <Bi phrase={UI.score} /> : {score}/{total}
              </p>
              <Button onClick={restart} className="gap-2 min-h-[44px]">
                <RotateCcw className="w-4 h-4" /> <Bi phrase={UI.replay} />
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <XpGainPopup xpGained={xpGained} coinsGained={coinsGained} leveledUp={leveledUp} />
      </div>
    </div>
  );
};

export default CirqueMotsGame;
