import { Exercise } from "./types";

/** Vrai ou faux — phrase NL + image emoji, 18 exercices. */
export const vraiFauxNlExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "true_false", difficulty: 1, question: "De hond blaft.", visualAid: "🐶", answer: true },
  { id: 2, type: "true_false", difficulty: 1, question: "De kat is een vis.", visualAid: "🐱", answer: false },
  { id: 3, type: "true_false", difficulty: 1, question: "De zon is geel.", visualAid: "☀️", answer: true },
  { id: 4, type: "true_false", difficulty: 1, question: "De appel is blauw.", visualAid: "🍎", answer: false },
  { id: 5, type: "true_false", difficulty: 1, question: "Het boek is om te lezen.", visualAid: "📖", answer: true },
  { id: 6, type: "true_false", difficulty: 1, question: "De fiets heeft vijf wielen.", visualAid: "🚲", answer: false },

  // Niveau 2
  { id: 7, type: "true_false", difficulty: 2, question: "Het meisje speelt met de bal.", visualAid: "👧⚽", answer: true },
  { id: 8, type: "true_false", difficulty: 2, question: "De jongen slaapt in de tuin.", visualAid: "👦🛏️", answer: false },
  { id: 9, type: "true_false", difficulty: 2, question: "Ik drink water met een glas.", visualAid: "🥛", answer: true },
  { id: 10, type: "true_false", difficulty: 2, question: "In de winter is het warm.", visualAid: "❄️", answer: false },
  { id: 11, type: "true_false", difficulty: 2, question: "De koe geeft melk.", visualAid: "🐄🥛", answer: true },
  { id: 12, type: "true_false", difficulty: 2, question: "Een week heeft tien dagen.", visualAid: "📅", answer: false },

  // Niveau 3
  { id: 13, type: "true_false", difficulty: 3, question: "« Wij gaan naar school » betekent « Nous allons à l'école ».", visualAid: "🏫", answer: true },
  { id: 14, type: "true_false", difficulty: 3, question: "« Het regent » betekent « Il neige ».", visualAid: "🌧️", answer: false },
  { id: 15, type: "true_false", difficulty: 3, question: "« Ik heb honger » zeg je als je wil eten.", visualAid: "🍽️", answer: true },
  { id: 16, type: "true_false", difficulty: 3, question: "« De bakker » verkoopt schoenen.", visualAid: "🥖", answer: false },
  { id: 17, type: "true_false", difficulty: 3, question: "« Morgen » betekent « demain ».", visualAid: "🌅", answer: true },
  { id: 18, type: "true_false", difficulty: 3, question: "« Links » betekent « à droite ».", visualAid: "⬅️", answer: false },
];
