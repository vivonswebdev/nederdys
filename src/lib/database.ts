import { supabase } from "@/integrations/supabase/client";

export const saveGameSession = async ({
  userId,
  childId,
  gameType,
  score,
  maxScore,
  durationSeconds,
  errorsCount,
  completed,
}: {
  userId: string;
  childId: string;
  gameType: string;
  score: number;
  maxScore: number;
  durationSeconds: number;
  errorsCount: number;
  completed: boolean;
}) => {
  const { error } = await supabase.from("game_sessions").insert({
    user_id: userId,
    child_id: childId,
    game_type: gameType,
    score,
    max_score: maxScore,
    duration_seconds: durationSeconds,
    errors_count: errorsCount,
    completed,
  });
  if (error) console.error("Error saving game session:", error);
  return !error;
};

export const getChildren = async (userId: string) => {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .eq("user_id", userId);
  if (error) console.error("Error fetching children:", error);
  return data || [];
};

export const getGameSessions = async (childId: string) => {
  const { data, error } = await supabase
    .from("game_sessions")
    .select("*")
    .eq("child_id", childId)
    .order("created_at", { ascending: false });
  if (error) console.error("Error fetching sessions:", error);
  return data || [];
};

// --- Level & XP ---

export const XP_PER_LEVEL = 100; // XP needed to level up
const XP_FOR_GAME = { perfect: 30, good: 20, ok: 10, poor: 5 };

export const calculateXpGain = (score: number, maxScore: number): number => {
  if (maxScore === 0) return XP_FOR_GAME.poor;
  const ratio = score / maxScore;
  if (ratio >= 0.9) return XP_FOR_GAME.perfect;
  if (ratio >= 0.7) return XP_FOR_GAME.good;
  if (ratio >= 0.5) return XP_FOR_GAME.ok;
  return XP_FOR_GAME.poor;
};

export const getChildLevel = async (childId: string) => {
  const { data, error } = await supabase
    .from("child_levels")
    .select("*")
    .eq("child_id", childId)
    .maybeSingle();
  if (error) console.error("Error fetching child level:", error);
  return data;
};

export const upsertChildLevel = async (
  userId: string,
  childId: string,
  xpGain: number
) => {
  const existing = await getChildLevel(childId);
  if (existing) {
    const newXp = existing.xp + xpGain;
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
    const { error } = await supabase
      .from("child_levels")
      .update({
        xp: newXp,
        level: newLevel,
        games_played: existing.games_played + 1,
      })
      .eq("child_id", childId);
    if (error) console.error("Error updating child level:", error);
    return { xp: newXp, level: newLevel, gamesPlayed: existing.games_played + 1, leveledUp: newLevel > existing.level };
  } else {
    const newLevel = Math.floor(xpGain / XP_PER_LEVEL) + 1;
    const { error } = await supabase.from("child_levels").insert({
      user_id: userId,
      child_id: childId,
      xp: xpGain,
      level: newLevel,
      games_played: 1,
    });
    if (error) console.error("Error inserting child level:", error);
    return { xp: xpGain, level: newLevel, gamesPlayed: 1, leveledUp: false };
  }
};

// --- Game Difficulty ---

export type Difficulty = "easy" | "medium" | "hard";

export const getGameDifficulty = async (
  childId: string,
  gameType: string
): Promise<Difficulty> => {
  const { data, error } = await supabase
    .from("game_difficulties")
    .select("*")
    .eq("child_id", childId)
    .eq("game_type", gameType)
    .maybeSingle();
  if (error) console.error("Error fetching difficulty:", error);
  return (data?.difficulty as Difficulty) || "easy";
};

export const updateGameDifficulty = async (
  userId: string,
  childId: string,
  gameType: string,
  errorRate: number
) => {
  // Adaptive: <20% errors → harder, >40% errors → easier
  const existing = await supabase
    .from("game_difficulties")
    .select("*")
    .eq("child_id", childId)
    .eq("game_type", gameType)
    .maybeSingle();

  let newDifficulty: Difficulty;
  const currentDiff = (existing.data?.difficulty as Difficulty) || "easy";
  
  if (errorRate < 0.2) {
    newDifficulty = currentDiff === "easy" ? "medium" : currentDiff === "medium" ? "hard" : "hard";
  } else if (errorRate > 0.4) {
    newDifficulty = currentDiff === "hard" ? "medium" : currentDiff === "medium" ? "easy" : "easy";
  } else {
    newDifficulty = currentDiff;
  }

  if (existing.data) {
    await supabase
      .from("game_difficulties")
      .update({ difficulty: newDifficulty, recent_error_rate: errorRate })
      .eq("child_id", childId)
      .eq("game_type", gameType);
  } else {
    await supabase.from("game_difficulties").insert({
      user_id: userId,
      child_id: childId,
      game_type: gameType,
      difficulty: newDifficulty,
      recent_error_rate: errorRate,
    });
  }

  return newDifficulty;
};

// --- Mouche-Coins ---

const COINS_BASE = 10;
const COINS_PER_STAR = 5; // stars: 0-3 based on score ratio
const COINS_STREAK_BONUS = 3;

export const calculateCoinsGain = (
  score: number,
  maxScore: number,
  streak: number
): number => {
  if (maxScore === 0) return COINS_BASE;
  const ratio = score / maxScore;
  const stars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.4 ? 1 : 0;
  const streakBonus = streak >= 3 ? COINS_STREAK_BONUS * 2 : streak >= 2 ? COINS_STREAK_BONUS : 0;
  return COINS_BASE + stars * COINS_PER_STAR + streakBonus;
};

export const getChildCoins = async (childId: string) => {
  const { data, error } = await supabase
    .from("child_coins")
    .select("*")
    .eq("child_id", childId)
    .maybeSingle();
  if (error) console.error("Error fetching child coins:", error);
  return data;
};

export const addCoins = async (
  userId: string,
  childId: string,
  amount: number
) => {
  const existing = await getChildCoins(childId);
  if (existing) {
    const { error } = await supabase
      .from("child_coins")
      .update({
        coins: existing.coins + amount,
        total_earned: existing.total_earned + amount,
      })
      .eq("child_id", childId);
    if (error) console.error("Error updating coins:", error);
    return existing.coins + amount;
  } else {
    const { error } = await supabase.from("child_coins").insert({
      user_id: userId,
      child_id: childId,
      coins: amount,
      total_earned: amount,
    });
    if (error) console.error("Error inserting coins:", error);
    return amount;
  }
};

export const spendCoins = async (
  childId: string,
  amount: number
): Promise<boolean> => {
  const existing = await getChildCoins(childId);
  if (!existing || existing.coins < amount) return false;
  const { error } = await supabase
    .from("child_coins")
    .update({ coins: existing.coins - amount })
    .eq("child_id", childId);
  if (error) {
    console.error("Error spending coins:", error);
    return false;
  }
  return true;
};

export const getPurchasedItems = async (childId: string) => {
  const { data, error } = await supabase
    .from("purchased_items")
    .select("*")
    .eq("child_id", childId);
  if (error) console.error("Error fetching purchased items:", error);
  return data || [];
};

export const purchaseItem = async (
  userId: string,
  childId: string,
  itemId: string
) => {
  const { error } = await supabase.from("purchased_items").insert({
    user_id: userId,
    child_id: childId,
    item_id: itemId,
    equipped: false,
  });
  if (error) console.error("Error purchasing item:", error);
  return !error;
};

export const toggleEquipItem = async (
  childId: string,
  itemId: string,
  equipped: boolean
) => {
  const { error } = await supabase
    .from("purchased_items")
    .update({ equipped })
    .eq("child_id", childId)
    .eq("item_id", itemId);
  if (error) console.error("Error equipping item:", error);
  return !error;
};
