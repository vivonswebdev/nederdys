import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Volume2, X } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Confetti } from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sounds } from "@/lib/sounds";
import { logMistake } from "@/lib/mistakes";
import {
  Chapter,
  Difficulty,
  Exercise,
  LEVEL_EMOJI,
  LEVEL_LABEL,
  LEVEL_LABEL_NL,
  MASTERY_THRESHOLD,
  exercisesForLevel,
  recordExerciseSession,
  shuffle,
} from "@/lib/chapters";
import { BilingualText, Bi } from "@/components/ui/BilingualText";
import { UI, biFromFr, speakBoth, useChildLanguage, type Bilingual } from "@/lib/bilingual";
import { nlFor } from "@/data/nl/uiStringsNl";
import type { QcmExercise } from "@/data/chapters/types";
import { ShareAchievement } from "@/components/child/ShareAchievement";
import { AvatarBuddy } from "@/components/child/AvatarBuddy";
import type { ReactionTrigger } from "@/components/child/AvatarReaction";
import type { AvatarMood } from "@/lib/avatar";
import { getStreakDays } from "@/lib/gamification";
import { useChild } from "@/contexts/ChildContext";

interface Props {
  childId: string;
  chapter: Chapter;
  level: Difficulty;
  sessionSize?: number;
  /** Mode test : exercices imposés (ordre conservé, pas de tirage aléatoire). */
  customExercises?: Exercise[];
  /** Mode test : appelé à la fin avec la justesse de chaque exercice (même ordre). */
  onFinish?: (results: { exercise: Exercise; correct: boolean }[]) => void | Promise<void>;
  /** Mode test : écran de fin personnalisé (le runner n'enregistre alors rien). */
  finishedContent?: React.ReactNode;
  /** Lien de sortie personnalisé. */
  exitTo?: string;
}

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/,/g, ".")
    .replace(/€|cm|kg|g\b/g, "");

/** Lecture bilingue de l'énoncé : néerlandais puis français (ordre selon la langue de l'enfant). */
function playExercise(ex: Exercise, primary: "nl" | "fr") {
  if (ex.audioUrl) {
    new Audio(ex.audioUrl).play().catch(() => undefined);
    return;
  }
  speakBoth({ nl: ex.questionNl ?? ex.question, fr: ex.question }, primary);
}

/** Libellé bilingue d'une option de QCM (NL fourni par la donnée ou le lexique). */
function optionLabel(ex: QcmExercise, opt: string | number): Bilingual {
  const fr = String(opt);
  const i = ex.options.findIndex((o) => String(o) === fr);
  const explicit = ex.optionsNl?.[i];
  const nl = explicit !== undefined ? String(explicit) : (nlFor(fr) ?? fr);
  return { nl, fr };
}

export const ExerciseRunner = ({
  childId,
  chapter,
  level,
  sessionSize = 6,
  customExercises,
  onFinish,
  finishedContent,
  exitTo,
}: Props) => {
  const navigate = useNavigate();
  const childLang = useChildLanguage();
  const { activeChild } = useChild();
  const testMode = !!onFinish;
  const backTo = exitTo ?? `/child/${childId}/${chapter.subject}/chapitre/${chapter.id}`;

  const session = useMemo(
    () => customExercises ?? shuffle(exercisesForLevel(chapter, level)).slice(0, sessionSize),
    [chapter, level, sessionSize, customExercises]
  );
  const answersRef = useRef<{ exercise: Exercise; correct: boolean }[]>([]);
  const startedAtRef = useRef<number>(Date.now());

  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ xp: number; pct: number; unlocked: Difficulty } | null>(null);
  const [reaction, setReaction] = useState<ReactionTrigger | null>(null);
  const streakAtStartRef = useRef<number | null>(null);

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
    startedAtRef.current = Date.now();
    if (!testMode) {
      void getStreakDays(childId).then((d) => {
        streakAtStartRef.current = d;
      });
    }
  }, [chapter.id, level, childId, testMode]);

  useEffect(() => {
    setTextAnswer("");
    setOrderPicks([]);
    setMatchLeft(null);
    setMatched({});
    setFeedback(null);
  }, [index]);

  const finishSession = async (finalCorrect: number) => {
    setFinished(true);
    if (testMode) {
      setSaving(true);
      await onFinish!(answersRef.current);
      setSaving(false);
      return;
    }
    setSaving(true);
    const total = session.length;
    const pct = Math.round((finalCorrect / Math.max(total, 1)) * 100);
    const res = await recordExerciseSession({
      childId,
      chapterId: chapter.id,
      difficulty: level,
      correct: finalCorrect,
      total,
      durationSeconds: Math.round((Date.now() - startedAtRef.current) / 1000),
    });
    setSaving(false);
    if (!res) {
      toast.error("On n'a pas pu enregistrer ta partie, mais tes réponses comptent quand même 💚");
      setResult({ xp: 0, pct, unlocked: level });
      return;
    }
    setResult({ xp: res.xp_awarded, pct: Number(res.score_pct), unlocked: res.unlocked_level });
    if (res.leveled_up) {
      setReaction("levelup");
    } else {
      void getStreakDays(childId).then((days) => {
        if (streakAtStartRef.current !== null && days > streakAtStartRef.current) setReaction("streak");
      });
    }
    toast.success(`+${res.xp_awarded} XP et ${res.xp_awarded} pièces ! 🎉`);
    if (Number(res.score_pct) >= MASTERY_THRESHOLD && res.unlocked_level > level) {
      sounds.correct();
      toast.success(
        `🎉 ${UI.unlockedLevel.nl} ${LEVEL_LABEL_NL[res.unlocked_level]} — ${UI.unlockedLevel.fr} ${LEVEL_LABEL[res.unlocked_level]}`
      );
    }
  };

  const validate = (isCorrect: boolean, givenAnswer?: string) => {
    if (feedback) return;
    if (exercise) answersRef.current.push({ exercise, correct: isCorrect });
    if (!isCorrect && exercise && !testMode) {
      void logMistake({ childId, chapter, exercise, level, givenAnswer });
    }
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setReaction("correct");
    isCorrect ? sounds.correct() : sounds.wrong();
    speakBoth(isCorrect ? UI.correct : UI.wrong, childLang);
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
            <Bi phrase={UI.noExercises} stacked />
          </p>
          <Button className="mt-4" onClick={() => navigate(backTo)}>
            <Bi phrase={UI.backToChapter} />
          </Button>
        </main>
      </div>
    );
  }

  if (finished && finishedContent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-xl px-4 py-12">
          {saving ? (
            <p className="text-center font-dyslexic text-muted-foreground"><Bi phrase={UI.saving} /></p>
          ) : (
            finishedContent
          )}
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
            {activeChild && (
              <div className="flex justify-center mb-3">
                <AvatarBuddy
                  childId={activeChild.id}
                  seed={activeChild.first_name}
                  gender={(activeChild as { gender?: string }).gender ?? null}
                  mood={mastered ? "happy" : "neutral"}
                  trigger={reaction}
                  onReactionDone={() => setReaction(null)}
                  size="md"
                />
              </div>
            )}
            <span className="text-6xl block mb-3">{mastered ? "🏆" : "💪"}</span>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              <Bi phrase={mastered ? UI.wellDone : UI.keepGoing} stacked />
            </h1>
            <p className="font-dyslexic text-muted-foreground mb-4">
              {correctCount} <Bi phrase={UI.goodAnswersOutOf} /> {session.length} — {pct}%
            </p>
            {result && (
              <p className="text-lg font-bold text-foreground mb-2">
                +{result.xp} XP · +{result.xp} <Bi phrase={UI.coins} />
              </p>
            )}
            {!mastered && (
              <p className="font-dyslexic text-muted-foreground mb-2">
                <Bi phrase={UI.masteryGoal} stacked />
              </p>
            )}
            {saving && (
              <p className="text-sm text-muted-foreground">
                <Bi phrase={UI.saving} />
              </p>
            )}
            {pct >= 100 && (
              <div className="mt-4">
                <ShareAchievement
                  childName={activeChild?.first_name ?? ""}
                  achievement={{
                    icon: "🏆",
                    labelFr: "Chapitre parfait : 100 % !",
                    labelNl: "Perfect hoofdstuk: 100%!",
                    detailFr: chapter.name,
                    detailNl: chapter.nameNl ?? chapter.name,
                  }}
                />
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Button onClick={() => navigate(backTo)}>
                <Bi phrase={UI.backToChapter} />
              </Button>
              <Button variant="secondary" onClick={() => window.location.reload()}>
                <Bi phrase={UI.replayLevel} />
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  const ex = exercise!;
  const runnerMood: AvatarMood =
    feedback === "correct" ? "happy" : feedback === "wrong" ? "neutral" : "thinking";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {feedback === "correct" && <Confetti />}
      <main className="container max-w-2xl px-4 py-8">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> <Bi phrase={UI.quit} />
        </button>

        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-foreground">
            {chapter.emoji} {chapter.nameNl ?? chapter.name} / {chapter.name} ·{" "}
            {LEVEL_EMOJI[level]} {LEVEL_LABEL_NL[level]} / {LEVEL_LABEL[level]}
          </p>
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">
              {index + 1} / {session.length}
            </p>
            {activeChild && (
              <AvatarBuddy
                childId={activeChild.id}
                seed={activeChild.first_name}
                gender={(activeChild as { gender?: string }).gender ?? null}
                mood={runnerMood}
                trigger={reaction}
                onReactionDone={() => setReaction(null)}
                size="xs"
              />
            )}
          </div>
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
            <h2 className="text-xl font-bold text-foreground font-dyslexic flex-1">
              {ex.questionNl ? (
                <BilingualText nl={ex.questionNl} fr={ex.question} stacked />
              ) : (
                ex.question
              )}
            </h2>
            {(chapter.subject === "nl" || !!ex.questionNl) && (
              <button
                type="button"
                onClick={() => playExercise(ex, childLang)}
                aria-label={`${UI.listenNl.nl} / ${UI.listenNl.fr}`}
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
              {shuffledOptions.map((opt) => {
                const label = optionLabel(ex, opt);
                return (
                  <button
                    key={String(opt)}
                    disabled={!!feedback}
                    onClick={() => validate(String(opt) === String(ex.answer), String(opt))}
                    className="border-4 border-border rounded-2xl p-4 text-lg font-bold font-dyslexic bg-background hover:bg-muted transition-colors disabled:opacity-70"
                  >
                    {label.nl === label.fr ? (
                      label.fr
                    ) : (
                      <BilingualText nl={label.nl} fr={label.fr} stacked />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Vrai / Faux */}
          {ex.type === "true_false" && (
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={!!feedback}
                onClick={() => validate(ex.answer === true, "Vrai")}
                className="border-4 border-kids-green-dark bg-kids-green-light rounded-2xl p-5 text-lg font-bold"
              >
                ✅ <Bi phrase={UI.true} />
              </button>
              <button
                disabled={!!feedback}
                onClick={() => validate(ex.answer === false, "Faux")}
                className="border-4 border-red-700 bg-kids-red rounded-2xl p-5 text-lg font-bold"
              >
                ❌ <Bi phrase={UI.false} />
              </button>
            </div>
          )}

          {/* Réponse à écrire */}
          {ex.type === "fill_blank" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!textAnswer.trim()) return;
                validate(normalize(textAnswer) === normalize(ex.answer), textAnswer);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder={`${UI.yourAnswer.nl} / ${UI.yourAnswer.fr}`}
                disabled={!!feedback}
                className="text-lg font-dyslexic h-14"
                autoFocus
              />
              <Button type="submit" disabled={!!feedback} className="h-14 px-8 text-lg">
                <Bi phrase={UI.validate} />
              </Button>
            </form>
          )}

          {/* Remise en ordre */}
          {ex.type === "order" && (
            <div>
              <div className="min-h-16 border-4 border-dashed border-border rounded-2xl p-3 mb-4 flex flex-wrap gap-2">
                {orderPicks.length === 0 && (
                  <span className="text-muted-foreground font-dyslexic">
                    <Bi phrase={UI.clickInOrder} stacked />
                  </span>
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
                  <Bi phrase={UI.restart} />
                </Button>
                <Button
                  disabled={!!feedback || orderPicks.length !== ex.answer.length}
                  onClick={() => validate(orderPicks.every((v, i) => v === ex.answer[i]), orderPicks.join(" · "))}
                >
                  <Bi phrase={UI.validate} />
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
                            validate(allGood, ex.pairs.map((p) => `${p.left} → ${next[p.left]}`).join(" · "));
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
                <Bi phrase={UI.matchHint} stacked />
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
                <Bi phrase={feedback === "correct" ? UI.correct : UI.wrong} stacked />
              </p>
              {feedback === "wrong" && (
                <p className="font-dyslexic mt-1">
                  {ex.type === "true_false"
                    ? ex.answer
                      ? `${UI.true.nl} / ${UI.true.fr}`
                      : `${UI.false.nl} / ${UI.false.fr}`
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
