import { BilingualText } from "@/components/ui/BilingualText";
import { mathTextToNl } from "@/lib/mathSpeechNl";
import { biFromFr } from "@/lib/bilingual";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { useAudio } from "@/hooks/useAudio";
import { sounds } from "@/lib/sounds";
import { numberWallChallenges, NumberWallChallenge } from "@/data/math/numberWallChallenges";
import { MathLevel, XP_PER_LEVEL, pickSession, recordGameCompletion } from "@/lib/mathSession";

const CHALLENGES_PER_SESSION = 5;

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const NumberWallGame = ({ childId, level, backTo }: Props) => {
  const navigate = useNavigate();
  const { playBilingual, isPlaying } = useAudio();

  const [sessionChallenges, setSessionChallenges] = useState<NumberWallChallenge[]>([]);
  const [index, setIndex] = useState(0);
  const [placed, setPlaced] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());
  const savedRef = useRef(false);

  const current = sessionChallenges[index];
  const xpPerCorrect = XP_PER_LEVEL[level];

  // Session : 5 défis tirés au hasard dans le pool du niveau choisi
  useEffect(() => {
    const pool = numberWallChallenges.filter((c) => c.difficulty === level);
    setSessionChallenges(pickSession(pool, CHALLENGES_PER_SESSION));
    setIndex(0);
    setScore(0);
    setErrors(0);
    setFinished(false);
    savedRef.current = false;
    startTime.current = Date.now();
  }, [level]);

  // Préparation des briques du défi courant
  useEffect(() => {
    if (!current) return;
    setAvailable(pickSession(current.bricks, current.bricks.length));
    setPlaced([]);
    setFeedback(null);
    const timer = setTimeout(() => playBilingual({ url: current.audioUrl, text: current.audioText }, { text: mathTextToNl(current.audioText) ?? undefined }), 500);
    return () => clearTimeout(timer);
  }, [current, playBilingual]);

  async function finishSession(finalScore: number, finalErrors: number) {
    if (savedRef.current) return;
    savedRef.current = true;
    setFinished(true);
    const xp = finalScore * xpPerCorrect;
    sounds.victory();
    const result = await recordGameCompletion({
      childId,
      gameId: "mur_des_nombres",
      subject: "math",
      difficulty: level,
      xpEarned: xp,
      score: finalScore,
      maxScore: CHALLENGES_PER_SESSION,
      durationSeconds: Math.round((Date.now() - startTime.current) / 1000),
      errorsCount: finalErrors,
    });
    if (!result.ok) {
      toast.error("Erreur lors de l'enregistrement");
    } else {
      toast.success(`+${result.xp_awarded ?? xp} XP & ${result.xp_awarded ?? xp} pièces ! 🎉`);
    }
    setTimeout(() => navigate(backTo), 2500);
  }

  function handleBrickClick(brick: string, i: number) {
    if (feedback !== null) return;
    sounds.click();
    setAvailable((prev) => prev.filter((_, idx) => idx !== i));
    setPlaced((prev) => [...prev, brick]);
  }

  function handlePlacedClick(brick: string, i: number) {
    if (feedback !== null) return;
    sounds.click();
    setPlaced((prev) => prev.filter((_, idx) => idx !== i));
    setAvailable((prev) => [...prev, brick]);
  }

  function handleCheck() {
    if (!current || feedback !== null) return;
    const isCorrect = placed.join("|") === current.correctOrder.join("|");

    if (isCorrect) {
      setFeedback("correct");
      sounds.correct();
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => {
        if (index >= sessionChallenges.length - 1) finishSession(newScore, errors);
        else setIndex((i) => i + 1);
      }, 1500);
    } else {
      setFeedback("wrong");
      sounds.wrong();
      const newErrors = errors + 1;
      setErrors(newErrors);
      setTimeout(() => {
        setAvailable((prev) => pickSession([...prev, ...placed], prev.length + placed.length));
        setPlaced([]);
        setFeedback(null);
      }, 1500);
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
          <h1 className="text-2xl font-bold">🧱 Le Mur des Nombres — Niveau {level}</h1>
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

        <div className="flex justify-center mb-6">
          <button
            onClick={() => playBilingual({ url: current.audioUrl, text: current.audioText }, { text: mathTextToNl(current.audioText) ?? undefined })}
            className="inline-flex items-center gap-2 bg-kids-blue text-foreground font-bold px-5 py-3 rounded-xl kids-shadow-card"
          >
            <Play className="w-5 h-5" />
            {isPlaying ? "Écoute en cours..." : "Réécouter la consigne"}
          </button>
        </div>

        <section className="bg-card border border-border rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-bold text-muted-foreground mb-3"><BilingualText {...biFromFr("Construis ton mur ici :")} /></h2>
          <div className="flex flex-wrap gap-3 justify-center min-h-[5rem] items-center">
            {placed.map((brick, i) => (
              <button
                key={`${brick}-${i}`}
                onClick={() => handlePlacedClick(brick, i)}
                disabled={feedback !== null}
                className={`w-16 h-16 rounded-xl text-2xl font-bold shadow-lg transition-transform ${
                  feedback === "correct"
                    ? "bg-kids-green-dark text-primary-foreground scale-110"
                    : feedback === "wrong"
                      ? "bg-destructive/70 text-destructive-foreground"
                      : "bg-kids-orange text-foreground hover:scale-105"
                }`}
              >
                {brick}
              </button>
            ))}
            {placed.length === 0 && (
              <p className="text-muted-foreground font-dyslexic text-sm">
                <BilingualText {...biFromFr("Clique sur les briques ci-dessous pour les placer ici")} />
              </p>
            )}
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-bold text-muted-foreground mb-3"><BilingualText {...biFromFr("Briques disponibles :")} /></h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {available.map((brick, i) => (
              <button
                key={`${brick}-${i}`}
                onClick={() => handleBrickClick(brick, i)}
                disabled={feedback !== null}
                className="w-16 h-16 rounded-xl text-2xl font-bold bg-kids-blue text-foreground shadow-lg hover:scale-105 transition-transform"
              >
                {brick}
              </button>
            ))}
          </div>
        </section>

        {placed.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleCheck}
              disabled={feedback !== null}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl kids-shadow-card disabled:opacity-60"
            >
              <Check className="w-5 h-5" />
              <BilingualText
                {...biFromFr(
                  feedback === "correct"
                    ? "Bravo ! 🎉"
                    : feedback === "wrong"
                      ? "Oups, essaie encore !"
                      : "Vérifier mon mur !"
                )}
              />
            </button>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground font-dyslexic mt-8">
          👂 Écoute l'opération et place les briques dans le bon ordre pour former l'égalité correcte.
        </p>
      </main>
    </div>
  );
};

export default NumberWallGame;
