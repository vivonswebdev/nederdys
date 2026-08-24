import { FrChallenge } from "./types";

/**
 * Dictée Muette — l'énoncé n'est PAS affiché : l'enfant écoute puis choisit
 * l'orthographe correcte du mot ou de la phrase entendue (30 défis).
 */
export const dicteeMuetteChallenges: FrChallenge[] = [
  // Niveau 1 — mots courts
  { id: 1, prompt: "chat", options: ["chat", "cha", "chatt", "shat"], correctAnswer: "chat", speak: "chat", difficulty: 1 },
  { id: 2, prompt: "maison", options: ["maison", "mèson", "maizon", "mason"], correctAnswer: "maison", speak: "maison", difficulty: 1 },
  { id: 3, prompt: "école", options: ["école", "ecole", "écolle", "ékole"], correctAnswer: "école", speak: "école", difficulty: 1 },
  { id: 4, prompt: "fleur", options: ["fleur", "fleure", "flère", "fleurr"], correctAnswer: "fleur", speak: "fleur", difficulty: 1 },
  { id: 5, prompt: "table", options: ["table", "tabl", "tablle", "tabel"], correctAnswer: "table", speak: "table", difficulty: 1 },
  { id: 6, prompt: "livre", options: ["livre", "livr", "libre", "livrre"], correctAnswer: "livre", speak: "livre", difficulty: 1 },
  { id: 7, prompt: "pomme", options: ["pomme", "pome", "pomm", "paume"], correctAnswer: "pomme", speak: "pomme", difficulty: 1 },
  { id: 8, prompt: "soleil", options: ["soleil", "soleille", "solèl", "soleil'"], correctAnswer: "soleil", speak: "soleil", difficulty: 1 },
  { id: 9, prompt: "chien", options: ["chien", "chian", "chiene", "shien"], correctAnswer: "chien", speak: "chien", difficulty: 1 },
  { id: 10, prompt: "bateau", options: ["bateau", "batau", "bato", "bateaux"], correctAnswer: "bateau", speak: "bateau", difficulty: 1 },

  // Niveau 2 — mots plus longs et sons difficiles
  { id: 11, prompt: "oiseau", options: ["oiseau", "oizeau", "oisau", "woiseau"], correctAnswer: "oiseau", speak: "oiseau", difficulty: 2 },
  { id: 12, prompt: "montagne", options: ["montagne", "montagnne", "montanie", "montaigne"], correctAnswer: "montagne", speak: "montagne", difficulty: 2 },
  { id: 13, prompt: "chocolat", options: ["chocolat", "chocola", "chokolat", "chocolate"], correctAnswer: "chocolat", speak: "chocolat", difficulty: 2 },
  { id: 14, prompt: "parapluie", options: ["parapluie", "paraplui", "parapluis", "paraplouie"], correctAnswer: "parapluie", speak: "parapluie", difficulty: 2 },
  { id: 15, prompt: "chaussure", options: ["chaussure", "chausure", "chaussur", "chossure"], correctAnswer: "chaussure", speak: "chaussure", difficulty: 2 },
  { id: 16, prompt: "grenouille", options: ["grenouille", "grenouile", "grenouye", "grenouill"], correctAnswer: "grenouille", speak: "grenouille", difficulty: 2 },
  { id: 17, prompt: "papillon", options: ["papillon", "papion", "papiyon", "papillion"], correctAnswer: "papillon", speak: "papillon", difficulty: 2 },
  { id: 18, prompt: "musique", options: ["musique", "muzique", "music", "musiqe"], correctAnswer: "musique", speak: "musique", difficulty: 2 },
  { id: 19, prompt: "voiture", options: ["voiture", "voitur", "voyture", "voitture"], correctAnswer: "voiture", speak: "voiture", difficulty: 2 },
  { id: 20, prompt: "poisson", options: ["poisson", "poison", "poisson'", "poissonn"], correctAnswer: "poisson", speak: "poisson", difficulty: 2 },

  // Niveau 3 — courtes phrases
  { id: 21, prompt: "Le chat dort sur le tapis.", options: ["Le chat dort sur le tapis.", "Le chat dors sur le tapis.", "Le chat dort sur le tapi.", "Le chas dort sur le tapis."], correctAnswer: "Le chat dort sur le tapis.", speak: "Le chat dort sur le tapis.", difficulty: 3 },
  { id: 22, prompt: "Les enfants sont dans la cour.", options: ["Les enfants sont dans la cour.", "Les enfant sont dans la cour.", "Les enfants son dans la cour.", "Les enfants sont dans la court."], correctAnswer: "Les enfants sont dans la cour.", speak: "Les enfants sont dans la cour.", difficulty: 3 },
  { id: 23, prompt: "Elle a mangé une pomme verte.", options: ["Elle a mangé une pomme verte.", "Elle à mangé une pomme verte.", "Elle a manger une pomme verte.", "Elle a mangé une pomme vert."], correctAnswer: "Elle a mangé une pomme verte.", speak: "Elle a mangé une pomme verte.", difficulty: 3 },
  { id: 24, prompt: "Nous allons à la bibliothèque.", options: ["Nous allons à la bibliothèque.", "Nous allon à la bibliothèque.", "Nous allons a la bibliothèque.", "Nous allons à la bibliotèque."], correctAnswer: "Nous allons à la bibliothèque.", speak: "Nous allons à la bibliothèque.", difficulty: 3 },
  { id: 25, prompt: "Mon frère joue de la guitare.", options: ["Mon frère joue de la guitare.", "Mon frère joues de la guitare.", "Mont frère joue de la guitare.", "Mon frère joue de la guitard."], correctAnswer: "Mon frère joue de la guitare.", speak: "Mon frère joue de la guitare.", difficulty: 3 },
  { id: 26, prompt: "Il pleut beaucoup ce matin.", options: ["Il pleut beaucoup ce matin.", "Il pleu beaucoup ce matin.", "Il pleut beaucou ce matin.", "Il pleut beaucoup se matin."], correctAnswer: "Il pleut beaucoup ce matin.", speak: "Il pleut beaucoup ce matin.", difficulty: 3 },
  { id: 27, prompt: "Les oiseaux chantent dans l'arbre.", options: ["Les oiseaux chantent dans l'arbre.", "Les oiseaux chante dans l'arbre.", "Les oiseau chantent dans l'arbre.", "Les oiseaux chantent dans larbre."], correctAnswer: "Les oiseaux chantent dans l'arbre.", speak: "Les oiseaux chantent dans l'arbre.", difficulty: 3 },
  { id: 28, prompt: "J'ai oublié mon cahier rouge.", options: ["J'ai oublié mon cahier rouge.", "J'ai oublier mon cahier rouge.", "Jai oublié mon cahier rouge.", "J'ai oublié mont cahier rouge."], correctAnswer: "J'ai oublié mon cahier rouge.", speak: "J'ai oublié mon cahier rouge.", difficulty: 3 },
  { id: 29, prompt: "Le boulanger ouvre très tôt.", options: ["Le boulanger ouvre très tôt.", "Le boulangé ouvre très tôt.", "Le boulanger ouvres très tôt.", "Le boulanger ouvre trés tôt."], correctAnswer: "Le boulanger ouvre très tôt.", speak: "Le boulanger ouvre très tôt.", difficulty: 3 },
  { id: 30, prompt: "Elles sont arrivées ensemble.", options: ["Elles sont arrivées ensemble.", "Elles sont arrivée ensemble.", "Elle sont arrivées ensemble.", "Elles son arrivées ensemble."], correctAnswer: "Elles sont arrivées ensemble.", speak: "Elles sont arrivées ensemble.", difficulty: 3 },
];
