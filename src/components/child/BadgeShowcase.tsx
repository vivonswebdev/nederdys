import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BADGES, badgeByName, getAchievements } from "@/lib/gamification";

interface BadgeShowcaseProps {
  childId: string;
}

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "à l'instant";
  if (h < 24) return `il y a ${h} h`;
  const d = Math.floor(h / 24);
  return `il y a ${d} j`;
};

export const BadgeShowcase = ({ childId }: BadgeShowcaseProps) => {
  const [open, setOpen] = useState(false);
  const { data: achievements = [] } = useQuery({
    queryKey: ["achievements", childId],
    queryFn: () => getAchievements(childId),
    enabled: !!childId,
  });

  const recent = achievements.slice(0, 3);
  const unlocked = new Set(achievements.map((a) => a.badge_name));

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-foreground">🏅 Tes derniers badges</h2>
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-primary font-medium hover:underline"
        >
          Voir tous mes badges
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="bg-card border border-border rounded-3xl p-6 text-center kids-shadow-card">
          <span className="text-4xl block mb-2">✨</span>
          <p className="text-muted-foreground font-dyslexic">
            Tes premiers badges arrivent bientôt ! Joue à un jeu pour en gagner un.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recent.map((a, i) => {
            const def = badgeByName(a.badge_name);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05 }}
                title={def?.descFr}
                className="bg-card border border-primary/40 rounded-2xl p-4 text-center kids-shadow-card"
              >
                <span className="text-3xl block mb-1">{a.badge_icon}</span>
                <span className="block text-sm font-bold text-foreground">
                  {def?.labelFr ?? a.badge_name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {timeAgo(a.unlocked_at as string)}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tous mes badges</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            {BADGES.map((b) => {
              const has = unlocked.has(b.name);
              return (
                <div
                  key={b.name}
                  title={b.descFr}
                  className={`rounded-2xl p-3 text-center border ${
                    has ? "bg-card border-primary/40" : "bg-muted border-border opacity-60 blur-[0.4px]"
                  }`}
                >
                  <span className="text-3xl block mb-1">{has ? b.icon : "🔒"}</span>
                  <span className="text-xs font-medium text-foreground">{b.labelFr}</span>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
