import { Exercise } from "./types";

/** Chasse aux fautes — corriger les erreurs courantes en néerlandais (18 exercices). */
export const chasseFautesNlExercises: Exercise[] = [
  // Niveau 1 — articles
  { id: 1, type: "qcm", difficulty: 1, question: "Quel mot est fautif ? « Het hond blaft. »", questionNl: "Welk woord is fout? « Het hond blaft. »", options: ["Het", "hond", "blaft"], answer: "Het" },
  { id: 2, type: "qcm", difficulty: 1, question: "Quel mot est fautif ? « De huis is groot. »", questionNl: "Welk woord is fout? « De huis is groot. »", options: ["De", "huis", "groot"], answer: "De" },
  { id: 3, type: "qcm", difficulty: 1, question: "Quel mot est fautif ? « Het kat slaapt. »", questionNl: "Welk woord is fout? « Het kat slaapt. »", options: ["Het", "kat", "slaapt"], answer: "Het" },
  { id: 4, type: "true_false", difficulty: 1, question: "« De boek is dik » est correct.", questionNl: "« De boek is dik » is juist.", answer: false },
  { id: 5, type: "fill_blank", difficulty: 1, question: "Corrige : « Het school is dicht. » → ___ school is dicht.", questionNl: "Verbeter: « Het school is dicht. » → ___ school is dicht.", answer: "De" },
  { id: 6, type: "fill_blank", difficulty: 1, question: "Corrige : « De raam is open. » → ___ raam is open.", questionNl: "Verbeter: « De raam is open. » → ___ raam is open.", answer: "Het" },

  // Niveau 2 — conjugaison et pluriel
  { id: 7, type: "qcm", difficulty: 2, question: "Quel mot est fautif ? « Ik loopt naar school. »", questionNl: "Welk woord is fout? « Ik loopt naar school. »", options: ["Ik", "loopt", "school"], answer: "loopt" },
  { id: 8, type: "qcm", difficulty: 2, question: "Quel mot est fautif ? « Hij spelen buiten. »", questionNl: "Welk woord is fout? « Hij spelen buiten. »", options: ["Hij", "spelen", "buiten"], answer: "spelen" },
  { id: 9, type: "fill_blank", difficulty: 2, question: "Corrige : « Wij is blij. » → Wij ___ blij.", questionNl: "Verbeter: « Wij is blij. » → Wij ___ blij.", answer: "zijn" },
  { id: 10, type: "fill_blank", difficulty: 2, question: "Corrige : « Ik zie drie honds. » → Ik zie drie ___ .", questionNl: "Verbeter: « Ik zie drie honds. » → Ik zie drie ___ .", answer: "honden" },
  { id: 11, type: "qcm", difficulty: 2, question: "Quel mot est fautif ? « De kinds spelen samen. »", questionNl: "Welk woord is fout? « De kinds spelen samen. »", options: ["De", "kinds", "spelen"], answer: "kinds" },
  { id: 12, type: "true_false", difficulty: 2, question: "« Zij hebt een fiets » est correct.", questionNl: "« Zij hebt een fiets » is juist.", answer: false },

  // Niveau 3 — ordre des mots et adjectifs
  { id: 13, type: "qcm", difficulty: 3, question: "Quel mot est mal placé ? « Morgen ik ga zwemmen. »", questionNl: "Welk woord staat verkeerd? « Morgen ik ga zwemmen. »", options: ["Morgen", "ik", "zwemmen"], answer: "ik" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Corrige : « Een groot man loopt daar. » → Een ___ man loopt daar.", questionNl: "Verbeter: « Een groot man loopt daar. » → Een ___ man loopt daar.", answer: "grote" },
  { id: 15, type: "qcm", difficulty: 3, question: "Quel mot est fautif ? « Hij kan goed zwemt. »", questionNl: "Welk woord is fout? « Hij kan goed zwemt. »", options: ["kan", "goed", "zwemt"], answer: "zwemt" },
  { id: 16, type: "order", difficulty: 3, question: "Remets la phrase dans l'ordre.", questionNl: "Zet de zin in de juiste volgorde.", answer: ["Vandaag", "eten", "wij", "pannenkoeken"] },
  { id: 17, type: "qcm", difficulty: 3, question: "Quel mot est fautif ? « Dat is de mooiste huis. »", questionNl: "Welk woord is fout? « Dat is de mooiste huis. »", options: ["de", "mooiste", "huis"], answer: "de" },
  { id: 18, type: "match", difficulty: 3, question: "Associe la faute à sa correction.", questionNl: "Verbind de fout met de verbetering.", pairs: [
    { left: "Het hond", right: "De hond" },
    { left: "Ik loopt", right: "Ik loop" },
    { left: "drie honds", right: "drie honden" },
    { left: "De huis", right: "Het huis" },
  ] },
];
