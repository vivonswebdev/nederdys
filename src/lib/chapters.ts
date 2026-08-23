import { supabase } from "@/integrations/supabase/client";
import { Exercise, Difficulty } from "@/data/chapters/types";
import { numerationCe2Exercises } from "@/data/chapters/numeration-ce2";
import { additionCe2Exercises } from "@/data/chapters/addition-ce2";
import { soustractionCe2Exercises } from "@/data/chapters/soustraction-ce2";
import { multiplicationCe2Exercises } from "@/data/chapters/multiplication-ce2";
import { mesuresCe2Exercises } from "@/data/chapters/mesures-ce2";
import { problemesCe2Exercises } from "@/data/chapters/problemes-ce2";
import { geometrieCe2Exercises } from "@/data/chapters/geometrie-ce2";
import { multiplicationAvanceeExercises } from "@/data/chapters/multiplication-avancee";
import { divisionCe2Exercises } from "@/data/chapters/division-ce2";
import { problemesAvancesExercises } from "@/data/chapters/problemes-avances";
import { kleurenExercises } from "@/data/exercises/nl/kleuren";
import { dierenExercises } from "@/data/exercises/nl/dieren";
import { getallenExercises } from "@/data/exercises/nl/getallen";
import { familieExercises } from "@/data/exercises/nl/familie";
import { zinnenExercises } from "@/data/exercises/nl/zinnen";
import { dagenExercises } from "@/data/exercises/nl/dagen";

export type { Exercise, Difficulty };

export type ChapterSubject = "math" | "nl" | "fr";

export interface Chapter {
  id: string;
  name: string;
  emoji: string;
  section: "ce2" | "stretch";
  subject: ChapterSubject;
  /** Sous-titre affiché dans la liste (NL). */
  description?: string;
  exercises: Exercise[];
}

type ChapterDef = Omit<Chapter, "subject">;

const MATH_CHAPTERS: ChapterDef[] = [

  { id: "numeration-ce2", name: "Numération", emoji: "🔢", section: "ce2", exercises: numerationCe2Exercises },
  { id: "addition-ce2", name: "Additions", emoji: "➕", section: "ce2", exercises: additionCe2Exercises },
  { id: "soustraction-ce2", name: "Soustractions", emoji: "➖", section: "ce2", exercises: soustractionCe2Exercises },
  { id: "multiplication-ce2", name: "Multiplications", emoji: "✖️", section: "ce2", exercises: multiplicationCe2Exercises },
  { id: "mesures-ce2", name: "Mesures", emoji: "📏", section: "ce2", exercises: mesuresCe2Exercises },
  { id: "problemes-ce2", name: "Problèmes", emoji: "📝", section: "ce2", exercises: problemesCe2Exercises },
  { id: "geometrie-ce2", name: "Géométrie", emoji: "📐", section: "ce2", exercises: geometrieCe2Exercises },
  {
    id: "multiplication-avancee",
    name: "Multiplication avancée",
    emoji: "🚀",
    section: "stretch",
    exercises: multiplicationAvanceeExercises,
  },
  { id: "division-ce2", name: "Division simple", emoji: "➗", section: "stretch", exercises: divisionCe2Exercises },
  {
    id: "problemes-avances",
    name: "Problèmes à 2 étapes",
    emoji: "🧠",
    section: "stretch",
    exercises: problemesAvancesExercises,
  },
];

export const getChapter = (id?: string) => CHAPTERS.find((c) => c.id === id);

export const LEVEL_LABEL: Record<Difficulty, string> = { 1: "Facile", 2: "Moyen", 3: "Difficile" };
export const LEVEL_EMOJI: Record<Difficulty, string> = { 1: "🌱", 2: "🌿", 3: "🌳" };
export const LEVEL_CARD: Record<Difficulty, string> = {
  1: "bg-kids-green-light border-kids-green-dark",
  2: "bg-kids-orange border-orange-600",
  3: "bg-kids-red border-red-700",
};

export const MASTERY_THRESHOLD = 80;

export const parseDifficulty = (value?: string): Difficulty | null => {
  const n = Number(value);
  return n === 1 || n === 2 || n === 3 ? (n as Difficulty) : null;
};

export function exercisesForLevel(chapter: Chapter, level: Difficulty) {
  return chapter.exercises.filter((e) => e.difficulty === level);
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Niveau maximum débloqué dans un chapitre (1 par défaut). */
export async function fetchUnlockedLevel(childId: string, chapterId: string): Promise<Difficulty> {
  const { data, error } = await supabase.rpc("get_unlocked_level", {
    p_child_id: childId,
    p_chapter_id: chapterId,
  });
  if (error) {
    console.error("get_unlocked_level", error);
    return 1;
  }
  return (parseDifficulty(String(data)) ?? 1) as Difficulty;
}

/** Meilleur score (%) par niveau pour un chapitre. */
export async function fetchBestScores(
  childId: string,
  chapterId: string
): Promise<Record<Difficulty, number>> {
  const best: Record<Difficulty, number> = { 1: 0, 2: 0, 3: 0 };
  const { data, error } = await supabase
    .from("chapter_sessions")
    .select("difficulty_level, best_score_pct")
    .eq("child_id", childId)
    .eq("chapter_id", chapterId);
  if (error) {
    console.error("chapter_sessions", error);
    return best;
  }
  (data ?? []).forEach((row) => {
    const lvl = parseDifficulty(String(row.difficulty_level));
    const pct = Number(row.best_score_pct ?? 0);
    if (lvl && pct > best[lvl]) best[lvl] = pct;
  });
  return best;
}

export interface SessionResult {
  ok: boolean;
  xp_awarded: number;
  score_pct: number;
  unlocked_level: Difficulty;
  leveled_up: boolean;
}

export async function recordExerciseSession(params: {
  childId: string;
  chapterId: string;
  difficulty: Difficulty;
  correct: number;
  total: number;
}): Promise<SessionResult | null> {
  const { data, error } = await supabase.rpc("record_exercise_session", {
    p_child_id: params.childId,
    p_chapter_id: params.chapterId,
    p_difficulty: params.difficulty,
    p_correct: params.correct,
    p_total: params.total,
  });
  if (error) {
    console.error("record_exercise_session", error);
    return null;
  }
  return data as unknown as SessionResult;
}
