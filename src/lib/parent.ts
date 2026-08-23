import { supabase } from "@/integrations/supabase/client";
import { GAMES, Subject } from "@/lib/games";

// ---------- PIN & session parent ----------
// La vérification du PIN est 100 % serveur (RPC bcrypt) : voir src/lib/pin.ts.
export {
  hasPin,
  setPin,
  verifyPin,
  setParentSession,
  isParentSessionActive,
} from "@/lib/pin";
export type { PinResult } from "@/lib/pin";

export const getParentSettings = async (userId: string) => {
  const { data } = await supabase
    .from("parent_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (data) return data;
  const { data: created, error } = await supabase
    .from("parent_settings")
    .insert({ user_id: userId })
    .select()
    .maybeSingle();
  if (error) console.error("Error creating parent settings:", error);
  return created;
};

export const updateParentSettings = async (
  userId: string,
  patch: Record<string, unknown>
) => {
  const { error } = await supabase
    .from("parent_settings")
    .update(patch)
    .eq("user_id", userId);
  if (error) console.error("Error updating parent settings:", error);
  return !error;
};


// ---------- Données ----------

export type Period = "7" | "30" | "all";

export const periodStart = (period: Period): Date | null => {
  if (period === "all") return null;
  const d = new Date();
  d.setDate(d.getDate() - Number(period));
  d.setHours(0, 0, 0, 0);
  return d;
};

export interface SessionRow {
  id: string;
  game_type: string;
  subject: string;
  score: number;
  max_score: number;
  errors_count: number;
  duration_seconds: number;
  created_at: string;
}

export const getSessionsForPeriod = async (
  childId: string,
  period: Period
): Promise<SessionRow[]> => {
  let query = supabase
    .from("game_sessions")
    .select("id, game_type, subject, score, max_score, errors_count, duration_seconds, created_at")
    .eq("child_id", childId)
    .order("created_at", { ascending: false });

  const start = periodStart(period);
  if (start) query = query.gte("created_at", start.toISOString());

  const { data, error } = await query;
  if (error) console.error("Error fetching sessions:", error);
  return (data as SessionRow[]) || [];
};

export const subjectOfGame = (gameType: string): Subject =>
  (GAMES.find((g) => g.id === gameType)?.subject ?? "nl") as Subject;

export const gameTitleKey = (gameType: string) =>
  GAMES.find((g) => g.id === gameType)?.titleKey ?? gameType;

// XP par session (même barème que le jeu)
export const sessionXp = (s: SessionRow) => {
  if (s.max_score === 0) return 5;
  const r = s.score / s.max_score;
  return r >= 0.9 ? 30 : r >= 0.7 ? 20 : r >= 0.5 ? 10 : 5;
};

export interface SubjectStat {
  subject: Subject;
  xp: number;
  sessions: number;
  successRate: number;
  trend: number; // XP cette semaine - semaine précédente
}

export const buildSubjectStats = (all: SessionRow[]): SubjectStat[] => {
  const now = Date.now();
  const week = 7 * 24 * 3600_000;
  const subjects: Subject[] = ["nl", "fr", "math"];

  return subjects.map((subject) => {
    const rows = all.filter((s) => subjectOfGame(s.game_type) === subject);
    const xp = rows.reduce((a, s) => a + sessionXp(s), 0);
    const totalMax = rows.reduce((a, s) => a + s.max_score, 0);
    const totalScore = rows.reduce((a, s) => a + s.score, 0);
    const thisWeek = rows
      .filter((s) => now - new Date(s.created_at).getTime() <= week)
      .reduce((a, s) => a + sessionXp(s), 0);
    const prevWeek = rows
      .filter((s) => {
        const age = now - new Date(s.created_at).getTime();
        return age > week && age <= 2 * week;
      })
      .reduce((a, s) => a + sessionXp(s), 0);
    return {
      subject,
      xp,
      sessions: rows.length,
      successRate: totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0,
      trend: thisWeek - prevWeek,
    };
  });
};

export interface DailyPoint {
  date: string;
  label: string;
  nl: number;
  fr: number;
  math: number;
  total: number;
}

export const buildDailySeries = (rows: SessionRow[], period: Period): DailyPoint[] => {
  const days = period === "all" ? 30 : Number(period);
  const map = new Map<string, DailyPoint>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, {
      date: key,
      label: d.toLocaleDateString("fr-BE", { day: "2-digit", month: "short" }),
      nl: 0,
      fr: 0,
      math: 0,
      total: 0,
    });
  }
  for (const s of rows) {
    const key = s.created_at.slice(0, 10);
    const point = map.get(key);
    if (!point) continue;
    const xp = sessionXp(s);
    point[subjectOfGame(s.game_type)] += xp;
    point.total += xp;
  }
  return Array.from(map.values());
};

export interface GameStat {
  gameType: string;
  subject: Subject;
  played: number;
  successRate: number;
  lastPlayed: string;
}

export const buildGameStats = (rows: SessionRow[]): GameStat[] => {
  const map = new Map<string, { played: number; score: number; max: number; last: string }>();
  for (const s of rows) {
    const cur = map.get(s.game_type) ?? { played: 0, score: 0, max: 0, last: s.created_at };
    cur.played++;
    cur.score += s.score;
    cur.max += s.max_score;
    if (s.created_at > cur.last) cur.last = s.created_at;
    map.set(s.game_type, cur);
  }
  return Array.from(map.entries()).map(([gameType, v]) => ({
    gameType,
    subject: subjectOfGame(gameType),
    played: v.played,
    successRate: v.max > 0 ? Math.round((v.score / v.max) * 100) : 0,
    lastPlayed: v.last,
  }));
};

/** Top jeux calculés côté serveur (RPC get_top_games : NULLIF + GROUP BY game_type, subject). */
export const getTopGames = async (
  childId: string,
  period: Period,
  limit = 5
): Promise<GameStat[]> => {
  const { data, error } = await supabase.rpc("get_top_games", {
    p_child_id: childId,
    p_limit: limit,
    p_days: period === "all" ? null : Number(period),
  });
  if (error) {
    console.error("Error fetching top games:", error.message);
    return [];
  }
  return (data ?? []).map((r) => ({
    gameType: r.game_id,
    subject: (r.subject as Subject) ?? subjectOfGame(r.game_id),
    played: Number(r.times_played),
    successRate: Math.round(Number(r.success_rate)),
    lastPlayed: r.last_session,
  }));
};

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60_000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.round(h / 24);
  return `il y a ${d} j`;
};

// ---------- Réglages enfant ----------

export interface ChildSettings {
  timer_enabled: boolean;
  dyslexic_font: boolean;
  sound_effects: boolean;
  reduced_motion: boolean;
  colorblind_mode: boolean;
  dark_mode: boolean;
}

export const DEFAULT_CHILD_SETTINGS: ChildSettings = {
  timer_enabled: true,
  dyslexic_font: true,
  sound_effects: true,
  reduced_motion: false,
  colorblind_mode: false,
  dark_mode: false,
};

export const getChildSettings = async (childId: string) => {
  const { data } = await supabase
    .from("child_settings")
    .select("*")
    .eq("child_id", childId)
    .maybeSingle();
  return data;
};

export const upsertChildSettings = async (
  userId: string,
  childId: string,
  patch: Partial<ChildSettings>
) => {
  const existing = await getChildSettings(childId);
  if (existing) {
    const { error } = await supabase
      .from("child_settings")
      .update(patch)
      .eq("child_id", childId);
    if (error) console.error("Error updating child settings:", error);
    return !error;
  }
  const { error } = await supabase.from("child_settings").insert({
    user_id: userId,
    child_id: childId,
    ...DEFAULT_CHILD_SETTINGS,
    ...patch,
  });
  if (error) console.error("Error inserting child settings:", error);
  return !error;
};

// ---------- Danger zone ----------

export const resetChildProgress = async (childId: string) => {
  await supabase.from("achievements").delete().eq("child_id", childId);
  await supabase.from("daily_streaks").delete().eq("child_id", childId);
  await supabase.from("game_difficulties").update({ difficulty: "easy", recent_error_rate: 0 }).eq("child_id", childId);
  await supabase.from("child_levels").update({ xp: 0, level: 1, games_played: 0 }).eq("child_id", childId);
  return true;
};

export const exportAllData = async (userId: string) => {
  const [children, sessions, levels, coins, achievements, streaks, settings] = await Promise.all([
    supabase.from("children").select("*").eq("user_id", userId),
    supabase.from("game_sessions").select("*").eq("user_id", userId),
    supabase.from("child_levels").select("*").eq("user_id", userId),
    supabase.from("child_coins").select("*").eq("user_id", userId),
    supabase.from("achievements").select("*").eq("user_id", userId),
    supabase.from("daily_streaks").select("*").eq("user_id", userId),
    supabase.from("child_settings").select("*").eq("user_id", userId),
  ]);
  return {
    exported_at: new Date().toISOString(),
    children: children.data ?? [],
    game_sessions: sessions.data ?? [],
    child_levels: levels.data ?? [],
    child_coins: coins.data ?? [],
    achievements: achievements.data ?? [],
    daily_streaks: streaks.data ?? [],
    child_settings: settings.data ?? [],
  };
};

// ---------- Points faibles par difficulté ----------

export interface DifficultyWeakness {
  gameType: string;
  difficulty: string;
  errorRate: number;
}

export const getWeakDifficulties = async (childId: string): Promise<DifficultyWeakness[]> => {
  const { data, error } = await supabase
    .from("game_difficulties")
    .select("game_type, difficulty, recent_error_rate")
    .eq("child_id", childId)
    .gte("recent_error_rate", 0.4)
    .order("recent_error_rate", { ascending: false })
    .limit(3);
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map((d) => ({
    gameType: d.game_type,
    difficulty: d.difficulty,
    errorRate: Math.round(Number(d.recent_error_rate) * 100),
  }));
};
