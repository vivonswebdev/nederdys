import { Exercise } from "./types";

export const problemesCe2Exercises: Exercise[] = [
  // ---------- NIVEAU 1 : une seule opération, énoncé court ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "Marie a 12 billes. Elle en donne 4 à son frère. Combien lui en reste-t-il ?",
    visualAid: "🔵×12 → on en donne 4",
    options: [6, 8, 10, 16],
    answer: 8,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "Il y a 5 boîtes de 3 gâteaux. Combien de gâteaux en tout ? ___",
    visualAid: "🍪🍪🍪 × 5 boîtes",
    answer: "15",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "Si j'achète 2 livres à 6 € chacun, je paye 12 €.",
    answer: true,
  },
  {
    id: 4,
    type: "qcm",
    difficulty: 1,
    question: "Dans le bus il y a 18 places. 11 sont occupées. Combien de places sont libres ?",
    options: [5, 7, 9, 29],
    answer: 7,
  },
  {
    id: 5,
    type: "order",
    difficulty: 1,
    question: "Range les prix du moins cher au plus cher.",
    answer: ["3 €", "7 €", "12 €", "20 €"],
  },

  // ---------- NIVEAU 2 ----------
  {
    id: 6,
    type: "qcm",
    difficulty: 2,
    question: "Un paquet de 24 crayons est partagé entre 4 enfants. Combien chacun en reçoit-il ?",
    options: [4, 6, 8, 12],
    answer: 6,
  },
  {
    id: 7,
    type: "fill_blank",
    difficulty: 2,
    question: "Paul a 45 €. Il reçoit 18 €, puis dépense 20 €. Il lui reste ___ €",
    answer: "43",
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "Pour partager équitablement 20 bonbons entre 5 enfants, chacun en reçoit 4.",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque situation à son opération.",
    pairs: [
      { left: "3 paquets de 5 images", right: "3 × 5" },
      { left: "12 billes partagées entre 4", right: "12 ÷ 4" },
      { left: "15 bonbons, j'en mange 6", right: "15 - 6" },
      { left: "8 cartes et 7 de plus", right: "8 + 7" },
    ],
  },
  {
    id: 10,
    type: "qcm",
    difficulty: 2,
    question: "Un livre coûte 12 €. Combien coûtent 4 livres identiques ?",
    options: [16, 42, 44, 48],
    answer: 48,
  },

  // ---------- NIVEAU 3 : deux étapes + information parasite ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question:
      "Dans un bus il y a 45 passagers. 12 descendent à l'arrêt suivant. Le bus pèse 8 tonnes. Combien reste-t-il de passagers ?",
    options: [33, 35, 37, 40],
    answer: 33,
    steps: [
      { operation: "On ignore le poids du bus", description: "Information inutile" },
      { operation: "45 - 12 = 33", description: "Passagers restants" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "Un fermier a 5 poules. Chacune pond 3 œufs par jour. En 4 jours, il récolte ___ œufs.",
    answer: "60",
  },
  {
    id: 13,
    type: "qcm",
    difficulty: 3,
    question: "Zoé achète 4 cahiers à 3 € et un stylo à 2 €. Elle donne un billet de 20 €. Combien lui rend-on ?",
    options: [4, 6, 8, 14],
    answer: 6,
    steps: [
      { operation: "4 × 3 + 2 = 14", description: "Total des achats" },
      { operation: "20 - 14 = 6", description: "Monnaie rendue" },
    ],
  },
  {
    id: 14,
    type: "true_false",
    difficulty: 3,
    question: "Pour savoir combien d'argent il reste après un achat, on additionne le prix à ce qu'on avait.",
    answer: false,
  },
  {
    id: 15,
    type: "order",
    difficulty: 3,
    question: "Remets les étapes de résolution d'un problème dans l'ordre.",
    answer: ["Lire l'énoncé", "Repérer les nombres utiles", "Calculer", "Vérifier le résultat"],
  },
];
