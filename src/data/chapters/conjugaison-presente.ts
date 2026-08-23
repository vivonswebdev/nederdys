import { Exercise } from "./types";

/** ik / jij / hij au présent — 18 exercices. */
export const conjugaisonPresenteExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Ik ___ (spelen) — je joue", options: ["speel", "speelt", "spelen"], answer: "speel" },
  { id: 2, type: "qcm", difficulty: 1, question: "Jij ___ (werken) — tu travailles", options: ["werkt", "werk", "werken"], answer: "werkt" },
  { id: 3, type: "qcm", difficulty: 1, question: "Hij ___ (lopen) — il court", options: ["loopt", "loop", "lopen"], answer: "loopt" },
  { id: 4, type: "qcm", difficulty: 1, question: "Ik ___ (wonen) in Meise.", options: ["woon", "woont", "wonen"], answer: "woon" },
  { id: 5, type: "true_false", difficulty: 1, question: "Avec « ik », on utilise le radical du verbe, sans -t.", answer: true },
  { id: 6, type: "qcm", difficulty: 1, question: "Zij (elle) ___ (eten) een appel.", options: ["eet", "eten", "eett"], answer: "eet" },

  // Niveau 2
  { id: 7, type: "fill_blank", difficulty: 2, question: "Ik ___ (zijn) blij. (je suis content)", answer: "ben" },
  { id: 8, type: "fill_blank", difficulty: 2, question: "Jij ___ (hebben) een hond.", answer: "hebt" },
  { id: 9, type: "fill_blank", difficulty: 2, question: "Hij ___ (zijn) mijn broer.", answer: "is" },
  { id: 10, type: "qcm", difficulty: 2, question: "Wij ___ (spelen) buiten.", options: ["spelen", "speelt", "speel"], answer: "spelen" },
  { id: 11, type: "true_false", difficulty: 2, question: "Dans « Speel jij ? », le verbe garde le -t.", answer: false },
  { id: 12, type: "qcm", difficulty: 2, question: "___ jij naar school ? (gaan)", options: ["Ga", "Gaat", "Gaan"], answer: "Ga" },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Zij ___ (lezen) een boek.", answer: "leest" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Ik ___ (drinken) water.", answer: "drink" },
  { id: 15, type: "order", difficulty: 3, question: "Remets la phrase dans l'ordre.", answer: ["Ik", "speel", "in", "de", "tuin"] },
  { id: 16, type: "order", difficulty: 3, question: "Remets la question dans l'ordre.", answer: ["Woon", "jij", "in", "Meise"] },
  { id: 17, type: "qcm", difficulty: 3, question: "Jullie ___ (komen) morgen.", options: ["komen", "komt", "kom"], answer: "komen" },
  { id: 18, type: "match", difficulty: 3, question: "Associe le pronom et la forme de « zijn ».", pairs: [
    { left: "ik", right: "ben" },
    { left: "jij", right: "bent" },
    { left: "hij", right: "is" },
    { left: "wij", right: "zijn" },
  ] },
];
