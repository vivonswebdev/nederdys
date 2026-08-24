/** Écho des Sons — écoute un mot et retrouve le son (graphème) qu'il contient : 30 défis. */
export interface EchoSonsChallenge {
  id: number;
  /** Mot néerlandais prononcé. */
  word: string;
  wordFr: string;
  /** Graphème/son cible. */
  correctAnswer: string;
  options: string[];
  difficulty: 1 | 2 | 3;
}

export const echoSonsChallenges: EchoSonsChallenge[] = [
  // Niveau 1 — voyelles longues simples
  { id: 1, word: "boom", wordFr: "l'arbre", correctAnswer: "oo", options: ["oo", "aa", "ee"], difficulty: 1 },
  { id: 2, word: "maan", wordFr: "la lune", correctAnswer: "aa", options: ["aa", "oo", "uu"], difficulty: 1 },
  { id: 3, word: "zee", wordFr: "la mer", correctAnswer: "ee", options: ["ee", "ie", "oe"], difficulty: 1 },
  { id: 4, word: "vuur", wordFr: "le feu", correctAnswer: "uu", options: ["uu", "oe", "aa"], difficulty: 1 },
  { id: 5, word: "boek", wordFr: "le livre", correctAnswer: "oe", options: ["oe", "oo", "eu"], difficulty: 1 },
  { id: 6, word: "kiep", wordFr: "penche (kip : la poule)", correctAnswer: "ie", options: ["ie", "ee", "ei"], difficulty: 1 },
  { id: 7, word: "raam", wordFr: "la fenêtre", correctAnswer: "aa", options: ["aa", "ee", "oo"], difficulty: 1 },
  { id: 8, word: "stoel", wordFr: "la chaise", correctAnswer: "oe", options: ["oe", "ou", "oo"], difficulty: 1 },
  { id: 9, word: "vier", wordFr: "quatre", correctAnswer: "ie", options: ["ie", "ei", "ui"], difficulty: 1 },
  { id: 10, word: "sloot", wordFr: "le fossé", correctAnswer: "oo", options: ["oo", "oe", "uu"], difficulty: 1 },

  // Niveau 2 — diphtongues fréquentes
  { id: 11, word: "huis", wordFr: "la maison", correctAnswer: "ui", options: ["ui", "ie", "eu"], difficulty: 2 },
  { id: 12, word: "trein", wordFr: "le train", correctAnswer: "ei", options: ["ei", "ie", "ui"], difficulty: 2 },
  { id: 13, word: "kijken", wordFr: "regarder", correctAnswer: "ij", options: ["ij", "ie", "ei"], difficulty: 2 },
  { id: 14, word: "koud", wordFr: "froid", correctAnswer: "ou", options: ["ou", "oe", "oo"], difficulty: 2 },
  { id: 15, word: "blauw", wordFr: "bleu", correctAnswer: "au", options: ["au", "ou", "aa"], difficulty: 2 },
  { id: 16, word: "deur", wordFr: "la porte", correctAnswer: "eu", options: ["eu", "ui", "oe"], difficulty: 2 },
  { id: 17, word: "muis", wordFr: "la souris", correctAnswer: "ui", options: ["ui", "oe", "uu"], difficulty: 2 },
  { id: 18, word: "klein", wordFr: "petit", correctAnswer: "ei", options: ["ei", "ij", "ie"], difficulty: 2 },
  { id: 19, word: "vrijdag", wordFr: "vendredi", correctAnswer: "ij", options: ["ij", "ei", "aa"], difficulty: 2 },
  { id: 20, word: "goud", wordFr: "l'or", correctAnswer: "ou", options: ["ou", "au", "oo"], difficulty: 2 },

  // Niveau 3 — consonnes et sons complexes
  { id: 21, word: "school", wordFr: "l'école", correctAnswer: "sch", options: ["sch", "ch", "sk"], difficulty: 3 },
  { id: 22, word: "nacht", wordFr: "la nuit", correctAnswer: "cht", options: ["cht", "sch", "ng"], difficulty: 3 },
  { id: 23, word: "jongen", wordFr: "le garçon", correctAnswer: "ng", options: ["ng", "nk", "gn"], difficulty: 3 },
  { id: 24, word: "bank", wordFr: "le banc", correctAnswer: "nk", options: ["nk", "ng", "kn"], difficulty: 3 },
  { id: 25, word: "meeuw", wordFr: "la mouette", correctAnswer: "eeuw", options: ["eeuw", "ieuw", "auw"], difficulty: 3 },
  { id: 26, word: "nieuw", wordFr: "nouveau", correctAnswer: "ieuw", options: ["ieuw", "eeuw", "uw"], difficulty: 3 },
  { id: 27, word: "lachen", wordFr: "rire", correctAnswer: "ch", options: ["ch", "cht", "sch"], difficulty: 3 },
  { id: 28, word: "schrijven", wordFr: "écrire", correctAnswer: "schr", options: ["schr", "sch", "str"], difficulty: 3 },
  { id: 29, word: "koning", wordFr: "le roi", correctAnswer: "ng", options: ["ng", "nk", "nj"], difficulty: 3 },
  { id: 30, word: "vrouw", wordFr: "la femme", correctAnswer: "ouw", options: ["ouw", "auw", "uw"], difficulty: 3 },
];
