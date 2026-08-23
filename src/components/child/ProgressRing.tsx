import { motion } from "framer-motion";

interface ProgressRingProps {
  currentXp: number;
  maxXp: number;
  level: number;
  emoji?: string;
  size?: number;
}

export const ProgressRing = ({ currentXp, maxXp, level, emoji, size = 96 }: ProgressRingProps) => {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = maxXp > 0 ? Math.min(1, currentXp / maxXp) : 1;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          className="stroke-muted"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-primary"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - c * pct }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl leading-none">{emoji ?? "⭐"}</span>
        <span className="text-xs font-bold text-foreground tabular-nums">Niv. {level}</span>
      </div>
    </div>
  );
};
