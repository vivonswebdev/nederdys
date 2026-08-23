import { Exercise } from "@/data/chapters/types";

/** Rendu de monnaie — 18 exercices (6 par niveau). */
export const monnaieRenduExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "fill_blank", difficulty: 1, question: "J'achète un pain à 2 €. Je paie avec 5 €. On me rend ___ €", visualAid: "💶 5 € - 🥖 2 €", answer: "3" },
  { id: 2, type: "fill_blank", difficulty: 1, question: "Un jus coûte 1 €. Je paie 2 €. On me rend ___ €", visualAid: "🧃", answer: "1" },
  { id: 3, type: "qcm", difficulty: 1, question: "Je paie 10 € un jouet à 6 €. Combien me rend-on ?", options: ["4 €", "3 €", "6 €", "16 €"], answer: "4 €" },
  { id: 4, type: "true_false", difficulty: 1, question: "Avec 5 € je peux acheter un objet à 6 €.", answer: false },
  { id: 5, type: "fill_blank", difficulty: 1, question: "2 € + 2 € + 1 € = ___ €", visualAid: "🪙🪙🪙", answer: "5" },
  { id: 6, type: "qcm", difficulty: 1, question: "Quelle pièce n'existe pas en euros ?", options: ["3 €", "2 €", "1 €", "50 cents"], answer: "3 €" },

  // Niveau 2
  { id: 7, type: "fill_blank", difficulty: 2, question: "Achat 7,50 €, je paie 10 €. On me rend ___ €", answer: "2.50" },
  { id: 8, type: "fill_blank", difficulty: 2, question: "Achat 12 €, je paie 20 €. On me rend ___ €", answer: "8" },
  { id: 9, type: "qcm", difficulty: 2, question: "Achat 4,20 €, je paie 5 €. Rendu ?", options: ["0,80 €", "1,20 €", "0,20 €", "1,80 €"], answer: "0,80 €" },
  { id: 10, type: "fill_blank", difficulty: 2, question: "J'ai 3 pièces de 2 € et 1 pièce de 50 cents. J'ai ___ €", answer: "6.50" },
  { id: 11, type: "true_false", difficulty: 2, question: "Pour payer 3,50 € exactement, 1 billet de 5 € suffit sans rendu.", answer: false },
  { id: 12, type: "qcm", difficulty: 2, question: "Achat 15 €, je paie avec un billet de 20 €. Rendu en pièces de 1 € : combien de pièces ?", options: [5, 4, 15, 20], answer: 5 },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Deux articles : 6,50 € et 3,25 €. Je paie 10 €. Rendu ___ €", answer: "0.25", steps: [ { operation: "6,50 + 3,25 = 9,75", description: "Total des achats" }, { operation: "10 - 9,75 = 0,25", description: "Monnaie rendue" } ] },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Trois cahiers à 2,40 € : total ___ €", answer: "7.20" },
  { id: 15, type: "qcm", difficulty: 3, question: "Achat 18,60 €, je paie 20 €. Rendu ?", options: ["1,40 €", "2,40 €", "1,60 €", "2,60 €"], answer: "1,40 €" },
  { id: 16, type: "fill_blank", difficulty: 3, question: "Rendu de 4,70 € : quel est le plus petit nombre de pièces/billets (2 €, 2 €, 50c, 20c) ?", answer: "4" },
  { id: 17, type: "true_false", difficulty: 3, question: "Avec 50 € je peux acheter 3 articles à 16 € chacun.", answer: true },
  { id: 18, type: "fill_blank", difficulty: 3, question: "Je paie 50 € pour 34,80 €. Rendu ___ €", answer: "15.20" },
];
