import { Exercise } from "../types";

/** Chapitre FR — La phrase : ponctuation, ordre des mots, types de phrases. */
export const phrasesFrExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Quelle phrase est correcte ?", questionNl: "Welke zin is juist?", options: ["Le chat dort.", "Dort chat le.", "Chat le dort.", "Dort le chat"], answer: "Le chat dort.", visualAid: "🐱" },
  { id: 2, type: "qcm", difficulty: 1, question: "Quel signe termine une question ?", questionNl: "Welk teken staat achter een vraag?", options: ["?", ".", "!", ","], answer: "?" },
  { id: 3, type: "qcm", difficulty: 1, question: "Une phrase commence par…", questionNl: "Een zin begint met…", options: ["une majuscule", "une virgule", "un point", "un tiret"], answer: "une majuscule" },
  { id: 4, type: "order", difficulty: 1, question: "Remets dans l'ordre : mange / Lina / pomme / une", questionNl: "Zet in de juiste orde: mange / Lina / pomme / une", answer: ["Lina", "mange", "une", "pomme"] },
  { id: 5, type: "true_false", difficulty: 1, question: "« Le chien aboie » est une phrase complète.", questionNl: "« Le chien aboie » is een volledige zin.", answer: true },
  { id: 6, type: "qcm", difficulty: 1, question: "Où est le verbe dans « Papa lit un livre » ?", questionNl: "Waar staat het werkwoord in « Papa lit un livre »?", options: ["lit", "Papa", "un", "livre"], answer: "lit" },

  // Niveau 2
  { id: 7, type: "order", difficulty: 2, question: "Remets dans l'ordre : dans / joue / le / Tom / jardin", questionNl: "Zet in de juiste orde: dans / joue / le / Tom / jardin", answer: ["Tom", "joue", "dans", "le", "jardin"] },
  { id: 8, type: "qcm", difficulty: 2, question: "Quel est le sujet de « Les oiseaux chantent » ?", questionNl: "Wat is het onderwerp van « Les oiseaux chantent »?", options: ["Les oiseaux", "chantent", "Les", "oiseaux chantent"], answer: "Les oiseaux" },
  { id: 9, type: "qcm", difficulty: 2, question: "Quelle phrase est exclamative ?", questionNl: "Welke zin is een uitroep?", options: ["Quelle belle journée !", "Il fait beau.", "Fait-il beau ?", "Ferme la porte."], answer: "Quelle belle journée !" },
  { id: 10, type: "qcm", difficulty: 2, question: "Quelle phrase est négative ?", questionNl: "Welke zin is ontkennend?", options: ["Je ne veux pas sortir.", "Je veux sortir.", "Veux-tu sortir ?", "Sors vite !"], answer: "Je ne veux pas sortir." },
  { id: 11, type: "fill_blank", difficulty: 2, question: "Ajoute le signe : « Comme il fait chaud ___ »", questionNl: "Voeg het teken toe: « Comme il fait chaud ___ »", answer: "!" },
  { id: 12, type: "qcm", difficulty: 2, question: "Quelle phrase est mal ponctuée ?", questionNl: "Welke zin heeft foute interpunctie?", options: ["où vas-tu.", "Où vas-tu ?", "Je pars.", "Attends-moi !"], answer: "où vas-tu." },

  // Niveau 3
  { id: 13, type: "order", difficulty: 3, question: "Remets dans l'ordre : gagné / a / course / la / équipe / notre", questionNl: "Zet in de juiste orde: gagné / a / course / la / équipe / notre", answer: ["notre", "équipe", "a", "gagné", "la", "course"] },
  { id: 14, type: "qcm", difficulty: 3, question: "Quel mot relie les deux phrases : « Il pleut ___ je sors. »", questionNl: "Welk woord verbindt: « Il pleut ___ je sors. »", options: ["mais", "donc car", "et ni", "ou où"], answer: "mais" },
  { id: 15, type: "qcm", difficulty: 3, question: "Dans « Le vieux moulin, abandonné, s'écroulait », que font les virgules ?", questionNl: "Wat doen de komma's in die zin?", options: ["Elles encadrent une précision", "Elles terminent la phrase", "Elles posent une question", "Elles marquent une exclamation"], answer: "Elles encadrent une précision" },
  { id: 16, type: "qcm", difficulty: 3, question: "Quelle phrase est à la forme interrogative ?", questionNl: "Welke zin is vragend?", options: ["Viendras-tu demain ?", "Tu viens demain.", "Viens demain !", "Il ne vient pas."], answer: "Viendras-tu demain ?" },
  { id: 17, type: "true_false", difficulty: 3, question: "Une phrase peut contenir plusieurs verbes conjugués.", questionNl: "Een zin kan meerdere vervoegde werkwoorden bevatten.", answer: true },
  { id: 18, type: "qcm", difficulty: 3, question: "Quel est le complément dans « Elle lit un roman passionnant » ?", questionNl: "Wat is de bepaling in « Elle lit un roman passionnant »?", options: ["un roman passionnant", "Elle", "lit", "passionnant seul"], answer: "un roman passionnant" },
];
