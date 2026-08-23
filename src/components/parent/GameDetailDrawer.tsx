import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { gameTitleKey } from "@/lib/parent";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  gameType: string | null;
  childId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface WeeklyStat {
  week_start: string;
  sessions_count: number;
  avg_success_rate: number;
}

interface DifficultyStat {
  difficulty: string;
  difficulty_sessions: number;
  difficulty_success_rate: number;
}

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Facile",
  medium: "Moyen",
  hard: "Difficile",
};

export const GameDetailDrawer = ({ gameType, childId, isOpen, onClose }: Props) => {
  const { t } = useLanguage();
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStat[]>([]);
  const [difficultyStats, setDifficultyStats] = useState<DifficultyStat[]>([]);

  useEffect(() => {
    if (!isOpen || !gameType) return;
    let cancelled = false;

    const fetchStats = async () => {
      const { data, error } = await supabase.rpc("get_game_detail_stats", {
        p_child_id: childId,
        p_game_type: gameType,
        p_weeks: 8,
      });

      if (error) {
        console.error("Erreur RPC get_game_detail_stats:", error.message);
        return;
      }
      if (cancelled) return;

      const rows = (data ?? []) as (WeeklyStat & DifficultyStat)[];

      // Dédup : une ligne par semaine (le CROSS JOIN les répète)
      const uniqueWeeks = Array.from(
        new Map(
          rows.map((d) => [
            d.week_start,
            {
              week_start: d.week_start,
              sessions_count: Number(d.sessions_count),
              avg_success_rate: Number(d.avg_success_rate ?? 0),
            },
          ])
        ).values()
      );

      // Dédup : une ligne par difficulté (moyenne globale sur la période)
      const uniqueDifficulties = Array.from(
        new Map(
          rows
            .filter((d) => d.difficulty)
            .map((d) => [
              d.difficulty,
              {
                difficulty: d.difficulty,
                difficulty_sessions: Number(d.difficulty_sessions),
                difficulty_success_rate: Number(d.difficulty_success_rate ?? 0),
              },
            ])
        ).values()
      );

      setWeeklyStats(uniqueWeeks);
      setDifficultyStats(uniqueDifficulties);
    };

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [gameType, childId, isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            📊 {gameType ? t(gameTitleKey(gameType) as never) : ""}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              📈 Sessions par semaine
            </h3>
            {weeklyStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyStats}>
                  <XAxis
                    dataKey="week_start"
                    tickFormatter={(date: string) =>
                      new Date(date).toLocaleDateString("fr-BE", {
                        day: "numeric",
                        month: "short",
                      })
                    }
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value: number) => [`${value} partie(s)`, "Sessions"]}
                    labelFormatter={(date: string) =>
                      new Date(date).toLocaleDateString("fr-BE")
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions_count"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Aucune session sur les 8 dernières semaines.
              </p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              🎯 Performance par difficulté
            </h3>
            {difficultyStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={difficultyStats}>
                  <XAxis
                    dataKey="difficulty"
                    tickFormatter={(d: string) => DIFFICULTY_LABEL[d] ?? d}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => [`${value}%`, "Réussite"]} />
                  <Bar
                    dataKey="difficulty_success_rate"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Pas encore de données de difficulté pour ce jeu.
              </p>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};
