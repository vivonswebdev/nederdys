import { motion } from "framer-motion";
import { Difficulty } from "@/lib/database";

interface DifficultyIndicatorProps {
  difficulty: Difficulty;
}

const DIFF_CONFIG = {
  easy: { label: "Facile", emoji: "🟢", color: "bg-primary/20 text-primary" },
  medium: { label: "Moyen", emoji: "🟡", color: "bg-kids-orange/20 text-kids-orange" },
  hard: { label: "Difficile", emoji: "🔴", color: "bg-destructive/20 text-destructive" },
};

export const DifficultyIndicator = ({ difficulty }: DifficultyIndicatorProps) => {
  const config = DIFF_CONFIG[difficulty];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${config.color}`}
    >
      <span>{config.emoji}</span>
      {config.label}
    </motion.div>
  );
};
