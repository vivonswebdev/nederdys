export interface SeasonTier {
  threshold: number; // Mouche-Coins gagnés ce mois-ci pour débloquer
  reward: { type: "avatar_item"; itemId: string } | { type: "bonus_coins"; amount: number };
  labelFr: string;
  labelNl: string;
  emoji: string;
}

// Items exclusifs de saison (is_premium = true → non achetables en boutique)
export const SEASON_ITEM_GLASSES = "11111111-1111-4111-8111-000000000001";
export const SEASON_ITEM_BACKGROUND = "11111111-1111-4111-8111-000000000002";
export const SEASON_ITEM_HAIR = "11111111-1111-4111-8111-000000000003";

export const SEASON_TIERS: SeasonTier[] = [
  { threshold: 50, reward: { type: "bonus_coins", amount: 20 }, labelFr: "Premier palier", labelNl: "Eerste niveau", emoji: "🥉" },
  { threshold: 150, reward: { type: "avatar_item", itemId: SEASON_ITEM_GLASSES }, labelFr: "Accessoire exclusif", labelNl: "Exclusief accessoire", emoji: "🥈" },
  { threshold: 300, reward: { type: "bonus_coins", amount: 50 }, labelFr: "Palier bonus", labelNl: "Bonusniveau", emoji: "🥇" },
  { threshold: 500, reward: { type: "avatar_item", itemId: SEASON_ITEM_BACKGROUND }, labelFr: "Tenue de saison", labelNl: "Seizoensoutfit", emoji: "🏆" },
  { threshold: 800, reward: { type: "avatar_item", itemId: SEASON_ITEM_HAIR }, labelFr: "Récompense légendaire", labelNl: "Legendarische beloning", emoji: "👑" },
];

export const SEASON_MAX = SEASON_TIERS[SEASON_TIERS.length - 1].threshold;

const MONTHS_FR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const MONTHS_NL = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

export function seasonName(seasonId: string, lang: "fr" | "nl" = "fr") {
  const [y, m] = seasonId.split("-").map(Number);
  if (!y || !m) return seasonId;
  const names = lang === "nl" ? MONTHS_NL : MONTHS_FR;
  return `${names[m - 1]} ${y}`;
}
