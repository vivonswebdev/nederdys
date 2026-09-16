import { supabase } from "@/integrations/supabase/client";
import type { ShopCategory, ShopRarity } from "@/data/shop/pricing";

export interface ShopDbItem {
  id: string;
  item_key: string | null;
  name: string;
  name_nl: string | null;
  description_fr: string | null;
  description_nl: string | null;
  preview_emoji: string | null;
  tags: string[] | null;
  category: string;
  dicebear_option: string;
  dicebear_value: string;
  price: number;
  rarity: ShopRarity;
  is_premium: boolean;
  is_active: boolean;
  gender: string | null;
}

export interface Collection {
  id: string;
  collection_key: string;
  name_fr: string;
  name_nl: string;
  description_fr: string | null;
  description_nl: string | null;
  required_items: string[];
  reward_xp: number;
  reward_coins: number;
  reward_badge: string | null;
}

export const COSMETIC_CATEGORIES: ShopCategory[] = ["avatar", "clothing", "accessory", "emote", "effect"];

/** Un objet "cosmétique" n'affecte pas DiceBear : il s'affiche via son emoji. */
export function isCosmetic(item: { dicebear_option: string }) {
  return item.dicebear_option === "cosmetic";
}

export async function getShopItems(): Promise<ShopDbItem[]> {
  const { data, error } = await supabase
    .from("avatar_items")
    .select("*")
    .order("category", { ascending: true })
    .order("price", { ascending: true });
  if (error) console.error("avatar_items", error);
  return (data ?? []) as unknown as ShopDbItem[];
}

export async function getCollections(): Promise<Collection[]> {
  const { data, error } = await supabase.from("collections").select("*").order("reward_coins");
  if (error) console.error("collections", error);
  return (data ?? []) as unknown as Collection[];
}

export async function getCollectionClaims(childId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("collection_claims")
    .select("collection_key")
    .eq("child_id", childId);
  if (error) console.error("collection_claims", error);
  return (data ?? []).map((r) => r.collection_key);
}

export interface ClaimResult {
  ok: boolean;
  reason?: string;
  xp?: number;
  coins?: number;
  badge?: string | null;
}

export async function claimCollectionReward(childId: string, collectionKey: string): Promise<ClaimResult> {
  const { data, error } = await supabase.rpc("claim_collection_reward", {
    p_child_id: childId,
    p_collection_key: collectionKey,
  });
  if (error) {
    console.error("claim_collection_reward", error);
    return { ok: false, reason: "server_error" };
  }
  return (data ?? { ok: false }) as unknown as ClaimResult;
}

/* --------------------------- Admin (CRUD) --------------------------- */

export type ShopItemDraft = Partial<ShopDbItem>;

export async function upsertShopItem(item: ShopItemDraft) {
  const payload = {
    item_key: item.item_key || null,
    name: item.name ?? "",
    name_nl: item.name_nl ?? null,
    description_fr: item.description_fr ?? null,
    description_nl: item.description_nl ?? null,
    preview_emoji: item.preview_emoji ?? null,
    tags: item.tags ?? [],
    category: item.category ?? "accessory",
    dicebear_option: item.dicebear_option || "cosmetic",
    dicebear_value: item.dicebear_value || item.item_key || crypto.randomUUID(),
    price: item.price ?? 100,
    rarity: item.rarity ?? "common",
    is_premium: item.is_premium ?? false,
    is_active: item.is_active ?? true,
    gender: item.gender ?? "other",
  };
  if (item.id) {
    const { error } = await supabase.from("avatar_items").update(payload).eq("id", item.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("avatar_items").insert(payload);
    if (error) throw error;
  }
}

export async function deleteShopItem(id: string) {
  const { error } = await supabase.from("avatar_items").delete().eq("id", id);
  if (error) throw error;
}
