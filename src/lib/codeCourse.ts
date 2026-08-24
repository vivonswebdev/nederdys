import { supabase } from "@/integrations/supabase/client";
import { CodeTrack, CODE_TRACKS, trackOfEpisode } from "@/data/code/curriculum";
import { recordGameCompletion } from "@/lib/mathSession";

/** Score minimum (%) au questionnaire pour valider un épisode. */
export const CODE_PASS_THRESHOLD = 60;

/** XP accordée pour un épisode réussi. */
export const CODE_EPISODE_XP = 20;

export interface CodeProgressRow {
  episode_id: string;
  track_id: string;
  best_score_pct: number;
  passed: boolean;
  attempts: number;
}

/** Parcours conseillé selon l'âge de l'enfant. */
export const recommendedTrack = (age?: number | null): CodeTrack => {
  if (!age || age <= 7) return CODE_TRACKS[0];
  if (age <= 10) return CODE_TRACKS[1];
  return CODE_TRACKS[2];
};

/** Niveau atteint au questionnaire (affiché à l'enfant et au parent). */
export const quizLevel = (pct: number): { emoji: string; nl: string; fr: string } => {
  if (pct >= 90) return { emoji: "🏆", nl: "Expert", fr: "Expert" };
  if (pct >= 75) return { emoji: "🌳", nl: "Sterk", fr: "Très bien" };
  if (pct >= CODE_PASS_THRESHOLD) return { emoji: "🌿", nl: "Goed", fr: "Bien" };
  return { emoji: "🌱", nl: "Nog oefenen", fr: "À revoir" };
};

export async function fetchCodeProgress(childId: string): Promise<CodeProgressRow[]> {
  const { data, error } = await supabase
    .from("code_progress")
    .select("episode_id, track_id, best_score_pct, passed, attempts")
    .eq("child_id", childId);
  if (error) {
    console.error("code_progress", error);
    return [];
  }
  return (data ?? []) as CodeProgressRow[];
}

/**
 * Enregistre le résultat d'un questionnaire d'épisode.
 * XP accordée une seule fois, à la première réussite.
 */
export async function saveEpisodeResult(params: {
  userId: string;
  childId: string;
  episodeId: string;
  scorePct: number;
  correct: number;
  total: number;
  durationSeconds: number;
}): Promise<{ passed: boolean; xpAwarded: number }> {
  const trackId = trackOfEpisode(params.episodeId)?.id ?? "petits";
  const passed = params.scorePct >= CODE_PASS_THRESHOLD;

  const { data: existing } = await supabase
    .from("code_progress")
    .select("id, best_score_pct, passed, attempts")
    .eq("child_id", params.childId)
    .eq("episode_id", params.episodeId)
    .maybeSingle();

  const firstSuccess = passed && !existing?.passed;

  if (existing) {
    await supabase
      .from("code_progress")
      .update({
        best_score_pct: Math.max(existing.best_score_pct ?? 0, params.scorePct),
        passed: existing.passed || passed,
        attempts: (existing.attempts ?? 0) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("code_progress").insert({
      user_id: params.userId,
      child_id: params.childId,
      track_id: trackId,
      episode_id: params.episodeId,
      best_score_pct: params.scorePct,
      passed,
      attempts: 1,
    });
  }

  let xpAwarded = 0;
  if (firstSuccess) {
    const res = await recordGameCompletion({
      childId: params.childId,
      gameId: `code-${params.episodeId}`,
      subject: "code",
      difficulty: 1,
      xpEarned: CODE_EPISODE_XP,
      score: params.correct,
      maxScore: params.total,
      durationSeconds: params.durationSeconds,
      errorsCount: params.total - params.correct,
    });
    xpAwarded = res.xp_awarded ?? 0;
  }

  return { passed, xpAwarded };
}
