import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, ArrowUp } from "lucide-react";
import { getLevelTitle } from "./LevelBadge";

interface XpGainPopupProps {
  xpGained: number | null;
  leveledUp: boolean;
  newLevel?: number;
}

export const XpGainPopup = ({ xpGained, leveledUp, newLevel }: XpGainPopupProps) => {
  return (
    <AnimatePresence>
      {xpGained !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center gap-2 my-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold"
          >
            <Zap className="w-5 h-5" />
            +{xpGained} XP
          </motion.div>

          {leveledUp && newLevel && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: [0, 1.2, 1], rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2 rounded-full font-bold text-lg"
            >
              <ArrowUp className="w-5 h-5" />
              Niveau {newLevel} ! {getLevelTitle(newLevel)}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
