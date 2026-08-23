import { motion } from "framer-motion";
import { getAvatarUrl, AvatarConfig } from "@/lib/avatar";

interface Props {
  seed: string;
  options?: AvatarConfig;
  size?: "xs" | "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: "w-10 h-10",
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-48 h-48",
};

export function AvatarRenderer({ seed, options = {}, size = "md", animated = false, className = "" }: Props) {
  const avatarUrl = getAvatarUrl({ seed, ...options });

  return (
    <motion.div
      initial={animated ? { scale: 0.85, opacity: 0 } : false}
      animate={animated ? { scale: 1, opacity: 1 } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`${sizeClasses[size]} rounded-full overflow-hidden bg-muted border-4 border-card shadow-md ${className}`}
    >
      <img src={avatarUrl} alt={`Avatar de ${seed}`} className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
}

export default AvatarRenderer;
