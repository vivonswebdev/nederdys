import { Exercise } from "./types";

/** Associer question et réponse — 15 exercices (type match + qcm). */
export const questionReponseNlExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "match", difficulty: 1, question: "Associe la question et la réponse.", pairs: [
    { left: "Hoe heet je ?", right: "Ik heet Sara." },
    { left: "Hoe oud ben je ?", right: "Ik ben acht jaar." },
    { left: "Waar woon je ?", right: "In Meise." },
  ] },
  { id: 2, type: "qcm", difficulty: 1, question: "« Hoe gaat het ? » → ", options: ["Goed, dank je.", "Ik heet Tom.", "In de tuin."], answer: "Goed, dank je." },
  { id: 3, type: "qcm", difficulty: 1, question: "« Wat is je naam ? » → ", options: ["Mijn naam is Lucas.", "Het is maandag.", "Ja, graag."], answer: "Mijn naam is Lucas." },
  { id: 4, type: "qcm", difficulty: 1, question: "« Welke dag is het ? » → ", options: ["Het is dinsdag.", "Ik ben zeven.", "Nee, dank je."], answer: "Het is dinsdag." },
  { id: 5, type: "qcm", difficulty: 1, question: "« Hoe oud ben je ? » → ", options: ["Ik ben negen jaar.", "Ik woon in Gent.", "Het regent."], answer: "Ik ben negen jaar." },

  // Niveau 2
  { id: 6, type: "match", difficulty: 2, question: "Associe la question et la réponse.", pairs: [
    { left: "Wat eet je ?", right: "Een boterham." },
    { left: "Waar is de kat ?", right: "Onder de tafel." },
    { left: "Wanneer kom je ?", right: "Om drie uur." },
    { left: "Hoeveel appels ?", right: "Vier appels." },
  ] },
  { id: 7, type: "qcm", difficulty: 2, question: "« Heb je een hond ? » → ", options: ["Ja, ik heb een hond.", "Het is groen.", "In de klas."], answer: "Ja, ik heb een hond." },
  { id: 8, type: "qcm", difficulty: 2, question: "« Wat is je lievelingskleur ? » → ", options: ["Blauw.", "Om zeven uur.", "Mijn zus."], answer: "Blauw." },
  { id: 9, type: "qcm", difficulty: 2, question: "« Waar ga je naartoe ? » → ", options: ["Naar school.", "Ik ben acht.", "Dank je wel."], answer: "Naar school." },
  { id: 10, type: "qcm", difficulty: 2, question: "« Hoe laat is het ? » → ", options: ["Het is half vier.", "Ik heet Emma.", "Een kat."], answer: "Het is half vier." },

  // Niveau 3
  { id: 11, type: "match", difficulty: 3, question: "Associe la question et la réponse.", pairs: [
    { left: "Waarom ben je blij ?", right: "Omdat het weekend is." },
    { left: "Met wie speel je ?", right: "Met mijn broer." },
    { left: "Hoeveel kost het ?", right: "Twee euro." },
    { left: "Wat doe je graag ?", right: "Ik lees graag." },
  ] },
  { id: 12, type: "qcm", difficulty: 3, question: "« Waarom ga je naar de dokter ? » → ", options: ["Omdat ik ziek ben.", "Het is groen.", "Vijf jaar."], answer: "Omdat ik ziek ben." },
  { id: 13, type: "fill_blank", difficulty: 3, question: "Réponds : « Hoe heet je ? » → Ik ___ Noa.", answer: "heet" },
  { id: 14, type: "fill_blank", difficulty: 3, question: "Réponds : « Waar woon je ? » → Ik ___ in Meise.", answer: "woon" },
  { id: 15, type: "qcm", difficulty: 3, question: "« Kun je me helpen ? » → ", options: ["Ja, natuurlijk!", "Het is maandag.", "Drie appels."], answer: "Ja, natuurlijk!" },
];
