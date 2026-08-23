import { supabase } from "@/integrations/supabase/client";

export type MathLevel = 1 | 2 | 3;

export const XP_PER_LEVEL: Record<MathLevel, number> = { 1: 10, 2: 20, 3: 30 };

export const LEVEL_META: Record<MathLevel, { emoji: string; card: string; ring: string }> = {
  1: { emoji: "🌱", card: "bg-kids-green-light", ring: "border-kids-green-dark" },
  2: { emoji: "🌿", card: "bg-kids-orange", ring: "border-orange-600" },
  3: { emoji: "🌳", card: "bg-kids-red", ring: "border-red-700" },
};

export const parseLevel = (value?: string): MathLevel | null => {
  const n = Number(value);
  return n === 1 || n === 2 || n === 3 ? (n as MathLevel) : null;
};

/** Tire au hasard `count` défis dans le pool du niveau choisi. */
export function pickSession<T>(pool: T[], count: number): T[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export interface CompletionResult {
  ok: boolean;
  xp_awarded?: number;
  level?: number;
  leveled_up?: boolean;
}

export async function recordGameCompletion(params: {
  childId: string;
  gameId: string;
  subject: string;
  difficulty: MathLevel;
  xpEarned: number;
  score: number;
  maxScore: number;
  durationSeconds: number;
  errorsCount: number;
}): Promise<CompletionResult> {
  const { data, error } = await supabase.rpc("record_game_completion", {
    p_child_id: params.childId,
    p_game_id: params.gameId,
    p_subject: params.subject,
    p_difficulty: params.difficulty,
    p_xp_earned: params.xpEarned,
    p_score: params.score,
    p_max_score: params.maxScore,
    p_duration_seconds: params.durationSeconds,
    p_errors_count: params.errorsCount,
  });
  if (error) {
    console.error("record_game_completion", error);
    return { ok: false };
  }
  return (data ?? { ok: false }) as unknown as CompletionResult;
}
