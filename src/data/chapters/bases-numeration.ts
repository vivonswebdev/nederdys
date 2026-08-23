import { Exercise } from "./types";

/** Remédiation : bases de la numération (niveau CP) — 18 exercices. */
export const basesNumerationExercises: Exercise[] = [
  // Niveau 1 — compter 1 à 5
  { id: 1, type: "qcm", difficulty: 1, question: "Combien y a-t-il de pommes ?", visualAid: "🍎🍎🍎", options: [2, 3, 4], answer: 3 },
  { id: 2, type: "qcm", difficulty: 1, question: "Combien y a-t-il d'étoiles ?", visualAid: "⭐⭐", options: [1, 2, 3], answer: 2 },
  { id: 3, type: "qcm", difficulty: 1, question: "Combien y a-t-il de ballons ?", visualAid: "🎈🎈🎈🎈", options: [3, 4, 5], answer: 4 },
  { id: 4, type: "qcm", difficulty: 1, question: "Combien y a-t-il de chats ?", visualAid: "🐱🐱🐱🐱🐱", options: [4, 5, 6], answer: 5 },
  { id: 5, type: "qcm", difficulty: 1, question: "Combien y a-t-il de fleurs ?", visualAid: "🌸", options: [1, 2, 3], answer: 1 },
  { id: 6, type: "true_false", difficulty: 1, question: "Il y a 3 voitures.", visualAid: "🚗🚗🚗", answer: true },

  // Niveau 2 — compter 6 à 10, reconnaître les chiffres
  { id: 7, type: "qcm", difficulty: 2, question: "Quel est ce chiffre ?", visualAid: "7", options: [6, 7, 8], answer: 7 },
  { id: 8, type: "qcm", difficulty: 2, question: "Combien y a-t-il de gâteaux ?", visualAid: "🍪🍪🍪🍪🍪🍪", options: [5, 6, 7], answer: 6 },
  { id: 9, type: "qcm", difficulty: 2, question: "Combien y a-t-il de poissons ?", visualAid: "🐟🐟🐟🐟🐟🐟🐟🐟", options: [7, 8, 9], answer: 8 },
  { id: 10, type: "qcm", difficulty: 2, question: "Quel nombre vient juste après 9 ?", visualAid: "8 · 9 · ?", options: [10, 11, 7], answer: 10 },
  { id: 11, type: "qcm", difficulty: 2, question: "Quel nombre vient juste avant 6 ?", visualAid: "? · 6 · 7", options: [4, 5, 7], answer: 5 },
  { id: 12, type: "qcm", difficulty: 2, question: "Quel est le plus grand nombre ?", visualAid: "4 · 9 · 6", options: [4, 6, 9], answer: 9 },

  // Niveau 3 — premières additions avec support visuel
  { id: 13, type: "qcm", difficulty: 3, question: "2 pommes + 3 pommes = combien de pommes ?", visualAid: "🍎🍎 + 🍎🍎🍎", options: [4, 5, 6], answer: 5 },
  { id: 14, type: "qcm", difficulty: 3, question: "1 + 4 = ?", visualAid: "⭐ + ⭐⭐⭐⭐", options: [4, 5, 6], answer: 5 },
  { id: 15, type: "qcm", difficulty: 3, question: "3 + 3 = ?", visualAid: "🐟🐟🐟 + 🐟🐟🐟", options: [5, 6, 7], answer: 6 },
  { id: 16, type: "qcm", difficulty: 3, question: "5 + 2 = ?", visualAid: "🎈🎈🎈🎈🎈 + 🎈🎈", options: [6, 7, 8], answer: 7 },
  { id: 17, type: "qcm", difficulty: 3, question: "Il y a 4 gâteaux, j'en mange 1. Combien reste-t-il ?", visualAid: "🍪🍪🍪🍪", options: [2, 3, 4], answer: 3 },
  { id: 18, type: "qcm", difficulty: 3, question: "4 + 4 = ?", visualAid: "🚗🚗🚗🚗 + 🚗🚗🚗🚗", options: [7, 8, 9], answer: 8 },
];
