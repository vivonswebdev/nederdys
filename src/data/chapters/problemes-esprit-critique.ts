import { Exercise } from "@/data/chapters/types";

/** Problèmes malins : repérer la donnée inutile — 18 exercices (6 par niveau). */
export const problemesEspritCritiqueExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Lisa a 8 billes rouges, 4 billes bleues et 3 frères. Combien de billes ?", visualAid: "🔴🔴 🔵", options: [12, 15, 11, 8], answer: 12 },
  { id: 2, type: "qcm", difficulty: 1, question: "Quelle donnée est inutile ci-dessus ?", options: ["les 3 frères", "les 8 billes rouges", "les 4 billes bleues", "aucune"], answer: "les 3 frères" },
  { id: 3, type: "qcm", difficulty: 1, question: "Tom a 10 ans. Il achète 5 pommes à 1 € l'une. Combien paie-t-il ?", visualAid: "🍎 x5", options: ["5 €", "10 €", "15 €", "50 €"], answer: "5 €" },
  { id: 4, type: "qcm", difficulty: 1, question: "Donnée inutile dans le problème de Tom ?", options: ["son âge", "le prix", "le nombre de pommes", "aucune"], answer: "son âge" },
  { id: 5, type: "true_false", difficulty: 1, question: "Toutes les données d'un problème servent toujours au calcul.", answer: false },
  { id: 6, type: "qcm", difficulty: 1, question: "La classe a 24 élèves et 3 fenêtres. On forme des équipes de 4. Combien d'équipes ?", options: [6, 8, 3, 24], answer: 6 },

  // Niveau 2
  { id: 7, type: "fill_blank", difficulty: 2, question: "Un bus part à 8 h avec 32 passagers ; 9 descendent, 5 montent. Combien reste-t-il de passagers ?", answer: "28", steps: [ { operation: "32 - 9 = 23", description: "Les descentes" }, { operation: "23 + 5 = 28", description: "Les montées" } ] },
  { id: 8, type: "qcm", difficulty: 2, question: "Donnée inutile dans le problème du bus ?", options: ["l'heure de départ", "les 9 descentes", "les 32 passagers", "les 5 montées"], answer: "l'heure de départ" },
  { id: 9, type: "qcm", difficulty: 2, question: "Un livre de 120 pages coûte 9 €. Léa lit 15 pages par jour pendant 4 jours. Combien de pages lues ?", options: [60, 120, 36, 45], answer: 60 },
  { id: 10, type: "qcm", difficulty: 2, question: "Donnée inutile chez Léa ?", options: ["le prix du livre", "15 pages/jour", "4 jours", "aucune"], answer: "le prix du livre" },
  { id: 11, type: "true_false", difficulty: 2, question: "Il manque parfois une donnée : le problème est alors impossible à résoudre.", answer: true },
  { id: 12, type: "qcm", difficulty: 2, question: "« Paul a 3 sacs. Combien de billes ? » — Que manque-t-il ?", options: ["le nombre de billes par sac", "le prix d'un sac", "l'âge de Paul", "rien"], answer: "le nombre de billes par sac" },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Une boîte de 12 œufs coûte 3 €. J'achète 4 boîtes (le magasin ouvre à 9 h). Combien d'œufs ?", answer: "48" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Même énoncé : combien ai-je payé en euros ?", answer: "12" },
  { id: 15, type: "qcm", difficulty: 3, question: "Un train de 8 wagons transporte 240 voyageurs sur 150 km. Combien de voyageurs par wagon (en moyenne) ?", options: [30, 40, 20, 150], answer: 30 },
  { id: 16, type: "qcm", difficulty: 3, question: "Donnée inutile dans le problème du train ?", options: ["les 150 km", "les 8 wagons", "les 240 voyageurs", "aucune"], answer: "les 150 km" },
  { id: 17, type: "fill_blank", difficulty: 3, question: "Marie économise 5 € par semaine pendant 6 semaines et a 2 chats. Combien a-t-elle économisé ?", answer: "30" },
  { id: 18, type: "true_false", difficulty: 3, question: "Avant de calculer, il faut repérer la question posée.", answer: true },
];
