import { supabase } from "@/integrations/supabase/client";

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

export const BADGES: BadgeDef[] = [
  { name: "first_steps", icon: "👣", category: "special", labelFr: "Premiers pas", labelNl: "Eerste stappen", descFr: "Terminer un premier jeu", descNl: "Een eerste spel voltooien" },
  { name: "serious", icon: "📅", category: "streak", labelFr: "Sérieux", labelNl: "Serieus", descFr: "7 jours de connexion", descNl: "7 dagen op rij spelen" },
  { name: "polyglot", icon: "🗣️", category: "special", labelFr: "Polyglotte", labelNl: "Polyglot", descFr: "Jouer en NL et en FR", descNl: "In NL en FR spelen" },
  { name: "mathematician", icon: "🧮", category: "math", labelFr: "Mathématicien", labelNl: "Wiskundige", descFr: "100 bonnes réponses en maths", descNl: "100 juiste antwoorden in wiskunde" },
  { name: "perfectionist", icon: "💯", category: "special", labelFr: "Perfectionniste", labelNl: "Perfectionist", descFr: "Un sans-faute en niveau difficile", descNl: "Foutloos op moeilijk niveau" },
  { name: "marathon", icon: "🏃", category: "special", labelFr: "Marathonien", labelNl: "Marathonloper", descFr: "30 minutes de jeu", descNl: "30 minuten spelen" },
  { name: "nl_explorer", icon: "🇳🇱", category: "nl", labelFr: "Explorateur NL", labelNl: "NL Ontdekker", descFr: "10 jeux néerlandais terminés", descNl: "10 Nederlandse spellen voltooid" },
  { name: "fr_explorer", icon: "🇫🇷", category: "fr", labelFr: "Explorateur FR", labelNl: "FR Ontdekker", descFr: "10 jeux français terminés", descNl: "10 Franse spellen voltooid" },
];

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

const today = () => new Date().toISOString().slice(0, 10);

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
  const set = new Set(dates);
  let streak = 0;
  const cursor = new Date();
  // La série reste valide si l'enfant a joué aujourd'hui ou hier
  if (!set.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!set.has(cursor.toISOString().slice(0, 10))) return 0;
  }
  while (set.has(cursor.toISOString().slice(0, 10))) {
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
