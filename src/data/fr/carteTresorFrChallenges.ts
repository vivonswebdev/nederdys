import { FrChallenge } from "./types";

/** Carte au Trésor — suis les indices pour trouver le bon mot (30 défis). */
export const carteTresorFrChallenges: FrChallenge[] = [
  // Niveau 1
  { id: 1, prompt: "🗺️ C'est rond et rouge, ça se mange.", options: ["une pomme", "un ballon", "un soleil", "un tapis"], correctAnswer: "une pomme", speak: "C'est rond et rouge, ça se mange.", difficulty: 1 },
  { id: 2, prompt: "🗺️ Ça a quatre pattes et ça aboie.", options: ["un chien", "un chat", "un cheval", "un canard"], correctAnswer: "un chien", speak: "Ça a quatre pattes et ça aboie.", difficulty: 1 },
  { id: 3, prompt: "🗺️ C'est jaune, chaud et ça brille dans le ciel.", options: ["le soleil", "la lune", "la pluie", "la neige"], correctAnswer: "le soleil", speak: "C'est jaune, chaud et ça brille dans le ciel.", difficulty: 1 },
  { id: 4, prompt: "🗺️ On s'assoit dessus pour manger.", options: ["une chaise", "un lit", "une armoire", "un tapis"], correctAnswer: "une chaise", speak: "On s'assoit dessus pour manger.", difficulty: 1 },
  { id: 5, prompt: "🗺️ Ça a deux roues et des pédales.", options: ["un vélo", "une voiture", "un bus", "un bateau"], correctAnswer: "un vélo", speak: "Ça a deux roues et des pédales.", difficulty: 1 },
  { id: 6, prompt: "🗺️ C'est blanc, froid et ça tombe en hiver.", options: ["la neige", "le sable", "la pluie", "le vent"], correctAnswer: "la neige", speak: "C'est blanc, froid et ça tombe en hiver.", difficulty: 1 },
  { id: 7, prompt: "🗺️ Ça nage dans l'eau et ça a des écailles.", options: ["un poisson", "un oiseau", "un lapin", "un mouton"], correctAnswer: "un poisson", speak: "Ça nage dans l'eau et ça a des écailles.", difficulty: 1 },
  { id: 8, prompt: "🗺️ On l'ouvre quand il pleut.", options: ["un parapluie", "une fenêtre", "un cartable", "une valise"], correctAnswer: "un parapluie", speak: "On l'ouvre quand il pleut.", difficulty: 1 },
  { id: 9, prompt: "🗺️ C'est long, jaune et les singes l'adorent.", options: ["une banane", "une carotte", "une fraise", "un citron"], correctAnswer: "une banane", speak: "C'est long, jaune et les singes l'adorent.", difficulty: 1 },
  { id: 10, prompt: "🗺️ On l'écrit avec et il a une mine.", options: ["un crayon", "une gomme", "un livre", "une règle"], correctAnswer: "un crayon", speak: "On écrit avec et il a une mine.", difficulty: 1 },

  // Niveau 2
  { id: 11, prompt: "🗺️ Ça pique, ça vit en forêt et ça se roule en boule.", options: ["un hérisson", "un écureuil", "un renard", "un blaireau"], correctAnswer: "un hérisson", speak: "Ça pique, ça vit en forêt et ça se roule en boule.", difficulty: 2 },
  { id: 12, prompt: "🗺️ C'est en verre, on y met de l'eau et des fleurs.", options: ["un vase", "un bol", "une casserole", "un seau"], correctAnswer: "un vase", speak: "C'est en verre, on y met de l'eau et des fleurs.", difficulty: 2 },
  { id: 13, prompt: "🗺️ Elle fabrique du miel et vit en ruche.", options: ["une abeille", "une guêpe", "une fourmi", "une mouche"], correctAnswer: "une abeille", speak: "Elle fabrique du miel et vit en ruche.", difficulty: 2 },
  { id: 14, prompt: "🗺️ Il traverse une rivière, on marche dessus.", options: ["un pont", "un tunnel", "un quai", "un mur"], correctAnswer: "un pont", speak: "Il traverse une rivière, on marche dessus.", difficulty: 2 },
  { id: 15, prompt: "🗺️ Ça vole la nuit et ça fait « hou hou ».", options: ["un hibou", "un pigeon", "une mouette", "un moineau"], correctAnswer: "un hibou", speak: "Ça vole la nuit et ça fait hou hou.", difficulty: 2 },
  { id: 16, prompt: "🗺️ On monte dessus pour attraper quelque chose en hauteur.", options: ["une échelle", "une chaise longue", "un tabouret bas", "un banc"], correctAnswer: "une échelle", speak: "On monte dessus pour attraper quelque chose en hauteur.", difficulty: 2 },
  { id: 17, prompt: "🗺️ C'est du pain long et croustillant.", options: ["une baguette", "un croissant", "une brioche", "un beignet"], correctAnswer: "une baguette", speak: "C'est du pain long et croustillant.", difficulty: 2 },
  { id: 18, prompt: "🗺️ Elle donne de la lumière avec une flamme et de la cire.", options: ["une bougie", "une lampe", "une torche", "une ampoule"], correctAnswer: "une bougie", speak: "Elle donne de la lumière avec une flamme et de la cire.", difficulty: 2 },
  { id: 19, prompt: "🗺️ Il vole grâce au vent, tenu par une ficelle.", options: ["un cerf-volant", "un avion", "un ballon", "un drone"], correctAnswer: "un cerf-volant", speak: "Il vole grâce au vent, tenu par une ficelle.", difficulty: 2 },
  { id: 20, prompt: "🗺️ Ce grand oiseau blanc glisse sur l'étang.", options: ["un cygne", "un canard", "une oie", "une poule d'eau"], correctAnswer: "un cygne", speak: "Ce grand oiseau blanc glisse sur l'étang.", difficulty: 2 },

  // Niveau 3
  { id: 21, prompt: "🗺️ Cet instrument indique toujours le nord.", options: ["une boussole", "une horloge", "une loupe", "un baromètre"], correctAnswer: "une boussole", speak: "Cet instrument indique toujours le nord.", difficulty: 3 },
  { id: 22, prompt: "🗺️ On y range des milliers de livres à emprunter.", options: ["une bibliothèque", "une librairie", "une papeterie", "un musée"], correctAnswer: "une bibliothèque", speak: "On y range des milliers de livres à emprunter.", difficulty: 3 },
  { id: 23, prompt: "🗺️ Ce nuage bas au ras du sol cache la route.", options: ["le brouillard", "la fumée", "la grêle", "la rosée"], correctAnswer: "le brouillard", speak: "Ce nuage bas au ras du sol cache la route.", difficulty: 3 },
  { id: 24, prompt: "🗺️ Elle empêche le bateau de dériver au port.", options: ["l'ancre", "la voile", "la rame", "la bouée"], correctAnswer: "l'ancre", speak: "Elle empêche le bateau de dériver au port.", difficulty: 3 },
  { id: 25, prompt: "🗺️ Ce bâtiment fort avec des tours protégeait un seigneur.", options: ["un château", "une usine", "une gare", "un hôtel"], correctAnswer: "un château", speak: "Ce bâtiment fort avec des tours protégeait un seigneur.", difficulty: 3 },
  { id: 26, prompt: "🗺️ On y achète des médicaments.", options: ["une pharmacie", "une boulangerie", "une quincaillerie", "une épicerie"], correctAnswer: "une pharmacie", speak: "On y achète des médicaments.", difficulty: 3 },
  { id: 27, prompt: "🗺️ Cet appareil agrandit ce qui est invisible à l'œil nu.", options: ["un microscope", "un télescope", "un mégaphone", "un projecteur"], correctAnswer: "un microscope", speak: "Cet appareil agrandit ce qui est invisible à l'œil nu.", difficulty: 3 },
  { id: 28, prompt: "🗺️ Cet oiseau rose se tient sur une patte.", options: ["un flamant rose", "une cigogne", "un héron", "un pélican"], correctAnswer: "un flamant rose", speak: "Cet oiseau rose se tient sur une patte.", difficulty: 3 },
  { id: 29, prompt: "🗺️ Cette plante haute suit le soleil des yeux.", options: ["un tournesol", "un coquelicot", "une jonquille", "une pivoine"], correctAnswer: "un tournesol", speak: "Cette plante haute suit le soleil des yeux.", difficulty: 3 },
  { id: 30, prompt: "🗺️ On y dort en camping, elle est en toile.", options: ["une tente", "une caravane", "une cabane", "un chalet"], correctAnswer: "une tente", speak: "On y dort en camping, elle est en toile.", difficulty: 3 },
];
