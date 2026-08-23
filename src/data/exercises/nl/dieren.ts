import { Exercise } from "@/data/chapters/types";

/** De dieren & de/het — 15 exercices (5 par niveau). */
export const dierenExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Welk dier is dit ?", visualAid: "🐶", options: ["de hond", "de kat", "de koe", "het paard"], answer: "de hond" },
  { id: 2, type: "qcm", difficulty: 1, question: "Welk dier is dit ?", visualAid: "🐱", options: ["de kat", "de muis", "de vis", "de vogel"], answer: "de kat" },
  { id: 3, type: "qcm", difficulty: 1, question: "Welk dier is dit ?", visualAid: "🐄", options: ["de koe", "het schaap", "de kip", "de eend"], answer: "de koe" },
  { id: 4, type: "qcm", difficulty: 1, question: "Comment dit-on « un poisson » en néerlandais ?", visualAid: "🐟", options: ["de vis", "de vogel", "de muis", "de beer"], answer: "de vis" },
  { id: 5, type: "qcm", difficulty: 1, question: "Welk dier zegt « miauw » ?", options: ["de kat", "de hond", "de koe", "de kip"], answer: "de kat" },

  // Niveau 2
  { id: 6, type: "fill_blank", difficulty: 2, question: "___ paard loopt in de wei. (de of het ?)", visualAid: "🐴", answer: "het" },
  { id: 7, type: "fill_blank", difficulty: 2, question: "___ hond blaft. (de of het ?)", visualAid: "🐕", answer: "de" },
  { id: 8, type: "true_false", difficulty: 2, question: "We zeggen « het konijn ».", visualAid: "🐰", answer: true },
  { id: 9, type: "true_false", difficulty: 2, question: "We zeggen « het kat ».", answer: false },
  { id: 10, type: "fill_blank", difficulty: 2, question: "___ schaap eet gras. (de of het ?)", visualAid: "🐑", answer: "het" },

  // Niveau 3
  { id: 11, type: "match", difficulty: 3, question: "Koppel het dier aan zijn geluid.", pairs: [ { left: "de hond", right: "waf" }, { left: "de kat", right: "miauw" }, { left: "de koe", right: "boe" } ] },
  { id: 12, type: "match", difficulty: 3, question: "Koppel het Nederlandse dier aan het Franse woord.", pairs: [ { left: "de vogel", right: "l'oiseau" }, { left: "het varken", right: "le cochon" }, { left: "de kip", right: "la poule" } ] },
  { id: 13, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["De", "hond", "speelt", "in", "de", "tuin"] },
  { id: 14, type: "order", difficulty: 3, question: "Zet de zin in de juiste volgorde.", answer: ["Het", "paard", "eet", "een", "appel"] },
  { id: 15, type: "qcm", difficulty: 3, question: "Welk woord krijgt « het » ?", options: ["konijn", "hond", "kat", "koe"], answer: "konijn" },
];
