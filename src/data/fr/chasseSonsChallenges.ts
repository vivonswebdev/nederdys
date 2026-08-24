import { FrChallenge } from "./types";

/** Chasse aux Sons — attrape le mot qui contient le son entendu (30 défis). */
export const chasseSonsChallenges: FrChallenge[] = [
  // Niveau 1 — sons simples
  { id: 1, prompt: "[ch] comme dans chat", hint: "Quel mot contient ce son ?", options: ["cheval", "table", "lapin", "porte"], correctAnswer: "cheval", speak: "che, comme dans chat", difficulty: 1 },
  { id: 2, prompt: "[ou] comme dans loup", hint: "Quel mot contient ce son ?", options: ["poule", "livre", "carte", "pain"], correctAnswer: "poule", speak: "ou, comme dans loup", difficulty: 1 },
  { id: 3, prompt: "[an] comme dans dent", hint: "Quel mot contient ce son ?", options: ["enfant", "moto", "vélo", "souris"], correctAnswer: "enfant", speak: "an, comme dans dent", difficulty: 1 },
  { id: 4, prompt: "[on] comme dans pont", hint: "Quel mot contient ce son ?", options: ["ballon", "chapeau", "tapis", "fleur"], correctAnswer: "ballon", speak: "on, comme dans pont", difficulty: 1 },
  { id: 5, prompt: "[in] comme dans lapin", hint: "Quel mot contient ce son ?", options: ["sapin", "bateau", "école", "poulet"], correctAnswer: "sapin", speak: "in, comme dans lapin", difficulty: 1 },
  { id: 6, prompt: "[oi] comme dans roi", hint: "Quel mot contient ce son ?", options: ["étoile", "banane", "cartable", "mouton"], correctAnswer: "étoile", speak: "oi, comme dans roi", difficulty: 1 },
  { id: 7, prompt: "[é] comme dans été", hint: "Quel mot contient ce son ?", options: ["école", "loup", "chien", "tour"], correctAnswer: "école", speak: "é, comme dans été", difficulty: 1 },
  { id: 8, prompt: "[au] comme dans château", hint: "Quel mot contient ce son ?", options: ["gâteau", "lampe", "livre", "main"], correctAnswer: "gâteau", speak: "au, comme dans château", difficulty: 1 },
  { id: 9, prompt: "[eu] comme dans feu", hint: "Quel mot contient ce son ?", options: ["fleur", "chat", "mardi", "pomme"], correctAnswer: "fleur", speak: "eu, comme dans feu", difficulty: 1 },
  { id: 10, prompt: "[ss] comme dans poisson", hint: "Quel mot contient ce son ?", options: ["tasse", "zèbre", "vase", "rose"], correctAnswer: "tasse", speak: "sss, comme dans poisson", difficulty: 1 },

  // Niveau 2 — sons proches
  { id: 11, prompt: "[j] comme dans jupe", options: ["girafe", "cadeau", "kangourou", "tortue"], correctAnswer: "girafe", speak: "je, comme dans jupe", difficulty: 2 },
  { id: 12, prompt: "[gn] comme dans montagne", options: ["araignée", "ananas", "arrosoir", "abricot"], correctAnswer: "araignée", speak: "gne, comme dans montagne", difficulty: 2 },
  { id: 13, prompt: "[z] comme dans zèbre", options: ["maison", "chaussure", "poisson", "cerise braisée"], correctAnswer: "maison", speak: "ze, comme dans zèbre", difficulty: 2 },
  { id: 14, prompt: "[ill] comme dans fille", options: ["bouteille", "boulette", "bouton", "boulanger"], correctAnswer: "bouteille", speak: "ille, comme dans fille", difficulty: 2 },
  { id: 15, prompt: "[ph] = [f]", options: ["téléphone", "tapisserie", "tourterelle", "tirelire"], correctAnswer: "téléphone", speak: "fe, comme dans téléphone", difficulty: 2 },
  { id: 16, prompt: "[ien] comme dans chien", options: ["gardien", "gardon", "jardin", "garage"], correctAnswer: "gardien", speak: "ien, comme dans chien", difficulty: 2 },
  { id: 17, prompt: "[ai] comme dans maison", options: ["balai", "boulon", "bureau", "bonbon"], correctAnswer: "balai", speak: "ai, comme dans maison", difficulty: 2 },
  { id: 18, prompt: "[ui] comme dans nuit", options: ["fruit", "front", "fraise", "flèche"], correctAnswer: "fruit", speak: "ui, comme dans nuit", difficulty: 2 },
  { id: 19, prompt: "[k] écrit « qu »", options: ["banquise", "bâtiment", "bergerie", "bricolage"], correctAnswer: "banquise", speak: "que, comme dans banquise", difficulty: 2 },
  { id: 20, prompt: "[eur] comme dans fleur", options: ["docteur", "docile", "doucement", "dossier"], correctAnswer: "docteur", speak: "eur, comme dans fleur", difficulty: 2 },

  // Niveau 3 — discrimination fine
  { id: 21, prompt: "[s] et non [z]", options: ["coussin", "cousin", "cuisine", "casino"], correctAnswer: "coussin", speak: "sss, coussin ou cousin ?", difficulty: 3 },
  { id: 22, prompt: "[o] fermé comme dans dos", options: ["chapeau", "chatte", "chaussette", "chercher"], correctAnswer: "chapeau", speak: "o fermé, comme dans dos", difficulty: 3 },
  { id: 23, prompt: "[ch] et non [k]", options: ["chorale", "chocolat", "chœur", "orchestre"], correctAnswer: "chocolat", speak: "che, et non ke", difficulty: 3 },
  { id: 24, prompt: "[oin] comme dans loin", options: ["témoin", "témoigner", "tampon", "timbre"], correctAnswer: "témoin", speak: "oin, comme dans loin", difficulty: 3 },
  { id: 25, prompt: "[ail] comme dans travail", options: ["portail", "portail cassé", "portière", "porteur"], correctAnswer: "portail", speak: "ail, comme dans travail", difficulty: 3 },
  { id: 26, prompt: "[euil] comme dans écureuil", options: ["fauteuil", "feuillage", "fouillis", "fauvette"], correctAnswer: "fauteuil", speak: "euil, comme dans écureuil", difficulty: 3 },
  { id: 27, prompt: "[gu] dur comme dans guitare", options: ["guépard", "genou", "girafe", "gymnase"], correctAnswer: "guépard", speak: "gue dur, comme dans guitare", difficulty: 3 },
  { id: 28, prompt: "[ti] qui se dit [si]", options: ["récréation", "réclamation orale", "réparation manuelle", "réticence"], correctAnswer: "récréation", speak: "sion, comme dans récréation", difficulty: 3 },
  { id: 29, prompt: "[x] = [ks]", options: ["taxi", "tasse", "tissu", "tempête"], correctAnswer: "taxi", speak: "kss, comme dans taxi", difficulty: 3 },
  { id: 30, prompt: "[è] ouvert comme dans mère", options: ["forêt", "fourrure", "fumée", "fourmi"], correctAnswer: "forêt", speak: "è ouvert, comme dans mère", difficulty: 3 },
];
