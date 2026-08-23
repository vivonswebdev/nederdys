import {
  CHAPTERS,
  ALL_CHAPTERS,
  Chapter,
  Difficulty,
  Exercise,
  exercisesForLevel,
  recordExerciseSession,
  shuffle,
} from "@/lib/chapters";

export interface PlacementQuestion {
  chapterId: string;
  difficulty: Difficulty;
  exerciseId: number;
  exercise: Exercise;
}

/** Pioche 6 questions réelles : 2 par niveau, dans des chapitres déjà existants. */
export function buildPlacementTest(subject: "math" | "nl"): PlacementQuestion[] {
  const pool = ALL_CHAPTERS.filter((c) => c.subject === subject && c.section === "ce2");
  const questions: PlacementQuestion[] = [];
  if (pool.length === 0) return questions;

  for (const level of [1, 2, 3] as const) {
    const chapter = pool[Math.floor(Math.random() * pool.length)];
    const candidates = shuffle(exercisesForLevel(chapter, level)).slice(0, 2);
    candidates.forEach((e) =>
      questions.push({ chapterId: chapter.id, difficulty: level, exerciseId: e.id, exercise: e })
    );
  }
  return questions;
}

export interface PlacementChapterResult {
  chapterId: string;
  chapterName: string;
  correct: number;
  total: number;
  bestDifficultyReached: Difficulty;
  unlockedLevel: Difficulty;
}

/**
 * Enregistre le résultat du test via `recordExerciseSession` pour chaque chapitre
 * touché : le niveau débloqué découle donc de `get_unlocked_level` comme d'habitude.
 */
export async function savePlacementResults(params: {
  childId: string;
  questions: PlacementQuestion[];
  results: { exercise: Exercise; correct: boolean }[];
}): Promise<PlacementChapterResult[]> {
  const { childId, questions, results } = params;
  const byChapter = new Map<string, { correct: number; total: number; best: Difficulty }>();

  results.forEach((r, i) => {
    const q = questions[i];
    if (!q) return;
    const entry = byChapter.get(q.chapterId) ?? { correct: 0, total: 0, best: 1 as Difficulty };
    entry.total += 1;
    if (r.correct) {
      entry.correct += 1;
      if (q.difficulty > entry.best) entry.best = q.difficulty;
    }
    byChapter.set(q.chapterId, entry);
  });

  const out: PlacementChapterResult[] = [];
  for (const [chapterId, entry] of byChapter) {
    const chapter: Chapter | undefined = ALL_CHAPTERS.find((c) => c.id === chapterId);
    const res = await recordExerciseSession({
      childId,
      chapterId,
      difficulty: entry.best,
      correct: entry.correct,
      total: entry.total,
    });
    out.push({
      chapterId,
      chapterName: chapter?.name ?? chapterId,
      correct: entry.correct,
      total: entry.total,
      bestDifficultyReached: entry.best,
      unlockedLevel: res?.unlocked_level ?? entry.best,
    });
  }
  return out;
}

/** Chapitres maths hors remédiation (utilisé pour l'affichage du test). */
export const placementPoolSize = (subject: "math" | "nl") =>
  (subject === "math" ? CHAPTERS : ALL_CHAPTERS).filter(
    (c) => c.subject === subject && c.section === "ce2"
  ).length;
