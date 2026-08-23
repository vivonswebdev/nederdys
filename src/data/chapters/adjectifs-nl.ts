import { Exercise } from "./types";

/** Accord de l'adjectif — 18 exercices. */
export const adjectifsNlExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "de ___ man (grand)", options: ["grote", "groot"], answer: "grote" },
  { id: 2, type: "qcm", difficulty: 1, question: "het ___ huis (grand)", options: ["grote", "groot"], answer: "grote" },
  { id: 3, type: "qcm", difficulty: 1, question: "een ___ huis (grand)", options: ["groot", "grote"], answer: "groot" },
  { id: 4, type: "qcm", difficulty: 1, question: "de ___ auto (rouge)", options: ["rode", "rood"], answer: "rode" },
  { id: 5, type: "true_false", difficulty: 1, question: "Après « de », l'adjectif prend toujours -e.", answer: true },
  { id: 6, type: "qcm", difficulty: 1, question: "een ___ hond (petit)", options: ["kleine", "klein"], answer: "kleine" },

  // Niveau 2
  { id: 7, type: "fill_blank", difficulty: 2, question: "het ___ boek (nieuw)", answer: "nieuwe" },
  { id: 8, type: "fill_blank", difficulty: 2, question: "een ___ boek (nieuw)", answer: "nieuw" },
  { id: 9, type: "qcm", difficulty: 2, question: "de ___ kat (mooi)", options: ["mooie", "mooi"], answer: "mooie" },
  { id: 10, type: "true_false", difficulty: 2, question: "Avec « een » + mot en het, l'adjectif reste sans -e.", answer: true },
  { id: 11, type: "qcm", difficulty: 2, question: "een ___ meisje (lief)", options: ["lief", "lieve"], answer: "lief" },
  { id: 12, type: "qcm", difficulty: 2, question: "de ___ kinderen (blij)", options: ["blije", "blij"], answer: "blije" },

  // Niveau 3
  { id: 13, type: "fill_blank", difficulty: 3, question: "Ik heb een ___ fiets. (snel)", answer: "snelle" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Dat is een ___ verhaal. (kort)", answer: "kort" },
  { id: 15, type: "order", difficulty: 3, question: "Remets dans l'ordre.", answer: ["de", "grote", "hond", "slaapt"] },
  { id: 16, type: "qcm", difficulty: 3, question: "Het huis is ___ . (attribut, après le verbe)", options: ["groot", "grote"], answer: "groot" },
  { id: 17, type: "qcm", difficulty: 3, question: "de ___ appels (lekker)", options: ["lekkere", "lekker"], answer: "lekkere" },
  { id: 18, type: "match", difficulty: 3, question: "Associe le groupe correct.", pairs: [
    { left: "de man", right: "de grote man" },
    { left: "het huis", right: "het grote huis" },
    { left: "een huis", right: "een groot huis" },
    { left: "een man", right: "een grote man" },
  ] },
];
