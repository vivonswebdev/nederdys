import { Exercise } from "@/data/chapters/types";

/** De familie — 15 exercices (5 par niveau). */
export const familieExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Wat betekent « de mama » ?", visualAid: "👩", options: ["la maman", "le papa", "la sœur", "le frère"], answer: "la maman" },
  { id: 2, type: "qcm", difficulty: 1, question: "Comment dit-on « le papa » ?", visualAid: "👨", options: ["de papa", "de oma", "de opa", "de zus"], answer: "de papa" },
  { id: 3, type: "qcm", difficulty: 1, question: "Wat betekent « de zus » ?", options: ["la sœur", "le frère", "la grand-mère", "la tante"], answer: "la sœur" },
  { id: 4, type: "qcm", difficulty: 1, question: "Wat betekent « de broer » ?", options: ["le frère", "la sœur", "le cousin", "l'oncle"], answer: "le frère" },
  { id: 5, type: "qcm", difficulty: 1, question: "Wie is « de oma » ?", visualAid: "👵", options: ["la grand-mère", "le grand-père", "la maman", "la tante"], answer: "la grand-mère" },

  // Niveau 2
  { id: 6, type: "fill_blank", difficulty: 2, question: "Mijn ___ is de papa van mijn papa. (grand-père)", visualAid: "👴", answer: "opa" },
  { id: 7, type: "fill_blank", difficulty: 2, question: "Ik heb één ___ en twee zussen. (frère)", answer: "broer" },
  { id: 8, type: "true_false", difficulty: 2, question: "« de tante » betekent « la tante ».", answer: true },
  { id: 9, type: "true_false", difficulty: 2, question: "« de oom » betekent « la cousine ».", answer: false },
  { id: 10, type: "fill_blank", difficulty: 2, question: "Dit is mijn familie : mama, papa en ___ (moi) : ik.", answer: "ik" },

  // Niveau 3
  { id: 11, type: "match", difficulty: 3, question: "Koppel het Nederlands aan het Frans.", pairs: [ { left: "de oma", right: "la grand-mère" }, { left: "de opa", right: "le grand-père" }, { left: "de oom", right: "l'oncle" } ] },
  { id: 12, type: "match", difficulty: 3, question: "Koppel het Nederlands aan het Frans.", pairs: [ { left: "de neef", right: "le cousin" }, { left: "de nicht", right: "la cousine" }, { left: "de tante", right: "la tante" } ] },
  { id: 13, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["Mijn", "zus", "is", "acht", "jaar"] },
  { id: 14, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["Ik", "woon", "met", "mijn", "familie"] },
  { id: 15, type: "qcm", difficulty: 3, question: "Wie is de mama van je mama ?", options: ["de oma", "de tante", "de zus", "de nicht"], answer: "de oma" },
];
