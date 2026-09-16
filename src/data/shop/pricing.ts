export type ShopRarity = "common" | "rare" | "epic" | "legendary";
export type ShopCategory = "avatar" | "clothing" | "accessory" | "emote" | "effect";

/** Fourchettes de prix par catégorie et rareté (collection plus challengeante). */
export const PRICE_RANGES: Record<ShopCategory, Record<ShopRarity, { min: number; max: number }>> = {
  avatar: {
    common: { min: 500, max: 1000 },
    rare: { min: 1000, max: 2500 },
    epic: { min: 2500, max: 5000 },
    legendary: { min: 5000, max: 10000 },
  },
  clothing: {
    common: { min: 200, max: 500 },
    rare: { min: 500, max: 1500 },
    epic: { min: 1500, max: 3000 },
    legendary: { min: 3000, max: 7500 },
  },
  accessory: {
    common: { min: 100, max: 300 },
    rare: { min: 300, max: 1000 },
    epic: { min: 1000, max: 2500 },
    legendary: { min: 2500, max: 5000 },
  },
  emote: {
    common: { min: 150, max: 400 },
    rare: { min: 400, max: 1200 },
    epic: { min: 1200, max: 2500 },
    legendary: { min: 2500, max: 5000 },
  },
  effect: {
    common: { min: 300, max: 800 },
    rare: { min: 800, max: 2000 },
    epic: { min: 2000, max: 4000 },
    legendary: { min: 4000, max: 8000 },
  },
};

export const RARITY_LABELS: Record<ShopRarity, { fr: string; nl: string }> = {
  common: { fr: "Commun", nl: "Gewoon" },
  rare: { fr: "Rare", nl: "Zeldzaam" },
  epic: { fr: "Épique", nl: "Episch" },
  legendary: { fr: "Légendaire", nl: "Legendarisch" },
};

export const SHOP_CATEGORY_LABELS: Record<ShopCategory, { fr: string; nl: string; icon: string }> = {
  avatar: { fr: "Personnages", nl: "Figuren", icon: "🧑‍🚀" },
  clothing: { fr: "Vêtements", nl: "Kleding", icon: "👕" },
  accessory: { fr: "Accessoires", nl: "Accessoires", icon: "🕶️" },
  emote: { fr: "Émotes", nl: "Emotes", icon: "💃" },
  effect: { fr: "Effets", nl: "Effecten", icon: "✨" },
};
