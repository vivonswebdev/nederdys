import { supabase } from "@/integrations/supabase/client";
import { Chapter, Difficulty, Exercise, getChapter } from "@/lib/chapters";

export interface MistakeRow {
  id: string;
  child_id: string;
  subject: string;
  chapter_id: string;
  exercise_id: string;
  difficulty: number;
  question: string;
  given_answer: string | null;
  correct_answer: string;
  resolved: boolean;
  created_at: string;
}

/** Réponse correcte lisible pour un exercice, quel que soit son type. */
export function correctAnswerText(ex: Exercise): string {
  switch (ex.type) {
    case "qcm":
      return String(ex.answer);
    case "fill_blank":
      return ex.answer;
    case "true_false":
      return ex.answer ? "Vrai" : "Faux";
    case "order":
      return ex.answer.join(" · ");
    case "match":
      return ex.pairs.map((p) => `${p.left} → ${p.right}`).join(" · ");
    default:
      return "";
  }
}

/** Enregistre une réponse incorrecte (silencieux en cas d'échec réseau). */
export async function logMistake(params: {
  childId: string;
  chapter: Chapter;
  exercise: Exercise;
  level: Difficulty;
  givenAnswer?: string;
}) {
  const { childId, chapter, exercise, level, givenAnswer } = params;
  try {
    await supabase.from("exercise_mistakes").insert({
      child_id: childId,
      subject: chapter.subject,
      chapter_id: chapter.id,
      exercise_id: String(exercise.id),
      difficulty: level,
      question: exercise.question,
      given_answer: givenAnswer ?? null,
      correct_answer: correctAnswerText(exercise),
    });
  } catch {
    /* hors-ligne : on ignore */
  }
}

export async function fetchMistakes(childId: string, includeResolved = false) {
  let query = supabase
    .from("exercise_mistakes")
    .select("*")
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(200);
  if (!includeResolved) query = query.eq("resolved", false);
  const { data, error } = await query;
  if (error) return [];
  return (data ?? []) as MistakeRow[];
}

export async function markMistakeResolved(id: string) {
  const { error } = await supabase.from("exercise_mistakes").update({ resolved: true }).eq("id", id);
  return !error;
}

/** Retrouve l'exercice d'origine pour afficher les étapes de résolution. */
export function findExercise(chapterId: string, exerciseId: string) {
  const chapter = getChapter(chapterId);
  if (!chapter) return { chapter: undefined, exercise: undefined };
  const exercise = chapter.exercises.find((e) => String(e.id) === String(exerciseId));
  return { chapter, exercise };
}
