/** Rime Malin — écoute un mot, trouve celui qui rime (30 défis, 10 par niveau). */
export interface RimeMalinChallenge {
  id: number;
  word: string;
  wordFr: string;
  options: string[];
  correctAnswer: string;
  difficulty: 1 | 2 | 3;
}

export const rimeMalinChallenges: RimeMalinChallenge[] = [
  // Niveau 1 — rimes très simples (CVC)
  { id: 1, word: "kat", wordFr: "le chat", options: ["mat", "boek", "vis", "hond"], correctAnswer: "mat", difficulty: 1 },
  { id: 2, word: "hond", wordFr: "le chien", options: ["mond", "kip", "boom", "zon"], correctAnswer: "mond", difficulty: 1 },
  { id: 3, word: "vis", wordFr: "le poisson", options: ["mis", "bal", "koe", "raam"], correctAnswer: "mis", difficulty: 1 },
  { id: 4, word: "boom", wordFr: "l'arbre", options: ["room", "tas", "kat", "bed"], correctAnswer: "room", difficulty: 1 },
  { id: 5, word: "zon", wordFr: "le soleil", options: ["ton", "muis", "brood", "stoel"], correctAnswer: "ton", difficulty: 1 },
  { id: 6, word: "bal", wordFr: "le ballon", options: ["val", "boot", "kaas", "pen"], correctAnswer: "val", difficulty: 1 },
  { id: 7, word: "bed", wordFr: "le lit", options: ["pet", "hand", "melk", "aap"], correctAnswer: "pet", difficulty: 1 },
  { id: 8, word: "muis", wordFr: "la souris", options: ["huis", "kip", "tafel", "zee"], correctAnswer: "huis", difficulty: 1 },
  { id: 9, word: "kip", wordFr: "la poule", options: ["lip", "boom", "kat", "das"], correctAnswer: "lip", difficulty: 1 },
  { id: 10, word: "koe", wordFr: "la vache", options: ["schoe", "beer", "vuur", "man"], correctAnswer: "schoe", difficulty: 1 },

  // Niveau 2 — rimes avec digrammes
  { id: 11, word: "boot", wordFr: "le bateau", options: ["poot", "boek", "kaas", "trein"], correctAnswer: "poot", difficulty: 2 },
  { id: 12, word: "trein", wordFr: "le train", options: ["klein", "stoel", "hond", "bloem"], correctAnswer: "klein", difficulty: 2 },
  { id: 13, word: "bloem", wordFr: "la fleur", options: ["roem", "raam", "vis", "deur"], correctAnswer: "roem", difficulty: 2 },
  { id: 14, word: "deur", wordFr: "la porte", options: ["kleur", "boom", "kip", "zand"], correctAnswer: "kleur", difficulty: 2 },
  { id: 15, word: "school", wordFr: "l'école", options: ["stoel", "vuur", "kool", "melk"], correctAnswer: "kool", difficulty: 2 },
  { id: 16, word: "kaas", wordFr: "le fromage", options: ["baas", "brood", "muis", "hand"], correctAnswer: "baas", difficulty: 2 },
  { id: 17, word: "vuur", wordFr: "le feu", options: ["muur", "boot", "zon", "kat"], correctAnswer: "muur", difficulty: 2 },
  { id: 18, word: "hand", wordFr: "la main", options: ["zand", "boek", "koe", "raam"], correctAnswer: "zand", difficulty: 2 },
  { id: 19, word: "brood", wordFr: "le pain", options: ["rood", "stoel", "bloem", "kip"], correctAnswer: "rood", difficulty: 2 },
  { id: 20, word: "fiets", wordFr: "le vélo", options: ["niets", "boom", "kaas", "deur"], correctAnswer: "niets", difficulty: 2 },

  // Niveau 3 — mots plus longs
  { id: 21, word: "vlinder", wordFr: "le papillon", options: ["kinder", "olifant", "zomer", "school"], correctAnswer: "kinder", difficulty: 3 },
  { id: 22, word: "boterham", wordFr: "la tartine", options: ["kam", "boom", "trein", "kleur"], correctAnswer: "kam", difficulty: 3 },
  { id: 23, word: "zomer", wordFr: "l'été", options: ["dromer", "winter", "regen", "wolk"], correctAnswer: "dromer", difficulty: 3 },
  { id: 24, word: "winkel", wordFr: "le magasin", options: ["kinkel", "school", "straat", "huis"], correctAnswer: "kinkel", difficulty: 3 },
  { id: 25, word: "konijn", wordFr: "le lapin", options: ["fijn", "hond", "boterham", "wolk"], correctAnswer: "fijn", difficulty: 3 },
  { id: 26, word: "regen", wordFr: "la pluie", options: ["wegen", "zonnig", "sneeuw", "storm"], correctAnswer: "wegen", difficulty: 3 },
  { id: 27, word: "straat", wordFr: "la rue", options: ["maat", "stad", "dorp", "plein"], correctAnswer: "maat", difficulty: 3 },
  { id: 28, word: "kasteel", wordFr: "le château", options: ["heel", "toren", "ridder", "draak"], correctAnswer: "heel", difficulty: 3 },
  { id: 29, word: "wolken", wordFr: "les nuages", options: ["volken", "regen", "hemel", "sterren"], correctAnswer: "volken", difficulty: 3 },
  { id: 30, word: "paraplu", wordFr: "le parapluie", options: ["nu", "regen", "jas", "laars"], correctAnswer: "nu", difficulty: 3 },
];
