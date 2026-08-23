import { Exercise } from "@/data/chapters/types";

/** Nombres jusqu'à 10 000 — 18 exercices (6 par niveau). */
export const grandsNombresExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Quel nombre s'écrit « mille deux cents » ?", options: [1200, 1020, 120, 12000], answer: 1200 },
  { id: 2, type: "qcm", difficulty: 1, question: "Dans 3 456, quel est le chiffre des milliers ?", visualAid: "3 | 4 | 5 | 6", options: [3, 4, 5, 6], answer: 3 },
  { id: 3, type: "fill_blank", difficulty: 1, question: "Écris en chiffres : deux mille cinq cents", answer: "2500" },
  { id: 4, type: "true_false", difficulty: 1, question: "1 000 est plus grand que 999.", answer: true },
  { id: 5, type: "qcm", difficulty: 1, question: "Quel nombre vient juste après 4 999 ?", options: [5000, 4990, 5100, 4909], answer: 5000 },
  { id: 6, type: "fill_blank", difficulty: 1, question: "Combien de centaines dans 1 000 ?", visualAid: "100 + 100 + ...", answer: "10" },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Quel est le plus grand nombre ?", options: [7 - 7 + 6540, 6450, 6045, 6504], answer: 6540 },
  { id: 8, type: "fill_blank", difficulty: 2, question: "Décompose : 5 300 = 5 000 + ___", answer: "300" },
  { id: 9, type: "order", difficulty: 2, question: "Range du plus petit au plus grand.", answer: ["1 200", "2 100", "2 900", "3 050"] },
  { id: 10, type: "qcm", difficulty: 2, question: "Combien vaut le chiffre 7 dans 7 208 ?", options: ["7 000", "700", "70", "7"], answer: "7 000" },
  { id: 11, type: "fill_blank", difficulty: 2, question: "Complète : 4 000 + 600 + 20 + 8 = ___", answer: "4628" },
  { id: 12, type: "true_false", difficulty: 2, question: "9 099 est plus grand que 9 100.", answer: false },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Quel nombre est juste avant 10 000 ?", answer: "9999" },
  { id: 14, type: "order", difficulty: 3, question: "Range du plus grand au plus petit.", answer: ["9 810", "9 108", "8 910", "8 019"] },
  { id: 15, type: "qcm", difficulty: 3, question: "Arrondi 4 872 à la centaine la plus proche.", options: [4900, 4800, 5000, 4870], answer: 4900 },
  { id: 16, type: "fill_blank", difficulty: 3, question: "3 000 + 3 000 + 2 500 = ___", answer: "8500", steps: [ { operation: "3 000 + 3 000 = 6 000", description: "J'additionne les deux premiers" }, { operation: "6 000 + 2 500 = 8 500", description: "J'ajoute le dernier" } ] },
  { id: 17, type: "qcm", difficulty: 3, question: "Combien de dizaines dans 3 400 ?", options: [340, 34, 3400, 3040], answer: 340 },
  { id: 18, type: "fill_blank", difficulty: 3, question: "Écris en chiffres : sept mille soixante", answer: "7060" },
];
