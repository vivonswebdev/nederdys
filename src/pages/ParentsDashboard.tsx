import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Clock, Target, Award, Users } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getChildren, getGameSessions } from "@/lib/database";
import { format, subDays, startOfDay, isAfter } from "date-fns";
import { fr } from "date-fns/locale";
import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const GAME_LABELS: Record<string, string> = {
  syllabes: "Syllabes Magiques",
  chasse: "Chasse aux Mots",
  memoire: "Mémoire Sonore",
};

const ParentsDashboard = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const selectedChildId = searchParams.get("child");

  const { data: children = [], isLoading: loadingChildren } = useQuery({
    queryKey: ["children", user?.id],
    queryFn: () => getChildren(user!.id),
    enabled: !!user,
  });

  const [activeChildId, setActiveChildId] = useState<string | null>(selectedChildId);
  const currentChildId = activeChildId || children[0]?.id;
  const currentChild = children.find((c) => c.id === currentChildId);

  const { data: sessions = [], isLoading: loadingSessions } = useQuery({
    queryKey: ["sessions", currentChildId],
    queryFn: () => getGameSessions(currentChildId!),
    enabled: !!currentChildId,
  });

  // --- Computed stats ---
  const stats = useMemo(() => {
    if (!sessions.length) return null;

    const now = new Date();
    const weekAgo = subDays(now, 7);
    const monthAgo = subDays(now, 30);

    const weekSessions = sessions.filter((s) => isAfter(new Date(s.created_at), weekAgo));
    const monthSessions = sessions.filter((s) => isAfter(new Date(s.created_at), monthAgo));

    const totalScore = sessions.reduce((a, s) => a + s.score, 0);
    const totalMaxScore = sessions.reduce((a, s) => a + s.max_score, 0);
    const precision = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

    const weekMinutes = Math.round(weekSessions.reduce((a, s) => a + s.duration_seconds, 0) / 60);
    const totalGames = sessions.length;
    const completedGames = sessions.filter((s) => s.completed).length;

    // Streak calculation (consecutive days with at least 1 session)
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const day = startOfDay(subDays(now, i));
      const hasSession = sessions.some((s) => {
        const sDay = startOfDay(new Date(s.created_at));
        return sDay.getTime() === day.getTime();
      });
      if (hasSession) streak++;
      else if (i > 0) break; // allow today to not have a session yet
    }

    return { precision, weekMinutes, totalGames, completedGames, streak, monthSessions, weekSessions };
  }, [sessions]);

  // --- Chart data: progression par semaine (last 6 weeks) ---
  const progressData = useMemo(() => {
    const weeks: { label: string; score: number; count: number }[] = [];
    const now = new Date();
    for (let w = 5; w >= 0; w--) {
      const weekStart = subDays(now, w * 7 + 6);
      const weekEnd = subDays(now, w * 7);
      const label = format(weekStart, "dd MMM", { locale: fr });
      const weekSessions = sessions.filter((s) => {
        const d = new Date(s.created_at);
        return d >= weekStart && d <= weekEnd;
      });
      const avg = weekSessions.length > 0
        ? Math.round(weekSessions.reduce((a, s) => a + (s.max_score > 0 ? (s.score / s.max_score) * 100 : 0), 0) / weekSessions.length)
        : 0;
      weeks.push({ label, score: avg, count: weekSessions.length });
    }
    return weeks;
  }, [sessions]);

  // --- Chart data: temps par jour (last 7 days) ---
  const weeklyTime = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const day = subDays(now, 6 - i);
      const label = format(day, "EEE", { locale: fr });
      const daySessions = sessions.filter((s) => {
        const sDay = startOfDay(new Date(s.created_at));
        return sDay.getTime() === startOfDay(day).getTime();
      });
      const min = Math.round(daySessions.reduce((a, s) => a + s.duration_seconds, 0) / 60);
      return { day: label, min };
    });
  }, [sessions]);

  // --- Chart data: répartition par jeu ---
  const gameDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    sessions.forEach((s) => {
      counts[s.game_type] = (counts[s.game_type] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({
      name: GAME_LABELS[type] || type,
      value: count,
    }));
  }, [sessions]);

  // --- Chart data: score par type de jeu (radar) ---
  const gameScores = useMemo(() => {
    const scores: Record<string, { total: number; max: number }> = {};
    sessions.forEach((s) => {
      if (!scores[s.game_type]) scores[s.game_type] = { total: 0, max: 0 };
      scores[s.game_type].total += s.score;
      scores[s.game_type].max += s.max_score;
    });
    return Object.entries(scores).map(([type, { total, max }]) => ({
      game: GAME_LABELS[type] || type,
      score: max > 0 ? Math.round((total / max) * 100) : 0,
    }));
  }, [sessions]);

  const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--kids-blue))", "hsl(var(--kids-orange))", "hsl(var(--secondary))"];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Connectez-vous pour voir le dashboard</p>
          <Link to="/auth" className="text-primary underline">Se connecter</Link>
        </div>
      </div>
    );
  }

  const isLoading = loadingChildren || loadingSessions;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="w-4 h-4" /> Retour
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Parents 👨‍👩‍👧</h1>
          </div>
        </div>

        {/* Child selector */}
        {children.length > 1 && (
          <Tabs value={currentChildId || ""} onValueChange={setActiveChildId} className="mb-6">
            <TabsList>
              {children.map((child) => (
                <TabsTrigger key={child.id} value={child.id}>
                  {child.avatar_emoji} {child.first_name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {currentChild && (
          <p className="text-muted-foreground mb-6">
            Progrès de {currentChild.avatar_emoji} {currentChild.first_name} · {currentChild.age} ans · Niveau {currentChild.dys_level}
          </p>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : sessions.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-6xl mb-4">🎮</p>
            <h2 className="text-2xl font-bold text-foreground mb-2">Pas encore de données</h2>
            <p className="text-muted-foreground mb-6">
              {currentChild?.first_name || "Votre enfant"} n'a pas encore joué. Lancez un jeu pour commencer !
            </p>
            <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition">
              Jouer maintenant 🚀
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <TrendingUp className="w-5 h-5" />, val: `${stats?.precision || 0}%`, label: "Précision globale", color: "text-primary" },
                { icon: <Clock className="w-5 h-5" />, val: `${stats?.weekMinutes || 0} min`, label: "Cette semaine", color: "text-kids-blue" },
                { icon: <Target className="w-5 h-5" />, val: `${stats?.streak || 0}`, label: "Jours streak 🔥", color: "text-kids-orange" },
                { icon: <Award className="w-5 h-5" />, val: `${stats?.completedGames || 0}/${stats?.totalGames || 0}`, label: "Jeux complétés", color: "text-secondary" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-4 kids-shadow-card border border-border"
                >
                  <div className={stat.color}>{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground mt-2">{stat.val}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Progression */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-2xl p-6 kids-shadow-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">📈 Précision (6 semaines)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))" }} name="Précision %" />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Score par jeu (Radar) */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-2xl p-6 kids-shadow-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">🎯 Score par jeu</h3>
                {gameScores.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={gameScores}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="game" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Radar name="Score %" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Pas assez de données</p>
                )}
              </motion.div>
            </div>

            {/* Weekly time + Game distribution */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 kids-shadow-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">⏱️ Temps de jeu (7 jours)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip formatter={(v: number) => `${v} min`} />
                    <Bar dataKey="min" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Minutes" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 kids-shadow-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">🎮 Répartition des jeux</h3>
                {gameDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={gameDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`} fontSize={11}>
                        {gameDistribution.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Pas assez de données</p>
                )}
              </motion.div>
            </div>

            {/* Recent sessions table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 kids-shadow-card border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">📋 Sessions récentes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Date</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Jeu</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Score</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Durée</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.slice(0, 10).map((s) => (
                      <tr key={s.id} className="border-b border-border/50">
                        <td className="py-2 text-foreground">{format(new Date(s.created_at), "dd MMM HH:mm", { locale: fr })}</td>
                        <td className="py-2 text-foreground">{GAME_LABELS[s.game_type] || s.game_type}</td>
                        <td className="py-2 text-foreground font-medium">{s.score}/{s.max_score}</td>
                        <td className="py-2 text-foreground">{Math.round(s.duration_seconds / 60)}min {s.duration_seconds % 60}s</td>
                        <td className="py-2">{s.completed ? <span className="text-primary font-bold">✅</span> : <span className="text-muted-foreground">⏸️</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentsDashboard;
