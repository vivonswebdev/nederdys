import { supabase } from "@/integrations/supabase/client";

export type AvatarCategory = "background" | "hair" | "clothing" | "accessory";
export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface AvatarItem {
  id: string;
  name: string;
  name_nl: string | null;
  category: AvatarCategory;
  dicebear_option: string;
  dicebear_value: string;
  price: number;
  rarity: Rarity;
  is_premium: boolean;
}

export interface AvatarConfig {
  backgroundColor?: string | null;
  hairColor?: string | null;
  skinColor?: string | null;
  accessories?: string | null;
}

export interface DiceBearOptions extends AvatarConfig {
  seed: string;
}

/** Construit l'URL DiceBear (style "adventurer") à la volée. */
export function getAvatarUrl({ seed, ...options }: DiceBearOptions): string {
  const params = new URLSearchParams();
  params.append("seed", seed || "nederdys");
  Object.entries(options).forEach(([key, value]) => {
    if (!value) return;
    params.append(key, Array.isArray(value) ? value.join(",") : String(value));
    if (key === "accessories") params.append("accessoriesProbability", "100");
  });
  return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
}

/** Mappe une option DiceBear vers la colonne avatar_config correspondante. */
export const OPTION_TO_COLUMN: Record<string, string> = {
  backgroundColor: "background_color",
  hairColor: "hair_color",
  skinColor: "clothing_color",
  accessories: "accessories",
};

export const CATEGORY_TO_OPTION: Record<AvatarCategory, keyof AvatarConfig> = {
  background: "backgroundColor",
  hair: "hairColor",
  clothing: "skinColor",
  accessory: "accessories",
};

export const RARITY_STYLES: Record<Rarity, string> = {
  common: "bg-muted text-muted-foreground",
  rare: "bg-kids-blue/20 text-kids-blue",
  epic: "bg-kids-orange/20 text-kids-orange",
  legendary: "bg-yellow-400/25 text-yellow-700",
};

export const CATEGORY_LABELS: Record<AvatarCategory, string> = {
  background: "Fonds",
  hair: "Cheveux",
  clothing: "Peau",
  accessory: "Accessoires",
};

export async function getAvatarItems(): Promise<AvatarItem[]> {
  const { data, error } = await supabase
    .from("avatar_items")
    .select("*")
    .order("price", { ascending: true });
  if (error) console.error("avatar_items", error);
  return (data ?? []) as AvatarItem[];
}

export async function getOwnedItems(childId: string): Promise<AvatarItem[]> {
  const { data, error } = await supabase
    .from("avatar_owned_items")
    .select("item_id, avatar_items(*)")
    .eq("child_id", childId);
  if (error) console.error("avatar_owned_items", error);
  return ((data ?? []).map((r: { avatar_items: unknown }) => r.avatar_items) as AvatarItem[]).filter(Boolean);
}

export async function getAvatarConfig(childId: string): Promise<AvatarConfig> {
  const { data } = await supabase
    .from("avatar_config")
    .select("*")
    .eq("child_id", childId)
    .maybeSingle();
  return {
    backgroundColor: data?.background_color ?? null,
    hairColor: data?.hair_color ?? null,
    skinColor: data?.clothing_color ?? null,
    accessories: data?.accessories ?? null,
  };
}

export async function saveAvatarConfig(childId: string, config: AvatarConfig) {
  const { error } = await supabase.from("avatar_config").upsert(
    {
      child_id: childId,
      background_color: config.backgroundColor ?? null,
      hair_color: config.hairColor ?? null,
      clothing_color: config.skinColor ?? null,
      accessories: config.accessories ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "child_id" }
  );
  if (error) throw error;
}

export interface PurchaseResult {
  ok: boolean;
  reason?: string;
  balance?: number;
}

/** Achat vérifié côté serveur (solde + propriété de l'enfant). */
export async function purchaseAvatarItem(childId: string, itemId: string): Promise<PurchaseResult> {
  const { data, error } = await supabase.rpc("purchase_avatar_item", {
    p_child_id: childId,
    p_item_id: itemId,
  });
  if (error) {
    console.error("purchase_avatar_item", error);
    return { ok: false, reason: "server_error" };
  }
  return (data ?? { ok: false }) as unknown as PurchaseResult;
}
