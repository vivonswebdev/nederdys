export type BadgeCategory = "nl" | "fr" | "math" | "streak" | "special";

export interface Badge {
  id: string;
  name: string;
  icon: string;
  category: BadgeCategory;
  description: string;
  /** Condition lisible, évaluée par /lib/badges.ts (format "champ >= valeur"). */
  condition: string;
}

export const allBadges: Badge[] = [
  // SPÉCIAUX (5)
  { id: "first_steps", name: "Premiers pas", icon: "🌱", category: "special", description: "Tu as joué à ton premier jeu !", condition: "games_played >= 1" },
  { id: "curious", name: "Curieux", icon: "🔍", category: "special", description: "Tu as essayé 3 jeux différents", condition: "unique_games >= 3" },
  { id: "dedicated", name: "Dédié", icon: "💪", category: "special", description: "Tu as joué 10 fois", condition: "games_played >= 10" },
  { id: "champion", name: "Champion", icon: "🏆", category: "special", description: "Tu as atteint 500 XP", condition: "total_xp >= 500" },
  { id: "master", name: "Maître", icon: "👑", category: "special", description: "Tu as atteint 1000 XP", condition: "total_xp >= 1000" },

  // NÉERLANDAIS (5)
  { id: "nl_beginner", name: "Débutant NL", icon: "🇳🇱", category: "nl", description: "Niveau 1 atteint en néerlandais", condition: "nl_level >= 1" },
  { id: "nl_explorer", name: "Explorateur NL", icon: "📚", category: "nl", description: "Niveau 2 atteint en néerlandais", condition: "nl_level >= 2" },
  { id: "nl_warrior", name: "Guerrier NL", icon: "⚔️", category: "nl", description: "Niveau 3 atteint en néerlandais", condition: "nl_level >= 3" },
  { id: "nl_expert", name: "Expert NL", icon: "🎓", category: "nl", description: "200 XP en néerlandais", condition: "nl_xp >= 200" },
  { id: "nl_master", name: "Maître NL", icon: "🌟", category: "nl", description: "500 XP en néerlandais", condition: "nl_xp >= 500" },

  // FRANÇAIS (5)
  { id: "fr_beginner", name: "Débutant FR", icon: "🇫🇷", category: "fr", description: "Niveau 1 atteint en français", condition: "fr_level >= 1" },
  { id: "fr_explorer", name: "Explorateur FR", icon: "📖", category: "fr", description: "Niveau 2 atteint en français", condition: "fr_level >= 2" },
  { id: "fr_warrior", name: "Guerrier FR", icon: "🛡️", category: "fr", description: "Niveau 3 atteint en français", condition: "fr_level >= 3" },
  { id: "fr_expert", name: "Expert FR", icon: "✏️", category: "fr", description: "200 XP en français", condition: "fr_xp >= 200" },
  { id: "fr_master", name: "Maître FR", icon: "✨", category: "fr", description: "500 XP en français", condition: "fr_xp >= 500" },

  // MATHS (5)
  { id: "math_beginner", name: "Débutant Math", icon: "🔢", category: "math", description: "Niveau 1 atteint en maths", condition: "math_level >= 1" },
  { id: "math_explorer", name: "Explorateur Math", icon: "📐", category: "math", description: "Niveau 2 atteint en maths", condition: "math_level >= 2" },
  { id: "math_warrior", name: "Guerrier Math", icon: "⚡", category: "math", description: "Niveau 3 atteint en maths", condition: "math_level >= 3" },
  { id: "math_expert", name: "Expert Math", icon: "🧮", category: "math", description: "200 XP en maths", condition: "math_xp >= 200" },
  { id: "math_master", name: "Maître Math", icon: "💎", category: "math", description: "500 XP en maths", condition: "math_xp >= 500" },

  // STREAK (4)
  { id: "streak_3", name: "Sérieux", icon: "🔥", category: "streak", description: "3 jours de suite", condition: "streak >= 3" },
  { id: "streak_7", name: "Régulier", icon: "⭐", category: "streak", description: "7 jours de suite", condition: "streak >= 7" },
  { id: "streak_14", name: "Champion des séries", icon: "🏅", category: "streak", description: "14 jours de suite", condition: "streak >= 14" },
  { id: "streak_30", name: "Légende", icon: "👑", category: "streak", description: "30 jours de suite", condition: "streak >= 30" },
];

export const badgeById = (id: string) => allBadges.find((b) => b.id === id);

export const CATEGORY_LABELS: Record<BadgeCategory, { label: string; icon: string }> = {
  nl: { label: "Néerlandais", icon: "🇳🇱" },
  fr: { label: "Français", icon: "🇫🇷" },
  math: { label: "Maths", icon: "🔢" },
  streak: { label: "Séries", icon: "🔥" },
  special: { label: "Spécial", icon: "⭐" },
};

/** Anciens identifiants de badges encore présents en base. */
export const LEGACY_BADGE_LABELS: Record<string, string> = {
  serious: "Sérieux",
  polyglot: "Polyglotte",
  mathematician: "Mathématicien",
  perfectionist: "Perfectionniste",
  marathon: "Marathonien",
};
