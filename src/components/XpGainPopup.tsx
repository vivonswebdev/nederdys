import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, ArrowUp } from "lucide-react";
import { LEVEL_TIERS } from "@/lib/gamification";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChild } from "@/contexts/ChildContext";
import { ShareAchievement } from "@/components/child/ShareAchievement";
import { useEffect } from "react";
import { sounds } from "@/lib/sounds";

interface XpGainPopupProps {
  xpGained: number | null;
  coinsGained?: number | null;
  leveledUp: boolean;
  newLevel?: number;
}

export const XpGainPopup = ({ xpGained, coinsGained, leveledUp, newLevel }: XpGainPopupProps) => {
  const { lang, t } = useLanguage();
  const { activeChild } = useChild();
  const tier = newLevel ? LEVEL_TIERS.find((l) => l.level === newLevel) : undefined;
  const tierTitle = tier ? (lang === "nl" ? tier.titleNl : tier.titleFr) : "";
  useEffect(() => {
    if (xpGained !== null) sounds.xp();
    if (leveledUp) setTimeout(() => sounds.levelUp(), 300);
  }, [xpGained, leveledUp]);

  return (
    <AnimatePresence>
      {xpGained !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center gap-2 my-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold"
            >
              <Zap className="w-5 h-5" />
              +{xpGained} XP
            </motion.div>
            {coinsGained != null && coinsGained > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full font-bold"
              >
                🪙 +{coinsGained}
              </motion.div>
            )}
          </div>

          {leveledUp && newLevel && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: [0, 1.2, 1], rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2 rounded-full font-bold text-lg"
            >
              <ArrowUp className="w-5 h-5" />
              {t("home.level")} {newLevel} ! {tier?.emoji} {tierTitle}
            </motion.div>
          )}

          {leveledUp && newLevel && (
            <ShareAchievement
              childName={activeChild?.first_name ?? ""}
              achievement={{
                icon: tier?.emoji ?? "🎉",
                labelFr: `Niveau ${newLevel} — ${tier?.titleFr ?? ""}`,
                labelNl: `Niveau ${newLevel} — ${tier?.titleNl ?? ""}`,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
