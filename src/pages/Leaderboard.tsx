import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { AvatarRenderer } from "@/components/child/AvatarRenderer";
import { getAvatarSeed, Gender } from "@/lib/avatar";

type Metric = "xp" | "games" | "badges" | "streak";

const FILTERS: { id: Metric; label: string; icon: string }[] = [
  { id: "xp", label: "XP", icon: "⭐" },
  { id: "games", label: "Parties", icon: "🎮" },
  { id: "badges", label: "Badges", icon: "🏅" },
  { id: "streak", label: "Série", icon: "🔥" },
];

interface Entry {
  rank: number;
  child_id: string;
  display_name: string;
  avatar_emoji: string;
  gender: string;
  total_xp: number;
  games_played: number;
  badges_earned: number;
  streak_days: number;
  is_mine: boolean;
}

async function fetchLeaderboard(metric: Metric): Promise<Entry[]> {
  const { data, error } = await supabase.rpc("get_leaderboard", {
    p_metric: metric,
    p_limit: 100,
  });
  if (error) {
    console.error("get_leaderboard", error);
    return [];
  }
  return (data ?? []) as unknown as Entry[];
}

function valueFor(entry: Entry, metric: Metric) {
  switch (metric) {
    case "games":
      return `${entry.games_played} parties`;
    case "badges":
      return `${entry.badges_earned} badges`;
    case "streak":
      return `${entry.streak_days} jours`;
    default:
      return `${entry.total_xp} XP`;
  }
}

const PODIUM_STYLES = ["bg-kids-orange/15 border-kids-orange", "bg-muted border-border", "bg-kids-blue/10 border-kids-blue"];
const MEDALS = ["🥇", "🥈", "🥉"];

const Leaderboard = () => {
  const [metric, setMetric] = useState<Metric>("xp");

  useEffect(() => {
    document.title = "Classement mondial — NederDys";
  }, []);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["leaderboard", metric],
    queryFn: () => fetchLeaderboard(metric),
  });

  const podium = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">🏆 Classement mondial</h1>
          <p className="text-muted-foreground">Les enfants les plus assidus de NederDys !</p>
        </header>

        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setMetric(f.id)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                metric === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground">Chargement du classement…</p>
        ) : entries.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Personne au classement pour l'instant. Joue une partie pour y entrer 💪
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              {[1, 0, 2].map((slot) => {
                const entry = podium[slot];
                if (!entry) return <div key={slot} className="hidden sm:block" />;
                return (
                  <motion.div
                    key={entry.child_id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-3xl border-2 p-4 flex flex-col items-center gap-2 ${PODIUM_STYLES[slot]} ${
                      slot === 0 ? "sm:scale-105" : ""
                    } ${entry.is_mine ? "ring-2 ring-primary" : ""}`}
                  >
                    <span className="text-3xl">{MEDALS[slot]}</span>
                    <AvatarRenderer
                      seed={getAvatarSeed(entry.display_name, (entry.gender as Gender) ?? "other")}
                      gender={entry.gender}
                      size={slot === 0 ? "md" : "sm"}
                    />
                    <p className="font-bold text-foreground text-center">{entry.display_name}</p>
                    <p className="text-sm text-muted-foreground tabular-nums">{valueFor(entry, metric)}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-2">
              {rest.map((entry) => (
                <div
                  key={entry.child_id}
                  className={`flex items-center gap-3 bg-card border border-border rounded-2xl p-3 ${
                    entry.is_mine ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <span className="w-8 text-center font-bold text-muted-foreground tabular-nums">
                    {entry.rank}
                  </span>
                  <AvatarRenderer
                    seed={getAvatarSeed(entry.display_name, (entry.gender as Gender) ?? "other")}
                    gender={entry.gender}
                    size="xs"
                  />
                  <p className="flex-1 font-bold text-foreground">{entry.display_name}</p>
                  <p className="text-sm text-muted-foreground tabular-nums">{valueFor(entry, metric)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Leaderboard;
