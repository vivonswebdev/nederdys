import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SubjectStat } from "@/lib/parent";
import { tierForXp } from "@/lib/gamification";

const META: Record<string, { emoji: string; label: string; stroke: string }> = {
  nl: { emoji: "🇳🇱", label: "Néerlandais", stroke: "hsl(var(--chart-nl))" },
  fr: { emoji: "🇫🇷", label: "Français", stroke: "hsl(var(--chart-fr))" },
  math: { emoji: "🔢", label: "Mathématiques", stroke: "hsl(var(--chart-math))" },
};

const Ring = ({ percent, color }: { percent: number; color: string }) => {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="7" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * Math.min(100, percent)) / 100}
      />
    </svg>
  );
};

export const DashboardOverview = ({ stats }: { stats: SubjectStat[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {stats.map((s) => {
      const meta = META[s.subject];
      const tier = tierForXp(s.xp);
      const percent =
        tier.max === Infinity ? 100 : ((s.xp - tier.min) / (tier.max - tier.min)) * 100;
      const Trend = s.trend > 0 ? TrendingUp : s.trend < 0 ? TrendingDown : Minus;
      return (
        <div key={s.subject} className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{meta.emoji}</span>
            <span className="font-semibold text-foreground">{meta.label}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Ring percent={percent} color={meta.stroke} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums text-foreground">
                {Math.round(percent)}%
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Niveau {tier.level} — {tier.titleFr}
              </p>
              <p className="text-2xl font-bold tabular-nums text-foreground">{s.xp} XP</p>
              <p className="text-xs text-muted-foreground tabular-nums">
                {s.sessions} sessions · {s.successRate}% de réussite
              </p>
            </div>
          </div>
          <p
            className={`flex items-center gap-1 text-sm mt-3 ${
              s.trend > 0 ? "text-primary" : s.trend < 0 ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            <Trend className="w-4 h-4" />
            <span className="tabular-nums">
              {s.trend > 0 ? "+" : ""}
              {s.trend} XP cette semaine
            </span>
          </p>
        </div>
      );
    })}
  </div>
);
