import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Gamepad2, Settings, Users, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getChildLevel, getChildCoins, getGameSessions } from "@/lib/database";
import { getLevel } from "@/lib/levels";
import { getStreakDays, computeStreak } from "@/lib/gamification";
import { ProgressRing } from "@/components/child/ProgressRing";
import { StreakCounter } from "@/components/child/StreakCounter";
import { AvatarRenderer } from "@/components/child/AvatarRenderer";
import { getAvatarConfig } from "@/lib/avatar";
import { computeWeeklyStats, SessionRow } from "@/lib/weekly";
import { WeeklyProgressWidget } from "@/components/child/WeeklyProgressWidget";

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const { children, activeChild, loading: childLoading } = useChild();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Accueil — NederDys";
  }, []);

  const child = activeChild;

  useEffect(() => {
    if (authLoading || childLoading) return;
    if (!user) navigate("/auth", { replace: true });
    else if (!child) navigate("/profils", { replace: true });
  }, [authLoading, childLoading, user, child, navigate]);

  const { data: level } = useQuery({
    queryKey: ["childLevel", child?.id],
    queryFn: () => getChildLevel(child!.id),
    enabled: !!child,
  });
  const { data: coinsRow } = useQuery({
    queryKey: ["childCoins", child?.id],
    queryFn: () => getChildCoins(child!.id),
    enabled: !!child,
  });
  const { data: streakDays = [] } = useQuery({
    queryKey: ["streaks", child?.id],
    queryFn: () => getStreakDays(child!.id),
    enabled: !!child,
  });
  const { data: sessions = [] } = useQuery({
    queryKey: ["gameSessions", child?.id],
    queryFn: () => getGameSessions(child!.id),
    enabled: !!child,
  });
  const { data: avatarConfig } = useQuery({
    queryKey: ["avatarConfig", child?.id],
    queryFn: () => getAvatarConfig(child!.id),
    enabled: !!child,
  });

  if (!child) return <div className="min-h-screen bg-background" />;

  const totalXp = level?.xp ?? 0;
  const info = getLevel(totalXp);
  const streak = computeStreak(streakDays.map((d) => d.date as string));
  const coins = coinsRow?.coins ?? 0;
  const gamesPlayed = level?.games_played ?? sessions.length ?? 0;
  const today = new Date().toISOString().split("T")[0];
  const playedToday = sessions.some((s) => s.created_at?.startsWith(today));
  const weekly = computeWeeklyStats(sessions as unknown as SessionRow[]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-2 border-border rounded-3xl p-6 kids-shadow-card"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link
              to={`/child/${child.id}/avatar`}
              className="hover:scale-105 transition-transform"
              aria-label="Modifier mon avatar"
            >
              <AvatarRenderer seed={child.first_name} options={avatarConfig ?? {}} size="lg" />
            </Link>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-foreground">
                {t("home.greeting")} {child.first_name} !
              </h1>
              <p className="text-muted-foreground font-dyslexic mt-1">
                {playedToday ? t("home.playedToday") : t("home.notPlayedToday")}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 bg-kids-orange/15 text-kids-orange rounded-full px-3 py-1 text-sm font-bold">
                  💰 {coins}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-kids-blue/15 text-kids-blue rounded-full px-3 py-1 text-sm font-bold">
                  🎮 {gamesPlayed} {t("home.games")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-kids-green-light text-kids-green-dark rounded-full px-3 py-1 text-sm font-bold">
                  🏆 {t("home.level")} {info.level}
                </span>
              </div>
            </div>
            <ProgressRing
              currentXp={info.current}
              maxXp={info.span}
              level={info.level}
              emoji={info.emoji}
              size={96}
            />
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span className="text-muted-foreground">{t("home.xpProgress")}</span>
              <span className="tabular-nums text-foreground">
                {totalXp}/{info.nextAt ?? totalXp} XP
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${info.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 mt-5">
            <StreakCounter streakDays={streak} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-8"
        >
          <WeeklyProgressWidget stats={weekly} childId={child.id} />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 text-center sm:text-left">
            {t("home.actions")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/jouer"
              className="group bg-primary text-primary-foreground rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow flex items-center gap-4"
            >
              <span className="bg-primary-foreground/20 rounded-2xl p-3">
                <Gamepad2 className="w-7 h-7" />
              </span>
              <div>
                <p className="text-xl font-bold">{t("home.play")}</p>
                <p className="text-sm opacity-90 font-dyslexic">{t("home.playDesc")}</p>
              </div>
            </Link>

            <Link
              to={`/child/${child.id}/settings`}
              className="group bg-card text-foreground border-2 border-border rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow flex items-center gap-4"
            >
              <span className="bg-muted rounded-2xl p-3">
                <Settings className="w-7 h-7 text-primary" />
              </span>
              <div>
                <p className="text-xl font-bold">{t("home.settings")}</p>
                <p className="text-sm text-muted-foreground font-dyslexic">{t("home.settingsDesc")}</p>
              </div>
            </Link>

            <Link
              to="/parents"
              className="group bg-card text-foreground border-2 border-border rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow flex items-center gap-4"
            >
              <span className="bg-muted rounded-2xl p-3">
                <BarChart3 className="w-7 h-7 text-kids-purple" />
              </span>
              <div>
                <p className="text-xl font-bold">{t("home.parents")}</p>
                <p className="text-sm text-muted-foreground font-dyslexic">{t("home.parentsDesc")}</p>
              </div>
            </Link>

            <Link
              to="/profils"
              className="group bg-card text-foreground border-2 border-border rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow flex items-center gap-4"
            >
              <span className="bg-muted rounded-2xl p-3">
                <Users className="w-7 h-7 text-kids-blue" />
              </span>
              <div>
                <p className="text-xl font-bold">{t("home.profiles")}</p>
                <p className="text-sm text-muted-foreground font-dyslexic">{t("home.profilesDesc")}</p>
              </div>
            </Link>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-kids-green-light/30 border-2 border-primary/30 rounded-3xl p-6 text-center"
        >
          <span className="text-4xl">🐸</span>
          <h3 className="text-lg font-bold text-foreground mt-2">{t("home.tipTitle")}</h3>
          <p className="text-muted-foreground font-dyslexic mt-1 max-w-lg mx-auto">
            {t("home.tipText")}
          </p>
        </motion.section>
      </main>
    </div>
  );
};

export default Home;
