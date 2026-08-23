import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StreakCounterProps {
  streakDays: number;
}

export const StreakCounter = ({ streakDays }: StreakCounterProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="flex flex-col items-center gap-0.5 bg-secondary/40 rounded-2xl px-4 py-3 cursor-default">
        <motion.span
          className="text-2xl"
          animate={streakDays > 0 ? { scale: [1, 1.15, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          🔥
        </motion.span>
        <span className="text-lg font-bold text-foreground tabular-nums">J+{streakDays}</span>
      </div>
    </TooltipTrigger>
    <TooltipContent>
      {streakDays > 0
        ? `Tu joues depuis ${streakDays} jour${streakDays > 1 ? "s" : ""} d'affilée !`
        : "Joue aujourd'hui pour démarrer ta série !"}
    </TooltipContent>
  </Tooltip>
);
