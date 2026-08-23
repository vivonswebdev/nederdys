import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Clock, Flame } from "lucide-react";
import { WeeklyStats, targetedExerciseRoute } from "@/lib/weekly";

interface Props {
  stats: WeeklyStats;
  childId: string;
}

export function WeeklyProgressWidget({ stats, childId }: Props) {
  const maxMinutes = Math.max(10, ...stats.days.map((d) => d.minutes));
  const topSkills = [...stats.skills].sort((a, b) => b.sessions - a.sessions).slice(0, 4);

  return (
    <section className="bg-card border-2 border-border rounded-3xl p-6 kids-shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-foreground">📈 Mes 7 derniers jours</h2>
        <div className="flex gap-2 text-sm font-bold">
          <span className="inline-flex items-center gap-1.5 bg-kids-orange/15 text-kids-orange rounded-full px-3 py-1">
            <Flame className="w-4 h-4" /> {stats.streak} j
          </span>
          <span className="inline-flex items-center gap-1.5 bg-kids-blue/15 text-kids-blue rounded-full px-3 py-1">
            <Clock className="w-4 h-4" /> {stats.totalMinutes} min
          </span>
          <span className="inline-flex items-center gap-1.5 bg-kids-green-light text-kids-green-dark rounded-full px-3 py-1">
            🎮 {stats.totalSessions}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-2 items-end">
        {stats.days.map((d, i) => (
          <div key={d.date} className="flex flex-col items-center gap-1">
            <div className="h-24 w-full flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(d.minutes ? 12 : 4, (d.minutes / maxMinutes) * 100)}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className={`w-full rounded-t-xl ${d.played ? "bg-primary" : "bg-muted"}`}
                title={`${d.minutes} min · ${d.sessions} parties`}
              />
            </div>
            <span className="text-[11px] text-muted-foreground font-dyslexic">{d.label}</span>
            <span className="text-[11px] tabular-nums text-foreground">{d.minutes}′</span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-bold text-foreground text-sm">Mes compétences</h3>
        {topSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground font-dyslexic">
            Joue cette semaine pour voir tes progrès apparaître ici ! 🐸
          </p>
        ) : (
          topSkills.map((s) => (
            <div key={s.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-foreground">
                  {s.icon} {s.label}
                </span>
                <span className="tabular-nums text-muted-foreground">{s.successRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.successRate}%` }}
                  transition={{ duration: 0.6 }}
                  className={`h-full rounded-full ${
                    s.successRate >= 70 ? "bg-primary" : s.successRate >= 40 ? "bg-kids-orange" : "bg-kids-red"
                  }`}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        to={targetedExerciseRoute(stats.weakest?.id, childId)}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-kids-purple text-white rounded-2xl px-5 py-3 font-bold kids-shadow-card hover:kids-shadow-hover transition-shadow"
      >
        <Target className="w-5 h-5" />
        Exercices ciblés
        {stats.weakest && <span className="opacity-90">· {stats.weakest.label}</span>}
      </Link>
      {stats.weakest && (
        <p className="text-xs text-muted-foreground font-dyslexic text-center mt-2">
          Point faible détecté : {stats.weakest.label} ({stats.weakest.successRate}% de réussite)
        </p>
      )}
    </section>
  );
}

export default WeeklyProgressWidget;
