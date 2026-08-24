/** Dé des Syllabes — lance le dé, complète le mot avec la syllabe tombée (30 défis). */
export interface DeSyllabesChallenge {
  id: number;
  fullWord: string;
  wordFr: string;
  /** Mot affiché avec la syllabe manquante, ex. "kof___" */
  display: string;
  /** Faces du dé (la bonne syllabe + distracteurs). */
  faces: string[];
  correctAnswer: string;
  difficulty: 1 | 2 | 3;
}

export const deSyllabesChallenges: DeSyllabesChallenge[] = [
  // Niveau 1 — mots de 2 syllabes très courants
  { id: 1, fullWord: "appel", wordFr: "la pomme", display: "ap___", faces: ["pel", "pol", "pal"], correctAnswer: "pel", difficulty: 1 },
  { id: 2, fullWord: "tafel", wordFr: "la table", display: "ta___", faces: ["fel", "fal", "fil"], correctAnswer: "fel", difficulty: 1 },
  { id: 3, fullWord: "water", wordFr: "l'eau", display: "wa___", faces: ["ter", "tar", "tor"], correctAnswer: "ter", difficulty: 1 },
  { id: 4, fullWord: "moeder", wordFr: "la maman", display: "moe___", faces: ["der", "dar", "dur"], correctAnswer: "der", difficulty: 1 },
  { id: 5, fullWord: "vader", wordFr: "le papa", display: "va___", faces: ["der", "dor", "dir"], correctAnswer: "der", difficulty: 1 },
  { id: 6, fullWord: "banaan", wordFr: "la banane", display: "ba___", faces: ["naan", "noon", "neen"], correctAnswer: "naan", difficulty: 1 },
  { id: 7, fullWord: "koffie", wordFr: "le café", display: "kof___", faces: ["fie", "fee", "foe"], correctAnswer: "fie", difficulty: 1 },
  { id: 8, fullWord: "sokken", wordFr: "les chaussettes", display: "sok___", faces: ["ken", "kan", "kun"], correctAnswer: "ken", difficulty: 1 },
  { id: 9, fullWord: "bloemen", wordFr: "les fleurs", display: "bloe___", faces: ["men", "man", "mun"], correctAnswer: "men", difficulty: 1 },
  { id: 10, fullWord: "kikker", wordFr: "la grenouille", display: "kik___", faces: ["ker", "kar", "kor"], correctAnswer: "ker", difficulty: 1 },

  // Niveau 2 — 2-3 syllabes, distracteurs plus proches
  { id: 11, fullWord: "school", wordFr: "l'école", display: "sch___", faces: ["ool", "oel", "aal", "eel"], correctAnswer: "ool", difficulty: 2 },
  { id: 12, fullWord: "vriendin", wordFr: "l'amie", display: "vrien___", faces: ["din", "den", "dan", "dun"], correctAnswer: "din", difficulty: 2 },
  { id: 13, fullWord: "winkel", wordFr: "le magasin", display: "win___", faces: ["kel", "kal", "kol", "kil"], correctAnswer: "kel", difficulty: 2 },
  { id: 14, fullWord: "zomer", wordFr: "l'été", display: "zo___", faces: ["mer", "mar", "mor", "mir"], correctAnswer: "mer", difficulty: 2 },
  { id: 15, fullWord: "fietsen", wordFr: "faire du vélo", display: "fiet___", faces: ["sen", "san", "sun", "son"], correctAnswer: "sen", difficulty: 2 },
  { id: 16, fullWord: "kleuren", wordFr: "les couleurs", display: "kleu___", faces: ["ren", "ran", "run", "ron"], correctAnswer: "ren", difficulty: 2 },
  { id: 17, fullWord: "spelen", wordFr: "jouer", display: "spe___", faces: ["len", "lan", "lun", "lon"], correctAnswer: "len", difficulty: 2 },
  { id: 18, fullWord: "regen", wordFr: "la pluie", display: "re___", faces: ["gen", "gan", "gun", "gon"], correctAnswer: "gen", difficulty: 2 },
  { id: 19, fullWord: "tekenen", wordFr: "dessiner", display: "teke___", faces: ["nen", "nan", "nun", "non"], correctAnswer: "nen", difficulty: 2 },
  { id: 20, fullWord: "wandelen", wordFr: "se promener", display: "wande___", faces: ["len", "lan", "lun", "lon"], correctAnswer: "len", difficulty: 2 },

  // Niveau 3 — mots longs
  { id: 21, fullWord: "olifant", wordFr: "l'éléphant", display: "oli___", faces: ["fant", "font", "funt", "fent"], correctAnswer: "fant", difficulty: 3 },
  { id: 22, fullWord: "boterham", wordFr: "la tartine", display: "boter___", faces: ["ham", "hem", "hom", "hum"], correctAnswer: "ham", difficulty: 3 },
  { id: 23, fullWord: "chocolade", wordFr: "le chocolat", display: "choco___", faces: ["lade", "lede", "lide", "lode"], correctAnswer: "lade", difficulty: 3 },
  { id: 24, fullWord: "verjaardag", wordFr: "l'anniversaire", display: "verjaar___", faces: ["dag", "deg", "dog", "dug"], correctAnswer: "dag", difficulty: 3 },
  { id: 25, fullWord: "schildpad", wordFr: "la tortue", display: "schild___", faces: ["pad", "ped", "pod", "pud"], correctAnswer: "pad", difficulty: 3 },
  { id: 26, fullWord: "vakantie", wordFr: "les vacances", display: "vakan___", faces: ["tie", "tee", "toe", "tui"], correctAnswer: "tie", difficulty: 3 },
  { id: 27, fullWord: "computer", wordFr: "l'ordinateur", display: "compu___", faces: ["ter", "tar", "tor", "tir"], correctAnswer: "ter", difficulty: 3 },
  { id: 28, fullWord: "sinaasappel", wordFr: "l'orange", display: "sinaas___", faces: ["appel", "eppel", "oppel", "uppel"], correctAnswer: "appel", difficulty: 3 },
  { id: 29, fullWord: "krokodil", wordFr: "le crocodile", display: "kroko___", faces: ["dil", "del", "dal", "dol"], correctAnswer: "dil", difficulty: 3 },
  { id: 30, fullWord: "paraplu", wordFr: "le parapluie", display: "para___", faces: ["plu", "ple", "pla", "plo"], correctAnswer: "plu", difficulty: 3 },
];
