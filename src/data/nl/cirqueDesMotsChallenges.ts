/** Le Cirque des Mots — fais éclater la bulle du thème demandé (30 défis). */
export interface CirqueDesMotsChallenge {
  id: number;
  theme: string;
  themeFr: string;
  targetWord: string;
  targetWordFr: string;
  /** Le mot cible + 3-4 intrus d'autres thèmes. */
  bubbleWords: string[];
  difficulty: 1 | 2 | 3;
}

export const cirqueDesMotsChallenges: CirqueDesMotsChallenge[] = [
  // Niveau 1 — 4 bulles
  { id: 1, theme: "dieren", themeFr: "les animaux", targetWord: "leeuw", targetWordFr: "le lion", bubbleWords: ["leeuw", "appel", "stoel", "fiets"], difficulty: 1 },
  { id: 2, theme: "eten", themeFr: "la nourriture", targetWord: "brood", targetWordFr: "le pain", bubbleWords: ["brood", "hond", "tafel", "trein"], difficulty: 1 },
  { id: 3, theme: "kleuren", themeFr: "les couleurs", targetWord: "rood", targetWordFr: "rouge", bubbleWords: ["rood", "kip", "boek", "melk"], difficulty: 1 },
  { id: 4, theme: "dieren", themeFr: "les animaux", targetWord: "koe", targetWordFr: "la vache", bubbleWords: ["koe", "kaas", "groen", "raam"], difficulty: 1 },
  { id: 5, theme: "eten", themeFr: "la nourriture", targetWord: "appel", targetWordFr: "la pomme", bubbleWords: ["appel", "muis", "blauw", "deur"], difficulty: 1 },
  { id: 6, theme: "kleuren", themeFr: "les couleurs", targetWord: "geel", targetWordFr: "jaune", bubbleWords: ["geel", "vis", "stoel", "banaan"], difficulty: 1 },
  { id: 7, theme: "school", themeFr: "l'école", targetWord: "boek", targetWordFr: "le livre", bubbleWords: ["boek", "beer", "soep", "zwart"], difficulty: 1 },
  { id: 8, theme: "dieren", themeFr: "les animaux", targetWord: "kat", targetWordFr: "le chat", bubbleWords: ["kat", "pen", "wit", "kaas"], difficulty: 1 },
  { id: 9, theme: "school", themeFr: "l'école", targetWord: "pen", targetWordFr: "le stylo", bubbleWords: ["pen", "hond", "melk", "roze"], difficulty: 1 },
  { id: 10, theme: "eten", themeFr: "la nourriture", targetWord: "melk", targetWordFr: "le lait", bubbleWords: ["melk", "aap", "groen", "tas"], difficulty: 1 },

  // Niveau 2 — 5 bulles, thèmes plus fins
  { id: 11, theme: "kledij", themeFr: "les vêtements", targetWord: "broek", targetWordFr: "le pantalon", bubbleWords: ["broek", "leeuw", "appel", "geel", "boek"], difficulty: 2 },
  { id: 12, theme: "familie", themeFr: "la famille", targetWord: "zus", targetWordFr: "la sœur", bubbleWords: ["zus", "trui", "vis", "rood", "pen"], difficulty: 2 },
  { id: 13, theme: "lichaam", themeFr: "le corps", targetWord: "hand", targetWordFr: "la main", bubbleWords: ["hand", "brood", "hond", "jas", "blauw"], difficulty: 2 },
  { id: 14, theme: "huis", themeFr: "la maison", targetWord: "keuken", targetWordFr: "la cuisine", bubbleWords: ["keuken", "oom", "voet", "sok", "paars"], difficulty: 2 },
  { id: 15, theme: "kledij", themeFr: "les vêtements", targetWord: "jas", targetWordFr: "le manteau", bubbleWords: ["jas", "neus", "zolder", "tante", "kip"], difficulty: 2 },
  { id: 16, theme: "familie", themeFr: "la famille", targetWord: "broer", targetWordFr: "le frère", bubbleWords: ["broer", "hemd", "arm", "bed", "wit"], difficulty: 2 },
  { id: 17, theme: "lichaam", themeFr: "le corps", targetWord: "oog", targetWordFr: "l'œil", bubbleWords: ["oog", "opa", "kast", "rok", "peer"], difficulty: 2 },
  { id: 18, theme: "huis", themeFr: "la maison", targetWord: "tuin", targetWordFr: "le jardin", bubbleWords: ["tuin", "mond", "schoen", "nicht", "kaas"], difficulty: 2 },
  { id: 19, theme: "kledij", themeFr: "les vêtements", targetWord: "muts", targetWordFr: "le bonnet", bubbleWords: ["muts", "been", "oma", "raam", "soep"], difficulty: 2 },
  { id: 20, theme: "familie", themeFr: "la famille", targetWord: "oma", targetWordFr: "la mamie", bubbleWords: ["oma", "hoed", "oor", "trap", "vis"], difficulty: 2 },

  // Niveau 3 — 5 bulles, vocabulaire avancé
  { id: 21, theme: "beroepen", themeFr: "les métiers", targetWord: "bakker", targetWordFr: "le boulanger", bubbleWords: ["bakker", "trein", "winter", "vinger", "zolder"], difficulty: 3 },
  { id: 22, theme: "vervoer", themeFr: "les transports", targetWord: "vliegtuig", targetWordFr: "l'avion", bubbleWords: ["vliegtuig", "dokter", "lente", "keuken", "elleboog"], difficulty: 3 },
  { id: 23, theme: "seizoenen", themeFr: "les saisons", targetWord: "herfst", targetWordFr: "l'automne", bubbleWords: ["herfst", "bus", "slager", "schouder", "gordijn"], difficulty: 3 },
  { id: 24, theme: "beroepen", themeFr: "les métiers", targetWord: "leraar", targetWordFr: "l'enseignant", bubbleWords: ["leraar", "tram", "zomer", "knie", "bank"], difficulty: 3 },
  { id: 25, theme: "vervoer", themeFr: "les transports", targetWord: "boot", targetWordFr: "le bateau", bubbleWords: ["boot", "kapper", "sneeuw", "duim", "lamp"], difficulty: 3 },
  { id: 26, theme: "weer", themeFr: "le temps qu'il fait", targetWord: "onweer", targetWordFr: "l'orage", bubbleWords: ["onweer", "metro", "tuinman", "rug", "spiegel"], difficulty: 3 },
  { id: 27, theme: "seizoenen", themeFr: "les saisons", targetWord: "lente", targetWordFr: "le printemps", bubbleWords: ["lente", "fiets", "arts", "hiel", "deurbel"], difficulty: 3 },
  { id: 28, theme: "beroepen", themeFr: "les métiers", targetWord: "brandweerman", targetWordFr: "le pompier", bubbleWords: ["brandweerman", "auto", "mist", "pols", "matras"], difficulty: 3 },
  { id: 29, theme: "weer", themeFr: "le temps qu'il fait", targetWord: "hagel", targetWordFr: "la grêle", bubbleWords: ["hagel", "trein", "kok", "teen", "kussen"], difficulty: 3 },
  { id: 30, theme: "vervoer", themeFr: "les transports", targetWord: "trein", targetWordFr: "le train", bubbleWords: ["trein", "wolk", "bakker", "kin", "gordijn"], difficulty: 3 },
];
