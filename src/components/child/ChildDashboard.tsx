import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LogOut, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { getChildCoins } from "@/lib/database";

const ChildDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
  const { children, activeChild, setActiveChildId, loading } = useChild();
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);

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
    if (user && child) recordDailyActivity(user.id, child.id, 0);
  }, [user, child]);

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
            <AvatarRenderer seed={child.first_name} options={avatarConfig ?? {}} size="sm" />
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
              available={false}
              gameCount={gamesBySubject("math").length}
              childId={child.id}
              index={2}
            />
          </div>
        </section>

        <DailyChallenge childId={child.id} />

        <BadgeShowcase childId={child.id} />

        <footer className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <button
            onClick={() => navigate("/profils")}
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

      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>À propos de moi</DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <span className="text-6xl block mb-3">{child.avatar_emoji}</span>
            <p className="text-lg font-bold text-foreground">{child.first_name}</p>
            <p className="text-muted-foreground font-dyslexic">
              {child.age} ans · {String(child.school_level).toUpperCase()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Niveau {info.level} {info.emoji} {info.title} · {totalXp} XP
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Inscrit le {new Date(child.created_at as string).toLocaleDateString("fr-BE")}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChildDashboard;
