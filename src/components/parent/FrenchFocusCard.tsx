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

const FR_CHAPTERS = chaptersBySubject("fr");
const FR_CHAPTER_IDS = new Set(FR_CHAPTERS.map((c) => c.id));
const CHAPTER_NAME = new Map(FR_CHAPTERS.map((c) => [c.id, `${c.emoji} ${c.name}`]));

async function fetchFrChapterSessions(childId: string): Promise<ChapterSessionRow[]> {
  const { data, error } = await supabase
    .from("chapter_sessions")
    .select("chapter_id, difficulty_level, best_score_pct, correct_count, total_count")
    .eq("child_id", childId);
  if (error) {
    console.error("chapter_sessions", error);
    return [];
  }
  return ((data ?? []) as ChapterSessionRow[]).filter((r) => FR_CHAPTER_IDS.has(r.chapter_id));
}

const accuracyColor = (pct: number) =>
  pct >= 80 ? "hsl(var(--kids-green-dark))" : pct >= 60 ? "hsl(var(--primary))" : "hsl(var(--destructive))";

export const FrenchFocusCard = ({ childId, sessions, achievements }: Props) => {
  const { t } = useLanguage();

  const frSessions = useMemo(
    () => sessions.filter((s) => subjectOfGame(s.game_type) === "fr"),
    [sessions]
  );

  const { data: chapterRows = [] } = useQuery({
    queryKey: ["frChapterSessions", childId],
    queryFn: () => fetchFrChapterSessions(childId),
    enabled: !!childId,
  });

  // KPI
  const totalScore = frSessions.reduce((a, s) => a + s.score, 0);
  const totalMax = frSessions.reduce((a, s) => a + s.max_score, 0);
  const accuracy = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  const totalMinutes = Math.round(frSessions.reduce((a, s) => a + s.duration_seconds, 0) / 60);

  // Précision par jeu (top 8 les plus joués)
  const perGame = useMemo(() => {
    const map = new Map<string, { score: number; max: number; played: number }>();
    for (const s of frSessions) {
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
  }, [frSessions, t]);

  // Temps de jeu français par jour (14 derniers jours)
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
    for (const s of frSessions) {
      const p = map.get(s.created_at.slice(0, 10));
      if (p) p.minutes += s.duration_seconds / 60;
    }
    return Array.from(map.values()).map((p) => ({ ...p, minutes: Math.round(p.minutes) }));
  }, [frSessions]);

  // Progression par chapitre FR
  const byChapter = useMemo(
    () =>
      FR_CHAPTERS.map((c) => {
        const rows = chapterRows.filter((r) => r.chapter_id === c.id);
        const correct = rows.reduce((a, r) => a + r.correct_count, 0);
        const total = rows.reduce((a, r) => a + r.total_count, 0);
        const best = rows.reduce((a, r) => Math.max(a, Number(r.best_score_pct)), 0);
        return {
          name: CHAPTER_NAME.get(c.id) ?? c.id,
          reussite: total > 0 ? Math.round((correct / total) * 100) : 0,
          meilleur: Math.round(best),
          sessions: rows.length,
          maitrise: best >= 80,
        };
      }),
    [chapterRows]
  );

  const mastered = byChapter.filter((c) => c.maitrise).length;

  // Badges français
  const unlocked = new Map(achievements.map((a) => [a.badge_name, a.unlocked_at]));
  const frBadges = BADGES.filter((b) => b.category === "fr");
  const frBadgesUnlocked = frBadges.filter((b) => unlocked.has(b.name)).length;

  const hasData = frSessions.length > 0 || chapterRows.length > 0;

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-bold text-foreground">🇫🇷 Suivi Français</h2>
        <span className="text-sm text-muted-foreground tabular-nums">
          {frSessions.length} partie(s) sur la période
        </span>
      </div>

      {!hasData ? (
        <p className="text-sm text-muted-foreground font-dyslexic">
          Aucune activité de français sur la période sélectionnée.
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
                {mastered}/{FR_CHAPTERS.length}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Badges français</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {frBadgesUnlocked}/{frBadges.length}
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
                Temps de jeu français (14 jours)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={daily} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={1} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: number) => [`${v} min`, "Français"]} />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      stroke="hsl(var(--chart-fr))"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">Progression par chapitre</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={byChapter}
                  layout="vertical"
                  margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number, n) => [`${v}%`, n === "reussite" ? "Réussite" : "Meilleur score"]}
                  />
                  <Legend />
                  <Bar dataKey="reussite" name="Réussite (%)" radius={[0, 6, 6, 0]}>
                    {byChapter.map((c) => (
                      <Cell key={c.name} fill={accuracyColor(c.reussite)} />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="meilleur"
                    name="Meilleur score (%)"
                    fill="hsl(var(--chart-fr))"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Un chapitre est maîtrisé à partir de 80 % de meilleur score.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">Badges français</h3>
            <div className="flex flex-wrap gap-2">
              {frBadges.map((b) => {
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
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default FrenchFocusCard;
