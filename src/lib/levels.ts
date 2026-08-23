export interface LevelInfo {
  level: number;
  title: string;
  emoji: string;
  progress: number; // % dans le niveau courant
  current: number; // XP dans le niveau
  span: number; // XP nécessaires pour ce niveau
  nextAt: number | null; // seuil du niveau suivant
}

const TIERS = [
  { min: 0, next: 100, level: 1, title: "Débutant", emoji: "🌱" },
  { min: 100, next: 300, level: 2, title: "Apprenti", emoji: "🌿" },
  { min: 300, next: 600, level: 3, title: "Explorateur", emoji: "🌳" },
  { min: 600, next: 1000, level: 4, title: "Champion", emoji: "🏆" },
  { min: 1000, next: null, level: 5, title: "Maître", emoji: "👑" },
] as const;

export function getLevel(totalXp: number): LevelInfo {
  const xp = Math.max(0, totalXp || 0);
  const tier = [...TIERS].reverse().find((t) => xp >= t.min) ?? TIERS[0];
  if (tier.next === null) {
    return {
      level: tier.level,
      title: tier.title,
      emoji: tier.emoji,
      progress: 100,
      current: xp - tier.min,
      span: 0,
      nextAt: null,
    };
  }
  const span = tier.next - tier.min;
  const current = xp - tier.min;
  return {
    level: tier.level,
    title: tier.title,
    emoji: tier.emoji,
    progress: Math.min(100, (current / span) * 100),
    current,
    span,
    nextAt: tier.next,
  };
}
