import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import { XP_PER_LEVEL } from "@/lib/database";

interface LevelBadgeProps {
  level: number;
  xp: number;
  compact?: boolean;
}

const LEVEL_TITLES = [
  "Débutant 🐣",
  "Explorateur 🐸",
  "Aventurier 🦊",
  "Champion 🦁",
  "Maître 🐯",
  "Légende 🦄",
  "Super Star ⭐",
];

export const getLevelTitle = (level: number) =>
  LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];

export const LevelBadge = ({ level, xp, compact }: LevelBadgeProps) => {
  const xpInLevel = xp % XP_PER_LEVEL;
  const progress = (xpInLevel / XP_PER_LEVEL) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5">
        <span className="text-sm font-bold text-primary">Niv. {level}</span>
        <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{xpInLevel}/{XP_PER_LEVEL}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4 border border-border kids-shadow-card"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-primary/10 rounded-full p-2">
          <Star className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-bold text-foreground">Niveau {level}</p>
          <p className="text-sm text-muted-foreground">{getLevelTitle(level)}</p>
        </div>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <motion.div
          className="bg-primary h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Zap className="w-3 h-3" /> {xpInLevel} XP
        </span>
        <span className="text-xs text-muted-foreground">{XP_PER_LEVEL} pour niveau {level + 1}</span>
      </div>
    </motion.div>
  );
};
