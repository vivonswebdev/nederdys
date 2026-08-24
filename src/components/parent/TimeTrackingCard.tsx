import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { getLevelInfo } from "@/lib/gamification";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  childId: string;
  totalXp: number;
}

interface DayRow {
  day: string;
  minutes_played: number;
  sessions_count: number;
}

async function fetchTimeTracking(childId: string): Promise<DayRow[]> {
  const { data, error } = await supabase.rpc("get_time_tracking", {
    p_child_id: childId,
    p_days: 14,
  });
  if (error) {
    console.error("get_time_tracking", error);
    return [];
  }
  return (data ?? []).map((d: { day: string; minutes_played: number | string; sessions_count: number }) => ({
    day: d.day,
    minutes_played: Number(d.minutes_played),
    sessions_count: Number(d.sessions_count),
  }));
}

export const TimeTrackingCard = ({ childId, totalXp }: Props) => {
  const { data: daily = [], isLoading } = useQuery({
    queryKey: ["timeTracking", childId],
    queryFn: () => fetchTimeTracking(childId),
    enabled: !!childId,
  });

  const since = Date.now() - 7 * 86_400_000;
  const totalMinutesThisWeek = Math.round(
    daily
      .filter((d) => new Date(d.day).getTime() >= since)
      .reduce((sum, d) => sum + d.minutes_played, 0)
  );

  const { lang } = useLanguage();
  const { level, title, emoji } = getLevelInfo(totalXp, lang);

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-foreground">⏱️ Temps de jeu</h2>
        <span className="text-sm text-muted-foreground">
          {emoji} Niveau {level} — {title}
        </span>
      </div>

      <p className="mt-2 text-3xl font-bold text-foreground tabular-nums">
        {totalMinutesThisWeek} min
        <span className="text-sm font-normal text-muted-foreground"> cette semaine</span>
      </p>

      <div className="mt-4 h-56">
        {isLoading ? (
          <div className="h-full w-full rounded-xl bg-muted animate-pulse" />
        ) : daily.length === 0 ? (
          <p className="text-sm text-muted-foreground font-dyslexic">
            Pas encore de partie enregistrée sur les 14 derniers jours.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daily} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11 }}
                tickFormatter={(d: string) =>
                  new Date(d).toLocaleDateString("fr-BE", { day: "numeric", month: "short" })
                }
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number) => [`${v} min`, "Temps de jeu"]}
                labelFormatter={(d: string) => new Date(d).toLocaleDateString("fr-BE")}
              />
              <Bar dataKey="minutes_played" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

export default TimeTrackingCard;
