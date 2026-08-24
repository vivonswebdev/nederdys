import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { getChildLevel } from "@/lib/database";
import { computeStreak, getStreakDays, recordDailyActivity } from "@/lib/gamification";
import { getLevel } from "@/lib/levels";
import { gamesBySubject } from "@/lib/games";
import { ProgressRing } from "./ProgressRing";
import { StreakCounter } from "./StreakCounter";
import { ChildLevelBadge } from "./LevelBadge";
import { SubjectCard } from "./SubjectCard";
import { DailyChallenge } from "./DailyChallenge";
import { BadgeShowcase } from "./BadgeShowcase";
import { AvatarRenderer } from "./AvatarRenderer";
import { getAvatarConfig } from "@/lib/avatar";
import { AboutModal } from "./AboutModal";
import { useChildSettings } from "@/hooks/useChildSettings";
import { checkAndUnlockBadges } from "@/lib/badges";
import { getAchievements } from "@/lib/gamification";
import { getOrCreateDailyChallenge } from "@/lib/challenges";
import { msUntilLocalMidnight } from "@/lib/date";
import { getChildCoins } from "@/lib/database";

const ChildDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
  const { children, activeChild, setActiveChildId, loading } = useChild();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [aboutOpen, setAboutOpen] = useState(false);
  useChildSettings(id);

  const child = children.find((c) => c.id === id) ?? null;

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/auth");
    if (!id || !child) {
      navigate(activeChild ? `/child/${activeChild.id}` : "/profils", { replace: true });
      return;
    }
    if (activeChild?.id !== child.id) setActiveChildId(child.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user, id, child, activeChild]);

  useEffect(() => {
    if (!user || !child) return;
    recordDailyActivity(user.id, child.id, 0).then(() => {
      checkAndUnlockBadges(user.id, child.id).then((newly) => {
        if (newly.length) queryClient.invalidateQueries({ queryKey: ["achievements"] });
      });
    });
  }, [user, child, queryClient]);

  // Reset du défi à minuit (heure locale) + contrôle horaire
  useEffect(() => {
    if (!user || !child) return;
    const ensure = () => {
      getOrCreateDailyChallenge(user.id, child.id).then(() =>
        queryClient.invalidateQueries({ queryKey: ["dailyChallenge", child.id] })
      );
    };
    ensure();
    const hourly = setInterval(ensure, 60 * 60 * 1000);
    const midnight = setTimeout(ensure, msUntilLocalMidnight());
    return () => {
      clearInterval(hourly);
      clearTimeout(midnight);
    };
  }, [user, child, queryClient]);

  const { data: level, isLoading: levelLoading } = useQuery({
    queryKey: ["childLevel", child?.id],
    queryFn: () => getChildLevel(child!.id),
    enabled: !!child,
  });
  const { data: streakDays = [] } = useQuery({
    queryKey: ["streaks", child?.id],
    queryFn: () => getStreakDays(child!.id),
    enabled: !!child,
  });
  const { data: avatarConfig } = useQuery({
    queryKey: ["avatarConfig", child?.id],
    queryFn: () => getAvatarConfig(child!.id),
    enabled: !!child,
  });
  const { data: achievements = [] } = useQuery({
    queryKey: ["achievements", child?.id],
    queryFn: () => getAchievements(child!.id),
    enabled: !!child,
  });
  const { data: coinsRow } = useQuery({
    queryKey: ["childCoins", child?.id],
    queryFn: () => getChildCoins(child!.id),
    enabled: !!child,
  });

  if (!child) return <div className="min-h-screen bg-background" />;

  const totalXp = level?.xp ?? 0;
  const info = getLevel(totalXp);
  const streak = computeStreak(streakDays.map((d) => d.date as string));

  return (
    <div className="min-h-screen bg-background">
      {/* Header fixe */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="container max-w-4xl px-4 py-3 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setAboutOpen(true)}
            className="hover:scale-110 transition-transform"
            aria-label="À propos de moi"
          >
            <AvatarRenderer seed={child.first_name} gender={child.gender} options={avatarConfig ?? {}} size="sm" />
          </button>
          <div className="flex-1 min-w-[12rem]">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-foreground">{child.first_name}</h1>
              <ChildLevelBadge totalXp={totalXp} />
            </div>
            {levelLoading ? (
              <div className="mt-2 h-3 w-full bg-muted rounded-full animate-pulse" />
            ) : (
              <>
                <div className="mt-2 w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-primary h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${info.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                  {info.nextAt ? `${totalXp}/${info.nextAt} XP` : `${totalXp} XP`}
                </p>
              </>
            )}
          </div>
          <StreakCounter streakDays={streak} />
          <div className="flex items-center gap-2 bg-kids-orange/15 text-kids-orange rounded-full px-3 py-1.5 font-bold tabular-nums text-sm">
            💰 {coinsRow?.coins ?? 0}
          </div>
          <ProgressRing
            currentXp={info.current}
            maxXp={info.span}
            level={info.level}
            emoji={info.emoji}
            size={72}
          />
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-8 space-y-10">
        <button
          onClick={() => navigate(`/child/${child.id}/games`)}
          className="w-full bg-kids-blue/30 border-4 border-primary rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
        >
          <span className="text-4xl block mb-1">🎮</span>
          <p className="text-xl font-bold text-foreground">Voir tous les jeux</p>
          <p className="font-dyslexic text-muted-foreground">
            Jeux et exercices de toutes tes matières !
          </p>
        </button>

        <button
          onClick={() => navigate(`/child/${child.id}/eveil`)}
          className="w-full bg-kids-orange/20 border-4 border-kids-orange rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
        >
          <span className="text-4xl block mb-1">🌟</span>
          <p className="text-xl font-bold text-foreground">Éveil (3-5 ans)</p>
          <p className="font-dyslexic text-muted-foreground">
            4 activités toutes simples, sans lecture !
          </p>
        </button>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => navigate(`/child/${child.id}/avatar`)}
            className="flex-1 min-w-[10rem] bg-card border border-border rounded-2xl px-4 py-3 font-bold text-foreground text-left hover:border-primary transition-colors"
          >
            🎨 Mon avatar
          </button>
          <button
            onClick={() => navigate(`/child/${child.id}/boutique`)}
            className="flex-1 min-w-[10rem] bg-card border border-border rounded-2xl px-4 py-3 font-bold text-foreground text-left hover:border-primary transition-colors"
          >
            🛍️ Boutique d'avatar
          </button>
          <button
            onClick={() => navigate(`/child/${child.id}/badges`)}
            className="flex-1 min-w-[10rem] bg-card border border-border rounded-2xl px-4 py-3 font-bold text-foreground text-left hover:border-primary transition-colors"
          >
            🏅 Mes badges
          </button>
          <button
            onClick={() => navigate(`/child/${child.id}/settings`)}
            className="flex-1 min-w-[10rem] bg-card border border-border rounded-2xl px-4 py-3 font-bold text-foreground text-left hover:border-primary transition-colors"
          >
            ⚙️ Mes paramètres
          </button>
        </div>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Choisis ta matière</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <SubjectCard
              subject="nl"
              title="Néerlandais"
              icon="🇳🇱"
              colorClass="bg-kids-blue"
              available
              gameCount={gamesBySubject("nl").length}
              childId={child.id}
              index={0}
            />
            <SubjectCard
              subject="fr"
              title="Français"
              icon="🇫🇷"
              colorClass="bg-kids-green-light"
              available={false}
              gameCount={gamesBySubject("fr").length}
              childId={child.id}
              index={1}
            />
            <SubjectCard
              subject="math"
              title="Mathématiques"
              icon="🔢"
              colorClass="bg-kids-orange"
              available
              gameCount={gamesBySubject("math").length}
              childId={child.id}
              index={2}
            />
          </div>
        </section>

        <div className="space-y-2">
          <DailyChallenge childId={child.id} />
          <button
            onClick={() => navigate(`/child/${child.id}/defi`)}
            className="text-sm text-primary font-medium hover:underline"
          >
            Voir le récapitulatif des défis →
          </button>
        </div>

        <BadgeShowcase childId={child.id} />

        <footer className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <button
            onClick={() => navigate(`/child/${child.id}/settings`)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground rounded-full border border-border px-4 py-2"
          >
            <Settings className="w-4 h-4" /> Paramètres
          </button>
          <button
            onClick={async () => {
              await signOut();
              navigate("/auth");
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground rounded-full border border-border px-4 py-2"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </footer>
      </main>

      <AboutModal
        open={aboutOpen}
        onOpenChange={setAboutOpen}
        child={{
          id: child.id,
          first_name: child.first_name,
          age: child.age,
          school_level: String(child.school_level),
          created_at: String(child.created_at),
        }}
        totalXp={totalXp}
        badgeCount={achievements.length}
        avatarConfig={avatarConfig ?? undefined}
        onEditAvatar={() => navigate(`/child/${child.id}/avatar`)}
      />
    </div>
  );
};

export default ChildDashboard;
