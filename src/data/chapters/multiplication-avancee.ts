import { Exercise } from "./types";

export const multiplicationAvanceeExercises: Exercise[] = [
  // ---------- NIVEAU 1 : tables de 6 à 10 avec appui visuel ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "7 × 8 = ?",
    visualAid: "Grille de 7 lignes et 8 colonnes",
    options: [48, 54, 56, 58],
    answer: 56,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "6 × 9 = ___",
    visualAid: "6 × 10 = 60, puis on enlève 6",
    answer: "54",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "8 × 7 donne le même résultat que 7 × 8.",
    answer: true,
  },
  {
    id: 4,
    type: "qcm",
    difficulty: 1,
    question: "9 × 6 = ?",
    options: [45, 54, 56, 63],
    answer: 54,
  },
  {
    id: 5,
    type: "order",
    difficulty: 1,
    question: "Range les résultats du plus petit au plus grand.",
    answer: ["6 × 6", "7 × 6", "8 × 6", "9 × 6"],
  },

  // ---------- NIVEAU 2 : nombres à 2 chiffres × 1 chiffre ----------
  {
    id: 6,
    type: "fill_blank",
    difficulty: 2,
    question: "23 × 4 = ___",
    answer: "92",
  },
  {
    id: 7,
    type: "qcm",
    difficulty: 2,
    question: "15 × 6 = ?",
    options: [65, 80, 90, 96],
    answer: 90,
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "12 × 5 = 60",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque multiplication à son résultat.",
    pairs: [
      { left: "13 × 3", right: "39" },
      { left: "14 × 5", right: "70" },
      { left: "16 × 4", right: "64" },
      { left: "21 × 3", right: "63" },
    ],
  },
  {
    id: 10,
    type: "qcm",
    difficulty: 2,
    question: "25 × 4 = ?",
    options: [45, 90, 100, 125],
    answer: 100,
  },

  // ---------- NIVEAU 3 : problèmes multiplicatifs à 2 étapes ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question: "Un cartable coûte 45 €. Un magasin en commande 6. Combien doit-il payer ?",
    options: [240, 250, 270, 280],
    answer: 270,
    steps: [
      { operation: "45 × 6 = 270", description: "6 fois le prix d'un cartable" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "34 × 7 = ___",
    answer: "238",
  },
  {
    id: 13,
    type: "qcm",
    difficulty: 3,
    question: "3 classes de 24 élèves partent en sortie. 5 élèves sont absents. Combien d'élèves partent ?",
    options: [67, 69, 72, 77],
    answer: 67,
    steps: [
      { operation: "3 × 24 = 72", description: "Tous les élèves" },
      { operation: "72 - 5 = 67", description: "Sans les absents" },
    ],
  },
  {
    id: 14,
    type: "true_false",
    difficulty: 3,
    question: "48 × 10 = 480",
    answer: true,
  },
  {
    id: 15,
    type: "order",
    difficulty: 3,
    question: "Range les résultats du plus grand au plus petit.",
    answer: ["12 × 8", "31 × 3", "18 × 5", "22 × 4"],
  },
];
