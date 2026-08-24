import { FrChallenge } from "./types";

/** Bulles de Mots — fais éclater la bulle du mot qui correspond à l'image (30 défis). */
export const bullesMotsFrChallenges: FrChallenge[] = [
  // Niveau 1
  { id: 1, prompt: "🫧 🍎", options: ["pomme", "poire", "prune", "pêche"], correctAnswer: "pomme", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 2, prompt: "🫧 🐕", options: ["chien", "chat", "cheval", "chèvre"], correctAnswer: "chien", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 3, prompt: "🫧 ☀️", options: ["soleil", "lune", "étoile", "nuage"], correctAnswer: "soleil", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 4, prompt: "🫧 📚", options: ["livres", "cahiers", "crayons", "cartables"], correctAnswer: "livres", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 5, prompt: "🫧 🚗", options: ["voiture", "camion", "bus", "train"], correctAnswer: "voiture", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 6, prompt: "🫧 🧀", options: ["fromage", "beurre", "yaourt", "lait"], correctAnswer: "fromage", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 7, prompt: "🫧 🌙", options: ["lune", "soleil", "comète", "planète"], correctAnswer: "lune", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 8, prompt: "🫧 👟", options: ["chaussure", "chaussette", "botte", "sandale"], correctAnswer: "chaussure", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 9, prompt: "🫧 🐄", options: ["vache", "chèvre", "mouton", "cochon"], correctAnswer: "vache", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },
  { id: 10, prompt: "🫧 ✏️", options: ["crayon", "gomme", "règle", "stylo"], correctAnswer: "crayon", speak: "Fais éclater la bulle du bon mot.", difficulty: 1 },

  // Niveau 2
  { id: 11, prompt: "🫧 🥕", options: ["carotte", "courgette", "concombre", "chou"], correctAnswer: "carotte", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 12, prompt: "🫧 🦋", options: ["papillon", "libellule", "sauterelle", "coccinelle"], correctAnswer: "papillon", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 13, prompt: "🫧 ⛵", options: ["voilier", "pédalo", "canoë", "chaloupe"], correctAnswer: "voilier", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 14, prompt: "🫧 🍄", options: ["champignon", "chardon", "chêne", "châtaigne"], correctAnswer: "champignon", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 15, prompt: "🫧 🧸", options: ["ours en peluche", "poupée", "robot", "marionnette"], correctAnswer: "ours en peluche", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 16, prompt: "🫧 🛴", options: ["trottinette", "planche à roulettes", "patins", "luge"], correctAnswer: "trottinette", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 17, prompt: "🫧 🐢", options: ["tortue", "lézard", "crapaud", "serpent"], correctAnswer: "tortue", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 18, prompt: "🫧 🥁", options: ["tambour", "trompette", "guitare", "violon"], correctAnswer: "tambour", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 19, prompt: "🫧 🌂", options: ["parapluie", "parasol", "paravent", "éventail"], correctAnswer: "parapluie", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },
  { id: 20, prompt: "🫧 🧤", options: ["gants", "moufles rayées", "bonnet", "écharpe"], correctAnswer: "gants", speak: "Fais éclater la bulle du bon mot.", difficulty: 2 },

  // Niveau 3
  { id: 21, prompt: "🫧 🦩", options: ["flamant rose", "pélican", "autruche", "paon"], correctAnswer: "flamant rose", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 22, prompt: "🫧 🔬", options: ["microscope", "télescope", "périscope", "stéthoscope"], correctAnswer: "microscope", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 23, prompt: "🫧 🏺", options: ["vase antique", "bocal", "carafe", "gourde"], correctAnswer: "vase antique", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 24, prompt: "🫧 🪗", options: ["accordéon", "harmonica", "orgue", "clarinette"], correctAnswer: "accordéon", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 25, prompt: "🫧 🛰️", options: ["satellite", "fusée", "navette", "sonde"], correctAnswer: "satellite", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 26, prompt: "🫧 🧬", options: ["ADN", "atome", "molécule d'eau", "cellule"], correctAnswer: "ADN", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 27, prompt: "🫧 ⛺", options: ["tente", "cabane", "chalet", "caravane"], correctAnswer: "tente", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 28, prompt: "🫧 🦚", options: ["paon", "faisan", "dindon", "perdrix"], correctAnswer: "paon", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 29, prompt: "🫧 🕰️", options: ["horloge", "réveil", "chronomètre", "sablier"], correctAnswer: "horloge", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
  { id: 30, prompt: "🫧 🪤", options: ["piège à souris", "cage", "filet", "hameçon"], correctAnswer: "piège à souris", speak: "Fais éclater la bulle du bon mot.", difficulty: 3 },
];
