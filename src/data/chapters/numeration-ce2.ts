import { Exercise } from "./types";

export const numerationCe2Exercises: Exercise[] = [
  // ---------- NIVEAU 1 : support visuel, questions directes ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "Quel est le chiffre des dizaines dans 47 ?",
    visualAid: "4 paquets de 10 🟦🟦🟦🟦 + 7 unités 🔸",
    options: [4, 7, 40, 74],
    answer: 4,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "Écris en chiffres : soixante-douze = ___",
    visualAid: "70 + 2",
    answer: "72",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "35 est plus grand que 53.",
    visualAid: "35 🟦🟦🟦 · 53 🟦🟦🟦🟦🟦",
    answer: false,
  },
  {
    id: 4,
    type: "order",
    difficulty: 1,
    question: "Range du plus petit au plus grand.",
    answer: ["8", "12", "21", "30"],
  },
  {
    id: 5,
    type: "qcm",
    difficulty: 1,
    question: "Quel nombre vient juste après 99 ?",
    options: [90, 98, 100, 110],
    answer: 100,
  },

  // ---------- NIVEAU 2 : nombres à 3 chiffres, moins d'aide ----------
  {
    id: 6,
    type: "qcm",
    difficulty: 2,
    question: "Quel est le chiffre des centaines dans 428 ?",
    options: [2, 4, 8, 42],
    answer: 4,
  },
  {
    id: 7,
    type: "fill_blank",
    difficulty: 2,
    question: "Écris en chiffres : trois cent quarante-cinq = ___",
    answer: "345",
  },
  {
    id: 8,
    type: "match",
    difficulty: 2,
    question: "Associe chaque nombre à son écriture en lettres.",
    pairs: [
      { left: "120", right: "cent vingt" },
      { left: "102", right: "cent deux" },
      { left: "210", right: "deux cent dix" },
      { left: "201", right: "deux cent un" },
    ],
  },
  {
    id: 9,
    type: "order",
    difficulty: 2,
    question: "Range du plus petit au plus grand.",
    answer: ["305", "335", "350", "353"],
  },
  {
    id: 10,
    type: "true_false",
    difficulty: 2,
    question: "Dans 507, le chiffre 0 est celui des dizaines.",
    answer: true,
  },

  // ---------- NIVEAU 3 : énoncés à lire, plusieurs étapes, aucun support ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question:
      "Je suis un nombre à 3 chiffres. Mon chiffre des centaines est 6, celui des dizaines est 0 et celui des unités vaut le double de 3. Qui suis-je ?",
    options: [66, 606, 616, 660],
    answer: 606,
    steps: [
      { operation: "2 × 3 = 6", description: "Le chiffre des unités" },
      { operation: "6 centaines, 0 dizaine, 6 unités", description: "606" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "Calcule la décomposition : 4 × 100 + 7 × 10 + 3 = ___",
    answer: "473",
  },
  {
    id: 13,
    type: "qcm",
    difficulty: 3,
    question: "Quel est le nombre juste avant 1000 ?",
    options: [900, 990, 999, 1001],
    answer: 999,
  },
  {
    id: 14,
    type: "order",
    difficulty: 3,
    question: "Range du plus grand au plus petit.",
    answer: ["987", "897", "879", "798"],
  },
  {
    id: 15,
    type: "true_false",
    difficulty: 3,
    question: "789 arrondi à la centaine la plus proche donne 800.",
    answer: true,
  },
];
