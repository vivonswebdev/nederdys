import { supabase } from "@/integrations/supabase/client";

export type AvatarCategory = "background" | "hair" | "hairstyle" | "clothing" | "accessory";
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
  gender?: "girl" | "boy" | "other" | null;
}

export interface AvatarConfig {
  backgroundColor?: string | null;
  hairColor?: string | null;
  hair?: string | null;
  skinColor?: string | null;
  accessories?: string | null;
  mouth?: string | null;
  eyebrows?: string | null;
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
  hair: "hair_style",
  skinColor: "clothing_color",
  accessories: "accessories",
};

export const CATEGORY_TO_OPTION: Record<AvatarCategory, keyof AvatarConfig> = {
  background: "backgroundColor",
  hair: "hairColor",
  hairstyle: "hair",
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
  hair: "Couleur cheveux",
  hairstyle: "Coiffures",
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
    hair: data?.hair_style ?? null,
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
      hair_style: config.hair ?? null,
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

/* ------------------------------------------------------------------ */
/* Genre de l'enfant : avatar adapté automatiquement                   */
/* ------------------------------------------------------------------ */

export type Gender = "girl" | "boy" | "other";

export const GENDER_LABELS: Record<Gender, string> = {
  girl: "👧 Fille",
  boy: "👦 Garçon",
  other: "🌈 Autre",
};

const SEED_PREFIXES: Record<Gender, string[]> = {
  girl: ["princess", "fairy", "star", "moon", "flower"],
  boy: ["hero", "knight", "dragon", "star", "moon"],
  other: ["wizard", "alien", "robot", "star", "moon"],
};

/** Graine DiceBear stable et adaptée au genre (déterministe par prénom). */
export function getAvatarSeed(name: string, gender: Gender = "other"): string {
  const clean = (name || "nederdys").toLowerCase().trim().replace(/\s+/g, "-");
  const prefixes = SEED_PREFIXES[gender] ?? SEED_PREFIXES.other;
  const hash = Array.from(clean).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return `${prefixes[hash % prefixes.length]}-${clean}`;
}

const GENDER_DEFAULTS: Record<Gender, AvatarConfig> = {
  girl: {
    backgroundColor: "ffc0e9,ffb6c1,dda0dd",
    hairColor: "f6d7b0,cb6820,ff69b4",
    hair: "long02,long07,long16",
  },
  boy: {
    backgroundColor: "c0d7fe,b0e0e6,b0c4de",
    hairColor: "2b1b0e,0e0e0e,e5d7a3",
    hair: "short02,short05,short09",
  },
  other: {
    backgroundColor: "e0bbe4,a0e7c5,ffd93d",
    hairColor: "9b59b6,3498db,f1c40f",
    hair: "long20,short18",
  },
};

/** Options DiceBear par défaut selon le genre. */
export function getDefaultAvatarOptions(gender: Gender = "other"): AvatarConfig {
  return { ...(GENDER_DEFAULTS[gender] ?? GENDER_DEFAULTS.other) };
}

/** Fusionne les défauts liés au genre avec la config personnalisée de l'enfant. */
export function mergeAvatarOptions(gender: Gender | null | undefined, custom?: AvatarConfig): AvatarConfig {
  const defaults = getDefaultAvatarOptions((gender ?? "other") as Gender);
  const merged: AvatarConfig = { ...defaults };
  Object.entries(custom ?? {}).forEach(([key, value]) => {
    if (value) (merged as Record<string, unknown>)[key] = value;
  });
  return merged;
}

/* ------------------------------------------------------------------ */
/* Humeurs de l'avatar (réactions visuelles, aucun stockage en base)   */
/* ------------------------------------------------------------------ */

export type AvatarMood = "happy" | "neutral" | "thinking";

/**
 * Variantes DiceBear "adventurer" vérifiées au rendu (mouth: variant01-30,
 * eyebrows: variant01-15) : sourires francs, bouches neutres, moue pensive.
 */
export const MOOD_OPTIONS: Record<AvatarMood, { mouth: string; eyebrows: string }> = {
  happy: { mouth: "variant22,variant23,variant30", eyebrows: "variant06,variant09" },
  neutral: { mouth: "variant09,variant10", eyebrows: "variant05,variant10" },
  thinking: { mouth: "variant04,variant19", eyebrows: "variant13,variant01" },
};
