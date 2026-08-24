import { ReactNode, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/DifficultyIndicator";
import { XpGainPopup } from "@/components/XpGainPopup";
import { useGameSession } from "@/hooks/useGameSession";
import { Tb, BilingualInstruction, BilingualText } from "@/components/ui/BilingualText";
import { UI, speakTarget, biFromKey } from "@/lib/bilingual";
import { Bi } from "@/components/ui/BilingualText";
import { sounds } from "@/lib/sounds";

export type NlLevel = 1 | 2 | 3;

export interface NlChallengeBase {
  id: number;
  difficulty: NlLevel;
}

export type NlOption = string;

interface Props<T extends NlChallengeBase> {
  gameId: string;
  emoji: string;
  /** Clés i18n (fr + nl) déjà présentes dans translations.ts */
  titleKey: string;
  instructionKey: string;
  pool: T[];
  sessionSize?: number;
  getOptions: (challenge: T) => NlOption[];
  isCorrect: (challenge: T, option: NlOption) => boolean;
  correctLabel: (challenge: T) => string;
  renderPrompt: (challenge: T) => ReactNode;
  /** Texte néerlandais lu à voix haute au début de chaque défi. */
  speakText: (challenge: T) => string;
  optionsClassName?: string;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const LEVEL_OF = { easy: 1, medium: 2, hard: 3 } as const;

/**
 * Squelette commun des jeux NL à choix multiple (même rôle que MathQuizGame
 * côté maths) : chaque jeu garde sa propre page dédiée et ses propres données.
 */
export function NlQuizGame<T extends NlChallengeBase>({
  gameId,
  emoji,
  titleKey,
  instructionKey,
  pool,
  sessionSize = 6,
  getOptions,
  isCorrect,
  correctLabel,
  renderPrompt,
  speakText,
  optionsClassName = "grid grid-cols-2 gap-3 w-full",
}: Props<T>) {
  const { saveSession, resetTimer, difficulty, xpGained, coinsGained, leveledUp } =
    useGameSession(gameId);
  const level: NlLevel = LEVEL_OF[difficulty] ?? 1;

  const build = useCallback(() => {
    const filtered = pool.filter((c) => c.difficulty === level);
    const source = filtered.length ? filtered : pool;
    return shuffle(source).slice(0, sessionSize);
  }, [pool, level, sessionSize]);

  const [session, setSession] = useState<T[]>(() => build());
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<NlOption[]>([]);
  const [selected, setSelected] = useState<NlOption | null>(null);
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
    setSelected(null);
  }, [build, resetTimer]);

  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  useEffect(() => {
    if (!challenge) return;
    setOptions(shuffle(getOptions(challenge)));
    setFeedback(null);
    setSelected(null);
    const t = window.setTimeout(() => speakTarget(speakText(challenge)), 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge]);

  const handleSelect = (option: NlOption) => {
    if (!challenge || feedback) return;
    setSelected(option);
    const ok = isCorrect(challenge, option);
    if (ok) {
      sounds.correct();
      setFeedback("correct");
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
          {emoji} <Tb k={titleKey} />
        </h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          <BilingualInstruction k={instructionKey} />
        </p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>
              <Bi phrase={UI.score} /> : {score}/{total}
            </span>
            <span>
              {Math.min(index + 1, total)}/{total}
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${total ? (score / total) * 100 : 0}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!done && challenge ? (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex flex-col items-center"
            >
              <Button
                variant="outline"
                onClick={() => speakTarget(speakText(challenge))}
                className="gap-2 mb-6 min-h-[44px]"
              >
                <Volume2 className="w-5 h-5" /> <Bi phrase={UI.listenAgain} />
              </Button>

              <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-lg w-full text-center font-dyslexic">
                {renderPrompt(challenge)}
              </div>

              <div className={optionsClassName}>
                {options.map((option) => {
                  const isSel = selected === option;
                  const good = feedback && isCorrect(challenge, option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      disabled={!!feedback}
                      className={`min-h-[56px] rounded-2xl border-4 px-4 py-3 text-xl font-bold font-dyslexic transition
                        ${good ? "bg-kids-green-light border-kids-green-dark" : ""}
                        ${isSel && feedback === "wrong" ? "bg-kids-red border-red-700" : ""}
                        ${!feedback ? "bg-card border-border hover:border-primary" : ""}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {feedback === "wrong" && (
                <p className="mt-4 text-sm font-dyslexic text-muted-foreground">
                  <BilingualText nl="Juist antwoord:" fr="Bonne réponse :" />{" "}
                  <strong>{correctLabel(challenge)}</strong>
                </p>
              )}
            </motion.div>
          ) : done ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="text-2xl font-bold mb-2">
                <Bi phrase={UI.sessionDone ?? { nl: "Sessie klaar!", fr: "Session terminée !" }} stacked />
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

        <XpGainPopup xp={xpGained} coins={coinsGained} leveledUp={leveledUp} />
      </div>
    </div>
  );
}

export default NlQuizGame;
