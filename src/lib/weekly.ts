import { GAMES, GAME_CATEGORY } from "@/lib/games";

export interface SessionRow {
  game_type: string;
  subject?: string | null;
  score: number | null;
  max_score: number | null;
  duration_seconds: number | null;
  created_at: string;
}

export interface DayStat {
  date: string;
  label: string;
  played: boolean;
  minutes: number;
  sessions: number;
}

export interface SkillStat {
  id: string;
  label: string;
  icon: string;
  sessions: number;
  successRate: number;
}

export interface WeeklyStats {
  days: DayStat[];
  streak: number;
  totalMinutes: number;
  totalSessions: number;
  skills: SkillStat[];
  weakest: SkillStat | null;
}

const SKILL_META: Record<string, { label: string; icon: string }> = {
  phonologie: { label: "Phonologie", icon: "🔤" },
  vocabulaire: { label: "Vocabulaire", icon: "📖" },
  phrases: { label: "Phrases", icon: "💬" },
  orthographe: { label: "Orthographe", icon: "✏️" },
  ecoute: { label: "Écoute", icon: "👂" },
  calcul: { label: "Calcul", icon: "🔢" },
  logique: { label: "Logique", icon: "🧠" },
};

const DAY_LABELS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const dayKey = (d: Date) => d.toISOString().split("T")[0];

/** Statistiques des 7 derniers jours (streak, temps joué, compétences). */
export function computeWeeklyStats(sessions: SessionRow[]): WeeklyStats {
  const today = new Date();
  const days: DayStat[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({ date: dayKey(d), label: DAY_LABELS[d.getDay()], played: false, minutes: 0, sessions: 0 });
  }
  const byDate = new Map(days.map((d) => [d.date, d]));
  const window = new Set(days.map((d) => d.date));

  const skillAgg = new Map<string, { score: number; max: number; sessions: number }>();

  for (const s of sessions) {
    const key = (s.created_at ?? "").split("T")[0];
    if (!window.has(key)) continue;
    const day = byDate.get(key)!;
    day.played = true;
    day.sessions += 1;
    day.minutes += Math.round((s.duration_seconds ?? 0) / 60);

    const skill = GAME_CATEGORY[s.game_type] ?? "vocabulaire";
    const agg = skillAgg.get(skill) ?? { score: 0, max: 0, sessions: 0 };
    agg.score += s.score ?? 0;
    agg.max += s.max_score ?? 0;
    agg.sessions += 1;
    skillAgg.set(skill, agg);
  }

  // Streak = jours consécutifs joués en terminant aujourd'hui ou hier
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].played) streak++;
    else if (i === days.length - 1) continue;
    else break;
  }

  const skills: SkillStat[] = [...skillAgg.entries()].map(([id, a]) => ({
    id,
    label: SKILL_META[id]?.label ?? id,
    icon: SKILL_META[id]?.icon ?? "🎯",
    sessions: a.sessions,
    successRate: a.max > 0 ? Math.round((a.score / a.max) * 100) : 0,
  }));
  skills.sort((a, b) => a.successRate - b.successRate);

  return {
    days,
    streak,
    totalMinutes: days.reduce((n, d) => n + d.minutes, 0),
    totalSessions: days.reduce((n, d) => n + d.sessions, 0),
    skills,
    weakest: skills.length ? skills[0] : null,
  };
}

/** Route vers un jeu travaillant la compétence la plus faible détectée. */
export function targetedExerciseRoute(skillId: string | null | undefined, childId: string): string {
  if (!skillId) return `/child/${childId}/nl`;
  const game = GAMES.find((g) => GAME_CATEGORY[g.id] === skillId);
  return game?.route ?? `/child/${childId}/nl`;
}
