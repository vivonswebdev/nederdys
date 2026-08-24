import { FrChallenge } from "./types";

/** Rime Malin (FR) — écoute un mot, trouve celui qui rime (30 défis). */
export const rimeMalinFrChallenges: FrChallenge[] = [
  // Niveau 1
  { id: 1, prompt: "chat", hint: "Trouve la rime", options: ["rat", "chien", "arbre", "voiture"], correctAnswer: "rat", speak: "chat", difficulty: 1 },
  { id: 2, prompt: "pomme", hint: "Trouve la rime", options: ["homme", "arbre", "livre", "table"], correctAnswer: "homme", speak: "pomme", difficulty: 1 },
  { id: 3, prompt: "bateau", hint: "Trouve la rime", options: ["gâteau", "maison", "fleur", "chien"], correctAnswer: "gâteau", speak: "bateau", difficulty: 1 },
  { id: 4, prompt: "lapin", hint: "Trouve la rime", options: ["sapin", "chaise", "école", "moto"], correctAnswer: "sapin", speak: "lapin", difficulty: 1 },
  { id: 5, prompt: "souris", hint: "Trouve la rime", options: ["tapis", "banane", "chapeau", "porte"], correctAnswer: "tapis", speak: "souris", difficulty: 1 },
  { id: 6, prompt: "ballon", hint: "Trouve la rime", options: ["mouton", "vélo", "fenêtre", "cahier"], correctAnswer: "mouton", speak: "ballon", difficulty: 1 },
  { id: 7, prompt: "fleur", hint: "Trouve la rime", options: ["cœur", "livre", "table", "chat"], correctAnswer: "cœur", speak: "fleur", difficulty: 1 },
  { id: 8, prompt: "maison", hint: "Trouve la rime", options: ["saison", "banane", "chien", "école"], correctAnswer: "saison", speak: "maison", difficulty: 1 },
  { id: 9, prompt: "chapeau", hint: "Trouve la rime", options: ["cadeau", "voiture", "poisson", "arbre"], correctAnswer: "cadeau", speak: "chapeau", difficulty: 1 },
  { id: 10, prompt: "poule", hint: "Trouve la rime", options: ["boule", "vélo", "chien", "tapis"], correctAnswer: "boule", speak: "poule", difficulty: 1 },

  // Niveau 2
  { id: 11, prompt: "fenêtre", options: ["lettre", "fauteuil", "cuisine", "chemin"], correctAnswer: "lettre", speak: "fenêtre", difficulty: 2 },
  { id: 12, prompt: "chemin", options: ["matin", "maison", "montagne", "musique"], correctAnswer: "matin", speak: "chemin", difficulty: 2 },
  { id: 13, prompt: "cuisine", options: ["colline", "cartable", "carotte", "château"], correctAnswer: "colline", speak: "cuisine", difficulty: 2 },
  { id: 14, prompt: "école", options: ["farandole", "escalier", "élastique", "étoile"], correctAnswer: "farandole", speak: "école", difficulty: 2 },
  { id: 15, prompt: "papillon", options: ["pantalon", "papier", "poivron cru", "parapluie"], correctAnswer: "pantalon", speak: "papillon", difficulty: 2 },
  { id: 16, prompt: "voiture", options: ["peinture", "vélo", "village", "valise"], correctAnswer: "peinture", speak: "voiture", difficulty: 2 },
  { id: 17, prompt: "grenouille", options: ["citrouille", "grenier", "girafe", "guitare"], correctAnswer: "citrouille", speak: "grenouille", difficulty: 2 },
  { id: 18, prompt: "orange", options: ["mésange", "olive", "oreille", "ourson"], correctAnswer: "mésange", speak: "orange", difficulty: 2 },
  { id: 19, prompt: "brouette", options: ["chaussette", "brochure", "brioche", "brindille"], correctAnswer: "chaussette", speak: "brouette", difficulty: 2 },
  { id: 20, prompt: "abeille", options: ["oreille", "abricot", "araignée", "ardoise"], correctAnswer: "oreille", speak: "abeille", difficulty: 2 },

  // Niveau 3
  { id: 21, prompt: "hirondelle", options: ["ficelle", "hirsute", "horloge", "hérisson"], correctAnswer: "ficelle", speak: "hirondelle", difficulty: 3 },
  { id: 22, prompt: "aventure", options: ["confiture", "avenue", "averse", "avalanche"], correctAnswer: "confiture", speak: "aventure", difficulty: 3 },
  { id: 23, prompt: "chocolat", options: ["cabinet plat", "chocolatier", "chocolaté", "climat"], correctAnswer: "climat", speak: "chocolat", difficulty: 3 },
  { id: 24, prompt: "musicien", options: ["magicien", "musicale", "muscade", "moustique"], correctAnswer: "magicien", speak: "musicien", difficulty: 3 },
  { id: 25, prompt: "bibliothèque", options: ["discothèque", "bibelot", "bicyclette", "biberon"], correctAnswer: "discothèque", speak: "bibliothèque", difficulty: 3 },
  { id: 26, prompt: "printemps", options: ["longtemps", "primeur", "prison", "prochain"], correctAnswer: "longtemps", speak: "printemps", difficulty: 3 },
  { id: 27, prompt: "tournesol", options: ["parasol", "tourniquet", "tournevis", "tourterelle"], correctAnswer: "parasol", speak: "tournesol", difficulty: 3 },
  { id: 28, prompt: "montagne", options: ["campagne", "montage", "montre", "moustache"], correctAnswer: "campagne", speak: "montagne", difficulty: 3 },
  { id: 29, prompt: "capitaine", options: ["fontaine", "capitale", "caverne", "carabine"], correctAnswer: "fontaine", speak: "capitaine", difficulty: 3 },
  { id: 30, prompt: "hérisson", options: ["buisson", "hérité", "héron", "horizon lointain"], correctAnswer: "buisson", speak: "hérisson", difficulty: 3 },
];
