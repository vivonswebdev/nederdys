/** Le Magicien des Mots — transforme le mot (pluriel, diminutif, contraire) : 30 défis. */
export type MagicSpell = "meervoud" | "verkleinwoord" | "tegengestelde";

export interface MagicienMotsChallenge {
  id: number;
  /** Mot de départ. */
  word: string;
  wordFr: string;
  /** Transformation demandée. */
  spell: MagicSpell;
  options: string[];
  correctAnswer: string;
  difficulty: 1 | 2 | 3;
}

export const magicienMotsChallenges: MagicienMotsChallenge[] = [
  // Niveau 1 — pluriels très courants
  { id: 1, word: "hond", wordFr: "le chien", spell: "meervoud", options: ["honden", "honds", "hondere"], correctAnswer: "honden", difficulty: 1 },
  { id: 2, word: "boek", wordFr: "le livre", spell: "meervoud", options: ["boeken", "boeks", "boekere"], correctAnswer: "boeken", difficulty: 1 },
  { id: 3, word: "tafel", wordFr: "la table", spell: "meervoud", options: ["tafels", "tafelen", "tafeler"], correctAnswer: "tafels", difficulty: 1 },
  { id: 4, word: "kat", wordFr: "le chat", spell: "meervoud", options: ["katten", "kats", "katen"], correctAnswer: "katten", difficulty: 1 },
  { id: 5, word: "stoel", wordFr: "la chaise", spell: "meervoud", options: ["stoelen", "stoels", "stoeleren"], correctAnswer: "stoelen", difficulty: 1 },
  { id: 6, word: "hond", wordFr: "le chien", spell: "verkleinwoord", options: ["hondje", "hondtje", "hondeke"], correctAnswer: "hondje", difficulty: 1 },
  { id: 7, word: "boom", wordFr: "l'arbre", spell: "meervoud", options: ["bomen", "booms", "boomen"], correctAnswer: "bomen", difficulty: 1 },
  { id: 8, word: "groot", wordFr: "grand", spell: "tegengestelde", options: ["klein", "lang", "dik"], correctAnswer: "klein", difficulty: 1 },
  { id: 9, word: "koud", wordFr: "froid", spell: "tegengestelde", options: ["warm", "nat", "zacht"], correctAnswer: "warm", difficulty: 1 },
  { id: 10, word: "appel", wordFr: "la pomme", spell: "meervoud", options: ["appels", "appelen", "appeltjes"], correctAnswer: "appels", difficulty: 1 },

  // Niveau 2 — diminutifs et pluriels irréguliers
  { id: 11, word: "kind", wordFr: "l'enfant", spell: "meervoud", options: ["kinderen", "kinden", "kinds"], correctAnswer: "kinderen", difficulty: 2 },
  { id: 12, word: "ei", wordFr: "l'œuf", spell: "meervoud", options: ["eieren", "eien", "eis"], correctAnswer: "eieren", difficulty: 2 },
  { id: 13, word: "huis", wordFr: "la maison", spell: "meervoud", options: ["huizen", "huisen", "huisjes"], correctAnswer: "huizen", difficulty: 2 },
  { id: 14, word: "auto", wordFr: "la voiture", spell: "meervoud", options: ["auto's", "autos", "autoen"], correctAnswer: "auto's", difficulty: 2 },
  { id: 15, word: "boom", wordFr: "l'arbre", spell: "verkleinwoord", options: ["boompje", "boomje", "boomtje"], correctAnswer: "boompje", difficulty: 2 },
  { id: 16, word: "man", wordFr: "l'homme", spell: "verkleinwoord", options: ["mannetje", "manje", "manpje"], correctAnswer: "mannetje", difficulty: 2 },
  { id: 17, word: "snel", wordFr: "rapide", spell: "tegengestelde", options: ["traag", "sterk", "hoog"], correctAnswer: "traag", difficulty: 2 },
  { id: 18, word: "kip", wordFr: "la poule", spell: "meervoud", options: ["kippen", "kipen", "kips"], correctAnswer: "kippen", difficulty: 2 },
  { id: 19, word: "raam", wordFr: "la fenêtre", spell: "meervoud", options: ["ramen", "raamen", "raams"], correctAnswer: "ramen", difficulty: 2 },
  { id: 20, word: "blij", wordFr: "content", spell: "tegengestelde", options: ["verdrietig", "moe", "bang"], correctAnswer: "verdrietig", difficulty: 2 },

  // Niveau 3 — formes plus rares
  { id: 21, word: "blad", wordFr: "la feuille", spell: "meervoud", options: ["bladeren", "bladen", "blads"], correctAnswer: "bladeren", difficulty: 3 },
  { id: 22, word: "brief", wordFr: "la lettre", spell: "meervoud", options: ["brieven", "briefen", "briefs"], correctAnswer: "brieven", difficulty: 3 },
  { id: 23, word: "lied", wordFr: "la chanson", spell: "meervoud", options: ["liederen", "lieden", "lieds"], correctAnswer: "liederen", difficulty: 3 },
  { id: 24, word: "stad", wordFr: "la ville", spell: "meervoud", options: ["steden", "staden", "stads"], correctAnswer: "steden", difficulty: 3 },
  { id: 25, word: "schip", wordFr: "le bateau", spell: "meervoud", options: ["schepen", "schippen", "schips"], correctAnswer: "schepen", difficulty: 3 },
  { id: 26, word: "bloem", wordFr: "la fleur", spell: "verkleinwoord", options: ["bloempje", "bloemje", "bloemtje"], correctAnswer: "bloempje", difficulty: 3 },
  { id: 27, word: "koning", wordFr: "le roi", spell: "verkleinwoord", options: ["koninkje", "koningje", "koningetje"], correctAnswer: "koninkje", difficulty: 3 },
  { id: 28, word: "moeilijk", wordFr: "difficile", spell: "tegengestelde", options: ["gemakkelijk", "duur", "vies"], correctAnswer: "gemakkelijk", difficulty: 3 },
  { id: 29, word: "vroeg", wordFr: "tôt", spell: "tegengestelde", options: ["laat", "vaak", "ver"], correctAnswer: "laat", difficulty: 3 },
  { id: 30, word: "glas", wordFr: "le verre", spell: "meervoud", options: ["glazen", "glassen", "glasen"], correctAnswer: "glazen", difficulty: 3 },
];

export const SPELL_LABEL: Record<MagicSpell, { nl: string; fr: string }> = {
  meervoud: { nl: "Maak het meervoud", fr: "Mets au pluriel" },
  verkleinwoord: { nl: "Maak het verkleinwoord", fr: "Mets au diminutif" },
  tegengestelde: { nl: "Zoek het tegengestelde", fr: "Trouve le contraire" },
};
