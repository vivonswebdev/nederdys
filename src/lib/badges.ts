import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { allBadges, Badge } from "@/data/badges";
import { calculateXpGain } from "@/lib/database";
import { computeStreak } from "@/lib/gamification";

export interface ChildBadgeStats {
  total_xp: number;
  nl_xp: number;
  fr_xp: number;
  math_xp: number;
  code_xp: number;
  nl_level: number;
  fr_level: number;
  math_level: number;
  streak: number;
  games_played: number;
  unique_games: number;
  /** Épisodes "Coder & IA" terminés (sessions distinctes). */
  code_episodes: number;
  /** Histoires interactives NL terminées. */
  stories_read: number;
  /** Activités du palier Éveil terminées. */
  eveil_played: number;
}

/** Paliers de niveau par matière (XP cumulé dans la matière). */
export const subjectLevel = (xp: number): number => {
  if (xp >= 600) return 3;
  if (xp >= 300) return 2;
  if (xp >= 100) return 1;
  return 0;
};

/** Agrège toutes les données nécessaires à l'évaluation des badges. */
export const getChildBadgeStats = async (childId: string): Promise<ChildBadgeStats> => {
  const [sessionsRes, levelRes, streakRes] = await Promise.all([
    supabase.from("game_sessions").select("game_type, subject, score, max_score").eq("child_id", childId),
    supabase.from("child_levels").select("xp").eq("child_id", childId).maybeSingle(),
    supabase.from("daily_streaks").select("date").eq("child_id", childId).order("date", { ascending: false }).limit(120),
  ]);

  const sessions = sessionsRes.data ?? [];
  const bySubject: Record<string, number> = { nl: 0, fr: 0, math: 0, code: 0 };
  const uniqueGames = new Set<string>();
  const codeEpisodes = new Set<string>();
  const stories = new Set<string>();
  const eveil = new Set<string>();

  for (const s of sessions) {
    const gameType = String(s.game_type ?? "");
    uniqueGames.add(gameType);
    const xp = calculateXpGain(s.score ?? 0, s.max_score ?? 0);
    const subject = (s.subject ?? "nl") as string;
    if (subject in bySubject) bySubject[subject] += xp;
    if (gameType.startsWith("code-")) codeEpisodes.add(gameType);
    if (gameType.startsWith("histoire-")) stories.add(gameType);
    if (subject === "eveil") eveil.add(gameType);
  }

  return {
    total_xp: levelRes.data?.xp ?? 0,
    nl_xp: bySubject.nl,
    fr_xp: bySubject.fr,
    math_xp: bySubject.math,
    code_xp: bySubject.code,
    nl_level: subjectLevel(bySubject.nl),
    fr_level: subjectLevel(bySubject.fr),
    math_level: subjectLevel(bySubject.math),
    streak: computeStreak((streakRes.data ?? []).map((r) => r.date as string)),
    games_played: sessions.length,
    unique_games: uniqueGames.size,
    code_episodes: codeEpisodes.size,
    stories_read: stories.size,
    eveil_played: eveil.size,
  };
};


/** Évalue une condition du type "champ >= valeur". */
export const evaluateCondition = (condition: string, stats: ChildBadgeStats): boolean => {
  const match = condition.match(/^\s*([a-z_]+)\s*>=\s*(\d+)\s*$/);
  if (!match) return false;
  const [, field, value] = match;
  const current = (stats as unknown as Record<string, number>)[field];
  if (typeof current !== "number") return false;
  return current >= Number(value);
};

export const getUnlockedBadgeIds = async (childId: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from("achievements")
    .select("badge_name")
    .eq("child_id", childId);
  if (error) console.error("Error fetching achievements:", error.message);
  return (data ?? []).map((a) => a.badge_name as string);
};

/**
 * Vérifie toutes les conditions et débloque les badges manquants.
 * Retourne la liste des badges nouvellement débloqués.
 */
export const checkAndUnlockBadges = async (
  userId: string,
  childId: string,
  stats?: ChildBadgeStats,
  options: { silent?: boolean } = {}
): Promise<Badge[]> => {
  const data = stats ?? (await getChildBadgeStats(childId));
  const unlocked = new Set(await getUnlockedBadgeIds(childId));

  const toUnlock = allBadges.filter(
    (b) => !unlocked.has(b.id) && evaluateCondition(b.condition, data)
  );
  if (toUnlock.length === 0) return [];

  const { error } = await supabase.from("achievements").insert(
    toUnlock.map((b) => ({
      user_id: userId,
      child_id: childId,
      badge_name: b.id,
      badge_icon: b.icon,
      category: b.category,
    }))
  );
  // 23505 = badge déjà débloqué entre-temps
  if (error && error.code !== "23505") {
    console.error("Error unlocking badges:", error.message);
    return [];
  }

  if (!options.silent) {
    for (const b of toUnlock) {
      toast.success(`🎉 Badge débloqué : ${b.name} !`, { description: b.description });
    }
  }
  return toUnlock;
};
