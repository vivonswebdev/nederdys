import { Exercise } from "./types";

export const divisionCe2Exercises: Exercise[] = [
  // ---------- NIVEAU 1 : partage avec support visuel ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "On partage 12 bonbons entre 3 enfants. Combien chacun en reçoit-il ?",
    visualAid: "🍬🍬🍬🍬 | 🍬🍬🍬🍬 | 🍬🍬🍬🍬",
    options: [3, 4, 5, 6],
    answer: 4,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "10 ÷ 2 = ___",
    visualAid: "🔵🔵🔵🔵🔵 | 🔵🔵🔵🔵🔵",
    answer: "5",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "6 ÷ 3 = 2",
    visualAid: "⚽⚽ | ⚽⚽ | ⚽⚽",
    answer: true,
  },
  {
    id: 4,
    type: "qcm",
    difficulty: 1,
    question: "20 ÷ 10 = ?",
    options: [2, 10, 20, 200],
    answer: 2,
  },
  {
    id: 5,
    type: "order",
    difficulty: 1,
    question: "Range les résultats du plus petit au plus grand.",
    answer: ["10 ÷ 5", "9 ÷ 3", "8 ÷ 2", "12 ÷ 2"],
  },

  // ---------- NIVEAU 2 ----------
  {
    id: 6,
    type: "qcm",
    difficulty: 2,
    question: "24 ÷ 3 = ?",
    options: [6, 7, 8, 9],
    answer: 8,
  },
  {
    id: 7,
    type: "fill_blank",
    difficulty: 2,
    question: "35 ÷ 5 = ___",
    answer: "7",
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "30 ÷ 3 = 10",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque division à son résultat.",
    pairs: [
      { left: "21 ÷ 3", right: "7" },
      { left: "50 ÷ 10", right: "5" },
      { left: "18 ÷ 2", right: "9" },
      { left: "40 ÷ 5", right: "8" },
    ],
  },
  {
    id: 10,
    type: "qcm",
    difficulty: 2,
    question: "On range 36 livres sur 4 étagères identiques. Combien de livres par étagère ?",
    options: [6, 8, 9, 12],
    answer: 9,
  },

  // ---------- NIVEAU 3 : division abstraite et problèmes à 2 étapes ----------
  {
    id: 11,
    type: "fill_blank",
    difficulty: 3,
    question: "45 ÷ 5 = ___",
    answer: "9",
  },
  {
    id: 12,
    type: "qcm",
    difficulty: 3,
    question: "72 bonbons sont partagés entre 8 enfants. Chaque enfant en mange 2. Combien lui en reste-t-il ?",
    options: [7, 9, 11, 64],
    answer: 7,
    steps: [
      { operation: "72 ÷ 8 = 9", description: "Bonbons par enfant" },
      { operation: "9 - 2 = 7", description: "Après en avoir mangé 2" },
    ],
  },
  {
    id: 13,
    type: "true_false",
    difficulty: 3,
    question: "Si 6 × 7 = 42, alors 42 ÷ 7 = 6.",
    answer: true,
  },
  {
    id: 14,
    type: "qcm",
    difficulty: 3,
    question: "96 ÷ 3 = ?",
    options: [23, 32, 33, 39],
    answer: 32,
  },
  {
    id: 15,
    type: "order",
    difficulty: 3,
    question: "Range les résultats du plus grand au plus petit.",
    answer: ["100 ÷ 5", "60 ÷ 4", "72 ÷ 6", "81 ÷ 9"],
  },
];
