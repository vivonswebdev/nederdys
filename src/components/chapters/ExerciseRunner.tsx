import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Volume2, X } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Confetti } from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sounds } from "@/lib/sounds";
import {
  Chapter,
  Difficulty,
  Exercise,
  LEVEL_EMOJI,
  LEVEL_LABEL,
  MASTERY_THRESHOLD,
  exercisesForLevel,
  recordExerciseSession,
  shuffle,
} from "@/lib/chapters";

interface Props {
  childId: string;
  chapter: Chapter;
  level: Difficulty;
  sessionSize?: number;
}

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/,/g, ".")
    .replace(/€|cm|kg|g\b/g, "");

/** Lecture audio nl-BE : fichier fourni sinon synthèse vocale néerlandaise. */
function playNl(ex: Exercise) {
  if (ex.audioUrl) {
    new Audio(ex.audioUrl).play().catch(() => undefined);
    return;
  }
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const text = [ex.question, ex.type === "qcm" ? String(ex.answer) : ""].join(" ");
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "nl-BE";
  utter.rate = 0.85;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("nl"));
  if (voice) utter.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

export const ExerciseRunner = ({ childId, chapter, level, sessionSize = 6 }: Props) => {
  const navigate = useNavigate();
  const backTo = `/child/${childId}/${chapter.subject}/chapitre/${chapter.id}`;

  const session = useMemo(
    () => shuffle(exercisesForLevel(chapter, level)).slice(0, sessionSize),
    [chapter, level, sessionSize]
  );

  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ xp: number; pct: number; unlocked: Difficulty } | null>(null);

  // état des réponses selon le type
  const [textAnswer, setTextAnswer] = useState("");
  const [orderPicks, setOrderPicks] = useState<string[]>([]);
  const [matchLeft, setMatchLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});

  const exercise: Exercise | undefined = session[index];

  const shuffledOptions = useMemo(() => {
    if (!exercise) return [];
    if (exercise.type === "qcm") return shuffle(exercise.options);
    if (exercise.type === "order") return shuffle(exercise.answer);
    return [];
  }, [exercise]);

  const shuffledRights = useMemo(
    () => (exercise?.type === "match" ? shuffle(exercise.pairs.map((p) => p.right)) : []),
    [exercise]
  );

  useEffect(() => {
    setTextAnswer("");
    setOrderPicks([]);
    setMatchLeft(null);
    setMatched({});
    setFeedback(null);
  }, [index]);

  const finishSession = async (finalCorrect: number) => {
    setFinished(true);
    setSaving(true);
    const total = session.length;
    const pct = Math.round((finalCorrect / Math.max(total, 1)) * 100);
    const res = await recordExerciseSession({
      childId,
      chapterId: chapter.id,
      difficulty: level,
      correct: finalCorrect,
      total,
    });
    setSaving(false);
    if (!res) {
      toast.error("On n'a pas pu enregistrer ta partie, mais tes réponses comptent quand même 💚");
      setResult({ xp: 0, pct, unlocked: level });
      return;
    }
    setResult({ xp: res.xp_awarded, pct: Number(res.score_pct), unlocked: res.unlocked_level });
    toast.success(`+${res.xp_awarded} XP et ${res.xp_awarded} pièces ! 🎉`);
    if (Number(res.score_pct) >= MASTERY_THRESHOLD && res.unlocked_level > level) {
      sounds.correct();
      toast.success(`🎉 Tu as débloqué le niveau ${LEVEL_LABEL[res.unlocked_level]} !`);
    }
  };

  const validate = (isCorrect: boolean) => {
    if (feedback) return;
    setFeedback(isCorrect ? "correct" : "wrong");
    isCorrect ? sounds.correct() : sounds.wrong();
    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    if (isCorrect) setCorrectCount(nextCorrect);
    window.setTimeout(() => {
      if (index + 1 >= session.length) {
        finishSession(nextCorrect);
      } else {
        setIndex((i) => i + 1);
      }
    }, 1600);
  };

  if (!exercise && !finished) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-2xl px-4 py-16 text-center">
          <p className="font-dyslexic text-muted-foreground">
            Ce niveau n'a pas encore d'exercices. Reviens bientôt !
          </p>
          <Button className="mt-4" onClick={() => navigate(backTo)}>
            Retour au chapitre
          </Button>
        </main>
      </div>
    );
  }

  if (finished) {
    const pct = result?.pct ?? 0;
    const mastered = pct >= MASTERY_THRESHOLD;
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        {mastered && <Confetti count={40} />}
        <main className="container max-w-xl px-4 py-12 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border-4 border-border rounded-3xl p-8 kids-shadow-card"
          >
            <span className="text-6xl block mb-3">{mastered ? "🏆" : "💪"}</span>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {mastered ? "Bravo, c'est réussi !" : "Bien joué, continue !"}
            </h1>
            <p className="font-dyslexic text-muted-foreground mb-4">
              {correctCount} bonnes réponses sur {session.length} — {pct}%
            </p>
            {result && (
              <p className="text-lg font-bold text-foreground mb-2">+{result.xp} XP · +{result.xp} pièces</p>
            )}
            {!mastered && (
              <p className="font-dyslexic text-muted-foreground mb-2">
                Objectif : 80 % pour débloquer le niveau suivant. Tu y es presque !
              </p>
            )}
            {saving && <p className="text-sm text-muted-foreground">Enregistrement…</p>}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Button onClick={() => navigate(backTo)}>Retour au chapitre</Button>
              <Button variant="secondary" onClick={() => window.location.reload()}>
                Rejouer ce niveau
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  const ex = exercise!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {feedback === "correct" && <Confetti />}
      <main className="container max-w-2xl px-4 py-8">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Quitter
        </button>

        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-foreground">
            {chapter.emoji} {chapter.name} · {LEVEL_EMOJI[level]} {LEVEL_LABEL[level]}
          </p>
          <p className="text-sm text-muted-foreground">
            {index + 1} / {session.length}
          </p>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${((index + 1) / session.length) * 100}%` }}
          />
        </div>

        <motion.div
          key={ex.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-4 border-border rounded-3xl p-6 kids-shadow-card"
        >
          <div className="flex items-start gap-3 mb-3">
            <h2 className="text-xl font-bold text-foreground font-dyslexic flex-1">{ex.question}</h2>
            {chapter.subject === "nl" && (
              <button
                type="button"
                onClick={() => playNl(ex)}
                aria-label="Écouter en néerlandais"
                className="shrink-0 w-11 h-11 rounded-full bg-kids-blue/40 border-2 border-primary flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Volume2 className="w-5 h-5 text-foreground" />
              </button>
            )}
          </div>

          {ex.visualAid && (
            <p className="text-lg text-center bg-muted rounded-2xl py-3 px-4 mb-4 font-dyslexic">
              {ex.visualAid}
            </p>
          )}

          {/* QCM */}
          {ex.type === "qcm" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shuffledOptions.map((opt) => (
                <button
                  key={String(opt)}
                  disabled={!!feedback}
                  onClick={() => validate(String(opt) === String(ex.answer))}
                  className="border-4 border-border rounded-2xl p-4 text-lg font-bold font-dyslexic bg-background hover:bg-muted transition-colors disabled:opacity-70"
                >
                  {String(opt)}
                </button>
              ))}
            </div>
          )}

          {/* Vrai / Faux */}
          {ex.type === "true_false" && (
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={!!feedback}
                onClick={() => validate(ex.answer === true)}
                className="border-4 border-kids-green-dark bg-kids-green-light rounded-2xl p-5 text-lg font-bold"
              >
                ✅ Vrai
              </button>
              <button
                disabled={!!feedback}
                onClick={() => validate(ex.answer === false)}
                className="border-4 border-red-700 bg-kids-red rounded-2xl p-5 text-lg font-bold"
              >
                ❌ Faux
              </button>
            </div>
          )}

          {/* Réponse à écrire */}
          {ex.type === "fill_blank" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!textAnswer.trim()) return;
                validate(normalize(textAnswer) === normalize(ex.answer));
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Ta réponse"
                disabled={!!feedback}
                className="text-lg font-dyslexic h-14"
                autoFocus
              />
              <Button type="submit" disabled={!!feedback} className="h-14 px-8 text-lg">
                Valider
              </Button>
            </form>
          )}

          {/* Remise en ordre */}
          {ex.type === "order" && (
            <div>
              <div className="min-h-16 border-4 border-dashed border-border rounded-2xl p-3 mb-4 flex flex-wrap gap-2">
                {orderPicks.length === 0 && (
                  <span className="text-muted-foreground font-dyslexic">Clique dans le bon ordre…</span>
                )}
                {orderPicks.map((item, i) => (
                  <span key={item} className="bg-primary text-primary-foreground rounded-xl px-3 py-2 font-bold">
                    {i + 1}. {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {shuffledOptions
                  .map(String)
                  .filter((item) => !orderPicks.includes(item))
                  .map((item) => (
                    <button
                      key={item}
                      disabled={!!feedback}
                      onClick={() => {
                        sounds.click();
                        setOrderPicks((p) => [...p, item]);
                      }}
                      className="border-4 border-border rounded-2xl px-4 py-3 font-bold font-dyslexic bg-background hover:bg-muted"
                    >
                      {item}
                    </button>
                  ))}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  disabled={!!feedback || orderPicks.length === 0}
                  onClick={() => setOrderPicks([])}
                >
                  Recommencer
                </Button>
                <Button
                  disabled={!!feedback || orderPicks.length !== ex.answer.length}
                  onClick={() => validate(orderPicks.every((v, i) => v === ex.answer[i]))}
                >
                  Valider
                </Button>
              </div>
            </div>
          )}

          {/* Associations */}
          {ex.type === "match" && (
            <div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  {ex.pairs.map((pair) => {
                    const done = matched[pair.left];
                    return (
                      <button
                        key={pair.left}
                        disabled={!!feedback || !!done}
                        onClick={() => {
                          sounds.click();
                          setMatchLeft(pair.left);
                        }}
                        className={`w-full border-4 rounded-2xl px-3 py-3 font-bold font-dyslexic ${
                          done
                            ? "border-kids-green-dark bg-kids-green-light"
                            : matchLeft === pair.left
                              ? "border-primary bg-muted"
                              : "border-border bg-background"
                        }`}
                      >
                        {pair.left}
                        {done && <span className="block text-sm font-normal">→ {done}</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  {shuffledRights
                    .filter((right) => !Object.values(matched).includes(right))
                    .map((right) => (
                      <button
                        key={right}
                        disabled={!!feedback || !matchLeft}
                        onClick={() => {
                          if (!matchLeft) return;
                          sounds.match();
                          const next = { ...matched, [matchLeft]: right };
                          setMatchLeft(null);
                          setMatched(next);
                          if (Object.keys(next).length === ex.pairs.length) {
                            const allGood = ex.pairs.every((p) => next[p.left] === p.right);
                            validate(allGood);
                          }
                        }}
                        className="w-full border-4 border-border rounded-2xl px-3 py-3 font-bold font-dyslexic bg-background hover:bg-muted disabled:opacity-60"
                      >
                        {right}
                      </button>
                    ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-dyslexic mt-3">
                Choisis à gauche, puis sa réponse à droite.
              </p>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 rounded-2xl p-4 border-4 ${
                feedback === "correct"
                  ? "bg-kids-green-light border-kids-green-dark"
                  : "bg-kids-orange border-orange-600"
              }`}
            >
              <p className="font-bold flex items-center gap-2">
                {feedback === "correct" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                {feedback === "correct" ? "Super, c'est juste !" : "Pas encore — regarde la solution :"}
              </p>
              {feedback === "wrong" && (
                <p className="font-dyslexic mt-1">
                  {ex.type === "true_false"
                    ? ex.answer
                      ? "C'était Vrai"
                      : "C'était Faux"
                    : ex.type === "order"
                      ? ex.answer.join(" · ")
                      : ex.type === "match"
                        ? ex.pairs.map((p) => `${p.left} → ${p.right}`).join(" · ")
                        : String(ex.answer)}
                </p>
              )}
              {ex.steps && (
                <ul className="mt-2 space-y-1 font-dyslexic text-sm">
                  {ex.steps.map((s) => (
                    <li key={s.operation}>
                      <strong>{s.operation}</strong> — {s.description}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};
