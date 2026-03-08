import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Clock, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const progressData = [
  { month: "Oct", mots: 20, precision: 45 },
  { month: "Nov", mots: 45, precision: 55 },
  { month: "Déc", mots: 65, precision: 62 },
  { month: "Jan", mots: 90, precision: 70 },
  { month: "Fév", mots: 130, precision: 78 },
  { month: "Mar", mots: 175, precision: 85 },
];

const phonemeData = [
  { phoneme: "/a:/", score: 90 },
  { phoneme: "/ɛ/", score: 75 },
  { phoneme: "/ʏ/", score: 45 },
  { phoneme: "/œ/", score: 55 },
  { phoneme: "/r/", score: 60 },
  { phoneme: "/ɣ/", score: 40 },
];

const weeklyTime = [
  { day: "Lun", min: 12 },
  { day: "Mar", min: 8 },
  { day: "Mer", min: 15 },
  { day: "Jeu", min: 10 },
  { day: "Ven", min: 5 },
  { day: "Sam", min: 20 },
  { day: "Dim", min: 18 },
];

const badges = [
  { emoji: "🦁", name: "Tigre NL", desc: "50h de jeu", earned: true },
  { emoji: "⭐", name: "10 jours streak", desc: "Régularité", earned: true },
  { emoji: "🎯", name: "100 mots", desc: "Vocabulaire", earned: true },
  { emoji: "🏆", name: "Phonème Pro", desc: "90% précision", earned: false },
  { emoji: "🚀", name: "Fusée rapide", desc: "5 jeux/jour", earned: false },
  { emoji: "🌟", name: "Super Star", desc: "Tout compléter", earned: false },
];

const ParentsDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="w-4 h-4" /> Retour
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Parents 👨‍👩‍👧</h1>
            <p className="text-muted-foreground">Progrès de Emma · 8 ans · Meise</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">85%</div>
            <div className="text-sm text-muted-foreground">Précision ce mois</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <TrendingUp className="w-5 h-5" />, val: "175", label: "Mots appris", color: "text-primary" },
            { icon: <Clock className="w-5 h-5" />, val: "88 min", label: "Cette semaine", color: "text-kids-blue" },
            { icon: <Target className="w-5 h-5" />, val: "12", label: "Jours streak 🔥", color: "text-kids-orange" },
            { icon: <Award className="w-5 h-5" />, val: "3/6", label: "Badges gagnés", color: "text-secondary" },
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
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl p-6 kids-shadow-card border border-border"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">📈 Progression 6 mois</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="mots" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))" }} name="Mots appris" />
                <Line type="monotone" dataKey="precision" stroke="hsl(var(--kids-yellow))" strokeWidth={3} dot={{ fill: "hsl(var(--kids-yellow))" }} name="Précision %" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Phoneme Radar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl p-6 kids-shadow-card border border-border"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">🔊 Phonèmes NL - Heatmap</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={phonemeData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="phoneme" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2">
              ⚠️ Focus recommandé : <span className="font-bold text-destructive">/ɣ/ (40%)</span> et <span className="font-bold text-destructive">/ʏ/ (45%)</span>
            </p>
          </motion.div>
        </div>

        {/* Weekly time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 kids-shadow-card border border-border mb-8"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">⏱️ Temps de jeu cette semaine</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              <Bar dataKey="min" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Minutes" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 kids-shadow-card border border-border"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">🏅 Badges & Récompenses</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 text-center border transition-all ${
                  badge.earned
                    ? "bg-secondary/30 border-secondary"
                    : "bg-muted/50 border-border opacity-50"
                }`}
              >
                <span className="text-3xl block mb-1">{badge.emoji}</span>
                <p className="font-bold text-foreground text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
                {badge.earned && <span className="text-xs text-primary font-bold">✅ Gagné !</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParentsDashboard;
