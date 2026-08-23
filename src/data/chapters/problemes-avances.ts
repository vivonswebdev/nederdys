import { Exercise } from "./types";

export const problemesAvancesExercises: Exercise[] = [
  // ---------- NIVEAU 1 : deux étapes guidées ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "Tom a 15 €. Il achète 3 stylos à 2 € chacun. Combien lui reste-t-il ?",
    visualAid: "3 × 2 € puis on retire de 15 €",
    options: [8, 9, 10, 12],
    answer: 9,
    steps: [
      { operation: "3 × 2 = 6", description: "Prix total des stylos" },
      { operation: "15 - 6 = 9", description: "Ce qu'il reste" },
    ],
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "Anna a 4 paquets de 6 images. Elle en donne 3. Il lui en reste ___",
    visualAid: "4 × 6 puis - 3",
    answer: "21",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "Pour « 3 boîtes de 5 billes, j'en perds 2 », on multiplie d'abord, puis on soustrait.",
    answer: true,
  },
  {
    id: 4,
    type: "qcm",
    difficulty: 1,
    question: "Emma lit 12 pages lundi et le double mardi. Combien de pages en tout ?",
    visualAid: "12 puis 12 × 2",
    options: [24, 30, 34, 36],
    answer: 36,
  },
  {
    id: 5,
    type: "order",
    difficulty: 1,
    question: "Remets les étapes dans le bon ordre.",
    answer: ["Lire l'énoncé", "Repérer les nombres utiles", "Calculer les étapes", "Écrire la réponse"],
  },

  // ---------- NIVEAU 2 ----------
  {
    id: 6,
    type: "qcm",
    difficulty: 2,
    question: "Un jardinier plante 6 rangées de 8 fleurs. 9 fleurs fanent. Combien en reste-t-il ?",
    options: [39, 42, 48, 57],
    answer: 39,
    steps: [
      { operation: "6 × 8 = 48", description: "Fleurs plantées" },
      { operation: "48 - 9 = 39", description: "Fleurs restantes" },
    ],
  },
  {
    id: 7,
    type: "fill_blank",
    difficulty: 2,
    question: "Une place de cinéma coûte 7 €. Une famille de 4 paye avec 40 €. On lui rend ___ €",
    answer: "12",
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "5 sacs de 3 kg pèsent 15 kg au total.",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque expression à son résultat.",
    pairs: [
      { left: "le double de 12", right: "24" },
      { left: "la moitié de 30", right: "15" },
      { left: "le triple de 6", right: "18" },
      { left: "le quart de 20", right: "5" },
    ],
  },
  {
    id: 10,
    type: "qcm",
    difficulty: 2,
    question: "Léo économise 5 € par semaine pendant 8 semaines, puis dépense 12 €. Combien lui reste-t-il ?",
    options: [28, 32, 40, 48],
    answer: 28,
  },

  // ---------- NIVEAU 3 : informations parasites, énoncés longs ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question:
      "Dans un bus il y a 45 passagers. 12 descendent à l'arrêt suivant. Le bus pèse 8 tonnes. Combien reste-t-il de passagers ?",
    options: [33, 35, 37, 40],
    answer: 33,
    steps: [
      { operation: "Le poids du bus ne sert à rien", description: "Information parasite" },
      { operation: "45 - 12 = 33", description: "Passagers restants" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "Un train part à 9h15 et roule pendant 2h30. Il arrive à ___ (écris comme 11h45)",
    answer: "11h45",
  },
  {
    id: 13,
    type: "qcm",
    difficulty: 3,
    question:
      "Une boulangerie vend 120 pains le matin et 85 l'après-midi. Le boulanger possède 3 fours. Combien de pains a-t-il vendus ?",
    options: [120, 195, 205, 210],
    answer: 205,
  },
  {
    id: 14,
    type: "true_false",
    difficulty: 3,
    question: "Dans un problème, tous les nombres de l'énoncé servent forcément au calcul.",
    answer: false,
  },
  {
    id: 15,
    type: "qcm",
    difficulty: 3,
    question: "Sofia achète 3 livres à 8 € et un marque-page à 2 €. Elle avait 40 €. Combien lui reste-t-il ?",
    options: [14, 16, 24, 30],
    answer: 14,
    steps: [
      { operation: "3 × 8 + 2 = 26", description: "Total dépensé" },
      { operation: "40 - 26 = 14", description: "Ce qu'il reste" },
    ],
  },
];
