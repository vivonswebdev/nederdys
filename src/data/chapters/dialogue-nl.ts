import { Exercise } from "./types";

/** Compléter une petite conversation — 16 exercices. */
export const dialogueNlExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "fill_blank", difficulty: 1, question: "— Hallo! — ___ ! (salut, en retour)", answer: "hallo" },
  { id: 2, type: "qcm", difficulty: 1, question: "— Dank je wel! — ___", options: ["Graag gedaan.", "Ik ben acht.", "Het regent."], answer: "Graag gedaan." },
  { id: 3, type: "qcm", difficulty: 1, question: "— Goedemorgen! — ___", options: ["Goedemorgen!", "Tot ziens!", "Nee."], answer: "Goedemorgen!" },
  { id: 4, type: "fill_blank", difficulty: 1, question: "— Tot ___ ! (au revoir) ", answer: "ziens" },
  { id: 5, type: "qcm", difficulty: 1, question: "— Hoe gaat het ? — Het gaat ___ .", options: ["goed", "groen", "acht"], answer: "goed" },

  // Niveau 2
  { id: 6, type: "fill_blank", difficulty: 2, question: "— Hoe ___ je ? — Ik heet Jan.", answer: "heet" },
  { id: 7, type: "fill_blank", difficulty: 2, question: "— Wil je een koekje ? — Ja, ___ ! (volontiers)", answer: "graag" },
  { id: 8, type: "qcm", difficulty: 2, question: "— Sorry! — ___", options: ["Geen probleem.", "Twee euro.", "In de tuin."], answer: "Geen probleem." },
  { id: 9, type: "fill_blank", difficulty: 2, question: "— Waar ___ je ? — Ik woon in Meise.", answer: "woon" },
  { id: 10, type: "qcm", difficulty: 2, question: "— Mag ik water ? — ___", options: ["Ja, hier is water.", "Ik ben negen.", "Zaterdag."], answer: "Ja, hier is water." },
  { id: 11, type: "order", difficulty: 2, question: "Remets la réplique dans l'ordre.", answer: ["Ik", "ga", "naar", "school"] },

  // Niveau 3
  { id: 12, type: "fill_blank", difficulty: 3, question: "— Wat doe je op woensdag ? — Ik ___ naar de zwembad. (aller)", answer: "ga" },
  { id: 13, type: "fill_blank", difficulty: 3, question: "— Heb je honger ? — Ja, ik ___ honger.", answer: "heb" },
  { id: 14, type: "order", difficulty: 3, question: "Remets la question dans l'ordre.", answer: ["Hoe", "laat", "is", "het"] },
  { id: 15, type: "qcm", difficulty: 3, question: "— Kom je mee naar buiten ? — ___", options: ["Ja, ik kom mee!", "Het is blauw.", "Ik heet Sara."], answer: "Ja, ik kom mee!" },
  { id: 16, type: "match", difficulty: 3, question: "Associe la phrase et sa traduction.", pairs: [
    { left: "Tot morgen!", right: "À demain !" },
    { left: "Graag gedaan.", right: "De rien." },
    { left: "Ik weet het niet.", right: "Je ne sais pas." },
    { left: "Kun je helpen?", right: "Peux-tu aider ?" },
  ] },
];
