import { Exercise } from "./types";

export const additionCe2Exercises: Exercise[] = [
  // ---------- NIVEAU 1 ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "7 + 5 = ?",
    visualAid: "🔵🔵🔵🔵🔵🔵🔵 + 🟠🟠🟠🟠🟠",
    options: [10, 12, 15, 20],
    answer: 12,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "8 + 6 = ___",
    visualAid: "8 + 2 = 10, puis 10 + 4",
    answer: "14",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "9 + 3 = 13",
    answer: false,
  },
  {
    id: 4,
    type: "order",
    difficulty: 1,
    question: "Range les résultats du plus petit au plus grand.",
    answer: ["2 + 3", "4 + 2", "5 + 5", "9 + 4"],
  },
  {
    id: 5,
    type: "qcm",
    difficulty: 1,
    question: "12 + 10 = ?",
    visualAid: "🟦 = 10 · 🟦🔸🔸 + 🟦",
    options: [2, 22, 32, 112],
    answer: 22,
  },

  // ---------- NIVEAU 2 ----------
  {
    id: 6,
    type: "qcm",
    difficulty: 2,
    question: "47 + 25 = ?",
    options: [62, 71, 72, 82],
    answer: 72,
  },
  {
    id: 7,
    type: "fill_blank",
    difficulty: 2,
    question: "138 + 46 = ___",
    answer: "184",
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "56 + 27 = 83",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque addition à son résultat.",
    pairs: [
      { left: "25 + 25", right: "50" },
      { left: "30 + 45", right: "75" },
      { left: "60 + 40", right: "100" },
      { left: "12 + 13", right: "25" },
    ],
  },
  {
    id: 10,
    type: "qcm",
    difficulty: 2,
    question: "199 + 1 = ?",
    options: [190, 200, 290, 1100],
    answer: 200,
  },

  // ---------- NIVEAU 3 : deux étapes, distracteurs plausibles, sans support ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question: "Léa a 128 billes. Elle en gagne 45, puis 27 de plus. Combien en a-t-elle maintenant ?",
    options: [173, 190, 200, 210],
    answer: 200,
    steps: [
      { operation: "128 + 45 = 173", description: "Après le premier gain" },
      { operation: "173 + 27 = 200", description: "Après le second gain" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "365 + 148 = ___",
    answer: "513",
  },
  {
    id: 13,
    type: "true_false",
    difficulty: 3,
    question: "Pour calculer 297 + 58, on peut faire 300 + 58 puis enlever 3.",
    answer: true,
  },
  {
    id: 14,
    type: "qcm",
    difficulty: 3,
    question: "68 + 57 = ?",
    options: [115, 125, 135, 1115],
    answer: 125,
  },
  {
    id: 15,
    type: "order",
    difficulty: 3,
    question: "Range les résultats du plus grand au plus petit.",
    answer: ["120 + 95", "150 + 60", "180 + 20", "99 + 99"],
  },
];
