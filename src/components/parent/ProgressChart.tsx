import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DailyPoint } from "@/lib/parent";

const SERIES = [
  { key: "nl", label: "Néerlandais", color: "hsl(var(--chart-nl))" },
  { key: "fr", label: "Français", color: "hsl(var(--chart-fr))" },
  { key: "math", label: "Maths", color: "hsl(var(--chart-math))" },
] as const;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((a: number, p: any) => a + (p.value || 0), 0);
  return (
    <div className="bg-popover border border-border rounded-lg p-3 shadow-md text-sm">
      <p className="font-semibold text-foreground mb-1">
        {label} : {total} XP
      </p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="tabular-nums">
          {SERIES.find((s) => s.key === p.dataKey)?.label} : {p.value} XP
        </p>
      ))}
    </div>
  );
};

export const ProgressChart = ({ data }: { data: DailyPoint[] }) => {
  const [hidden, setHidden] = useState<string[]>([]);
  const hasData = data.some((d) => d.total > 0);
  const activeDays = data.filter((d) => d.total > 0).length;

  const toggle = (key: string) =>
    setHidden((h) => (h.includes(key) ? h.filter((k) => k !== key) : [...h, key]));

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="font-semibold text-foreground">Progression quotidienne (XP)</h2>
        <div className="flex gap-2">
          {SERIES.map((s) => (
            <button
              key={s.key}
              onClick={() => toggle(s.key)}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-opacity ${
                hidden.includes(s.key) ? "opacity-40" : ""
              } border-border`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {!hasData || activeDays < 3 ? (
        <p className="text-sm text-muted-foreground py-16 text-center">
          Pas assez de données pour afficher un graphique fiable (minimum 3 journées de jeu).
        </p>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              {SERIES.filter((s) => !hidden.includes(s.key)).map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color}
                  strokeWidth={2.5}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
