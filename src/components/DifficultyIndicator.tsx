import { motion } from "framer-motion";
import { Difficulty } from "@/lib/database";
import { useLanguage } from "@/contexts/LanguageContext";

interface DifficultyIndicatorProps {
  difficulty: Difficulty;
}

export const DifficultyIndicator = ({ difficulty }: DifficultyIndicatorProps) => {
  const { t } = useLanguage();
  const colors = {
    easy: "bg-primary/20 text-primary",
    medium: "bg-kids-orange/20 text-kids-orange",
    hard: "bg-destructive/20 text-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${colors[difficulty]}`}
    >
      {t(`difficulty.${difficulty}` as any)}
    </motion.div>
  );
};
