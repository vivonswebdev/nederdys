import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { Collection, claimCollectionReward, getCollectionClaims, getCollections } from "@/lib/shop";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  /** item_key des objets possédés par l'enfant */
  ownedKeys: string[];
  /** nom (fr/nl) des objets, pour afficher les manquants */
  itemNames: Record<string, string>;
}

export function CollectionTracker({ childId, ownedKeys, itemNames }: Props) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const { data: collections = [] } = useQuery({ queryKey: ["collections"], queryFn: getCollections });
  const { data: claimed = [] } = useQuery({
    queryKey: ["collectionClaims", childId],
    queryFn: () => getCollectionClaims(childId),
    enabled: !!childId,
  });

  function progress(c: Collection) {
    const owned = c.required_items.filter((k) => ownedKeys.includes(k));
    return {
      owned: owned.length,
      total: c.required_items.length,
      percent: Math.round((owned.length / Math.max(1, c.required_items.length)) * 100),
      missing: c.required_items.filter((k) => !ownedKeys.includes(k)),
    };
  }

  async function handleClaim(c: Collection) {
    setBusy(c.collection_key);
    const res = await claimCollectionReward(childId, c.collection_key);
    setBusy(null);
    if (res.ok) {
      sounds.victory();
      toast.success(`${c.reward_badge ?? "🏆"} Collection terminée ! +${res.xp} XP et +${res.coins} 💰`);
      queryClient.invalidateQueries({ queryKey: ["collectionClaims", childId] });
      queryClient.invalidateQueries({ queryKey: ["childCoins", childId] });
    } else if (res.reason === "incomplete") {
      toast.error("Il te manque encore des objets !");
    } else if (res.reason === "already_claimed") {
      toast("Récompense déjà reçue 😉");
    } else {
      toast.error("Impossible de réclamer pour le moment.");
    }
  }

  if (!collections.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">📚 Collections / Verzamelingen</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {collections.map((c) => {
          const p = progress(c);
          const isComplete = p.owned === p.total;
          const isClaimed = claimed.includes(c.collection_key);
          return (
            <div key={c.id} className="bg-card border border-border rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-foreground">
                  {c.reward_badge} {c.name_fr}
                </h3>
                {isClaimed && <span className="text-xl">🏆</span>}
              </div>
              <p className="text-sm text-muted-foreground">
                {c.description_nl} · {c.description_fr}
              </p>

              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${p.percent}%` }}
                  role="progressbar"
                  aria-valuenow={p.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-bold tabular-nums">
                  {p.owned}/{p.total} objets
                </span>
                <span className="text-muted-foreground">
                  +{c.reward_xp} XP · +{c.reward_coins} 💰
                </span>
              </div>

              {isComplete && !isClaimed ? (
                <button
                  onClick={() => handleClaim(c)}
                  disabled={busy === c.collection_key}
                  className="w-full py-2 rounded-xl bg-kids-orange text-white font-bold disabled:opacity-50"
                >
                  🎁 Réclamer ma récompense
                </button>
              ) : !isComplete ? (
                <div>
                  <button
                    onClick={() => setOpen(open === c.id ? null : c.id)}
                    className="text-sm font-bold text-primary underline"
                  >
                    Voir les objets manquants
                  </button>
                  {open === c.id && (
                    <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5">
                      {p.missing.map((k) => (
                        <li key={k}>{itemNames[k] ?? k}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
