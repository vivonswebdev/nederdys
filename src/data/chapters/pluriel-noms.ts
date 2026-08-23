import { Exercise } from "./types";

/** Le pluriel néerlandais (-en, -s, -eren) — 18 exercices. */
export const plurielNomsExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Pluriel de « hond » ?", options: ["honden", "honds", "hondere"], answer: "honden" },
  { id: 2, type: "qcm", difficulty: 1, question: "Pluriel de « boek » ?", options: ["boeken", "boeks", "boekeren"], answer: "boeken" },
  { id: 3, type: "qcm", difficulty: 1, question: "Pluriel de « tafel » ?", options: ["tafels", "tafelen", "tafeleren"], answer: "tafels" },
  { id: 4, type: "qcm", difficulty: 1, question: "Pluriel de « kind » ?", options: ["kinderen", "kinden", "kinds"], answer: "kinderen" },
  { id: 5, type: "qcm", difficulty: 1, question: "Pluriel de « appel » ?", options: ["appels", "appelen", "appeleren"], answer: "appels" },
  { id: 6, type: "true_false", difficulty: 1, question: "« ei » devient « eieren » au pluriel.", answer: true },

  // Niveau 2
  { id: 7, type: "fill_blank", difficulty: 2, question: "Pluriel de « stoel » : ___", answer: "stoelen" },
  { id: 8, type: "fill_blank", difficulty: 2, question: "Pluriel de « meisje » : ___", answer: "meisjes" },
  { id: 9, type: "fill_blank", difficulty: 2, question: "Pluriel de « raam » : ___", answer: "ramen" },
  { id: 10, type: "qcm", difficulty: 2, question: "Les mots en -je font leur pluriel en…", options: ["-s", "-en", "-eren"], answer: "-s" },
  { id: 11, type: "qcm", difficulty: 2, question: "Pluriel de « auto » ?", options: ["auto's", "autoen", "autos"], answer: "auto's" },
  { id: 12, type: "true_false", difficulty: 2, question: "Le pluriel de « huis » est « huizen ».", answer: true },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Pluriel de « blad » (feuille) : ___", answer: "bladeren" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Pluriel de « brief » (lettre) : ___", answer: "brieven" },
  { id: 15, type: "fill_blank", difficulty: 3, question: "Complète : Ik zie drie ___ . (hond)", answer: "honden" },
  { id: 16, type: "qcm", difficulty: 3, question: "Pluriel de « kip » ?", options: ["kippen", "kipen", "kips"], answer: "kippen" },
  { id: 17, type: "qcm", difficulty: 3, question: "Pluriel de « lied » (chanson) ?", options: ["liederen", "lieden", "lieds"], answer: "liederen" },
  { id: 18, type: "match", difficulty: 3, question: "Associe le singulier et son pluriel.", pairs: [
    { left: "kind", right: "kinderen" },
    { left: "tafel", right: "tafels" },
    { left: "boek", right: "boeken" },
    { left: "auto", right: "auto's" },
  ] },
];
