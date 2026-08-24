import { FrChallenge } from "./types";

/** Roue des Genres (FR) — le / la / l' et accords du genre (30 défis). */
export const roueGenresFrChallenges: FrChallenge[] = [
  // Niveau 1 — le ou la
  { id: 1, prompt: "___ maison", options: ["la", "le"], correctAnswer: "la", speak: "la maison", difficulty: 1 },
  { id: 2, prompt: "___ chien", options: ["le", "la"], correctAnswer: "le", speak: "le chien", difficulty: 1 },
  { id: 3, prompt: "___ table", options: ["la", "le"], correctAnswer: "la", speak: "la table", difficulty: 1 },
  { id: 4, prompt: "___ soleil", options: ["le", "la"], correctAnswer: "le", speak: "le soleil", difficulty: 1 },
  { id: 5, prompt: "___ lune", options: ["la", "le"], correctAnswer: "la", speak: "la lune", difficulty: 1 },
  { id: 6, prompt: "___ vélo", options: ["le", "la"], correctAnswer: "le", speak: "le vélo", difficulty: 1 },
  { id: 7, prompt: "___ fleur", options: ["la", "le"], correctAnswer: "la", speak: "la fleur", difficulty: 1 },
  { id: 8, prompt: "___ livre", options: ["le", "la"], correctAnswer: "le", speak: "le livre", difficulty: 1 },
  { id: 9, prompt: "___ voiture", options: ["la", "le"], correctAnswer: "la", speak: "la voiture", difficulty: 1 },
  { id: 10, prompt: "___ cahier", options: ["le", "la"], correctAnswer: "le", speak: "le cahier", difficulty: 1 },

  // Niveau 2 — l' et mots plus rares
  { id: 11, prompt: "___ école", hint: "le, la ou l' ?", options: ["l'", "le", "la"], correctAnswer: "l'", speak: "l'école", difficulty: 2 },
  { id: 12, prompt: "___ ordinateur", hint: "le, la ou l' ?", options: ["l'", "le", "la"], correctAnswer: "l'", speak: "l'ordinateur", difficulty: 2 },
  { id: 13, prompt: "___ montagne", options: ["la", "le", "l'"], correctAnswer: "la", speak: "la montagne", difficulty: 2 },
  { id: 14, prompt: "___ village", options: ["le", "la", "l'"], correctAnswer: "le", speak: "le village", difficulty: 2 },
  { id: 15, prompt: "___ armoire", options: ["l'", "le", "la"], correctAnswer: "l'", speak: "l'armoire", difficulty: 2 },
  { id: 16, prompt: "___ problème", options: ["le", "la", "l'"], correctAnswer: "le", speak: "le problème", difficulty: 2 },
  { id: 17, prompt: "___ page", options: ["la", "le", "l'"], correctAnswer: "la", speak: "la page", difficulty: 2 },
  { id: 18, prompt: "___ musée", options: ["le", "la", "l'"], correctAnswer: "le", speak: "le musée", difficulty: 2 },
  { id: 19, prompt: "___ image", options: ["l'", "le", "la"], correctAnswer: "l'", speak: "l'image", difficulty: 2 },
  { id: 20, prompt: "___ nuage", options: ["le", "la", "l'"], correctAnswer: "le", speak: "le nuage", difficulty: 2 },

  // Niveau 3 — accord de l'adjectif avec le genre
  { id: 21, prompt: "une porte ___", options: ["ouverte", "ouvert", "ouverts", "ouvertes"], correctAnswer: "ouverte", speak: "une porte ouverte", difficulty: 3 },
  { id: 22, prompt: "un chemin ___", options: ["étroit", "étroite", "étroits", "étroites"], correctAnswer: "étroit", speak: "un chemin étroit", difficulty: 3 },
  { id: 23, prompt: "des histoires ___", options: ["amusantes", "amusante", "amusant", "amusants"], correctAnswer: "amusantes", speak: "des histoires amusantes", difficulty: 3 },
  { id: 24, prompt: "une eau ___", options: ["fraîche", "frais", "fraîches", "fraiche"], correctAnswer: "fraîche", speak: "une eau fraîche", difficulty: 3 },
  { id: 25, prompt: "un vieux ___", options: ["moulin", "maison", "armoire", "école"], correctAnswer: "moulin", speak: "un vieux moulin", difficulty: 3 },
  { id: 26, prompt: "une ___ nouvelle", options: ["bonne", "bon", "bons", "bonnes"], correctAnswer: "bonne", speak: "une bonne nouvelle", difficulty: 3 },
  { id: 27, prompt: "des chats ___", options: ["noirs", "noires", "noir", "noire"], correctAnswer: "noirs", speak: "des chats noirs", difficulty: 3 },
  { id: 28, prompt: "une chanson ___", options: ["douce", "doux", "douces", "douxe"], correctAnswer: "douce", speak: "une chanson douce", difficulty: 3 },
  { id: 29, prompt: "un exercice ___", options: ["difficile", "difficiles", "difficilement", "difficil"], correctAnswer: "difficile", speak: "un exercice difficile", difficulty: 3 },
  { id: 30, prompt: "des rues ___", options: ["étroites", "étroits", "étroite", "étroit"], correctAnswer: "étroites", speak: "des rues étroites", difficulty: 3 },
];
