import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { BADGES } from "@/lib/gamification";
import { chaptersBySubject } from "@/lib/chapters";
import { SessionRow, gameTitleKey, subjectOfGame } from "@/lib/parent";

interface Props {
  childId: string;
  /** Sessions de la période sélectionnée (toutes matières). */
  sessions: SessionRow[];
  achievements: { badge_name: string; unlocked_at: string }[];
}

interface ChapterSessionRow {
  chapter_id: string;
  difficulty_level: number;
  best_score_pct: number;
  correct_count: number;
  total_count: number;
}

const MATH_CHAPTER_IDS = new Set(chaptersBySubject("math").map((c) => c.id));

async function fetchMathChapterSessions(childId: string): Promise<ChapterSessionRow[]> {
  const { data, error } = await supabase
    .from("chapter_sessions")
    .select("chapter_id, difficulty_level, best_score_pct, correct_count, total_count")
    .eq("child_id", childId);
  if (error) {
    console.error("chapter_sessions", error);
    return [];
  }
  return ((data ?? []) as ChapterSessionRow[]).filter((r) => MATH_CHAPTER_IDS.has(r.chapter_id));
}

const accuracyColor = (pct: number) =>
  pct >= 80 ? "hsl(var(--kids-green-dark))" : pct >= 60 ? "hsl(var(--primary))" : "hsl(var(--destructive))";

export const MathFocusCard = ({ childId, sessions, achievements }: Props) => {
  const { t } = useLanguage();

  const mathSessions = useMemo(
    () => sessions.filter((s) => subjectOfGame(s.game_type) === "math"),
    [sessions]
  );

  const { data: chapterRows = [] } = useQuery({
    queryKey: ["mathChapterSessions", childId],
    queryFn: () => fetchMathChapterSessions(childId),
    enabled: !!childId,
  });

  // KPI
  const totalScore = mathSessions.reduce((a, s) => a + s.score, 0);
  const totalMax = mathSessions.reduce((a, s) => a + s.max_score, 0);
  const accuracy = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  const totalMinutes = Math.round(
    mathSessions.reduce((a, s) => a + s.duration_seconds, 0) / 60
  );

  // Précision par jeu (top 8 les plus joués)
  const perGame = useMemo(() => {
    const map = new Map<string, { score: number; max: number; played: number }>();
    for (const s of mathSessions) {
      const cur = map.get(s.game_type) ?? { score: 0, max: 0, played: 0 };
      cur.score += s.score;
      cur.max += s.max_score;
      cur.played += 1;
      map.set(s.game_type, cur);
    }
    return Array.from(map.entries())
      .map(([gameType, v]) => ({
        name: t(gameTitleKey(gameType) as never),
        accuracy: v.max > 0 ? Math.round((v.score / v.max) * 100) : 0,
        played: v.played,
      }))
      .sort((a, b) => b.played - a.played)
      .slice(0, 8);
  }, [mathSessions, t]);

  // Temps de jeu maths par jour (14 derniers jours)
  const daily = useMemo(() => {
    const map = new Map<string, { label: string; minutes: number }>();
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      map.set(d.toISOString().slice(0, 10), {
        label: d.toLocaleDateString("fr-BE", { day: "2-digit", month: "short" }),
        minutes: 0,
      });
    }
    for (const s of mathSessions) {
      const p = map.get(s.created_at.slice(0, 10));
      if (p) p.minutes += s.duration_seconds / 60;
    }
    return Array.from(map.values()).map((p) => ({ ...p, minutes: Math.round(p.minutes) }));
  }, [mathSessions]);

  // Progression par niveau de difficulté (chapitres maths)
  const byLevel = useMemo(
    () =>
      [1, 2, 3].map((lvl) => {
        const rows = chapterRows.filter((r) => r.difficulty_level === lvl);
        const correct = rows.reduce((a, r) => a + r.correct_count, 0);
        const total = rows.reduce((a, r) => a + r.total_count, 0);
        const mastered = new Set(
          rows.filter((r) => Number(r.best_score_pct) >= 80).map((r) => r.chapter_id)
        ).size;
        return {
          name: `Niveau ${lvl}`,
          reussite: total > 0 ? Math.round((correct / total) * 100) : 0,
          chapitres: rows.length,
          maitrises: mastered,
        };
      }),
    [chapterRows]
  );

  // Badges maths
  const unlocked = new Map(achievements.map((a) => [a.badge_name, a.unlocked_at]));
  const mathBadges = BADGES.filter((b) => b.category === "math");
  const mathBadgesUnlocked = mathBadges.filter((b) => unlocked.has(b.name)).length;

  const hasData = mathSessions.length > 0 || chapterRows.length > 0;

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-bold text-foreground">🔢 Suivi Mathématiques</h2>
        <span className="text-sm text-muted-foreground tabular-nums">
          {mathSessions.length} partie(s) sur la période
        </span>
      </div>

      {!hasData ? (
        <p className="text-sm text-muted-foreground font-dyslexic">
          Aucune partie de maths sur la période sélectionnée.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Précision moyenne</p>
              <p className="text-2xl font-bold tabular-nums" style={{ color: accuracyColor(accuracy) }}>
                {accuracy}%
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Temps de jeu</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">{totalMinutes} min</p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Chapitres maîtrisés</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {byLevel.reduce((a, l) => a + l.maitrises, 0)}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Badges maths</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {mathBadgesUnlocked}/{mathBadges.length}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Précision par jeu</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={perGame}
                    layout="vertical"
                    margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v: number, _n, p) => [
                        `${v}% · ${(p.payload as { played: number }).played} partie(s)`,
                        "Réussite",
                      ]}
                    />
                    <Bar dataKey="accuracy" radius={[0, 6, 6, 0]}>
                      {perGame.map((g) => (
                        <Cell key={g.name} fill={accuracyColor(g.accuracy)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Temps de jeu maths (14 jours)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={daily} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={1} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: number) => [`${v} min`, "Maths"]} />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Progression par niveau (chapitres)
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byLevel} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="reussite"
                    name="Réussite (%)"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="maitrises"
                    name="Chapitres maîtrisés"
                    fill="hsl(var(--kids-green-dark))"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">Badges maths</h3>
            <div className="flex flex-wrap gap-2">
              {mathBadges.length === 0 ? (
                <p className="text-sm text-muted-foreground font-dyslexic">
                  Aucun badge maths défini.
                </p>
              ) : (
                mathBadges.map((b) => {
                  const date = unlocked.get(b.name);
                  return (
                    <span
                      key={b.name}
                      title={
                        date
                          ? `Obtenu le ${new Date(date).toLocaleDateString("fr-BE")}`
                          : "Pas encore débloqué"
                      }
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
                        date
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground opacity-60"
                      }`}
                    >
                      <span aria-hidden>{b.icon}</span>
                      {b.name}
                    </span>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MathFocusCard;
