import { Exercise } from "@/data/chapters/types";

/** Eenvoudige zinnen (sujet-verbe-complément) — 15 exercices (5 par niveau). */
export const zinnenExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Welke zin is juist ?", options: ["Ik ben blij.", "Ik zijn blij.", "Ik bent blij.", "Ik is blij."], answer: "Ik ben blij." },
  { id: 2, type: "qcm", difficulty: 1, question: "Welke zin is juist ?", options: ["Hij speelt buiten.", "Hij spelen buiten.", "Hij speel buiten.", "Hij speelen buiten."], answer: "Hij speelt buiten." },
  { id: 3, type: "qcm", difficulty: 1, question: "Wat betekent « Ik lees een boek » ?", visualAid: "📖", options: ["Je lis un livre", "Je mange un gâteau", "Je vois un chien", "J'écris une lettre"], answer: "Je lis un livre" },
  { id: 4, type: "qcm", difficulty: 1, question: "Vul aan : Wij ___ naar school.", options: ["gaan", "gaat", "ga", "gaan wij"], answer: "gaan" },
  { id: 5, type: "qcm", difficulty: 1, question: "Vul aan : Zij ___ een appel.", options: ["eet", "eten", "eeten", "at"], answer: "eet" },

  // Niveau 2
  { id: 6, type: "fill_blank", difficulty: 2, question: "Ik ___ (heten) Lisa.", answer: "heet" },
  { id: 7, type: "fill_blank", difficulty: 2, question: "Jij ___ (wonen) in Meise.", answer: "woont" },
  { id: 8, type: "true_false", difficulty: 2, question: "De zin « Wij is thuis » is juist.", answer: false },
  { id: 9, type: "true_false", difficulty: 2, question: "De zin « Hij drinkt water » is juist.", answer: true },
  { id: 10, type: "fill_blank", difficulty: 2, question: "Wij ___ (spelen) in de tuin.", answer: "spelen" },

  // Niveau 3
  { id: 11, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["Ik", "ga", "naar", "school"] },
  { id: 12, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["De", "kat", "slaapt", "op", "de", "stoel"] },
  { id: 13, type: "order", difficulty: 3, question: "Zet de vraag in de juiste volgorde.", answer: ["Hoe", "heet", "jij", "?"] },
  { id: 14, type: "match", difficulty: 3, question: "Koppel de zin aan de vertaling.", pairs: [ { left: "Ik ben moe", right: "Je suis fatigué" }, { left: "Ik heb honger", right: "J'ai faim" }, { left: "Ik ben blij", right: "Je suis content" } ] },
  { id: 15, type: "qcm", difficulty: 3, question: "Welke zin betekent « Nous mangeons à la maison » ?", options: ["Wij eten thuis.", "Wij gaan thuis.", "Wij eten op school.", "Zij eten thuis."], answer: "Wij eten thuis." },
];
