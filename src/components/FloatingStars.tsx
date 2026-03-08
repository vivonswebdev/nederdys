import { motion } from "framer-motion";

const stars = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 16 + 8,
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 2,
}));

export const FloatingStars = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {stars.map((star) => (
      <motion.div
        key={star.id}
        className="absolute text-secondary opacity-60"
        style={{ left: `${star.x}%`, top: `${star.y}%`, fontSize: star.size }}
        animate={{ y: [0, -20, 0], rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
      >
        ⭐
      </motion.div>
    ))}
  </div>
);
