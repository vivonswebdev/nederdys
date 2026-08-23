import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Flame, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getChildLevel, getChildCoins } from "@/lib/database";
import {
  BADGES,
  challengeOfTheDay,
  computeStreak,
  getAchievements,
  getStreakDays,
  recordDailyActivity,
  tierProgress,
} from "@/lib/gamification";
import { SUBJECTS } from "@/lib/games";

const ChildDashboard = () => {
  const { user } = useAuth();
  const { activeChild, loading } = useChild();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && !activeChild) navigate("/profils");
  }, [loading, user, activeChild, navigate]);

  useEffect(() => {
    if (user && activeChild) recordDailyActivity(user.id, activeChild.id, 0);
  }, [user, activeChild]);

  const { data: level } = useQuery({
    queryKey: ["childLevel", activeChild?.id],
    queryFn: () => getChildLevel(activeChild!.id),
    enabled: !!activeChild,
  });
  const { data: coins } = useQuery({
    queryKey: ["childCoins", activeChild?.id],
    queryFn: () => getChildCoins(activeChild!.id),
    enabled: !!activeChild,
  });
  const { data: achievements = [] } = useQuery({
    queryKey: ["achievements", activeChild?.id],
    queryFn: () => getAchievements(activeChild!.id),
    enabled: !!activeChild,
  });
  const { data: streakDays = [] } = useQuery({
    queryKey: ["streaks", activeChild?.id],
    queryFn: () => getStreakDays(activeChild!.id),
    enabled: !!activeChild,
  });

  const xp = level?.xp ?? 0;
  const { tier, percent, needed } = tierProgress(xp);
  const streak = computeStreak(streakDays.map((d) => d.date as string));
  const challenge = challengeOfTheDay();
  const unlocked = new Set(achievements.map((a) => a.badge_name));

  if (!activeChild) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-4xl px-4 py-8">
        {/* En-tête enfant */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-6 kids-shadow-card border border-border mb-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-6xl">{activeChild.avatar_emoji}</span>
            <div className="flex-1 min-w-[12rem]">
              <h1 className="text-2xl font-bold text-foreground">
                {t("child.hello")} {activeChild.first_name} ! {tier.emoji}
              </h1>
              <p className="text-sm text-muted-foreground font-dyslexic">
                {t("child.level")} {tier.level} — {lang === "fr" ? tier.titleFr : tier.titleNl}
              </p>
              <div className="mt-3 w-full bg-muted rounded-full h-4 overflow-hidden">
                <motion.div
                  className="bg-primary h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {xp} {t("child.xp")}
                {needed > 0 && ` · ${needed} ${t("child.tolevel")}`}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 bg-secondary/40 rounded-2xl px-4 py-3">
              <Flame className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold text-foreground">{streak}</span>
              <span className="text-[11px] text-muted-foreground text-center">
                {t("child.streak")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-secondary/40 rounded-2xl px-4 py-3">
              <span className="text-2xl">🪙</span>
              <span className="text-2xl font-bold text-foreground">{coins?.coins ?? 0}</span>
            </div>
          </div>
          <Link
            to="/profils"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mt-4"
          >
            <Users className="w-3.5 h-3.5" /> {t("profiles.switch")}
          </Link>
        </motion.section>

        {/* Matières */}
        <h2 className="text-xl font-bold text-foreground mb-4">{t("subject.choose")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={`/matiere/${s.id}`}
                className="block bg-card border-2 border-border rounded-3xl p-6 kids-shadow-card text-center h-full"
              >
                <span className="text-5xl block mb-2">{s.emoji}</span>
                <span className="block font-bold text-foreground text-lg">{t(s.labelKey as never)}</span>
                <span className="block text-sm text-muted-foreground font-dyslexic mt-1">
                  {t(s.descKey as never)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Défi du jour */}
        <section className="bg-secondary/30 border border-border rounded-3xl p-5 mb-10 flex items-center gap-4">
          <span className="text-4xl">{challenge.emoji}</span>
          <div>
            <p className="text-sm font-bold text-foreground">{t("child.challenge")}</p>
            <p className="text-muted-foreground font-dyslexic">
              {lang === "fr" ? challenge.fr : challenge.nl}
            </p>
          </div>
        </section>

        {/* Badges */}
        <h2 className="text-xl font-bold text-foreground mb-4">{t("child.badges")}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {BADGES.map((b) => {
            const has = unlocked.has(b.name);
            return (
              <div
                key={b.name}
                className={`rounded-2xl p-4 text-center border ${
                  has ? "bg-card border-primary/40" : "bg-muted border-border opacity-50"
                }`}
                title={lang === "fr" ? b.descFr : b.descNl}
              >
                <span className="text-3xl block mb-1">{has ? b.icon : "🔒"}</span>
                <span className="text-xs font-medium text-foreground">
                  {lang === "fr" ? b.labelFr : b.labelNl}
                </span>
              </div>
            );
          })}
        </div>
        {achievements.length === 0 && (
          <p className="text-sm text-muted-foreground mt-4">{t("child.nobadge")}</p>
        )}
      </main>
    </div>
  );
};

export default ChildDashboard;
