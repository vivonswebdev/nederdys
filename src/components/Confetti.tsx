import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#4CAF50", "#FFC107", "#42A5F5", "#EF5350", "#AB47BC"];

/** Pluie de confettis légère affichée lors d'une bonne réponse. */
export const Confetti = ({ count = 24 }: { count?: number }) => {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 1.4 + Math.random() * 0.8,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -40, opacity: 1, rotate: 0 }}
          animate={{ y: "105vh", opacity: 0, rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{ left: `${p.left}%`, backgroundColor: p.color }}
          className="absolute top-0 w-2.5 h-3.5 rounded-sm"
        />
      ))}
    </div>
  );
};

export default Confetti;
