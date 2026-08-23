import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { allBadges, BadgeCategory, CATEGORY_LABELS, badgeById } from "@/data/badges";
import { getAchievements } from "@/lib/gamification";
import { formatLocalDay } from "@/lib/date";

type Filter = "all" | BadgeCategory;

const FILTERS: { key: Filter; label: string; icon: string }[] = [
  { key: "all", label: "Tous", icon: "📦" },
  { key: "nl", label: "NL", icon: "🇳🇱" },
  { key: "fr", label: "FR", icon: "🇫🇷" },
  { key: "math", label: "Math", icon: "🔢" },
  { key: "streak", label: "Séries", icon: "🔥" },
  { key: "special", label: "Spécial", icon: "⭐" },
];

interface Props {
  childId: string;
}

export const BadgeCollection = ({ childId }: Props) => {
  const [filter, setFilter] = useState<Filter>("all");

  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ["achievements", childId],
    queryFn: () => getAchievements(childId),
    enabled: !!childId,
  });

  const unlocked = useMemo(
    () => new Map(achievements.map((a) => [a.badge_name as string, a.unlocked_at as string])),
    [achievements]
  );

  const unlockedCount = allBadges.filter((b) => unlocked.has(b.id)).length;
  const percent = Math.round((unlockedCount / allBadges.length) * 100);
  const filtered = filter === "all" ? allBadges : allBadges.filter((b) => b.category === filter);

  const last = achievements.find((a) => badgeById(a.badge_name as string));
  const rarest = [...allBadges]
    .filter((b) => unlocked.has(b.id))
    .sort((a, b) => allBadges.indexOf(b) - allBadges.indexOf(a))[0];

  return (
    <div className="space-y-8">
      <header className="bg-card border border-border rounded-3xl p-6 kids-shadow-card">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">🏅 Tes Badges</h1>
        <p className="text-muted-foreground font-dyslexic mt-1">
          {unlockedCount} / {allBadges.length} badges débloqués
        </p>
        <div className="mt-3 w-full bg-muted rounded-full h-4 overflow-hidden">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-muted/60 px-4 py-3">
            <p className="text-muted-foreground text-xs">Dernier débloqué</p>
            <p className="font-bold text-foreground">
              {last
                ? `${last.badge_icon} ${badgeById(last.badge_name as string)?.name} · ${formatLocalDay(
                    String(last.unlocked_at).slice(0, 10)
                  )}`
                : "Aucun pour l'instant"}
            </p>
          </div>
          <div className="rounded-2xl bg-muted/60 px-4 py-3">
            <p className="text-muted-foreground text-xs">Le plus rare</p>
            <p className="font-bold text-foreground">
              {rarest ? `${rarest.icon} ${rarest.name}` : "Aucun pour l'instant"}
            </p>
          </div>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filtrer les badges">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full font-bold whitespace-nowrap text-sm border transition-colors ${
              filter === f.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary"
            }`}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((badge, i) => {
            const isUnlocked = unlocked.has(badge.id);
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                whileHover={{ scale: 1.04 }}
                title={`${badge.name} — ${badge.description}`}
                className={`rounded-2xl p-4 text-center border kids-shadow-card ${
                  isUnlocked ? "bg-card border-primary/40" : "bg-muted/60 border-border opacity-70"
                }`}
              >
                <span className="text-4xl block mb-2">{isUnlocked ? badge.icon : "🔒"}</span>
                <span className="block text-sm font-bold text-foreground">{badge.name}</span>
                <span className="block text-[11px] text-muted-foreground font-dyslexic mt-1">
                  {badge.description}
                </span>
                <span
                  className={`mt-2 inline-block text-[11px] font-bold rounded-full px-2 py-0.5 ${
                    isUnlocked ? "bg-primary/15 text-primary" : "bg-border text-muted-foreground"
                  }`}
                >
                  {isUnlocked ? "✅ Débloqué" : "🔒 Verrouillé"}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(Object.keys(CATEGORY_LABELS) as BadgeCategory[]).map((cat) => {
          const total = allBadges.filter((b) => b.category === cat).length;
          const count = allBadges.filter((b) => b.category === cat && unlocked.has(b.id)).length;
          return (
            <div key={cat} className="bg-card border border-border rounded-2xl p-3 text-center">
              <p className="text-xs text-muted-foreground">
                {CATEGORY_LABELS[cat].icon} {CATEGORY_LABELS[cat].label}
              </p>
              <p className="font-bold text-foreground tabular-nums">
                {count}/{total}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default BadgeCollection;
