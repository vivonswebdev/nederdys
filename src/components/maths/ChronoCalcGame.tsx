import { BilingualText } from "@/components/ui/BilingualText";
import { mathTextToNl } from "@/lib/mathSpeechNl";
import { bi, biFromFr } from "@/lib/bilingual";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { biToast } from "@/lib/biToast";
import { Navbar } from "@/components/Navbar";
import { useAudio } from "@/hooks/useAudio";
import { sounds } from "@/lib/sounds";
import { chronoCalcChallenges, ChronoCalcChallenge } from "@/data/math/chronoCalcChallenges";
import { MathLevel, XP_PER_LEVEL, pickSession, recordGameCompletion } from "@/lib/mathSession";

const CHALLENGES_PER_SESSION = 6;

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const ChronoCalcGame = ({ childId, level, backTo }: Props) => {
  const navigate = useNavigate();
  const { playBilingual, isPlaying } = useAudio();

  const [sessionChallenges, setSessionChallenges] = useState<ChronoCalcChallenge[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTime = useRef(Date.now());
  const savedRef = useRef(false);

  const current = sessionChallenges[index];
  const xpPerCorrect = XP_PER_LEVEL[level];

  // Session : 6 défis tirés au hasard dans le pool du niveau choisi
  useEffect(() => {
    const pool = chronoCalcChallenges.filter((c) => c.difficulty === level);
    setSessionChallenges(pickSession(pool, CHALLENGES_PER_SESSION));
    setIndex(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    savedRef.current = false;
    startTime.current = Date.now();
  }, [level]);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Démarrage du chrono à chaque défi (aucun effet de bord dans l'updater)
  useEffect(() => {
    if (!current) return;
    setTimeLeft(current.timeLimit);
    setSelected(null);
    setFeedback(null);

    const audioTimer = window.setTimeout(() => playBilingual({ url: current.audioUrl, text: current.audioText }, { text: mathTextToNl(current.audioText) ?? undefined }), 500);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearTimeout(audioTimer);
      clearTimer();
    };
  }, [current, playBilingual]);

  async function finishSession(finalScore: number, finalErrors: number) {
    if (savedRef.current) return;
    savedRef.current = true;
    clearTimer();
    setFinished(true);
    const xp = finalScore * xpPerCorrect;
    sounds.victory();
    const result = await recordGameCompletion({
      childId,
      gameId: "chrono_calcul",
      subject: "math",
      difficulty: level,
      xpEarned: xp,
      score: finalScore,
      maxScore: CHALLENGES_PER_SESSION,
      durationSeconds: Math.round((Date.now() - startTime.current) / 1000),
      errorsCount: finalErrors,
    });
    if (!result.ok) {
      biToast.error(bi("Fout bij het opslaan", "Erreur lors de l'enregistrement"));
    } else {
      biToast.success(bi(`+${result.xp_awarded ?? xp} XP & ${result.xp_awarded ?? xp} muntjes! 🎉`, `+${result.xp_awarded ?? xp} XP & ${result.xp_awarded ?? xp} pièces ! 🎉`));
    }
    setTimeout(() => navigate(backTo), 2500);
  }

  const goNext = (finalScore: number, finalErrors: number) => {
    if (index >= sessionChallenges.length - 1) finishSession(finalScore, finalErrors);
    else setIndex((i) => i + 1);
  };

  // Timeout détecté dans un effet séparé
  useEffect(() => {
    if (!current || feedback !== null || timeLeft > 0) return;
    clearTimer();
    setFeedback("timeout");
    sounds.wrong();
    const newErrors = errors + 1;
    setErrors(newErrors);
    const t = window.setTimeout(() => goNext(score, newErrors), 2000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, feedback, current]);

  function handleAnswer(answer: number) {
    if (!current || selected !== null || feedback !== null) return;
    clearTimer();
    setSelected(answer);

    if (answer === current.correctAnswer) {
      setFeedback("correct");
      sounds.correct();
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => goNext(newScore, errors), 1500);
    } else {
      setFeedback("wrong");
      sounds.wrong();
      const newErrors = errors + 1;
      setErrors(newErrors);
      setTimeout(() => goNext(score, newErrors), 1500);
    }
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-lg px-4 py-16 text-center">
          <span className="text-6xl block mb-4">🎉</span>
          <h1 className="text-3xl font-bold mb-2"><BilingualText {...biFromFr("Session terminée !")} /></h1>
          <p className="text-lg font-dyslexic text-muted-foreground">
            Score : {score}/{CHALLENGES_PER_SESSION} — {score * xpPerCorrect} XP
          </p>
        </main>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="text-center py-20 font-dyslexic"><BilingualText {...biFromFr("Chargement...")} /></p>
      </div>
    );
  }

  const timerColor =
    timeLeft > current.timeLimit * 0.5
      ? "text-kids-green-dark"
      : timeLeft > current.timeLimit * 0.25
        ? "text-orange-600"
        : "text-destructive";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> <BilingualText {...biFromFr("Quitter")} />
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">⏱️ Chrono Calcul — Niveau {level}</h1>
          <p className="text-muted-foreground font-dyslexic">
            Défi {index + 1}/{sessionChallenges.length} · Score : {score}/{sessionChallenges.length} ·{" "}
            {xpPerCorrect} XP par réponse
          </p>
          <div className="h-3 bg-muted rounded-full overflow-hidden mt-3">
            <motion.div
              className="h-full bg-kids-green-dark"
              animate={{ width: `${((index + 1) / sessionChallenges.length) * 100}%` }}
            />
          </div>
        </div>

        <div className={`flex items-center justify-center gap-2 text-4xl font-bold mb-6 ${timerColor}`}>
          <Clock className="w-8 h-8" />
          {timeLeft}s
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => playBilingual({ url: current.audioUrl, text: current.audioText }, { text: mathTextToNl(current.audioText) ?? undefined })}
            className="inline-flex items-center gap-2 bg-kids-blue text-foreground font-bold px-5 py-3 rounded-xl kids-shadow-card"
          >
            <Play className="w-5 h-5" />
            <BilingualText {...biFromFr(isPlaying ? "Écoute en cours..." : "Réécouter")} />
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 text-center mb-6">
          <p className="text-5xl font-bold font-dyslexic">{current.question}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {current.options.map((option) => {
            let style = "bg-kids-blue text-foreground hover:scale-105";
            if (selected !== null || feedback === "timeout") {
              if (option === current.correctAnswer) style = "bg-kids-green-dark text-primary-foreground";
              else if (option === selected) style = "bg-destructive text-destructive-foreground";
              else style = "bg-muted opacity-50";
            }
            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={selected !== null || feedback !== null}
                className={`h-24 rounded-xl text-4xl font-bold shadow-lg transition-transform ${style}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className="text-center mt-6 font-dyslexic text-lg font-bold">
            {feedback === "correct" && <p className="text-kids-green-dark">✅ <BilingualText {...biFromFr("Bravo ! Bonne réponse !")} /></p>}
            {feedback === "wrong" && (
              <p className="text-destructive">❌ Oups ! La bonne réponse était {current.correctAnswer}</p>
            )}
            {feedback === "timeout" && (
              <p className="text-orange-600">⏰ Temps écoulé ! La bonne réponse était {current.correctAnswer}</p>
            )}
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground font-dyslexic mt-8">
          👂 Écoute l'opération et choisis la bonne réponse avant la fin du chrono !
        </p>
      </main>
    </div>
  );
};

export default ChronoCalcGame;
