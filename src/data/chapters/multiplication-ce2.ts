import { Exercise } from "./types";

export const multiplicationCe2Exercises: Exercise[] = [
  // ---------- NIVEAU 1 : appui visuel sur les groupes ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "3 × 4 = ?",
    visualAid: "⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ (3 groupes de 4)",
    options: [8, 10, 12, 14],
    answer: 12,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "5 × 2 = ___",
    visualAid: "🖐️🖐️ deux mains de 5 doigts",
    answer: "10",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "2 × 6 = 12",
    visualAid: "🥚🥚🥚🥚🥚🥚 | 🥚🥚🥚🥚🥚🥚",
    answer: true,
  },
  {
    id: 4,
    type: "qcm",
    difficulty: 1,
    question: "10 × 7 = ?",
    options: [17, 60, 70, 77],
    answer: 70,
  },
  {
    id: 5,
    type: "order",
    difficulty: 1,
    question: "Range les résultats du plus petit au plus grand.",
    answer: ["2 × 3", "3 × 3", "4 × 3", "5 × 3"],
  },

  // ---------- NIVEAU 2 ----------
  {
    id: 6,
    type: "qcm",
    difficulty: 2,
    question: "6 × 7 = ?",
    options: [36, 42, 48, 54],
    answer: 42,
  },
  {
    id: 7,
    type: "fill_blank",
    difficulty: 2,
    question: "8 × 4 = ___",
    answer: "32",
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "9 × 3 = 27",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque multiplication à son résultat.",
    pairs: [
      { left: "6 × 6", right: "36" },
      { left: "7 × 7", right: "49" },
      { left: "8 × 8", right: "64" },
      { left: "9 × 9", right: "81" },
    ],
  },
  {
    id: 10,
    type: "qcm",
    difficulty: 2,
    question: "5 × 12 = ?",
    options: [55, 60, 65, 70],
    answer: 60,
  },

  // ---------- NIVEAU 3 : deux étapes, énoncés, distracteurs plausibles ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question: "Léa a 3 boîtes. Dans chaque boîte il y a 8 bonbons. Elle en mange 5. Combien lui en reste-t-il ?",
    options: [16, 19, 21, 24],
    answer: 19,
    steps: [
      { operation: "3 × 8 = 24", description: "Total des bonbons" },
      { operation: "24 - 5 = 19", description: "Après en avoir mangé 5" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "23 × 4 = ___",
    answer: "92",
  },
  {
    id: 13,
    type: "true_false",
    difficulty: 3,
    question: "12 × 5 donne le même résultat que 6 × 10.",
    answer: true,
  },
  {
    id: 14,
    type: "qcm",
    difficulty: 3,
    question: "Dans une classe il y a 4 rangées de 6 tables. 3 tables sont vides. Combien de tables sont occupées ?",
    options: [18, 21, 24, 27],
    answer: 21,
    steps: [
      { operation: "4 × 6 = 24", description: "Nombre total de tables" },
      { operation: "24 - 3 = 21", description: "Tables occupées" },
    ],
  },
  {
    id: 15,
    type: "order",
    difficulty: 3,
    question: "Range les résultats du plus grand au plus petit.",
    answer: ["8 × 8", "7 × 8", "9 × 6", "5 × 9"],
  },
];
