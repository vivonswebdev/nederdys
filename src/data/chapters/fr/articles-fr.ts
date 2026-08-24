import { Exercise } from "../types";

/** Chapitre FR — Articles, genre et accords (le/la/l', un/une, pluriel). */
export const articlesFrExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "___ maison", questionNl: "___ maison (het huis)", options: ["la", "le", "l'"], answer: "la", visualAid: "🏠" },
  { id: 2, type: "qcm", difficulty: 1, question: "___ chien", questionNl: "___ chien (de hond)", options: ["le", "la", "l'"], answer: "le", visualAid: "🐕" },
  { id: 3, type: "qcm", difficulty: 1, question: "___ école", questionNl: "___ école (de school)", options: ["l'", "le", "la"], answer: "l'", visualAid: "🏫" },
  { id: 4, type: "qcm", difficulty: 1, question: "___ fleur", questionNl: "___ fleur (de bloem)", options: ["la", "le", "l'"], answer: "la", visualAid: "🌸" },
  { id: 5, type: "qcm", difficulty: 1, question: "___ vélo", questionNl: "___ vélo (de fiets)", options: ["un", "une"], answer: "un", visualAid: "🚲" },
  { id: 6, type: "qcm", difficulty: 1, question: "___ pomme", questionNl: "___ pomme (een appel)", options: ["une", "un"], answer: "une", visualAid: "🍎" },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Pluriel de « le cheval » ?", questionNl: "Meervoud van « le cheval »?", options: ["les chevaux", "les chevals", "les chevales", "le chevaux"], answer: "les chevaux", visualAid: "🐴" },
  { id: 8, type: "qcm", difficulty: 2, question: "Pluriel de « un journal » ?", questionNl: "Meervoud van « un journal »?", options: ["des journaux", "des journals", "des journales", "un journaux"], answer: "des journaux" },
  { id: 9, type: "qcm", difficulty: 2, question: "Pluriel de « le bateau » ?", questionNl: "Meervoud van « le bateau »?", options: ["les bateaux", "les bateaus", "les bateaues", "le bateaux"], answer: "les bateaux", visualAid: "⛵" },
  { id: 10, type: "qcm", difficulty: 2, question: "Choisis : « ___ ordinateur »", questionNl: "Kies: « ___ ordinateur »", options: ["l'", "le", "la"], answer: "l'" },
  { id: 11, type: "fill_blank", difficulty: 2, question: "Complète : « une porte ___ » (ouvrir)", questionNl: "Vul aan: « une porte ___ » (ouvrir)", answer: "ouverte" },
  { id: 12, type: "true_false", difficulty: 2, question: "On dit « la problème ».", questionNl: "Men zegt « la problème ».", answer: false },

  // Niveau 3
  { id: 13, type: "qcm", difficulty: 3, question: "des histoires ___", questionNl: "des histoires ___ (leuke verhalen)", options: ["amusantes", "amusante", "amusant", "amusants"], answer: "amusantes" },
  { id: 14, type: "qcm", difficulty: 3, question: "des chats ___", questionNl: "des chats ___ (zwarte katten)", options: ["noirs", "noires", "noir", "noire"], answer: "noirs" },
  { id: 15, type: "qcm", difficulty: 3, question: "une eau ___", questionNl: "une eau ___ (fris water)", options: ["fraîche", "frais", "fraîches", "fraiche"], answer: "fraîche" },
  { id: 16, type: "qcm", difficulty: 3, question: "Elles sont ___ ensemble.", questionNl: "Elles sont ___ ensemble. (samen aangekomen)", options: ["arrivées", "arrivé", "arrivés", "arrivée"], answer: "arrivées" },
  { id: 17, type: "qcm", difficulty: 3, question: "Pluriel de « un genou » ?", questionNl: "Meervoud van « un genou »?", options: ["des genoux", "des genous", "des genoues", "un genoux"], answer: "des genoux" },
  { id: 18, type: "true_false", difficulty: 3, question: "L'adjectif s'accorde en genre et en nombre avec le nom.", questionNl: "Het bijvoeglijk naamwoord past zich aan in geslacht en getal.", answer: true },
];
