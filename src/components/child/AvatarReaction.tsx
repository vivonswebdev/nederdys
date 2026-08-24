import { AnimatePresence, motion } from "framer-motion";
import { BilingualText } from "@/components/ui/BilingualText";
import { bi, type Bilingual } from "@/lib/bilingual";

export type ReactionTrigger = "correct" | "levelup" | "streak";

interface Props {
  trigger: ReactionTrigger | null;
  onDone?: () => void;
  /** Affiche aussi le petit libellé bilingue sous l'emoji. */
  withLabel?: boolean;
}

const REACTIONS: Record<ReactionTrigger, { emoji: string; label: Bilingual }> = {
  correct: { emoji: "⭐", label: bi("Goed zo!", "Bravo !") },
  levelup: { emoji: "🎉", label: bi("Volgend niveau!", "Niveau supérieur !") },
  streak: { emoji: "🔥", label: bi("Op rij!", "En série !") },
};

/**
 * Badge de réaction animé à superposer à un avatar (état client uniquement).
 * Le parent doit être en `relative`.
 */
export function AvatarReaction({ trigger, onDone, withLabel = false }: Props) {
  const reaction = trigger ? REACTIONS[trigger] : null;

  return (
    <AnimatePresence>
      {reaction && (
        <motion.div
          key={trigger}
          initial={{ scale: 0, y: 6, opacity: 0 }}
          animate={{ scale: [0, 1.25, 1], y: [-2, -14, -10], opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0, y: -22 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => window.setTimeout(() => onDone?.(), 900)}
          className="absolute -top-2 -right-2 z-10 flex flex-col items-center select-none pointer-events-none"
          aria-hidden
        >
          <span className="text-3xl drop-shadow">{reaction.emoji}</span>
          {withLabel && (
            <span className="text-xs font-bold bg-card border border-border rounded-full px-2 py-0.5 shadow-sm whitespace-nowrap">
              <BilingualText nl={reaction.label.nl} fr={reaction.label.fr} />
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AvatarReaction;
