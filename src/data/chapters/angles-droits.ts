import { Exercise } from "@/data/chapters/types";

/** Reconnaître un angle droit — 18 exercices (6 par niveau). */
export const anglesDroitsExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "true_false", difficulty: 1, question: "Le coin d'une feuille de papier est un angle droit.", visualAid: "⌐", answer: true },
  { id: 2, type: "qcm", difficulty: 1, question: "Quel outil sert à vérifier un angle droit ?", visualAid: "📐", options: ["l'équerre", "la règle", "le compas", "la calculette"], answer: "l'équerre" },
  { id: 3, type: "true_false", difficulty: 1, question: "Tous les angles du carré sont droits.", visualAid: "□", answer: true },
  { id: 4, type: "qcm", difficulty: 1, question: "Un angle droit mesure…", options: ["90°", "45°", "180°", "60°"], answer: "90°" },
  { id: 5, type: "true_false", difficulty: 1, question: "Le triangle équilatéral a un angle droit.", visualAid: "△", answer: false },
  { id: 6, type: "fill_blank", difficulty: 1, question: "Un rectangle a ___ angles droits.", visualAid: "▭", answer: "4" },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Un angle plus petit qu'un angle droit s'appelle un angle…", options: ["aigu", "obtus", "plat", "plein"], answer: "aigu" },
  { id: 8, type: "qcm", difficulty: 2, question: "Un angle plus grand qu'un angle droit (mais moins que 180°) s'appelle un angle…", options: ["obtus", "aigu", "droit", "nul"], answer: "obtus" },
  { id: 9, type: "true_false", difficulty: 2, question: "Un angle de 100° est un angle aigu.", answer: false },
  { id: 10, type: "qcm", difficulty: 2, question: "Combien d'angles droits dans un demi-tour (180°) ?", options: [2, 1, 3, 4], answer: 2 },
  { id: 11, type: "true_false", difficulty: 2, question: "Un triangle rectangle possède exactement un angle droit.", visualAid: "◺", answer: true },
  { id: 12, type: "fill_blank", difficulty: 2, question: "Un angle de 45° est deux fois plus ___ qu'un angle droit. (petit / grand)", answer: "petit" },

  // Niveau 3
  { id: 13, type: "qcm", difficulty: 3, question: "Combien d'angles droits fait l'aiguille des heures entre 3 h et 6 h ?", visualAid: "🕒 → 🕕", options: [1, 2, 3, 0], answer: 1 },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Un tour complet vaut ___ angles droits.", answer: "4" },
  { id: 15, type: "qcm", difficulty: 3, question: "Deux droites qui se coupent en formant un angle droit sont…", options: ["perpendiculaires", "parallèles", "obliques", "confondues"], answer: "perpendiculaires" },
  { id: 16, type: "true_false", difficulty: 3, question: "Deux droites parallèles forment un angle droit entre elles.", answer: false },
  { id: 17, type: "qcm", difficulty: 3, question: "Dans un triangle rectangle, la somme des deux autres angles vaut…", options: ["90°", "180°", "45°", "120°"], answer: "90°" },
  { id: 18, type: "order", difficulty: 3, question: "Range ces angles du plus petit au plus grand.", answer: ["30°", "90°", "120°", "180°"] },
];
