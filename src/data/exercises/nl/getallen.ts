import { Exercise } from "@/data/chapters/types";

/** De getallen 1-20 — 15 exercices (5 par niveau). */
export const getallenExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Hoeveel is « drie » ?", options: ["3", "5", "8", "13"], answer: "3" },
  { id: 2, type: "qcm", difficulty: 1, question: "Hoe schrijf je 7 in het Nederlands ?", options: ["zeven", "zes", "acht", "negen"], answer: "zeven" },
  { id: 3, type: "qcm", difficulty: 1, question: "Hoeveel appels zie je ?", visualAid: "🍎🍎🍎🍎🍎", options: ["vijf", "vier", "zes", "zeven"], answer: "vijf" },
  { id: 4, type: "qcm", difficulty: 1, question: "Hoe schrijf je 10 in het Nederlands ?", options: ["tien", "twee", "twaalf", "twintig"], answer: "tien" },
  { id: 5, type: "qcm", difficulty: 1, question: "Welk getal komt na « acht » ?", options: ["negen", "zeven", "tien", "elf"], answer: "negen" },

  // Niveau 2
  { id: 6, type: "fill_blank", difficulty: 2, question: "Schrijf 12 in het Nederlands.", answer: "twaalf" },
  { id: 7, type: "fill_blank", difficulty: 2, question: "Schrijf 15 in het Nederlands.", answer: "vijftien" },
  { id: 8, type: "true_false", difficulty: 2, question: "« zestien » = 16", answer: true },
  { id: 9, type: "true_false", difficulty: 2, question: "« veertien » = 40", answer: false },
  { id: 10, type: "fill_blank", difficulty: 2, question: "Schrijf 20 in het Nederlands.", answer: "twintig" },

  // Niveau 3
  { id: 11, type: "match", difficulty: 3, question: "Koppel het woord aan het cijfer.", pairs: [ { left: "elf", right: "11" }, { left: "dertien", right: "13" }, { left: "achttien", right: "18" } ] },
  { id: 12, type: "match", difficulty: 3, question: "Koppel het woord aan het cijfer.", pairs: [ { left: "zeventien", right: "17" }, { left: "negentien", right: "19" }, { left: "vijftien", right: "15" } ] },
  { id: 13, type: "order", difficulty: 3, question: "Zet de getallen in de juiste volgorde (klein naar groot).", answer: ["twee", "zes", "elf", "veertien"] },
  { id: 14, type: "fill_blank", difficulty: 2, question: "Tien + vijf = ___ (schrijf het woord)", answer: "vijftien" },
  { id: 15, type: "qcm", difficulty: 3, question: "Wat is « twintig min drie » ?", options: ["zeventien", "zestien", "dertien", "achttien"], answer: "zeventien" },
];
