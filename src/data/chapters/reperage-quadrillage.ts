import { Exercise } from "@/data/chapters/types";

/** Repérage sur quadrillage (ligne / colonne) — 18 exercices (6 par niveau). */
const GRID = "    A  B  C  D\n1   🌳 ·  ·  🏠\n2   ·  ⚽ ·  ·\n3   🐱 ·  🌸 ·";

export const reperageQuadrillageExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Où se trouve l'arbre 🌳 ?", visualAid: GRID, options: ["A1", "D1", "B2", "A3"], answer: "A1" },
  { id: 2, type: "qcm", difficulty: 1, question: "Où se trouve la maison 🏠 ?", visualAid: GRID, options: ["D1", "A1", "C3", "B2"], answer: "D1" },
  { id: 3, type: "qcm", difficulty: 1, question: "Que trouve-t-on en B2 ?", visualAid: GRID, options: ["le ballon ⚽", "le chat 🐱", "la fleur 🌸", "rien"], answer: "le ballon ⚽" },
  { id: 4, type: "fill_blank", difficulty: 1, question: "Écris la case du chat 🐱 (lettre puis chiffre).", visualAid: GRID, answer: "A3" },
  { id: 5, type: "true_false", difficulty: 1, question: "La fleur 🌸 est en C3.", visualAid: GRID, answer: true },
  { id: 6, type: "qcm", difficulty: 1, question: "La lettre indique…", options: ["la colonne", "la ligne", "la couleur", "la taille"], answer: "la colonne" },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Je pars de A1 et j'avance de 2 colonnes. Où suis-je ?", visualAid: GRID, options: ["C1", "A3", "B1", "C3"], answer: "C1" },
  { id: 8, type: "qcm", difficulty: 2, question: "Je pars de D1 et je descends de 2 lignes. Où suis-je ?", visualAid: GRID, options: ["D3", "D2", "B1", "C3"], answer: "D3" },
  { id: 9, type: "fill_blank", difficulty: 2, question: "Case située 1 ligne sous B2 :", visualAid: GRID, answer: "B3" },
  { id: 10, type: "true_false", difficulty: 2, question: "La case A3 et la case C3 sont sur la même ligne.", visualAid: GRID, answer: true },
  { id: 11, type: "qcm", difficulty: 2, question: "Combien de cases contient ce quadrillage ?", visualAid: GRID, options: [12, 7, 9, 16], answer: 12 },
  { id: 12, type: "order", difficulty: 2, question: "Range ces cases de gauche à droite (ligne 1).", answer: ["A1", "B1", "C1", "D1"] },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Depuis A1 : 3 colonnes à droite puis 2 lignes en bas. Case atteinte ?", visualAid: GRID, answer: "D3", steps: [ { operation: "A → D", description: "3 colonnes vers la droite" }, { operation: "1 → 3", description: "2 lignes vers le bas" } ] },
  { id: 14, type: "qcm", difficulty: 3, question: "Combien de cases sépare A1 de D1 (en se déplaçant sur la ligne) ?", visualAid: GRID, options: [3, 4, 2, 5], answer: 3 },
  { id: 15, type: "true_false", difficulty: 3, question: "Sur une grille, la case (colonne C, ligne 2) s'écrit C2.", visualAid: GRID, answer: true },
  { id: 16, type: "qcm", difficulty: 3, question: "Le trésor est 1 case à droite du chat 🐱. Où est-il ?", visualAid: GRID, options: ["B3", "A2", "C3", "B2"], answer: "B3" },
  { id: 17, type: "fill_blank", difficulty: 3, question: "Case symétrique de A1 par rapport à la colonne du milieu (entre B et C) :", visualAid: GRID, answer: "D1" },
  { id: 18, type: "order", difficulty: 3, question: "Range ces cases de haut en bas (colonne A).", answer: ["A1", "A2", "A3"] },
];
