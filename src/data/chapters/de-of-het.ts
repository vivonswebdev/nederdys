import { Exercise } from "./types";

/** De of het — 18 exercices (6 par niveau). */
export const deOfHetExercises: Exercise[] = [
  // Niveau 1 — mots très courants
  { id: 1, type: "qcm", difficulty: 1, question: "___ hond (le chien)", options: ["de", "het"], answer: "de" },
  { id: 2, type: "qcm", difficulty: 1, question: "___ huis (la maison)", options: ["de", "het"], answer: "het" },
  { id: 3, type: "qcm", difficulty: 1, question: "___ kat (le chat)", options: ["de", "het"], answer: "de" },
  { id: 4, type: "qcm", difficulty: 1, question: "___ boek (le livre)", options: ["de", "het"], answer: "het" },
  { id: 5, type: "qcm", difficulty: 1, question: "___ school (l'école)", options: ["de", "het"], answer: "de" },
  { id: 6, type: "qcm", difficulty: 1, question: "___ raam (la fenêtre)", options: ["de", "het"], answer: "het" },

  // Niveau 2 — diminutifs et pièges
  { id: 7, type: "qcm", difficulty: 2, question: "___ meisje (la fille) — piège : les diminutifs sont toujours « het »", options: ["de", "het"], answer: "het" },
  { id: 8, type: "qcm", difficulty: 2, question: "___ jongen (le garçon)", options: ["de", "het"], answer: "de" },
  { id: 9, type: "qcm", difficulty: 2, question: "___ hondje (le petit chien)", options: ["de", "het"], answer: "het" },
  { id: 10, type: "qcm", difficulty: 2, question: "___ tafel (la table)", options: ["de", "het"], answer: "de" },
  { id: 11, type: "qcm", difficulty: 2, question: "___ water (l'eau)", options: ["de", "het"], answer: "het" },
  { id: 12, type: "true_false", difficulty: 2, question: "Au pluriel, on dit toujours « de » : de huizen, de boeken.", answer: true },

  // Niveau 3 — application en phrase
  { id: 13, type: "fill_blank", difficulty: 3, question: "___ fiets is rood. (le vélo est rouge)", answer: "de" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "___ kind speelt buiten. (l'enfant joue dehors)", answer: "het" },
  { id: 15, type: "fill_blank", difficulty: 3, question: "___ zon schijnt. (le soleil brille)", answer: "de" },
  { id: 16, type: "qcm", difficulty: 3, question: "___ meisjes spelen samen. (les filles jouent ensemble)", options: ["de", "het"], answer: "de" },
  { id: 17, type: "qcm", difficulty: 3, question: "___ brood is lekker. (le pain est bon)", options: ["de", "het"], answer: "het" },
  { id: 18, type: "match", difficulty: 3, question: "Associe chaque mot à son article.", pairs: [
    { left: "hond", right: "de hond" },
    { left: "huis", right: "het huis" },
    { left: "koekje", right: "het koekje" },
    { left: "school", right: "de school" },
  ] },
];
