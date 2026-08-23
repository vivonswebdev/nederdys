import { Exercise } from "@/data/chapters/types";

/** De dagen & het uur — 15 exercices (5 par niveau). */
export const dagenExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Welke dag komt na « maandag » ?", options: ["dinsdag", "zondag", "vrijdag", "woensdag"], answer: "dinsdag" },
  { id: 2, type: "qcm", difficulty: 1, question: "Wat betekent « zaterdag » ?", options: ["samedi", "dimanche", "vendredi", "jeudi"], answer: "samedi" },
  { id: 3, type: "qcm", difficulty: 1, question: "Comment dit-on « mercredi » ?", options: ["woensdag", "donderdag", "dinsdag", "maandag"], answer: "woensdag" },
  { id: 4, type: "qcm", difficulty: 1, question: "Hoe laat is het ?", visualAid: "🕒 3:00", options: ["drie uur", "vier uur", "twee uur", "vijf uur"], answer: "drie uur" },
  { id: 5, type: "qcm", difficulty: 1, question: "Welke dag is een weekenddag ?", options: ["zondag", "dinsdag", "donderdag", "maandag"], answer: "zondag" },

  // Niveau 2
  { id: 6, type: "fill_blank", difficulty: 2, question: "De dag na vrijdag is ___ .", answer: "zaterdag" },
  { id: 7, type: "fill_blank", difficulty: 2, question: "Comment dit-on « jeudi » ? ___", answer: "donderdag" },
  { id: 8, type: "true_false", difficulty: 2, question: "« half drie » betekent 2u30.", answer: true },
  { id: 9, type: "true_false", difficulty: 2, question: "« zondag » betekent « samedi ».", answer: false },
  { id: 10, type: "fill_blank", difficulty: 2, question: "Het is 5:00 → het is ___ uur.", answer: "vijf" },

  // Niveau 3
  { id: 11, type: "order", difficulty: 3, question: "Zet de dagen in de juiste volgorde.", answer: ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag"] },
  { id: 12, type: "match", difficulty: 3, question: "Koppel de dag aan de vertaling.", pairs: [ { left: "maandag", right: "lundi" }, { left: "woensdag", right: "mercredi" }, { left: "vrijdag", right: "vendredi" } ] },
  { id: 13, type: "match", difficulty: 3, question: "Koppel het uur aan de tijd.", pairs: [ { left: "half vier", right: "3:30" }, { left: "kwart over twee", right: "2:15" }, { left: "kwart voor zes", right: "5:45" } ] },
  { id: 14, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["Op", "woensdag", "ga", "ik", "zwemmen"] },
  { id: 15, type: "qcm", difficulty: 3, question: "Hoe zeg je 7:30 in het Nederlands ?", options: ["half acht", "half zeven", "kwart over zeven", "zeven uur"], answer: "half acht" },
];
