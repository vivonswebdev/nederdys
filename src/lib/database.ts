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
