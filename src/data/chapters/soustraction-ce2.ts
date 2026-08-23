import { Exercise } from "./types";

export const soustractionCe2Exercises: Exercise[] = [
  // ---------- NIVEAU 1 ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "9 - 4 = ?",
    visualAid: "🍎🍎🍎🍎🍎🍎🍎🍎🍎 → on en enlève 4",
    options: [3, 5, 7, 9],
    answer: 5,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "15 - 7 = ___",
    visualAid: "15 - 5 = 10, puis 10 - 2",
    answer: "8",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "20 - 5 = 14",
    answer: false,
  },
  {
    id: 4,
    type: "qcm",
    difficulty: 1,
    question: "30 - 10 = ?",
    visualAid: "🟦🟦🟦 → on retire 🟦",
    options: [10, 20, 25, 40],
    answer: 20,
  },
  {
    id: 5,
    type: "order",
    difficulty: 1,
    question: "Range les résultats du plus petit au plus grand.",
    answer: ["10 - 8", "9 - 4", "12 - 5", "20 - 9"],
  },

  // ---------- NIVEAU 2 ----------
  {
    id: 6,
    type: "qcm",
    difficulty: 2,
    question: "62 - 27 = ?",
    options: [25, 35, 41, 45],
    answer: 35,
  },
  {
    id: 7,
    type: "fill_blank",
    difficulty: 2,
    question: "100 - 38 = ___",
    answer: "62",
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "84 - 29 = 55",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque soustraction à son résultat.",
    pairs: [
      { left: "50 - 20", right: "30" },
      { left: "70 - 35", right: "35" },
      { left: "90 - 45", right: "45" },
      { left: "60 - 18", right: "42" },
    ],
  },
  {
    id: 10,
    type: "qcm",
    difficulty: 2,
    question: "145 - 30 = ?",
    options: [105, 115, 125, 175],
    answer: 115,
  },

  // ---------- NIVEAU 3 ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question: "Tom a 200 €. Il achète un vélo à 145 € et un casque à 28 €. Combien lui reste-t-il ?",
    options: [27, 33, 45, 55],
    answer: 27,
    steps: [
      { operation: "145 + 28 = 173", description: "Total dépensé" },
      { operation: "200 - 173 = 27", description: "Ce qu'il reste" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "503 - 167 = ___",
    answer: "336",
  },
  {
    id: 13,
    type: "true_false",
    difficulty: 3,
    question: "Pour calculer 402 - 199, on peut faire 402 - 200 puis ajouter 1.",
    answer: true,
  },
  {
    id: 14,
    type: "qcm",
    difficulty: 3,
    question: "84 - 36 = ?",
    options: [42, 48, 52, 58],
    answer: 48,
  },
  {
    id: 15,
    type: "order",
    difficulty: 3,
    question: "Range les résultats du plus grand au plus petit.",
    answer: ["90 - 20", "120 - 60", "100 - 45", "80 - 35"],
  },
];
