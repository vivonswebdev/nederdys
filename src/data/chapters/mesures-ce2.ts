import { Exercise } from "./types";

export const mesuresCe2Exercises: Exercise[] = [
  // ---------- NIVEAU 1 ----------
  {
    id: 1,
    type: "qcm",
    difficulty: 1,
    question: "Combien y a-t-il de centimètres dans 1 mètre ?",
    visualAid: "📏 une règle de 1 m",
    options: [10, 50, 100, 1000],
    answer: 100,
  },
  {
    id: 2,
    type: "fill_blank",
    difficulty: 1,
    question: "1 kg = ___ g",
    visualAid: "⚖️ un paquet de sucre de 1 kg",
    answer: "1000",
  },
  {
    id: 3,
    type: "true_false",
    difficulty: 1,
    question: "1 heure dure 100 minutes.",
    answer: false,
  },
  {
    id: 4,
    type: "qcm",
    difficulty: 1,
    question: "Quelle unité utilise-t-on pour mesurer la longueur d'un crayon ?",
    options: ["le litre", "le kilogramme", "le centimètre", "l'heure"],
    answer: "le centimètre",
  },
  {
    id: 5,
    type: "order",
    difficulty: 1,
    question: "Range du plus court au plus long.",
    answer: ["1 cm", "1 dm", "1 m", "1 km"],
  },

  // ---------- NIVEAU 2 ----------
  {
    id: 6,
    type: "fill_blank",
    difficulty: 2,
    question: "2 m 50 cm = ___ cm",
    answer: "250",
  },
  {
    id: 7,
    type: "qcm",
    difficulty: 2,
    question: "3 kg = ? g",
    options: [30, 300, 3000, 30000],
    answer: 3000,
  },
  {
    id: 8,
    type: "true_false",
    difficulty: 2,
    question: "1 litre = 100 centilitres",
    answer: true,
  },
  {
    id: 9,
    type: "match",
    difficulty: 2,
    question: "Associe chaque mesure à son équivalent.",
    pairs: [
      { left: "1 km", right: "1000 m" },
      { left: "1 m", right: "100 cm" },
      { left: "1 kg", right: "1000 g" },
      { left: "1 L", right: "100 cL" },
    ],
  },
  {
    id: 10,
    type: "order",
    difficulty: 2,
    question: "Range du plus léger au plus lourd.",
    answer: ["250 g", "1 kg", "1 kg 500 g", "2 kg"],
  },

  // ---------- NIVEAU 3 : conversions + calcul, énoncés ----------
  {
    id: 11,
    type: "qcm",
    difficulty: 3,
    question: "Une bouteille contient 1 L 50 cL de jus. On en verse 40 cL. Combien reste-t-il ?",
    options: ["10 cL", "90 cL", "110 cL", "150 cL"],
    answer: "110 cL",
    steps: [
      { operation: "1 L 50 cL = 150 cL", description: "Conversion" },
      { operation: "150 - 40 = 110", description: "Ce qu'il reste" },
    ],
  },
  {
    id: 12,
    type: "fill_blank",
    difficulty: 3,
    question: "Un film commence à 14h20 et dure 1h45. Il se termine à ___ (écris comme 16h05)",
    answer: "16h05",
  },
  {
    id: 13,
    type: "true_false",
    difficulty: 3,
    question: "3 m 5 cm = 350 cm",
    answer: false,
  },
  {
    id: 14,
    type: "qcm",
    difficulty: 3,
    question: "Marc court 1 km 200 m le matin et 800 m le soir. Quelle distance a-t-il parcourue en tout ?",
    options: ["1 km 400 m", "1 km 800 m", "2 km", "2 km 200 m"],
    answer: "2 km",
    steps: [
      { operation: "1200 m + 800 m = 2000 m", description: "Addition en mètres" },
      { operation: "2000 m = 2 km", description: "Conversion" },
    ],
  },
  {
    id: 15,
    type: "order",
    difficulty: 3,
    question: "Range du plus court au plus long.",
    answer: ["45 min", "1 h", "1 h 15 min", "90 min"],
  },
];
