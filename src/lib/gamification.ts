import { supabase } from "@/integrations/supabase/client";
import { allBadges } from "@/data/badges";
import { localDateISO } from "@/lib/date";

// --- Niveaux (paliers XP) ---

export interface LevelTier {
  level: number;
  min: number;
  max: number; // Infinity pour le dernier
  titleFr: string;
  titleNl: string;
  emoji: string;
}

export const LEVEL_TIERS: LevelTier[] = [
  { level: 1, min: 0, max: 100, titleFr: "Débutant", titleNl: "Beginner", emoji: "🐣" },
  { level: 2, min: 100, max: 300, titleFr: "Apprenti", titleNl: "Leerling", emoji: "🐸" },
  { level: 3, min: 300, max: 600, titleFr: "Explorateur", titleNl: "Ontdekker", emoji: "🦊" },
  { level: 4, min: 600, max: 1000, titleFr: "Champion", titleNl: "Kampioen", emoji: "🦁" },
  { level: 5, min: 1000, max: Infinity, titleFr: "Maître", titleNl: "Meester", emoji: "🦄" },
];

export const tierForXp = (xp: number): LevelTier =>
  LEVEL_TIERS.find((t) => xp >= t.min && xp < t.max) ?? LEVEL_TIERS[LEVEL_TIERS.length - 1];

export const tierProgress = (xp: number) => {
  const tier = tierForXp(xp);
  if (tier.max === Infinity) return { tier, percent: 100, inTier: xp - tier.min, needed: 0 };
  const span = tier.max - tier.min;
  const inTier = xp - tier.min;
  return { tier, percent: Math.min(100, (inTier / span) * 100), inTier, needed: tier.max - xp };
};

/**
 * Adaptateur bilingue : seule source de vérité pour les niveaux affichés.
 * Remplace l'ancien getLevel() de /lib/levels.ts (titres FR uniquement).
 */
export function getLevelInfo(totalXp: number, lang: "fr" | "nl") {
  const xp = Math.max(0, totalXp || 0);
  const { tier, percent, inTier } = tierProgress(xp);
  const infinite = tier.max === Infinity;
  return {
    level: tier.level,
    title: lang === "nl" ? tier.titleNl : tier.titleFr,
    emoji: tier.emoji,
    progress: percent,
    current: inTier,
    span: infinite ? 0 : tier.max - tier.min,
    nextAt: infinite ? null : tier.max,
    xpToNext: infinite ? 0 : tier.max - xp,
  };
}

// --- Badges ---

export interface BadgeDef {
  name: string;
  icon: string;
  category: "nl" | "fr" | "math" | "streak" | "special";
  labelFr: string;
  labelNl: string;
  descFr: string;
  descNl: string;
}

export const BADGES: BadgeDef[] = allBadges.map((b) => ({
  name: b.id,
  icon: b.icon,
  category: b.category,
  labelFr: b.name,
  labelNl: b.name,
  descFr: b.description,
  descNl: b.description,
}));

export const badgeByName = (name: string) => BADGES.find((b) => b.name === name);

export const getAchievements = async (childId: string) => {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("child_id", childId)
    .order("unlocked_at", { ascending: false });
  if (error) console.error("Error fetching achievements:", error);
  return data || [];
};

export const unlockBadge = async (userId: string, childId: string, name: string) => {
  const def = badgeByName(name);
  if (!def) return false;
  const { error } = await supabase.from("achievements").insert({
    user_id: userId,
    child_id: childId,
    badge_name: def.name,
    badge_icon: def.icon,
    category: def.category,
  });
  // 23505 = déjà débloqué
  if (error && error.code !== "23505") console.error("Error unlocking badge:", error);
  return !error;
};

// --- Séries quotidiennes ---

const today = () => localDateISO();

export const getStreakDays = async (childId: string) => {
  const { data, error } = await supabase
    .from("daily_streaks")
    .select("*")
    .eq("child_id", childId)
    .order("date", { ascending: false })
    .limit(60);
  if (error) console.error("Error fetching streaks:", error);
  return data || [];
};

export const computeStreak = (dates: string[]): number => {
  const set = new Set(dates.map((d) => String(d).slice(0, 10)));
  let streak = 0;
  const cursor = new Date();
  // La série reste valide si l'enfant a joué aujourd'hui ou hier (heure locale)
  if (!set.has(localDateISO(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!set.has(localDateISO(cursor))) return 0;
  }
  while (set.has(localDateISO(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export const recordDailyActivity = async (userId: string, childId: string, xpEarned = 0) => {
  const date = today();
  const { data } = await supabase
    .from("daily_streaks")
    .select("*")
    .eq("child_id", childId)
    .eq("date", date)
    .maybeSingle();

  if (data) {
    if (xpEarned > 0) {
      await supabase
        .from("daily_streaks")
        .update({ xp_earned: data.xp_earned + xpEarned })
        .eq("id", data.id);
    }
  } else {
    await supabase.from("daily_streaks").insert({
      user_id: userId,
      child_id: childId,
      date,
      xp_earned: xpEarned,
    });
  }
};

// Bonus de série : J+1 → 10 XP, J+7 → 50 XP, J+30 → 200 XP
export const streakBonus = (streak: number) =>
  streak >= 30 ? 200 : streak >= 7 ? 50 : streak >= 1 ? 10 : 0;

// --- Défi du jour ---

export interface DailyChallenge {
  id: string;
  emoji: string;
  fr: string;
  nl: string;
}

const CHALLENGES: DailyChallenge[] = [
  { id: "math3", emoji: "🔢", fr: "Fais 3 jeux de mathématiques", nl: "Speel 3 wiskundespellen" },
  { id: "nl2", emoji: "🇳🇱", fr: "Termine 2 jeux en néerlandais", nl: "Voltooi 2 Nederlandse spellen" },
  { id: "perfect", emoji: "⭐", fr: "Obtiens un score parfait sur un jeu", nl: "Haal een perfecte score" },
  { id: "listen", emoji: "👂", fr: "Joue à un jeu d'écoute", nl: "Speel een luisterspel" },
  { id: "mix", emoji: "🎯", fr: "Joue dans deux matières différentes", nl: "Speel in twee vakken" },
];

export const challengeOfTheDay = (): DailyChallenge => {
  const d = new Date();
  const seed = d.getFullYear() * 1000 + d.getMonth() * 40 + d.getDate();
  return CHALLENGES[seed % CHALLENGES.length];
};
