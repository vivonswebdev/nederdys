import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { defByType, getOrCreateDailyChallenge, DailyChallengeRow } from "@/lib/challenges";
import { formatLocalDay, localDateOffset } from "@/lib/date";

interface Props {
  childId: string;
}

const fetchHistory = async (childId: string): Promise<DailyChallengeRow[]> => {
  const { data } = await supabase
    .from("daily_challenges")
    .select("*")
    .eq("child_id", childId)
    .gte("date", localDateOffset(-7))
    .order("date", { ascending: false });
  return (data ?? []) as DailyChallengeRow[];
};

export const DailyChallengeSummary = ({ childId }: Props) => {
  const { user } = useAuth();

  const { data: challenge, isLoading } = useQuery({
    queryKey: ["dailyChallenge", childId],
    queryFn: () => getOrCreateDailyChallenge(user!.id, childId),
    enabled: !!user && !!childId,
  });

  const { data: history = [] } = useQuery({
    queryKey: ["dailyChallengeHistory", childId],
    queryFn: () => fetchHistory(childId),
    enabled: !!childId,
  });

  if (isLoading) {
    return <div className="h-48 rounded-3xl bg-muted animate-pulse" />;
  }
  if (!challenge) return null;

  const def = defByType(challenge.challenge_type);
  const pct = Math.min(100, (challenge.current_value / challenge.target_value) * 100);

  return (
    <div className="space-y-6">
      <section className="bg-card border border-border rounded-3xl p-6 kids-shadow-card">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-foreground">🎯 Défi du jour</h1>
          {challenge.is_completed && (
            <span className="text-xs font-bold rounded-full px-3 py-1.5 bg-primary/15 text-primary">
              ✅ Complété
            </span>
          )}
        </div>

        <p className="text-muted-foreground font-dyslexic mt-2">
          {def.emoji} {def.fr}
        </p>

        <div className="mt-4 w-full bg-muted rounded-full h-4 overflow-hidden">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2 tabular-nums">
          {challenge.current_value} / {challenge.target_value} {def.unit ?? ""}
        </p>

        <div
          className={`mt-4 rounded-2xl px-4 py-3 font-bold ${
            challenge.is_completed
              ? "bg-primary/15 text-primary"
              : "bg-muted/60 text-muted-foreground"
          }`}
        >
          {challenge.is_completed
            ? `🎉 +${challenge.xp_reward} XP gagnés !`
            : `💰 Récompense : +${challenge.xp_reward} XP`}
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          <BilingualText {...biFromFr("Un nouveau défi arrive chaque jour à minuit.")} />
        </p>
      </section>

      <section className="bg-card border border-border rounded-3xl p-6 kids-shadow-card">
        <h2 className="text-lg font-bold text-foreground mb-3">📜 Tes derniers défis</h2>
        {history.length === 0 ? (
          <p className="text-muted-foreground font-dyslexic"><BilingualText {...biFromFr("Aucun défi pour l'instant.")} /></p>
        ) : (
          <ul className="space-y-2">
            {history.slice(0, 7).map((day) => {
              const d = defByType(day.challenge_type);
              return (
                <li
                  key={day.id}
                  className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-2.5"
                >
                  <span className="flex items-center gap-2 text-sm text-foreground">
                    <span>{day.is_completed ? "✅" : "⏳"}</span>
                    <span className="font-dyslexic">
                      {d.fr} — {day.current_value}/{day.target_value}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">{formatLocalDay(day.date)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DailyChallengeSummary;
