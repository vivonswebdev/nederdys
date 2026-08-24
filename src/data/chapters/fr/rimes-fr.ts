import { Exercise } from "../types";

/** Chapitre FR — Rimes, syllabes et sons (phonologie française). */
export const rimesFrExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Quel mot rime avec « chat » ?", questionNl: "Welk woord rijmt op « chat »?", options: ["rat", "chien", "table", "fleur"], answer: "rat", visualAid: "🐭" },
  { id: 2, type: "qcm", difficulty: 1, question: "Quel mot rime avec « bateau » ?", questionNl: "Welk woord rijmt op « bateau »?", options: ["gâteau", "maison", "vélo", "livre"], answer: "gâteau", visualAid: "🍰" },
  { id: 3, type: "qcm", difficulty: 1, question: "Combien de syllabes dans « ba-nane » ?", questionNl: "Hoeveel lettergrepen in « banane »?", options: ["2", "1", "3", "4"], answer: "2", visualAid: "🍌" },
  { id: 4, type: "qcm", difficulty: 1, question: "Combien de syllabes dans « cho-co-lat » ?", questionNl: "Hoeveel lettergrepen in « chocolat »?", options: ["3", "2", "4", "1"], answer: "3", visualAid: "🍫" },
  { id: 5, type: "qcm", difficulty: 1, question: "Quel mot commence par le son [f] ?", questionNl: "Welk woord begint met de klank [f]?", options: ["fleur", "vase", "sac", "chat"], answer: "fleur" },
  { id: 6, type: "true_false", difficulty: 1, question: "« Lune » et « prune » riment.", questionNl: "« Lune » en « prune » rijmen.", answer: true },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Quel mot contient le son [oi] ?", questionNl: "Welk woord bevat de klank [oi]?", options: ["étoile", "banane", "sucre", "ferme"], answer: "étoile", visualAid: "⭐" },
  { id: 8, type: "qcm", difficulty: 2, question: "Quel mot contient le son [an] ?", questionNl: "Welk woord bevat de klank [an]?", options: ["enfant", "moto", "tulipe", "cube"], answer: "enfant" },
  { id: 9, type: "qcm", difficulty: 2, question: "Quel mot rime avec « souris » ?", questionNl: "Welk woord rijmt op « souris »?", options: ["tapis", "sourire", "source", "soupe"], answer: "tapis" },
  { id: 10, type: "qcm", difficulty: 2, question: "Combien de syllabes dans « hô-pi-tal » ?", questionNl: "Hoeveel lettergrepen in « hôpital »?", options: ["3", "2", "4", "5"], answer: "3" },
  { id: 11, type: "fill_blank", difficulty: 2, question: "Trouve un mot qui rime avec « fleur » (une partie du corps).", questionNl: "Vind een woord dat rijmt op « fleur » (een lichaamsdeel).", answer: "cœur" },
  { id: 12, type: "qcm", difficulty: 2, question: "Dans quel mot entend-on le son [z] ?", questionNl: "In welk woord hoor je de klank [z]?", options: ["maison", "poisson", "coussin", "saucisse"], answer: "maison" },

  // Niveau 3
  { id: 13, type: "qcm", difficulty: 3, question: "Dans quel mot le son [o] s'écrit-il « eau » ?", questionNl: "In welk woord wordt [o] geschreven als « eau »?", options: ["chapeau", "moto", "épaule", "gauche"], answer: "chapeau", visualAid: "🎩" },
  { id: 14, type: "qcm", difficulty: 3, question: "Dans quel mot le son [in] s'écrit-il « ein » ?", questionNl: "In welk woord wordt [in] geschreven als « ein »?", options: ["peinture", "matin", "cousin", "jardin"], answer: "peinture" },
  { id: 15, type: "qcm", difficulty: 3, question: "Combien de syllabes dans « hé-li-cop-tère » ?", questionNl: "Hoeveel lettergrepen in « hélicoptère »?", options: ["4", "3", "5", "2"], answer: "4", visualAid: "🚁" },
  { id: 16, type: "qcm", difficulty: 3, question: "Quel mot NE rime PAS avec les autres ?", questionNl: "Welk woord rijmt NIET met de andere?", options: ["bonjour", "toujours", "amour", "maison"], answer: "maison" },
  { id: 17, type: "order", difficulty: 3, question: "Remets les syllabes : ta / pi / bles ➜ ?", questionNl: "Zet de lettergrepen op een rij: ta / pi / bles", answer: ["pi", "ta", "bles"] },
  { id: 18, type: "true_false", difficulty: 3, question: "Dans « crayon », le son [ill] est écrit avec un « y ».", questionNl: "In « crayon » wordt de klank [ill] met een « y » geschreven.", answer: true },
];
