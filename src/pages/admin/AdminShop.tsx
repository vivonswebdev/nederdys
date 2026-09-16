import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ShopDbItem, ShopItemDraft, deleteShopItem, getShopItems, upsertShopItem } from "@/lib/shop";
import { RARITY_STYLES } from "@/lib/avatar";

const CATEGORIES = ["avatar", "clothing", "accessory", "emote", "effect", "background", "hair", "hairstyle"];
const RARITIES = ["common", "rare", "epic", "legendary"] as const;

const AdminShop = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<ShopItemDraft | null>(null);
  const [search, setSearch] = useState("");

  const { data: items = [], isLoading } = useQuery({ queryKey: ["shopItems"], queryFn: getShopItems });

  const filtered = items.filter((i) =>
    `${i.name} ${i.name_nl ?? ""} ${i.item_key ?? ""} ${i.category}`.toLowerCase().includes(search.toLowerCase())
  );

  async function save() {
    if (!editing) return;
    try {
      await upsertShopItem(editing);
      toast.success("Objet enregistré");
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
    } catch (e) {
      console.error(e);
      toast.error("Enregistrement impossible");
    }
  }

  async function remove(item: ShopDbItem) {
    if (!confirm(`Supprimer « ${item.name} » ?`)) return;
    try {
      await deleteShopItem(item.id);
      toast.success("Objet supprimé");
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
    } catch (e) {
      console.error(e);
      toast.error("Suppression impossible (objet déjà acheté ?)");
    }
  }

  const field = "w-full border-2 border-border bg-background rounded-xl px-4 py-2";

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold flex-1">🛍️ Gestion de la boutique</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher…"
          className="border-2 border-border bg-background rounded-xl px-4 py-2"
        />
        <button
          onClick={() => setEditing({ category: "accessory", rarity: "common", price: 100, is_active: true })}
          className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-bold"
        >
          ➕ Nouvel objet
        </button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement…</p>
      ) : (
        <div className="overflow-x-auto bg-card border border-border rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="p-3">Aperçu</th>
                <th className="p-3">Nom</th>
                <th className="p-3">Catégorie</th>
                <th className="p-3">Rareté</th>
                <th className="p-3">Prix</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  <td className="p-3 text-2xl">{item.preview_emoji ?? "🎨"}</td>
                  <td className="p-3">
                    <div className="font-bold">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.name_nl}</div>
                  </td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${RARITY_STYLES[item.rarity]}`}>
                      {item.rarity}
                    </span>
                  </td>
                  <td className="p-3 font-bold tabular-nums">💰 {item.price}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => setEditing(item)}
                      className="bg-muted px-3 py-1 rounded-lg mr-2"
                      aria-label={`Éditer ${item.name}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => remove(item)}
                      className="bg-destructive/15 text-destructive px-3 py-1 rounded-lg"
                      aria-label={`Supprimer ${item.name}`}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold">{editing.id ? "✏️ Éditer" : "➕ Nouvel"} objet</h2>

            <label className="block text-sm font-bold">
              Nom (FR)
              <input className={field} value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </label>
            <label className="block text-sm font-bold">
              Nom (NL)
              <input className={field} value={editing.name_nl ?? ""} onChange={(e) => setEditing({ ...editing, name_nl: e.target.value })} />
            </label>
            <label className="block text-sm font-bold">
              Description (FR)
              <input
                className={field}
                value={editing.description_fr ?? ""}
                onChange={(e) => setEditing({ ...editing, description_fr: e.target.value })}
              />
            </label>
            <label className="block text-sm font-bold">
              Description (NL)
              <input
                className={field}
                value={editing.description_nl ?? ""}
                onChange={(e) => setEditing({ ...editing, description_nl: e.target.value })}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-bold">
                Catégorie
                <select
                  className={field}
                  value={editing.category ?? "accessory"}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-bold">
                Rareté
                <select
                  className={field}
                  value={editing.rarity ?? "common"}
                  onChange={(e) => setEditing({ ...editing, rarity: e.target.value as ShopDbItem["rarity"] })}
                >
                  {RARITIES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-bold">
                Prix (💰)
                <input
                  type="number"
                  className={field}
                  value={editing.price ?? 0}
                  onChange={(e) => setEditing({ ...editing, price: parseInt(e.target.value) || 0 })}
                />
              </label>
              <label className="block text-sm font-bold">
                Aperçu (emoji)
                <input
                  className={field}
                  placeholder="🎨"
                  value={editing.preview_emoji ?? ""}
                  onChange={(e) => setEditing({ ...editing, preview_emoji: e.target.value })}
                />
              </label>
            </div>

            <label className="block text-sm font-bold">
              Identifiant (item_key, pour les collections)
              <input
                className={field}
                value={editing.item_key ?? ""}
                onChange={(e) => setEditing({ ...editing, item_key: e.target.value })}
              />
            </label>
            <label className="block text-sm font-bold">
              Étiquettes (séparées par des virgules)
              <input
                className={field}
                value={(editing.tags ?? []).join(",")}
                onChange={(e) =>
                  setEditing({ ...editing, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
                }
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={editing.is_active ?? true}
                onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
              />
              En vente
            </label>

            <div className="flex gap-3 pt-2">
              <button onClick={save} className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold">
                💾 Sauvegarder
              </button>
              <button onClick={() => setEditing(null)} className="flex-1 bg-muted px-6 py-3 rounded-xl font-bold">
                ❌ Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminShop;
