import { motion } from "framer-motion";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { SEASON_TIERS, SEASON_MAX, seasonName, type SeasonTier } from "@/lib/season";
import { toast } from "sonner";

interface SeasonProgress {
  season_id: string;
  coins_this_season: number;
  season_ends_at: string;
}

async function fetchSeason(childId: string): Promise<SeasonProgress | null> {
  const { data, error } = await supabase.rpc("get_season_progress", { p_child_id: childId });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return (row as SeasonProgress) ?? null;
}

async function fetchClaims(childId: string, seasonId: string): Promise<number[]> {
  const { data, error } = await supabase
    .from("season_claims")
    .select("threshold")
    .eq("child_id", childId)
    .eq("season_id", seasonId);
  if (error) throw error;
  return (data ?? []).map((r: { threshold: number }) => r.threshold);
}

export function SeasonPassCard({ childId }: { childId: string }) {
  const { lang } = useLanguage();
  const qc = useQueryClient();

  const { data: season, isLoading } = useQuery({
    queryKey: ["seasonProgress", childId],
    queryFn: () => fetchSeason(childId),
    enabled: !!childId,
  });

  const { data: claimed = [] } = useQuery({
    queryKey: ["seasonClaims", childId, season?.season_id],
    queryFn: () => fetchClaims(childId, season!.season_id),
    enabled: !!season?.season_id,
  });

  const claim = useMutation({
    mutationFn: async (tier: SeasonTier) => {
      const { data, error } = await supabase.rpc("claim_season_reward", {
        p_child_id: childId,
        p_threshold: tier.threshold,
        p_item_id: tier.reward.type === "avatar_item" ? tier.reward.itemId : null,
        p_bonus_coins: tier.reward.type === "bonus_coins" ? tier.reward.amount : null,
      });
      if (error) throw error;
      return data as { ok: boolean; reason?: string };
    },
    onSuccess: (res, tier) => {
      if (res?.ok) {
        toast.success(
          tier.reward.type === "bonus_coins"
            ? `🎉 +${tier.reward.amount} Mouche-Coins !`
            : "🎉 Nouvel objet d'avatar débloqué !"
        );
      } else if (res?.reason === "already_claimed") {
        toast.info("Déjà réclamé / Al ontvangen");
      } else {
        toast.error("Palier pas encore débloqué / Nog niet vrijgespeeld");
      }
      qc.invalidateQueries({ queryKey: ["seasonClaims", childId] });
      qc.invalidateQueries({ queryKey: ["seasonProgress", childId] });
      qc.invalidateQueries({ queryKey: ["childCoins", childId] });
      qc.invalidateQueries({ queryKey: ["ownedItems", childId] });
    },
    onError: () => toast.error("Oups, réessaie / Probeer opnieuw"),
  });

  if (isLoading || !season) {
    return <div className="h-40 rounded-3xl bg-muted animate-pulse" />;
  }

  const coins = season.coins_this_season ?? 0;
  const pct = Math.min(100, (coins / SEASON_MAX) * 100);
  const endDate = new Date(season.season_ends_at + "T00:00:00").toLocaleDateString(
    lang === "nl" ? "nl-BE" : "fr-BE",
    { day: "numeric", month: "long" }
  );

  return (
    <section className="bg-card border-4 border-kids-orange rounded-3xl p-5 kids-shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h2 className="text-xl font-bold text-foreground">
          🎫 <BilingualText {...biFromFr("Saison")} /> — {seasonName(season.season_id, lang as "fr" | "nl")}
        </h2>
        <span className="text-sm font-dyslexic text-muted-foreground">
          {lang === "nl" ? "Eindigt op" : "Se termine le"} {endDate}
        </span>
      </div>
      <p className="font-dyslexic text-muted-foreground mb-4 tabular-nums">
        💰 {coins} / {SEASON_MAX} {lang === "nl" ? "Vlieg-munten deze maand" : "Mouche-Coins ce mois-ci"}
      </p>

      <div className="relative w-full bg-muted rounded-full h-4 overflow-hidden mb-3">
        <motion.div
          className="bg-kids-orange h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SEASON_TIERS.map((tier) => {
          const unlocked = coins >= tier.threshold;
          const isClaimed = claimed.includes(tier.threshold);
          return (
            <li
              key={tier.threshold}
              className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${
                unlocked ? "border-kids-orange bg-kids-orange/10" : "border-border bg-muted/40 opacity-70"
              }`}
            >
              <span className="text-2xl" aria-hidden>{tier.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm truncate">
                  {lang === "nl" ? tier.labelNl : tier.labelFr}
                </p>
                <p className="text-xs text-muted-foreground tabular-nums">
                  {tier.threshold} 💰
                  {tier.reward.type === "bonus_coins" ? ` → +${tier.reward.amount} 💰` : " → 🎁"}
                </p>
              </div>
              {isClaimed ? (
                <span className="text-xl" aria-label="Réclamé">✅</span>
              ) : (
                <button
                  type="button"
                  disabled={!unlocked || claim.isPending}
                  onClick={() => claim.mutate(tier)}
                  className="min-h-[44px] px-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {lang === "nl" ? "Ophalen" : "Réclamer"}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
