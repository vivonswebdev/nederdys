import { Exercise } from "@/data/chapters/types";

const TABLE = "Sport   | Lundi | Mardi | Mercredi\nFoot    |   5   |   3   |    7\nDanse   |   2   |   6   |    4\nNatation|   4   |   4   |    1";

/** Lire un tableau à double entrée — 18 exercices (6 par niveau). */
export const tableauxDoubleEntreeExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Combien d'enfants au foot le lundi ?", visualAid: TABLE, options: [5, 3, 7, 2], answer: 5 },
  { id: 2, type: "qcm", difficulty: 1, question: "Combien d'enfants à la danse le mardi ?", visualAid: TABLE, options: [6, 2, 4, 3], answer: 6 },
  { id: 3, type: "fill_blank", difficulty: 1, question: "Natation le mercredi : ___ enfants", visualAid: TABLE, answer: "1" },
  { id: 4, type: "true_false", difficulty: 1, question: "Le mercredi, il y a 7 enfants au foot.", visualAid: TABLE, answer: true },
  { id: 5, type: "qcm", difficulty: 1, question: "Quelle activité a 4 enfants le lundi ?", visualAid: TABLE, options: ["natation", "foot", "danse", "aucune"], answer: "natation" },
  { id: 6, type: "qcm", difficulty: 1, question: "Combien de colonnes de jours dans ce tableau ?", visualAid: TABLE, options: [3, 4, 2, 5], answer: 3 },

  // Niveau 2
  { id: 7, type: "fill_blank", difficulty: 2, question: "Total des enfants au foot sur les 3 jours :", visualAid: TABLE, answer: "15" },
  { id: 8, type: "fill_blank", difficulty: 2, question: "Total des enfants le mardi (toutes activités) :", visualAid: TABLE, answer: "13" },
  { id: 9, type: "qcm", difficulty: 2, question: "Quelle activité a le plus d'enfants sur la semaine ?", visualAid: TABLE, options: ["foot", "danse", "natation", "égalité"], answer: "foot" },
  { id: 10, type: "true_false", difficulty: 2, question: "La danse a plus d'enfants que la natation le mercredi.", visualAid: TABLE, answer: true },
  { id: 11, type: "fill_blank", difficulty: 2, question: "Total de la natation sur les 3 jours :", visualAid: TABLE, answer: "9" },
  { id: 12, type: "qcm", difficulty: 2, question: "Quel jour compte le plus d'enfants au total ?", visualAid: TABLE, options: ["mercredi", "lundi", "mardi", "égalité"], answer: "mercredi" },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Total général du tableau :", visualAid: TABLE, answer: "36", steps: [ { operation: "Foot 15 + Danse 12", description: "Deux premières lignes" }, { operation: "27 + Natation 9 = 36", description: "Total" } ] },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Différence entre le total du foot et celui de la natation :", visualAid: TABLE, answer: "6" },
  { id: 15, type: "qcm", difficulty: 3, question: "Total de la danse sur la semaine :", visualAid: TABLE, options: [12, 10, 14, 11], answer: 12 },
  { id: 16, type: "true_false", difficulty: 3, question: "Le lundi et le mardi ont le même total d'enfants.", visualAid: TABLE, answer: false },
  { id: 17, type: "qcm", difficulty: 3, question: "Si 3 enfants de plus viennent à la danse mercredi, quel est le nouveau total danse ?", visualAid: TABLE, options: [15, 12, 7, 9], answer: 15 },
  { id: 18, type: "order", difficulty: 3, question: "Range les activités du plus petit au plus grand total hebdomadaire.", answer: ["natation", "danse", "foot"] },
];
