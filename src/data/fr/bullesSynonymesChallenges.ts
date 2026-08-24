import { FrChallenge } from "./types";

/** Bulles de Synonymes — fais éclater la bulle du synonyme (30 défis). */
export const bullesSynonymesChallenges: FrChallenge[] = [
  // Niveau 1
  { id: 1, prompt: "content", hint: "Trouve le synonyme", options: ["joyeux", "triste", "fatigué", "fâché"], correctAnswer: "joyeux", speak: "Quel mot veut dire la même chose que content ?", difficulty: 1 },
  { id: 2, prompt: "grand", hint: "Trouve le synonyme", options: ["immense", "petit", "court", "mince"], correctAnswer: "immense", speak: "Quel mot veut dire la même chose que grand ?", difficulty: 1 },
  { id: 3, prompt: "rapide", hint: "Trouve le synonyme", options: ["vite", "lent", "lourd", "calme"], correctAnswer: "vite", speak: "Quel mot veut dire la même chose que rapide ?", difficulty: 1 },
  { id: 4, prompt: "beau", hint: "Trouve le synonyme", options: ["joli", "laid", "sale", "vieux"], correctAnswer: "joli", speak: "Quel mot veut dire la même chose que beau ?", difficulty: 1 },
  { id: 5, prompt: "maison", hint: "Trouve le synonyme", options: ["habitation", "jardin", "voiture", "chemin"], correctAnswer: "habitation", speak: "Quel mot veut dire la même chose que maison ?", difficulty: 1 },
  { id: 6, prompt: "regarder", hint: "Trouve le synonyme", options: ["observer", "parler", "manger", "courir"], correctAnswer: "observer", speak: "Quel mot veut dire la même chose que regarder ?", difficulty: 1 },
  { id: 7, prompt: "gentil", hint: "Trouve le synonyme", options: ["aimable", "méchant", "sévère", "bruyant"], correctAnswer: "aimable", speak: "Quel mot veut dire la même chose que gentil ?", difficulty: 1 },
  { id: 8, prompt: "peur", hint: "Trouve le synonyme", options: ["crainte", "joie", "colère", "faim"], correctAnswer: "crainte", speak: "Quel mot veut dire la même chose que peur ?", difficulty: 1 },
  { id: 9, prompt: "commencer", hint: "Trouve le synonyme", options: ["débuter", "finir", "arrêter", "dormir"], correctAnswer: "débuter", speak: "Quel mot veut dire la même chose que commencer ?", difficulty: 1 },
  { id: 10, prompt: "froid", hint: "Trouve le synonyme", options: ["glacé", "chaud", "tiède", "doux"], correctAnswer: "glacé", speak: "Quel mot veut dire la même chose que froid ?", difficulty: 1 },

  // Niveau 2
  { id: 11, prompt: "fatigué", options: ["épuisé", "reposé", "réveillé", "affamé"], correctAnswer: "épuisé", speak: "Synonyme de fatigué ?", difficulty: 2 },
  { id: 12, prompt: "bizarre", options: ["étrange", "normal", "banal", "ordinaire"], correctAnswer: "étrange", speak: "Synonyme de bizarre ?", difficulty: 2 },
  { id: 13, prompt: "malin", options: ["astucieux", "distrait", "maladroit", "paresseux"], correctAnswer: "astucieux", speak: "Synonyme de malin ?", difficulty: 2 },
  { id: 14, prompt: "bruit", options: ["vacarme", "silence", "murmure du vent", "sommeil"], correctAnswer: "vacarme", speak: "Synonyme de bruit ?", difficulty: 2 },
  { id: 15, prompt: "cacher", options: ["dissimuler", "montrer", "annoncer", "présenter"], correctAnswer: "dissimuler", speak: "Synonyme de cacher ?", difficulty: 2 },
  { id: 16, prompt: "content de soi", options: ["fier", "honteux", "gêné", "déçu"], correctAnswer: "fier", speak: "Synonyme de content de soi ?", difficulty: 2 },
  { id: 17, prompt: "difficile", options: ["ardu", "facile", "simple", "évident"], correctAnswer: "ardu", speak: "Synonyme de difficile ?", difficulty: 2 },
  { id: 18, prompt: "attraper", options: ["saisir", "lâcher", "jeter", "perdre"], correctAnswer: "saisir", speak: "Synonyme d'attraper ?", difficulty: 2 },
  { id: 19, prompt: "vieux", options: ["ancien", "neuf", "récent", "moderne"], correctAnswer: "ancien", speak: "Synonyme de vieux ?", difficulty: 2 },
  { id: 20, prompt: "silencieux", options: ["muet", "bavard", "bruyant", "criard"], correctAnswer: "muet", speak: "Synonyme de silencieux ?", difficulty: 2 },

  // Niveau 3
  { id: 21, prompt: "courageux", options: ["intrépide", "peureux", "craintif", "hésitant"], correctAnswer: "intrépide", speak: "Synonyme de courageux ?", difficulty: 3 },
  { id: 22, prompt: "abondant", options: ["copieux", "rare", "maigre", "insuffisant"], correctAnswer: "copieux", speak: "Synonyme d'abondant ?", difficulty: 3 },
  { id: 23, prompt: "réfléchir", options: ["méditer", "oublier", "ignorer", "bavarder"], correctAnswer: "méditer", speak: "Synonyme de réfléchir ?", difficulty: 3 },
  { id: 24, prompt: "surprenant", options: ["stupéfiant", "prévisible", "habituel", "monotone"], correctAnswer: "stupéfiant", speak: "Synonyme de surprenant ?", difficulty: 3 },
  { id: 25, prompt: "chagrin", options: ["tristesse", "allégresse", "gaieté", "entrain"], correctAnswer: "tristesse", speak: "Synonyme de chagrin ?", difficulty: 3 },
  { id: 26, prompt: "précis", options: ["exact", "flou", "vague", "approximatif"], correctAnswer: "exact", speak: "Synonyme de précis ?", difficulty: 3 },
  { id: 27, prompt: "réparer", options: ["restaurer", "casser", "abîmer", "déchirer"], correctAnswer: "restaurer", speak: "Synonyme de réparer ?", difficulty: 3 },
  { id: 28, prompt: "s'enfuir", options: ["déguerpir", "rester", "attendre", "s'installer"], correctAnswer: "déguerpir", speak: "Synonyme de s'enfuir ?", difficulty: 3 },
  { id: 29, prompt: "célèbre", options: ["renommé", "inconnu", "anonyme", "discret"], correctAnswer: "renommé", speak: "Synonyme de célèbre ?", difficulty: 3 },
  { id: 30, prompt: "minuscule", options: ["infime", "énorme", "gigantesque", "vaste"], correctAnswer: "infime", speak: "Synonyme de minuscule ?", difficulty: 3 },
];
