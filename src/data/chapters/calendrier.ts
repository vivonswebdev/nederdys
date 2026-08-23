import { Exercise } from "@/data/chapters/types";

/** Calendrier : jours, mois, durées entre deux dates — 18 exercices (6 par niveau). */
export const calendrierExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Combien de jours dans une semaine ?", visualAid: "📅", options: [7, 5, 30, 12], answer: 7 },
  { id: 2, type: "qcm", difficulty: 1, question: "Combien de mois dans une année ?", options: [12, 10, 7, 52], answer: 12 },
  { id: 3, type: "qcm", difficulty: 1, question: "Quel jour vient après mardi ?", options: ["mercredi", "lundi", "jeudi", "samedi"], answer: "mercredi" },
  { id: 4, type: "order", difficulty: 1, question: "Range les jours dans l'ordre.", answer: ["lundi", "mardi", "mercredi", "jeudi"] },
  { id: 5, type: "true_false", difficulty: 1, question: "Le mois de janvier vient avant février.", answer: true },
  { id: 6, type: "fill_blank", difficulty: 1, question: "Le premier mois de l'année est ___", answer: "janvier" },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Combien de jours en février (année normale) ?", options: [28, 30, 31, 29], answer: 28 },
  { id: 8, type: "qcm", difficulty: 2, question: "Combien de jours en avril ?", options: [30, 31, 28, 29], answer: 30 },
  { id: 9, type: "fill_blank", difficulty: 2, question: "Du lundi 3 au vendredi 7, combien de jours se sont écoulés ?", answer: "4" },
  { id: 10, type: "order", difficulty: 2, question: "Range ces mois dans l'ordre.", answer: ["mars", "juin", "septembre", "décembre"] },
  { id: 11, type: "qcm", difficulty: 2, question: "Une année compte environ combien de semaines ?", options: [52, 12, 30, 365], answer: 52 },
  { id: 12, type: "true_false", difficulty: 2, question: "Il y a 365 jours dans une année normale.", answer: true },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Du 5 mars au 20 mars, combien de jours ?", answer: "15" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Du 28 avril au 3 mai, combien de jours ? (avril a 30 jours)", answer: "5", steps: [ { operation: "28 → 30 avril = 2 jours", description: "Fin du mois d'avril" }, { operation: "2 + 3 = 5", description: "Plus les 3 jours de mai" } ] },
  { id: 15, type: "qcm", difficulty: 3, question: "Le 1er juin est un lundi. Quel jour est le 8 juin ?", options: ["lundi", "mardi", "dimanche", "mercredi"], answer: "lundi" },
  { id: 16, type: "qcm", difficulty: 3, question: "Une année bissextile compte…", options: ["366 jours", "365 jours", "364 jours", "367 jours"], answer: "366 jours" },
  { id: 17, type: "fill_blank", difficulty: 3, question: "Un trimestre dure ___ mois.", answer: "3" },
  { id: 18, type: "qcm", difficulty: 3, question: "Les vacances durent du 1er au 15 juillet inclus : combien de jours ?", options: [15, 14, 16, 13], answer: 15 },
];
