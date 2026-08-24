import { ReactNode, useEffect, useRef, useState } from "react";
import { mathTextToNl } from "@/lib/mathSpeechNl";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Confetti } from "@/components/Confetti";
import { useAudio } from "@/hooks/useAudio";
import { MathChallengeBase, useMathSession } from "@/hooks/useMathSession";
import { sounds } from "@/lib/sounds";
import { MathLevel, XP_PER_LEVEL, recordGameCompletion } from "@/lib/mathSession";
import { BilingualText, Bi } from "@/components/ui/BilingualText";
import { UI, biFromFr, useChildLanguage, speakBoth } from "@/lib/bilingual";

export type QuizOption = string | number;

interface Props<T extends MathChallengeBase> {
  childId: string;
  level: MathLevel;
  backTo: string;
  gameId: string;
  title: string;
  emoji: string;
  pool: T[];
  sessionSize?: number;
  /** Options affichées (déjà fusionnées / mélangées par le jeu). */
  getOptions: (challenge: T) => QuizOption[];
  isCorrect: (challenge: T, option: QuizOption) => boolean;
  correctLabel: (challenge: T) => string;
  renderPrompt: (challenge: T) => ReactNode;
  getAudio: (challenge: T) => { url: string; text: string };
  /** Si défini, un chrono est activé pour chaque défi. */
  getTimeLimit?: (challenge: T) => number;
  optionsClassName?: string;
}

export function MathQuizGame<T extends MathChallengeBase>({
  childId,
  level,
  backTo,
  gameId,
  title,
  emoji,
  pool,
  sessionSize = 5,
  getOptions,
  isCorrect,
  correctLabel,
  renderPrompt,
  getAudio,
  getTimeLimit,
  optionsClassName = "grid grid-cols-2 sm:grid-cols-4 gap-3",
}: Props<T>) {
  const navigate = useNavigate();
  const { playBilingual, isPlaying } = useAudio();
  const childLang = useChildLanguage();
  const titleBi = biFromFr(title);
  const { challenge, index, total, score, setScore, errors, setErrors, isLast, next } =
    useMathSession(pool, level, sessionSize);

  const [selected, setSelected] = useState<QuizOption | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);
  const [options, setOptions] = useState<QuizOption[]>([]);

  const timerRef = useRef<number | null>(null);
  const startTime = useRef(Date.now());
  const savedRef = useRef(false);
  const xpPerCorrect = XP_PER_LEVEL[level];
  const timeLimit = challenge && getTimeLimit ? getTimeLimit(challenge) : 0;

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Nouveau défi : options recalculées, audio, chrono
  useEffect(() => {
    if (!challenge) return;
    setSelected(null);
    setFeedback(null);
    setOptions(getOptions(challenge));

    const audio = getAudio(challenge);
    const audioTimer = window.setTimeout(() => playBilingual({ url: audio.url, text: audio.text }, { text: mathTextToNl(audio.text) ?? undefined }), 400);

    if (getTimeLimit) {
      setTimeLeft(getTimeLimit(challenge));
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      window.clearTimeout(audioTimer);
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge, playAudio]);

  async function finishSession(finalScore: number, finalErrors: number) {
    if (savedRef.current) return;
    savedRef.current = true;
    clearTimer();
    setFinished(true);
    sounds.victory();
    const xp = finalScore * xpPerCorrect;
    const result = await recordGameCompletion({
      childId,
      gameId,
      subject: "math",
      difficulty: level,
      xpEarned: xp,
      score: finalScore,
      maxScore: total,
      durationSeconds: Math.round((Date.now() - startTime.current) / 1000),
      errorsCount: finalErrors,
    });
    if (!result.ok) toast.error("Erreur lors de l'enregistrement");
    else toast.success(`+${result.xp_awarded ?? xp} XP & ${result.xp_awarded ?? xp} pièces ! 🎉`);
    setTimeout(() => navigate(backTo), 2500);
  }

  const goNext = (finalScore: number, finalErrors: number) => {
    if (isLast) finishSession(finalScore, finalErrors);
    else next();
  };

  // Timeout détecté dans un effet séparé (aucun effet de bord dans l'updater)
  useEffect(() => {
    if (!challenge || !getTimeLimit || feedback !== null || timeLeft > 0) return;
    clearTimer();
    setFeedback("timeout");
    sounds.wrong();
    const newErrors = errors + 1;
    setErrors(newErrors);
    const t = window.setTimeout(() => goNext(score, newErrors), 2000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, feedback, challenge]);

  function handleAnswer(option: QuizOption) {
    if (!challenge || selected !== null || feedback !== null) return;
    clearTimer();
    setSelected(option);

    if (isCorrect(challenge, option)) {
      setFeedback("correct");
      sounds.correct();
      speakBoth(UI.correctShort, childLang);
      const newScore = score + 1;
      setScore(newScore);
      window.setTimeout(() => goNext(newScore, errors), 1500);
    } else {
      setFeedback("wrong");
      sounds.wrong();
      const newErrors = errors + 1;
      setErrors(newErrors);
      window.setTimeout(() => goNext(score, newErrors), 1500);
    }
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-lg px-4 py-16 text-center">
          <span className="text-6xl block mb-4">🎉</span>
          <h1 className="text-3xl font-bold mb-2">
            <Bi phrase={UI.sessionDone} stacked />
          </h1>
          <p className="text-lg font-dyslexic text-muted-foreground">
            <Bi phrase={UI.score} /> : {score}/{total} — {score * xpPerCorrect} XP
          </p>
        </main>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="text-center py-20 font-dyslexic"><Bi phrase={UI.loading} /></p>
      </div>
    );
  }

  const timerColor =
    timeLeft > timeLimit * 0.5
      ? "text-kids-green-dark"
      : timeLeft > timeLimit * 0.25
        ? "text-orange-600"
        : "text-destructive";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {feedback === "correct" && <Confetti />}
      <main className="container max-w-3xl px-4 py-8">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> <Bi phrase={UI.quit} />
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            <span className="mr-1">{emoji}</span>
            <BilingualText nl={titleBi.nl} fr={titleBi.fr} stacked />
            <span className="block text-base font-normal text-muted-foreground">
              <Bi phrase={UI.level} priority="nl" /> {level}
            </span>
          </h1>
          <p className="text-muted-foreground font-dyslexic">
            <Bi phrase={UI.challenge} /> {index + 1}/{total} · <Bi phrase={UI.score} /> {score}/{total} ·{" "}
            {xpPerCorrect} XP
          </p>
          <div className="h-3 bg-muted rounded-full overflow-hidden mt-3">
            <motion.div
              className="h-full bg-kids-green-dark"
              animate={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {getTimeLimit && (
          <div className={`flex items-center justify-center gap-2 text-4xl font-bold mb-6 ${timerColor}`}>
            <Clock className="w-8 h-8" />
            {timeLeft}s
          </div>
        )}

        <div className="text-center mb-6">{renderPrompt(challenge)}</div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              const a = getAudio(challenge);
              playBilingual({ url: a.url, text: a.text }, { text: mathTextToNl(a.text) ?? undefined });
            }}
            disabled={isPlaying}
            className="inline-flex items-center gap-2 bg-kids-blue text-foreground font-bold px-5 py-3 rounded-2xl kids-shadow-card disabled:opacity-60"
          >
            <Volume2 className="w-5 h-5" /> <Bi phrase={UI.listenAgain} />
          </button>
        </div>

        <div className={optionsClassName}>
          {options.map((option, i) => {
            let style = "bg-kids-blue hover:brightness-105 text-foreground";
            if (selected !== null || feedback === "timeout") {
              if (isCorrect(challenge, option)) style = "bg-kids-green-dark text-white";
              else if (option === selected) style = "bg-destructive text-destructive-foreground";
              else style = "bg-muted opacity-50 text-muted-foreground";
            }
            return (
              <button
                key={`${option}-${i}`}
                onClick={() => handleAnswer(option)}
                disabled={selected !== null || feedback !== null}
                className={`h-24 rounded-2xl text-4xl font-bold transition-all kids-shadow-card ${style} ${
                  selected === null && feedback === null ? "hover:scale-105" : ""
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xl font-bold font-dyslexic mt-6"
          >
            {feedback === "correct" && (
              <>
                ✅ <Bi phrase={UI.correctShort} stacked />
              </>
            )}
            {feedback === "wrong" && (
              <>
                ❌ <Bi phrase={UI.theAnswerWas} stacked /> {correctLabel(challenge)}
              </>
            )}
            {feedback === "timeout" && (
              <>
                ⏰ <Bi phrase={UI.timeout} stacked /> {correctLabel(challenge)}
              </>
            )}
          </motion.p>
        )}
      </main>
    </div>
  );
}

export default MathQuizGame;
