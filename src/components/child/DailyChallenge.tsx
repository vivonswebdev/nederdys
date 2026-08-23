import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getOrCreateDailyChallenge, defByType } from "@/lib/challenges";

interface DailyChallengeProps {
  childId: string;
}

export const DailyChallenge = ({ childId }: DailyChallengeProps) => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["dailyChallenge", childId],
    queryFn: () => getOrCreateDailyChallenge(user!.id, childId),
    enabled: !!user && !!childId,
  });

  if (isLoading) {
    return <div className="h-28 rounded-3xl bg-muted animate-pulse" />;
  }
  if (!data) return null;

  const def = defByType(data.challenge_type);
  const pct = Math.min(100, (data.current_value / data.target_value) * 100);

  return (
    <section className="bg-card border border-border rounded-3xl p-5 kids-shadow-card">
      <div className="flex items-center gap-4">
        <motion.span
          className="text-4xl"
          animate={data.is_completed ? { rotate: [0, -12, 12, 0] } : {}}
          transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.8 }}
        >
          {def.emoji}
        </motion.span>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">🎯 Défi du jour</p>
          <p className="text-muted-foreground font-dyslexic">{def.fr}</p>
        </div>
        <span
          className={`text-xs font-bold rounded-full px-3 py-1.5 ${
            data.is_completed
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          +{data.xp_reward} XP
        </span>
      </div>
      <div className="mt-3 w-full bg-muted rounded-full h-3 overflow-hidden">
        <motion.div
          className="bg-primary h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1 tabular-nums">
        {data.current_value}/{data.target_value} {def.unit ?? ""}
        {data.is_completed && " · Défi réussi ! 🎉"}
      </p>
    </section>
  );
};
