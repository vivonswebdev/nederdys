import { Exercise } from "@/data/chapters/types";

/** Axe de symétrie et figures symétriques — 18 exercices (6 par niveau). */
export const symetrieExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "true_false", difficulty: 1, question: "Un papillon a un axe de symétrie.", visualAid: "🦋 (aile gauche | aile droite)", answer: true },
  { id: 2, type: "true_false", difficulty: 1, question: "Un cœur a un axe de symétrie vertical.", visualAid: "❤️", answer: true },
  { id: 3, type: "qcm", difficulty: 1, question: "Quelle lettre a un axe de symétrie vertical ?", visualAid: "A | F | L | R", options: ["A", "F", "L", "R"], answer: "A" },
  { id: 4, type: "true_false", difficulty: 1, question: "Le carré a plusieurs axes de symétrie.", visualAid: "□ (plié en 2 dans les deux sens)", answer: true },
  { id: 5, type: "qcm", difficulty: 1, question: "Combien d'axes de symétrie a un cercle ?", visualAid: "⭕", options: ["une infinité", "1", "2", "aucun"], answer: "une infinité" },
  { id: 6, type: "true_false", difficulty: 1, question: "La lettre P a un axe de symétrie.", visualAid: "P", answer: false },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Combien d'axes de symétrie a un rectangle (non carré) ?", visualAid: "▭ | plié haut-bas et gauche-droite", options: [2, 1, 4, 0], answer: 2 },
  { id: 8, type: "qcm", difficulty: 2, question: "Combien d'axes de symétrie a un triangle équilatéral ?", visualAid: "△", options: [3, 1, 2, 6], answer: 3 },
  { id: 9, type: "true_false", difficulty: 2, question: "Un parallélogramme quelconque a un axe de symétrie.", visualAid: "▱", answer: false },
  { id: 10, type: "fill_blank", difficulty: 2, question: "Un carré a ___ axes de symétrie.", visualAid: "□ : | — \\ /", answer: "4" },
  { id: 11, type: "qcm", difficulty: 2, question: "Dans un miroir vertical, un point à 3 carreaux à gauche de l'axe se retrouve à…", visualAid: "| axe |  ●--3--|--?--", options: ["3 carreaux à droite", "3 carreaux à gauche", "6 carreaux à droite", "au milieu"], answer: "3 carreaux à droite" },
  { id: 12, type: "true_false", difficulty: 2, question: "Le symétrique d'un point posé SUR l'axe est ce même point.", answer: true },

  // Niveau 3
  { id: 13, type: "qcm", difficulty: 3, question: "Quelle figure n'a AUCUN axe de symétrie ?", visualAid: "△ équilatéral | ▭ | ▱ | □", options: ["le parallélogramme", "le rectangle", "le carré", "le triangle équilatéral"], answer: "le parallélogramme" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Un hexagone régulier a ___ axes de symétrie.", visualAid: "⬡", answer: "6" },
  { id: 15, type: "true_false", difficulty: 3, question: "Une figure symétrique et son image ont la même aire.", answer: true },
  { id: 16, type: "qcm", difficulty: 3, question: "Sur un quadrillage, l'axe est la colonne 5. Le symétrique du point en colonne 2 est en colonne…", visualAid: "col: 1 2 3 [4] 5(axe) 6 7 8", options: [8, 7, 6, 3], answer: 8 },
  { id: 17, type: "order", difficulty: 3, question: "Range ces figures du moins d'axes au plus d'axes.", answer: ["parallélogramme", "rectangle", "carré", "cercle"] },
  { id: 18, type: "true_false", difficulty: 3, question: "Le symétrique d'un segment est un segment de même longueur.", answer: true },
];
