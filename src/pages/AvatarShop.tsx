import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useChild } from "@/contexts/ChildContext";
import { getChildCoins } from "@/lib/database";
import {
  AvatarCategory,
  CATEGORY_LABELS,
  CATEGORY_TO_OPTION,
  RARITY_STYLES,
  getOwnedItems,
  purchaseAvatarItem,
} from "@/lib/avatar";
import { ShopDbItem, getShopItems, isCosmetic } from "@/lib/shop";
import { SHOP_CATEGORY_LABELS, ShopCategory } from "@/data/shop/pricing";
import { AvatarRenderer } from "@/components/child/AvatarRenderer";
import { CollectionTracker } from "@/components/shop/CollectionTracker";
import { sounds } from "@/lib/sounds";

const DICEBEAR_FILTERS: AvatarCategory[] = ["hairstyle", "hair", "accessory", "background", "clothing"];
const COSMETIC_FILTERS: ShopCategory[] = ["avatar", "clothing", "accessory", "emote", "effect"];

const AvatarShop = () => {
  const { id: childId } = useParams<{ id: string }>();
  const { children } = useChild();
  const child = children.find((c) => c.id === childId);
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<string>("all");
  const [rarity, setRarity] = useState<"all" | "common" | "rare" | "epic" | "legendary">("all");
  const [busy, setBusy] = useState<string | null>(null);

  const { data: items = [] } = useQuery({ queryKey: ["shopItems"], queryFn: getShopItems });
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
  const ownedKeys = useMemo(
    () => (owned as unknown as ShopDbItem[]).map((o) => o.item_key).filter(Boolean) as string[],
    [owned]
  );
  const itemNames = useMemo(() => {
    const map: Record<string, string> = {};
    items.forEach((i) => {
      if (i.item_key) map[i.item_key] = `${i.preview_emoji ?? "•"} ${i.name}`;
    });
    return map;
  }, [items]);

  const filtered = items
    .filter((i) => i.is_active !== false)
    .filter((i) => filter === "all" || i.category === filter)
    .filter((i) => rarity === "all" || i.rarity === rarity);

  async function handleBuy(item: ShopDbItem) {
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

  const filterButtons: { id: string; label: string }[] = [
    { id: "all", label: "Tous" },
    ...COSMETIC_FILTERS.map((c) => ({
      id: c,
      label: `${SHOP_CATEGORY_LABELS[c].icon} ${SHOP_CATEGORY_LABELS[c].fr}`,
    })),
    ...DICEBEAR_FILTERS.filter((c) => c !== "clothing" && c !== "accessory").map((c) => ({
      id: c,
      label: CATEGORY_LABELS[c],
    })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="container max-w-5xl px-4 py-3 flex items-center gap-4">
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

      <main className="container max-w-5xl px-4 py-8 space-y-8">
        {child && (
          <div className="flex justify-center">
            <AvatarRenderer seed={child.first_name} gender={child.gender} size="md" animated />
          </div>
        )}

        {childId && <CollectionTracker childId={childId} ownedKeys={ownedKeys} itemNames={itemNames} />}

        <div className="flex flex-wrap gap-2">
          {filterButtons.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all", "common", "rare", "epic", "legendary"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRarity(r)}
              className={`px-3 py-1.5 rounded-full font-bold text-xs transition-colors ${
                rarity === r ? "bg-kids-orange text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              {r === "all" ? "Toutes raretés" : r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => {
            const isOwned = ownedIds.has(item.id);
            const cosmetic = isCosmetic(item);
            const preview = cosmetic
              ? null
              : { [CATEGORY_TO_OPTION[item.category as AvatarCategory]]: item.dicebear_value };
            const canAfford = coins >= item.price;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 12) * 0.03 }}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm"
              >
                {cosmetic ? (
                  <span className="text-5xl leading-none py-2" aria-hidden>
                    {item.preview_emoji ?? "🎁"}
                  </span>
                ) : (
                  <AvatarRenderer
                    seed={child?.first_name ?? "nederdys"}
                    gender={child?.gender}
                    options={preview!}
                    size="sm"
                  />
                )}
                <p className="font-bold text-sm text-center text-foreground">{item.name}</p>
                {item.name_nl && <p className="text-xs text-muted-foreground text-center">🇳🇱 {item.name_nl}</p>}
                {item.description_fr && (
                  <p className="text-[11px] text-muted-foreground text-center">{item.description_fr}</p>
                )}
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
                    disabled={item.is_premium || busy === item.id || !canAfford}
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
