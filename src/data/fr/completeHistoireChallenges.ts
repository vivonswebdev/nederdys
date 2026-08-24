import { FrChallenge } from "./types";

/** Complète l'Histoire — choisis le mot manquant dans une mini-histoire (30 défis). */
export const completeHistoireChallenges: FrChallenge[] = [
  // Niveau 1
  { id: 1, prompt: "Le matin, Lina boit son ___ avant l'école.", options: ["chocolat", "chapeau", "cheval", "château"], correctAnswer: "chocolat", speak: "Le matin, Lina boit son ... avant l'école.", difficulty: 1 },
  { id: 2, prompt: "Le chat dort sur le ___ du salon.", options: ["tapis", "tapir", "taxi", "temps"], correctAnswer: "tapis", speak: "Le chat dort sur le ... du salon.", difficulty: 1 },
  { id: 3, prompt: "Papa coupe le pain avec un ___.", options: ["couteau", "crayon", "chapeau", "carton"], correctAnswer: "couteau", speak: "Papa coupe le pain avec un ...", difficulty: 1 },
  { id: 4, prompt: "Il pleut : je prends mon ___.", options: ["parapluie", "parasol", "panier", "pantalon"], correctAnswer: "parapluie", speak: "Il pleut, je prends mon ...", difficulty: 1 },
  { id: 5, prompt: "Les oiseaux font leur nid dans l'___.", options: ["arbre", "armoire", "arrosoir", "ardoise"], correctAnswer: "arbre", speak: "Les oiseaux font leur nid dans l'...", difficulty: 1 },
  { id: 6, prompt: "À la récréation, on joue au ___.", options: ["ballon", "balcon", "bâton", "biberon"], correctAnswer: "ballon", speak: "À la récréation, on joue au ...", difficulty: 1 },
  { id: 7, prompt: "Le soir, je me brosse les ___.", options: ["dents", "doigts", "danses", "dons"], correctAnswer: "dents", speak: "Le soir, je me brosse les ...", difficulty: 1 },
  { id: 8, prompt: "Mamie tricote une ___ bien chaude.", options: ["écharpe", "étoile", "échelle", "épingle"], correctAnswer: "écharpe", speak: "Mamie tricote une ... bien chaude.", difficulty: 1 },
  { id: 9, prompt: "Le boulanger sort le pain du ___.", options: ["four", "fou", "fort", "port"], correctAnswer: "four", speak: "Le boulanger sort le pain du ...", difficulty: 1 },
  { id: 10, prompt: "Nous plantons des fleurs dans le ___.", options: ["jardin", "journal", "jouet", "jeudi"], correctAnswer: "jardin", speak: "Nous plantons des fleurs dans le ...", difficulty: 1 },

  // Niveau 2
  { id: 11, prompt: "Tom court si vite qu'il arrive toujours le ___.", options: ["premier", "dernier", "silence", "chemin"], correctAnswer: "premier", speak: "Tom court si vite qu'il arrive toujours le ...", difficulty: 2 },
  { id: 12, prompt: "La maîtresse ___ l'exercice au tableau.", options: ["explique", "explose", "exporte", "expire"], correctAnswer: "explique", speak: "La maîtresse ... l'exercice au tableau.", difficulty: 2 },
  { id: 13, prompt: "Il faisait si froid que l'étang était ___.", options: ["gelé", "mouillé", "brûlé", "fané"], correctAnswer: "gelé", speak: "Il faisait si froid que l'étang était ...", difficulty: 2 },
  { id: 14, prompt: "Le renard se ___ derrière un buisson.", options: ["cache", "montre", "présente", "affiche"], correctAnswer: "cache", speak: "Le renard se ... derrière un buisson.", difficulty: 2 },
  { id: 15, prompt: "Sans lunettes, grand-père voit tout ___.", options: ["flou", "clair", "net", "précis"], correctAnswer: "flou", speak: "Sans lunettes, grand-père voit tout ...", difficulty: 2 },
  { id: 16, prompt: "Après la course, les joueurs sont ___.", options: ["épuisés", "reposés", "endormis tôt", "immobiles debout"], correctAnswer: "épuisés", speak: "Après la course, les joueurs sont ...", difficulty: 2 },
  { id: 17, prompt: "Le facteur ___ le courrier chaque matin.", options: ["distribue", "dévore", "démolit", "décore"], correctAnswer: "distribue", speak: "Le facteur ... le courrier chaque matin.", difficulty: 2 },
  { id: 18, prompt: "La rivière ___ doucement entre les arbres.", options: ["coule", "colle", "cloue", "clôt"], correctAnswer: "coule", speak: "La rivière ... doucement entre les arbres.", difficulty: 2 },
  { id: 19, prompt: "Elle range ses affaires dans son ___ avant de partir.", options: ["cartable", "carrelage", "carnaval", "carrefour"], correctAnswer: "cartable", speak: "Elle range ses affaires dans son ... avant de partir.", difficulty: 2 },
  { id: 20, prompt: "Le vent souffle si fort que les volets ___.", options: ["claquent", "brillent", "chantent juste", "flottent doucement"], correctAnswer: "claquent", speak: "Le vent souffle si fort que les volets ...", difficulty: 2 },

  // Niveau 3
  { id: 21, prompt: "Le chevalier avança ___ dans la forêt sombre.", options: ["prudemment", "joyeusement fort", "bruyamment vite", "rarement"], correctAnswer: "prudemment", speak: "Le chevalier avança ... dans la forêt sombre.", difficulty: 3 },
  { id: 22, prompt: "Personne ne savait ___ le trésor avait été caché.", options: ["où", "ou", "houx", "aoû"], correctAnswer: "où", speak: "Personne ne savait ... le trésor avait été caché.", difficulty: 3 },
  { id: 23, prompt: "Bien qu'il ___ fatigué, il termina son travail.", options: ["fût", "fut jamais", "fusse tous", "fusses"], correctAnswer: "fût", speak: "Bien qu'il ... fatigué, il termina son travail.", difficulty: 3 },
  { id: 24, prompt: "Le vieux moulin, ___ depuis vingt ans, s'écroulait.", options: ["abandonné", "abandonnant", "abandonne", "abandonnera"], correctAnswer: "abandonné", speak: "Le vieux moulin, ... depuis vingt ans, s'écroulait.", difficulty: 3 },
  { id: 25, prompt: "Elle raconta son histoire avec beaucoup d'___.", options: ["émotion", "émission", "omission", "ambition sourde"], correctAnswer: "émotion", speak: "Elle raconta son histoire avec beaucoup d'...", difficulty: 3 },
  { id: 26, prompt: "Le brouillard ___ peu à peu au lever du soleil.", options: ["se dissipa", "se densifia", "s'épaissit", "se figea"], correctAnswer: "se dissipa", speak: "Le brouillard ... peu à peu au lever du soleil.", difficulty: 3 },
  { id: 27, prompt: "Les explorateurs découvrirent une grotte ___.", options: ["immense", "immensité", "immensément grande vite", "immenses"], correctAnswer: "immense", speak: "Les explorateurs découvrirent une grotte ...", difficulty: 3 },
  { id: 28, prompt: "Il parlait à voix basse pour ne pas ___ le bébé.", options: ["réveiller", "réviser", "révéler", "rêver"], correctAnswer: "réveiller", speak: "Il parlait à voix basse pour ne pas ... le bébé.", difficulty: 3 },
  { id: 29, prompt: "Le capitaine ordonna de lever l'___ au petit matin.", options: ["ancre", "encre", "antre", "âcre"], correctAnswer: "ancre", speak: "Le capitaine ordonna de lever l'... au petit matin.", difficulty: 3 },
  { id: 30, prompt: "Grâce à sa ___, elle résolut l'énigme la première.", options: ["logique", "lourdeur", "longueur", "loterie"], correctAnswer: "logique", speak: "Grâce à sa ..., elle résolut l'énigme la première.", difficulty: 3 },
];
