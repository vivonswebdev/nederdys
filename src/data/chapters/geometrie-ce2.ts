import { Exercise } from "./types";

export const geometrieCe2Exercises: Exercise[] = [
  // ---------- NIVEAU 1 ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "Combien de côtés a un carré ?",
    visualAid: "⬜",
    options: [3, 4, 5, 6],
    answer: 4,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "Un triangle a ___ côtés.",
    visualAid: "🔺",
    answer: "3",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "Un cercle a des angles.",
    visualAid: "⭕",
    answer: false,
  },
  {
    id: 4,
    type: "qcm",
    difficulty: 1,
    question: "Quelle figure a 4 côtés : deux longs et deux courts ?",
    options: ["le carré", "le rectangle", "le triangle", "le cercle"],
    answer: "le rectangle",
  },
  {
    id: 5,
    type: "order",
    difficulty: 1,
    question: "Range ces figures du moins de côtés au plus de côtés.",
    answer: ["triangle", "carré", "pentagone", "hexagone"],
  },

  // ---------- NIVEAU 2 ----------
  {
    id: 6,
    type: "qcm",
    difficulty: 2,
    question: "Quel est le périmètre d'un carré de 5 cm de côté ?",
    options: [10, 15, 20, 25],
    answer: 20,
  },
  {
    id: 7,
    type: "fill_blank",
    difficulty: 2,
    question: "Un rectangle mesure 6 cm de long et 3 cm de large. Son périmètre est de ___ cm",
    answer: "18",
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "Un cube a 6 faces.",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque figure à sa propriété.",
    pairs: [
      { left: "carré", right: "4 côtés égaux" },
      { left: "rectangle", right: "4 angles droits, côtés 2 à 2 égaux" },
      { left: "triangle", right: "3 côtés" },
      { left: "cercle", right: "aucun côté droit" },
    ],
  },
  {
    id: 10,
    type: "qcm",
    difficulty: 2,
    question: "Combien d'angles droits y a-t-il dans un rectangle ?",
    options: [0, 2, 4, 6],
    answer: 4,
  },

  // ---------- NIVEAU 3 : raisonnement inverse et assemblages ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question: "Un rectangle a un périmètre de 20 cm. Sa longueur est de 7 cm. Quelle est sa largeur ?",
    options: [3, 5, 6, 13],
    answer: 3,
    steps: [
      { operation: "20 ÷ 2 = 10", description: "Longueur + largeur" },
      { operation: "10 - 7 = 3", description: "La largeur" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "Un carré a 9 cm de côté. Son périmètre est de ___ cm",
    answer: "36",
  },
  {
    id: 13,
    type: "true_false",
    difficulty: 3,
    question: "Tous les carrés sont aussi des rectangles.",
    answer: true,
  },
  {
    id: 14,
    type: "qcm",
    difficulty: 3,
    question: "On colle deux carrés de 4 cm côte à côte. Quel est le périmètre du rectangle obtenu ?",
    options: [16, 20, 24, 32],
    answer: 24,
    steps: [
      { operation: "Rectangle de 8 cm sur 4 cm", description: "Figure obtenue" },
      { operation: "8 + 4 + 8 + 4 = 24", description: "Périmètre" },
    ],
  },
  {
    id: 15,
    type: "order",
    difficulty: 3,
    question: "Range ces figures du plus petit au plus grand périmètre.",
    answer: [
      "carré de 3 cm de côté",
      "triangle équilatéral de 5 cm",
      "carré de 5 cm de côté",
      "rectangle 8 cm sur 4 cm",
    ],
  },
];
