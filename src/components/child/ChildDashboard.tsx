import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { getChildLevel } from "@/lib/database";
import { computeStreak, getStreakDays, recordDailyActivity } from "@/lib/gamification";
import { getLevelInfo } from "@/lib/gamification";
import { useLanguage } from "@/contexts/LanguageContext";
import { gamesBySubject } from "@/lib/games";
import { ProgressRing } from "./ProgressRing";
import { StreakCounter } from "./StreakCounter";
import { ChildLevelBadge } from "./LevelBadge";
import { SubjectCard } from "./SubjectCard";
import { DailyChallenge } from "./DailyChallenge";
import { SeasonPassCard } from "./SeasonPassCard";
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
import { useChildMode } from "@/contexts/ChildModeContext";
import { isKindergartenLevel } from "@/lib/schoolLevels";

const ChildDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
  const { children, activeChild, setActiveChildId, loading } = useChild();
  const { isChildMode, enterChildMode } = useChildMode();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [aboutOpen, setAboutOpen] = useState(false);
  useChildSettings(id);

  const child = children.find((c) => c.id === id) ?? null;
  const isLittleOne = !!child && (child.age < 7 || isKindergartenLevel(child.school_level));

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
  const { lang } = useLanguage();
  const info = getLevelInfo(totalXp, lang);
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
        {isLittleOne && (
          <button
            onClick={() => navigate(`/child/${child.id}/eveil`)}
            className="w-full bg-kids-orange/30 border-4 border-kids-orange rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
          >
            <span className="text-5xl block mb-1">🌟</span>
            <p className="text-2xl font-bold text-foreground">
              <BilingualText {...biFromFr("Mes jeux 3-5 ans")} />
            </p>
            <p className="font-dyslexic text-muted-foreground">
              <BilingualText {...biFromFr("Des activités toutes simples, sans lecture !")} />
            </p>
          </button>
        )}

        {/* Bloc unique matières : jouer / s'exercer / apprendre */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            <BilingualText {...biFromFr("Choisis ta matière")} />
          </h2>
          <div className="space-y-5">
            {SUBJECT_BLOCKS.map((s) => (
              <div
                key={s.id}
                className={`border-4 rounded-3xl p-5 kids-shadow-card ${s.cardClass}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <h3 className="text-xl font-bold text-foreground">{s.name}</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    onClick={() => navigate(`/child/${child.id}/${s.id}`)}
                    className="bg-card border-2 border-border rounded-2xl p-4 text-left hover:border-primary transition-colors"
                  >
                    <span className="text-2xl block mb-1">🎮</span>
                    <p className="font-bold text-foreground">
                      <BilingualText {...biFromFr("Jouer")} />
                    </p>
                    <p className="text-xs font-dyslexic text-muted-foreground">
                      {gamesBySubject(s.id).length} <BilingualText {...biFromFr("jeux")} />
                    </p>
                  </button>
                  <button
                    onClick={() => navigate(chaptersListRoute(child.id, s.id))}
                    className="bg-card border-2 border-border rounded-2xl p-4 text-left hover:border-primary transition-colors"
                  >
                    <span className="text-2xl block mb-1">📚</span>
                    <p className="font-bold text-foreground">
                      <BilingualText {...biFromFr("Exercices")} />
                    </p>
                    <p className="text-xs font-dyslexic text-muted-foreground">
                      {chaptersBySubject(s.id).length}{" "}
                      <BilingualText {...biFromFr("chapitres")} />
                    </p>
                  </button>
                  <button
                    onClick={() => navigate(`/child/${child.id}/apprendre/${s.id}`)}
                    className="bg-card border-2 border-border rounded-2xl p-4 text-left hover:border-primary transition-colors"
                  >
                    <span className="text-2xl block mb-1">📘</span>
                    <p className="font-bold text-foreground">
                      <BilingualText {...biFromFr("Leçons")} />
                    </p>
                    <p className="text-xs font-dyslexic text-muted-foreground">
                      {lessonsBySubject(s.id).length}{" "}
                      <BilingualText {...biFromFr("leçons")} />
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mt-5">
            <button
              onClick={() => navigate(`/child/${child.id}/math/chapitres`)}
              className="border-4 border-kids-purple bg-kids-purple/25 rounded-3xl p-5 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
            >
              <span className="text-3xl block mb-1">🔥</span>
              <p className="text-lg font-bold text-foreground">
                <BilingualText {...biFromFr("Maths avancées")} />
              </p>
              <p className="font-dyslexic text-muted-foreground text-sm">
                <BilingualText {...biFromFr("4e, 5e, 6e primaire")} />
              </p>
            </button>
            <button
              onClick={() => navigate(`/child/${child.id}/nl/exercices`)}
              className="border-4 border-kids-blue bg-kids-blue/25 rounded-3xl p-5 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
            >
              <span className="text-3xl block mb-1">🎓</span>
              <p className="text-lg font-bold text-foreground">
                <BilingualText {...biFromFr("NL avancé")} />
              </p>
              <p className="font-dyslexic text-muted-foreground text-sm">
                <BilingualText {...biFromFr("Grammaire, vocabulaire, compréhension…")} />
              </p>
            </button>
          </div>
        </section>


        <button
          onClick={() => navigate(`/child/${child.id}/code`)}
          className="w-full bg-kids-purple/25 border-4 border-kids-purple rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
        >
          <span className="text-4xl block mb-1">🧑‍💻</span>
          <p className="text-xl font-bold text-foreground">
            <BilingualText {...biFromFr("Coder & IA (de A à Z)")} />
          </p>
          <p className="font-dyslexic text-muted-foreground">
            <BilingualText {...biFromFr("Des épisodes courts par âge, avec un questionnaire à la fin.")} />
          </p>
        </button>


        <button
          onClick={() => navigate(`/child/${child.id}/pause`)}
          className="w-full bg-muted border-4 border-border rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
        >
          <span className="text-4xl block mb-1">🎮</span>
          <p className="text-xl font-bold text-foreground"><BilingualText {...biFromFr("Petite pause")} /></p>
          <p className="font-dyslexic text-muted-foreground">
            <BilingualText {...biFromFr("Un memory pour se détendre, sans points.")} />
          </p>
        </button>

        <button
          onClick={() => navigate(`/child/${child.id}/defis`)}
          className="w-full bg-card border-4 border-border rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
        >
          <span className="text-4xl block mb-1">🏆</span>
          <p className="text-xl font-bold text-foreground"><BilingualText {...biFromFr("Défis frères et sœurs")} /></p>
          <p className="font-dyslexic text-muted-foreground">
            <BilingualText {...biFromFr("Défie ton frère ou ta sœur sur un jeu ou un chapitre.")} />
          </p>
        </button>



        {!isLittleOne && (
          <button
            onClick={() => navigate(`/child/${child.id}/eveil`)}
            className="w-full bg-kids-orange/20 border-4 border-kids-orange rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
          >
            <span className="text-4xl block mb-1">🌟</span>
            <p className="text-xl font-bold text-foreground"><BilingualText {...biFromFr("Éveil (3-5 ans)")} /></p>
            <p className="font-dyslexic text-muted-foreground">
              <BilingualText {...biFromFr("4 activités toutes simples, sans lecture !")} />
            </p>
          </button>
        )}


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
          <h2 className="text-xl font-bold text-foreground mb-4"><BilingualText {...biFromFr("Choisis ta matière")} /></h2>
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

        <SeasonPassCard childId={child.id} />

        <div className="space-y-2">
          <DailyChallenge childId={child.id} />
          <button
            onClick={() => navigate(`/child/${child.id}/defi`)}
            className="text-sm text-primary font-medium hover:underline"
          >
            <BilingualText {...biFromFr("Voir le récapitulatif des défis →")} />
          </button>
        </div>

        <BadgeShowcase childId={child.id} />

        <footer className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <button
            onClick={() => navigate(`/child/${child.id}/settings`)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground rounded-full border border-border px-4 py-2"
          >
            <Settings className="w-4 h-4" /> <BilingualText {...biFromFr("Paramètres")} />
          </button>
          {!isChildMode && (
            <>
              <button
                onClick={() => navigate("/profils")}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground rounded-full border border-border px-4 py-2"
              >
                👦 <BilingualText {...biFromFr("Changer d'enfant")} />
              </button>
              <button
                onClick={() => enterChildMode(child.id)}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground rounded-full border border-border px-4 py-2"
              >
                📱 Donner l'appareil à {child.first_name}
              </button>
              <button
                onClick={async () => {
                  await signOut();
                  navigate("/auth");
                }}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground rounded-full border border-border px-4 py-2"
              >
                <LogOut className="w-4 h-4" /> <BilingualText {...biFromFr("Déconnexion")} />
              </button>
            </>
          )}
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
