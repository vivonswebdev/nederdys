import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { GameStat } from "@/lib/parent";

/** Radar des taux de réussite par jeu (migré depuis l'ancien tableau de bord /parents). */
export const GameRadarCard = ({ stats }: { stats: GameStat[] }) => {
  const data = stats
    .slice()
    .sort((a, b) => b.played - a.played)
    .slice(0, 8)
    .map((s) => ({ game: s.gameType, score: s.successRate }));

  if (data.length < 3) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <h3 className="text-lg font-bold text-foreground mb-4">Réussite par jeu</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} outerRadius="72%" margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="game" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
            }}
          />
          <Radar
            name="Score %"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
