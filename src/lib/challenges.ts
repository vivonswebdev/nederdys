import { supabase } from "@/integrations/supabase/client";

export type ChallengeType = "games_played" | "xp_earned" | "perfect_score" | "play_minutes";

export interface ChallengeDef {
  type: ChallengeType;
  emoji: string;
  target: number;
  fr: string;
  nl: string;
  unit?: string;
}

export const CHALLENGE_DEFS: ChallengeDef[] = [
  { type: "games_played", emoji: "🎮", target: 3, fr: "Joue à 3 jeux", nl: "Speel 3 spellen" },
  { type: "xp_earned", emoji: "⚡", target: 50, fr: "Gagne 50 XP", nl: "Verdien 50 XP", unit: "XP" },
  { type: "perfect_score", emoji: "⭐", target: 1, fr: "Obtiens un score parfait", nl: "Haal een perfecte score" },
  { type: "play_minutes", emoji: "⏱️", target: 15, fr: "Joue pendant 15 minutes", nl: "Speel 15 minuten", unit: "min" },
];

export const todayISO = () => {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().split("T")[0];
};

export const challengeDefOfTheDay = (): ChallengeDef => {
  const [y, m, day] = todayISO().split("-").map(Number);
  const seed = y * 1000 + m * 40 + day;
  return CHALLENGE_DEFS[seed % CHALLENGE_DEFS.length];
};

export const defByType = (type: string) =>
  CHALLENGE_DEFS.find((c) => c.type === type) ?? CHALLENGE_DEFS[0];

export interface DailyChallengeRow {
  id: string;
  challenge_type: string;
  target_value: number;
  current_value: number;
  xp_reward: number;
  date: string;
  is_completed: boolean;
}

/** Récupère (ou crée) le défi du jour de l'enfant. */
export const getOrCreateDailyChallenge = async (
  userId: string,
  childId: string
): Promise<DailyChallengeRow | null> => {
  const date = todayISO();
  const { data } = await supabase
    .from("daily_challenges")
    .select("*")
    .eq("child_id", childId)
    .eq("date", date)
    .maybeSingle();
  if (data) return data as DailyChallengeRow;

  const def = challengeDefOfTheDay();
  const { data: created, error } = await supabase
    .from("daily_challenges")
    .insert({
      user_id: userId,
      child_id: childId,
      challenge_type: def.type,
      target_value: def.target,
      date,
    })
    .select()
    .maybeSingle();
  if (error && error.code !== "23505") {
    console.error("Error creating daily challenge:", error.message);
  }
  if (created) return created as DailyChallengeRow;

  const { data: existing } = await supabase
    .from("daily_challenges")
    .select("*")
    .eq("child_id", childId)
    .eq("date", date)
    .maybeSingle();
  return (existing as DailyChallengeRow) ?? null;
};

/** Met à jour la progression du défi après une partie. Retourne true si le défi vient d'être complété. */
export const progressDailyChallenge = async (
  userId: string,
  childId: string,
  result: { xp: number; errors: number; maxScore: number; durationSeconds: number }
): Promise<{ completed: boolean; xpReward: number }> => {
  const row = await getOrCreateDailyChallenge(userId, childId);
  if (!row || row.is_completed) return { completed: false, xpReward: 0 };

  let delta = 0;
  switch (row.challenge_type as ChallengeType) {
    case "games_played":
      delta = 1;
      break;
    case "xp_earned":
      delta = result.xp;
      break;
    case "perfect_score":
      delta = result.maxScore > 0 && result.errors === 0 ? 1 : 0;
      break;
    case "play_minutes":
      delta = Math.max(0, Math.round(result.durationSeconds / 60));
      break;
  }
  if (delta <= 0) return { completed: false, xpReward: 0 };

  const next = Math.min(row.target_value, row.current_value + delta);
  const completed = next >= row.target_value;
  const { error } = await supabase
    .from("daily_challenges")
    .update({ current_value: next, is_completed: completed })
    .eq("id", row.id);
  if (error) console.error("Error updating daily challenge:", error.message);

  return { completed, xpReward: completed ? row.xp_reward : 0 };
};
