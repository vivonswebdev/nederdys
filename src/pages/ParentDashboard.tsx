import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flame } from "lucide-react";
import { ParentShell } from "@/components/parent/ParentShell";
import { DashboardOverview } from "@/components/parent/DashboardOverview";
import { ProgressChart } from "@/components/parent/ProgressChart";
import { TopGamesTable } from "@/components/parent/TopGamesTable";
import { BadgeGrid } from "@/components/parent/BadgeGrid";
import { RecommendationsCard } from "@/components/parent/RecommendationsCard";
import { ExportPDF } from "@/components/parent/ExportPDF";
import { TimeTrackingCard } from "@/components/parent/TimeTrackingCard";
import { GameRadarCard } from "@/components/parent/GameRadarCard";
import { MathFocusCard } from "@/components/parent/MathFocusCard";
import { FrenchFocusCard } from "@/components/parent/FrenchFocusCard";
import { useChild } from "@/contexts/ChildContext";
import {
  Period,
  buildDailySeries,
  buildGameStats,
  getTopGames,
  buildSubjectStats,
  getSessionsForPeriod,
} from "@/lib/parent";
import { computeStreak, getAchievements, getStreakDays } from "@/lib/gamification";
import { getChildLevel } from "@/lib/database";

const PERIODS: { key: Period; label: string }[] = [
  { key: "7", label: "7 jours" },
  { key: "30", label: "30 jours" },
  { key: "all", label: "Tout" },
];

const ParentDashboard = () => {
  const { activeChild } = useChild();
  const [period, setPeriod] = useState<Period>("30");
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Progression de mon enfant — Espace parent";
  }, []);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["parentSessions", activeChild?.id, period],
    queryFn: () => getSessionsForPeriod(activeChild!.id, period),
    enabled: !!activeChild,
  });

  const { data: achievements = [] } = useQuery({
    queryKey: ["achievements", activeChild?.id],
    queryFn: () => getAchievements(activeChild!.id),
    enabled: !!activeChild,
  });

  const { data: topGames } = useQuery({
    queryKey: ["topGames", activeChild?.id, period],
    queryFn: () => getTopGames(activeChild!.id, period, 5),
    enabled: !!activeChild,
  });

  const { data: streakRows = [] } = useQuery({
    queryKey: ["streaks", activeChild?.id],
    queryFn: () => getStreakDays(activeChild!.id),
    enabled: !!activeChild,
  });

  const { data: childLevel } = useQuery({
    queryKey: ["childLevel", activeChild?.id],
    queryFn: () => getChildLevel(activeChild!.id),
    enabled: !!activeChild,
  });

  const stats = useMemo(() => buildSubjectStats(sessions), [sessions]);
  const daily = useMemo(() => buildDailySeries(sessions, period), [sessions, period]);
  const localGames = useMemo(() => buildGameStats(sessions), [sessions]);
  // Le serveur agrège (NULLIF anti division par zéro) ; repli local si la RPC échoue.
  const games = topGames && topGames.length > 0 ? topGames : localGames;
  const streak = useMemo(() => computeStreak(streakRows.map((r) => r.date)), [streakRows]);
  const periodLabel = PERIODS.find((p) => p.key === period)!.label;

  return (
    <ParentShell title="Espace parent">
      {!activeChild ? (
        <p className="text-muted-foreground">Ajoutez d'abord un profil enfant.</p>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              {PERIODS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`text-sm px-3 py-1.5 rounded-full border border-border ${
                    period === p.key ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-sm text-foreground">
              <Flame className="w-4 h-4 text-destructive" />
              <span className="tabular-nums">{streak} jour(s) d'affilée</span>
            </span>
            <div className="ml-auto">
              <ExportPDF
                childName={activeChild.first_name}
                periodLabel={periodLabel}
                stats={stats}
                games={localGames}
                achievements={achievements}
                streak={streak}
                chartRef={chartRef}
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground">Chargement…</p>
          ) : (
            <>
              <DashboardOverview stats={stats} />
              <div ref={chartRef}>
                <ProgressChart data={daily} />
              </div>
              <GameRadarCard stats={games} />
              <TimeTrackingCard childId={activeChild.id} totalXp={childLevel?.xp ?? 0} />
              <MathFocusCard
                childId={activeChild.id}
                sessions={sessions}
                achievements={achievements}
              />
              <FrenchFocusCard
                childId={activeChild.id}
                sessions={sessions}
                achievements={achievements}
              />

              <div className="grid lg:grid-cols-2 gap-6">
                <TopGamesTable stats={games} childId={activeChild.id} />
                <RecommendationsCard
                  stats={stats}
                  streak={streak}
                  childName={activeChild.first_name}
                  childId={activeChild.id}
                />
              </div>
              <BadgeGrid achievements={achievements} />
            </>
          )}
        </div>
      )}
    </ParentShell>
  );
};

export default ParentDashboard;
