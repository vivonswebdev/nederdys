import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useChild } from "@/contexts/ChildContext";
import { getChildCoins } from "@/lib/database";
import {
  AvatarCategory,
  AvatarItem,
  CATEGORY_LABELS,
  CATEGORY_TO_OPTION,
  RARITY_STYLES,
  getAvatarItems,
  getOwnedItems,
  purchaseAvatarItem,
} from "@/lib/avatar";
import { AvatarRenderer } from "@/components/child/AvatarRenderer";
import { sounds } from "@/lib/sounds";

const FILTERS: ("all" | AvatarCategory)[] = ["all", "hairstyle", "hair", "accessory", "background", "clothing"];

const AvatarShop = () => {
  const { id: childId } = useParams<{ id: string }>();
  const { children } = useChild();
  const child = children.find((c) => c.id === childId);
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | AvatarCategory>("all");
  const [busy, setBusy] = useState<string | null>(null);

  const { data: items = [] } = useQuery({ queryKey: ["avatarItems"], queryFn: getAvatarItems });
  const { data: owned = [] } = useQuery({
    queryKey: ["avatarOwned", childId],
    queryFn: () => getOwnedItems(childId!),
    enabled: !!childId,
  });
  const { data: coinsRow } = useQuery({
    queryKey: ["childCoins", childId],
    queryFn: () => getChildCoins(childId!),
    enabled: !!childId,
  });

  const coins = coinsRow?.coins ?? 0;
  const ownedIds = new Set(owned.map((o) => o.id));
  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  async function handleBuy(item: AvatarItem) {
    if (!childId) return;
    setBusy(item.id);
    const res = await purchaseAvatarItem(childId, item.id);
    setBusy(null);
    if (res.ok) {
      sounds.victory();
      toast.success(`🎉 ${item.name} acheté !`);
      queryClient.invalidateQueries({ queryKey: ["avatarOwned", childId] });
      queryClient.invalidateQueries({ queryKey: ["childCoins", childId] });
    } else if (res.reason === "insufficient_coins") {
      toast.error("Pas assez de pièces ! Joue encore pour en gagner 💪");
    } else {
      toast.error("Achat impossible pour le moment.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="container max-w-4xl px-4 py-3 flex items-center gap-4">
          <Link
            to={childId ? `/child/${childId}` : "/profils"}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <h1 className="text-lg font-bold text-foreground flex-1">🛍️ Boutique d'avatar</h1>
          <div className="flex items-center gap-2 bg-kids-orange/15 text-kids-orange rounded-full px-4 py-1.5 font-bold tabular-nums">
            💰 {coins}
          </div>
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-8 space-y-6">
        {child && (
          <div className="flex justify-center">
            <AvatarRenderer seed={child.first_name} size="md" animated />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f === "all" ? "Tous" : CATEGORY_LABELS[f]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => {
            const isOwned = ownedIds.has(item.id);
            const preview = { [CATEGORY_TO_OPTION[item.category]]: item.dicebear_value };
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm"
              >
                <AvatarRenderer seed={child?.first_name ?? "nederdys"} options={preview} size="sm" />
                <p className="font-bold text-sm text-center text-foreground">{item.name}</p>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${RARITY_STYLES[item.rarity]}`}>
                  {item.rarity}
                </span>
                {isOwned ? (
                  <div className="w-full mt-1 py-2 rounded-xl bg-kids-green-light/30 text-kids-green-dark text-sm font-bold flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> Possédé
                  </div>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={item.is_premium || busy === item.id || coins < item.price}
                    className="w-full mt-1 py-2 rounded-xl bg-kids-orange text-white text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {item.is_premium ? (
                      <span className="inline-flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Bientôt
                      </span>
                    ) : (
                      `💰 ${item.price}`
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to={childId ? `/child/${childId}/avatar` : "#"}
            className="inline-block bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl"
          >
            🎨 Personnaliser mon avatar
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AvatarShop;
