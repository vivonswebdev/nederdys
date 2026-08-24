import { Exercise } from "../types";

/** Chapitre FR — Synonymes, contraires et familles de mots. */
export const synonymesFrExercises: Exercise[] = [
  // Niveau 1
  { id: 1, type: "qcm", difficulty: 1, question: "Quel mot veut dire la même chose que « content » ?", questionNl: "Welk woord betekent hetzelfde als « content » (blij)?", options: ["heureux", "triste", "fâché", "fatigué"], optionsNl: ["heureux (blij)", "triste (verdrietig)", "fâché (kwaad)", "fatigué (moe)"], answer: "heureux", visualAid: "😊" },
  { id: 2, type: "qcm", difficulty: 1, question: "Synonyme de « grand » ?", questionNl: "Synoniem van « grand » (groot)?", options: ["immense", "petit", "court", "fin"], answer: "immense" },
  { id: 3, type: "qcm", difficulty: 1, question: "Contraire de « jour » ?", questionNl: "Tegengestelde van « jour » (dag)?", options: ["nuit", "matin", "midi", "soir"], answer: "nuit", visualAid: "🌙" },
  { id: 4, type: "qcm", difficulty: 1, question: "Contraire de « chaud » ?", questionNl: "Tegengestelde van « chaud » (warm)?", options: ["froid", "tiède", "doux", "brûlant"], answer: "froid", visualAid: "❄️" },
  { id: 5, type: "match", difficulty: 1, question: "Associe chaque mot à son synonyme.", questionNl: "Verbind elk woord met zijn synoniem.", pairs: [
    { left: "rapide", right: "vite" },
    { left: "joli", right: "beau" },
    { left: "maison", right: "habitation" },
  ] },
  { id: 6, type: "true_false", difficulty: 1, question: "« Petit » et « minuscule » sont des synonymes.", questionNl: "« Petit » en « minuscule » zijn synoniemen.", answer: true },

  // Niveau 2
  { id: 7, type: "qcm", difficulty: 2, question: "Synonyme de « rapidement » ?", questionNl: "Synoniem van « rapidement » (snel)?", options: ["vivement", "lentement", "doucement", "calmement"], answer: "vivement" },
  { id: 8, type: "qcm", difficulty: 2, question: "Synonyme de « peur » ?", questionNl: "Synoniem van « peur » (angst)?", options: ["crainte", "joie", "colère", "espoir"], answer: "crainte" },
  { id: 9, type: "qcm", difficulty: 2, question: "Contraire de « ancien » ?", questionNl: "Tegengestelde van « ancien » (oud)?", options: ["récent", "vieux", "usé", "antique"], answer: "récent" },
  { id: 10, type: "qcm", difficulty: 2, question: "Quel mot n'appartient PAS à la famille de « terre » ?", questionNl: "Welk woord hoort NIET bij de familie van « terre »?", options: ["terrible", "terrain", "atterrir", "souterrain"], answer: "terrible" },
  { id: 11, type: "fill_blank", difficulty: 2, question: "Donne un synonyme de « manger » (commence par « d »).", questionNl: "Geef een synoniem van « manger » (begint met « d »).", answer: "dévorer" },
  { id: 12, type: "qcm", difficulty: 2, question: "Synonyme de « bizarre » ?", questionNl: "Synoniem van « bizarre » (vreemd)?", options: ["étrange", "normal", "banal", "habituel"], answer: "étrange" },

  // Niveau 3
  { id: 13, type: "qcm", difficulty: 3, question: "Synonyme de « obscur » ?", questionNl: "Synoniem van « obscur » (donker)?", options: ["sombre", "lumineux", "clair", "éclatant"], answer: "sombre" },
  { id: 14, type: "qcm", difficulty: 3, question: "Contraire de « généreux » ?", questionNl: "Tegengestelde van « généreux » (gul)?", options: ["avare", "gentil", "aimable", "large"], answer: "avare" },
  { id: 15, type: "qcm", difficulty: 3, question: "Dans « une remarque pertinente », « pertinente » signifie…", questionNl: "In « une remarque pertinente » betekent « pertinente »…", options: ["juste et utile", "méchante", "très longue", "inutile"], answer: "juste et utile" },
  { id: 16, type: "qcm", difficulty: 3, question: "Quel verbe est le plus précis pour « dire très fort » ?", questionNl: "Welk werkwoord betekent « heel luid zeggen »?", options: ["hurler", "murmurer", "chuchoter", "souffler"], answer: "hurler" },
  { id: 17, type: "order", difficulty: 3, question: "Classe du plus faible au plus fort : hurler, parler, chuchoter.", questionNl: "Van zwak naar sterk: hurler, parler, chuchoter.", answer: ["chuchoter", "parler", "hurler"] },
  { id: 18, type: "true_false", difficulty: 3, question: "« Débuter » et « achever » sont des synonymes.", questionNl: "« Débuter » en « achever » zijn synoniemen.", answer: false },
];
