import { Exercise } from "../types";

/** Chapitre FR — Les homophones (a/à, ou/où, son/sont, ce/se…). */
export const homophonesFrExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Lina ___ un vélo neuf.", questionNl: "Lina ___ een nieuwe fiets.", options: ["a", "à"], answer: "a", visualAid: "🚲" },
  { id: 2, type: "qcm", difficulty: 1, question: "Je vais ___ l'école.", questionNl: "Ik ga naar school : « Je vais ___ l'école. »", options: ["à", "a"], answer: "à", visualAid: "🏫" },
  { id: 3, type: "qcm", difficulty: 1, question: "Le ciel ___ bleu aujourd'hui.", questionNl: "De lucht ___ vandaag blauw.", options: ["est", "et"], answer: "est", visualAid: "☀️" },
  { id: 4, type: "qcm", difficulty: 1, question: "Papa ___ maman dorment.", questionNl: "Papa ___ mama slapen.", options: ["et", "est"], answer: "et" },
  { id: 5, type: "true_false", difficulty: 1, question: "Dans « Où es-tu ? », on écrit « où » avec un accent.", questionNl: "In « Où es-tu ? » schrijf je « où » met een accent.", answer: true },
  { id: 6, type: "qcm", difficulty: 1, question: "Tu préfères le lait ___ le jus ?", questionNl: "Wil je melk ___ sap?", options: ["ou", "où"], answer: "ou", visualAid: "🥛🧃" },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Les enfants ___ dans la cour.", questionNl: "De kinderen ___ op de speelplaats.", options: ["sont", "son"], answer: "sont" },
  { id: 8, type: "qcm", difficulty: 2, question: "Tom cherche ___ cartable.", questionNl: "Tom zoekt ___ boekentas.", options: ["son", "sont"], answer: "son" },
  { id: 9, type: "qcm", difficulty: 2, question: "Ils ___ terminé leurs devoirs.", questionNl: "Ze ___ hun huiswerk af.", options: ["ont", "on"], answer: "ont" },
  { id: 10, type: "qcm", difficulty: 2, question: "___ part dans dix minutes.", questionNl: "___ vertrekt over tien minuten.", options: ["On", "Ont"], answer: "On" },
  { id: 11, type: "qcm", difficulty: 2, question: "Elle ___ brosse les dents.", questionNl: "Ze poetst haar tanden : « Elle ___ brosse les dents. »", options: ["se", "ce"], answer: "se", visualAid: "🦷" },
  { id: 12, type: "fill_blank", difficulty: 2, question: "Complète : « ___ livre est passionnant. » (Ce / Se)", questionNl: "Vul aan: « ___ livre est passionnant. » (Ce / Se)", answer: "Ce" },

  // Niveau 3
  { id: 13, type: "qcm", difficulty: 3, question: "Elle ___ rangé dans le tiroir.", questionNl: "Ze heeft het in de lade gelegd : « Elle ___ rangé… »", options: ["l'a", "la", "là"], answer: "l'a" },
  { id: 14, type: "qcm", difficulty: 3, question: "Assieds-toi ___, près de la fenêtre.", questionNl: "Ga daar zitten : « Assieds-toi ___… »", options: ["là", "la", "l'a"], answer: "là" },
  { id: 15, type: "qcm", difficulty: 3, question: "Je ne sais pas ___ heure il rentre.", questionNl: "Ik weet niet hoe laat hij thuiskomt.", options: ["quelle", "qu'elle", "quel"], answer: "quelle" },
  { id: 16, type: "qcm", difficulty: 3, question: "Je pense ___ a raison.", questionNl: "Ik denk dat zij gelijk heeft.", options: ["qu'elle", "quelle", "quel"], answer: "qu'elle" },
  { id: 17, type: "qcm", difficulty: 3, question: "Les élèves rangent ___ affaires.", questionNl: "De leerlingen ruimen hun spullen op.", options: ["leurs", "leur", "l'heure"], answer: "leurs" },
  { id: 18, type: "true_false", difficulty: 3, question: "Dans « Il peut venir », « peut » est le verbe pouvoir.", questionNl: "In « Il peut venir » is « peut » het werkwoord pouvoir.", answer: true },
];
