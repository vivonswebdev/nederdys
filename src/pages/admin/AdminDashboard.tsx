import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  total_children: number;
  total_parents: number;
  active_today: number;
  active_week: number;
  total_games_played: number;
  total_exercises_completed: number;
  avg_session_minutes: number;
  top_game: string | null;
  top_exercise: string | null;
  error_count_24h: number;
}

interface TopGame {
  game_type: string;
  play_count: number;
  unique_players: number;
  avg_score: number;
  avg_duration_seconds: number;
}

interface HeatRow {
  exercise_id: string;
  chapter_id: string;
  subject: string;
  total_attempts: number;
  errors: number;
  error_rate: number;
}

const Card = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-card border-2 border-border rounded-2xl p-4">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [games, setGames] = useState<TopGame[]>([]);
  const [heat, setHeat] = useState<HeatRow[]>([]);

  useEffect(() => {
    (async () => {
      const [s, g, h] = await Promise.all([
        supabase.rpc("get_admin_stats"),
        supabase.rpc("get_admin_top_games", { p_days: 7 }),
        supabase.rpc("get_error_heatmap", { p_days: 7 }),
      ]);
      if (s.error) console.error(s.error);
      setStats(((s.data as Stats[] | null) ?? [])[0] ?? null);
      setGames((g.data as TopGame[] | null) ?? []);
      setHeat((h.data as HeatRow[] | null) ?? []);
    })();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">📊 Vue d'ensemble</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Card label="👶 Enfants" value={stats?.total_children ?? 0} />
        <Card label="👨‍👩‍👧 Parents" value={stats?.total_parents ?? 0} />
        <Card label="🔥 Actifs aujourd'hui" value={stats?.active_today ?? 0} />
        <Card label="📅 Actifs 7 jours" value={stats?.active_week ?? 0} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Card label="🎮 Parties jouées" value={stats?.total_games_played ?? 0} />
        <Card label="📚 Exercices terminés" value={stats?.total_exercises_completed ?? 0} />
        <Card label="⏱️ Session moyenne" value={`${stats?.avg_session_minutes ?? 0} min`} />
        <Card label="🐛 Bugs (24h)" value={stats?.error_count_24h ?? 0} />
      </div>

      <section className="bg-card border-2 border-border rounded-2xl p-4 mb-6">
        <h2 className="font-bold mb-3">🎮 Top jeux (7 derniers jours)</h2>
        {games.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune partie sur la période.</p>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={games.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game_type" tick={{ fontSize: 11 }} interval={0} angle={-25} textAnchor="end" height={70} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="play_count" name="Parties" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="bg-card border-2 border-border rounded-2xl p-4">
        <h2 className="font-bold mb-3">⚠️ Exercices les plus ratés (7 derniers jours)</h2>
        {heat.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune erreur enregistrée.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2 pr-3">Exercice</th>
                  <th className="py-2 pr-3">Chapitre</th>
                  <th className="py-2 pr-3">Matière</th>
                  <th className="py-2 pr-3">Essais</th>
                  <th className="py-2 pr-3">Erreurs</th>
                  <th className="py-2">Taux</th>
                </tr>
              </thead>
              <tbody>
                {heat.slice(0, 20).map((r, i) => (
                  <tr key={`${r.chapter_id}-${r.exercise_id}-${i}`} className="border-t border-border">
                    <td className="py-2 pr-3">{r.exercise_id}</td>
                    <td className="py-2 pr-3">{r.chapter_id}</td>
                    <td className="py-2 pr-3 uppercase">{r.subject}</td>
                    <td className="py-2 pr-3">{r.total_attempts}</td>
                    <td className="py-2 pr-3">{r.errors}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          Number(r.error_rate) > 50
                            ? "bg-destructive/15 text-destructive"
                            : Number(r.error_rate) > 30
                              ? "bg-kids-orange text-foreground"
                              : "bg-primary/15 text-primary"
                        }`}
                      >
                        {r.error_rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminDashboard;
