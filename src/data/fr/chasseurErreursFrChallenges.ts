import { FrChallenge } from "./types";

/** Chasseur d'Erreurs (FR) — clique sur le mot mal écrit / fautif (30 défis). */
export const chasseurErreursFrChallenges: FrChallenge[] = [
  // Niveau 1 — orthographe de mots simples
  { id: 1, prompt: "Trouve le mot mal écrit.", options: ["maison", "chien", "tabl", "fleur"], correctAnswer: "tabl", speak: "Trouve le mot mal écrit.", difficulty: 1 },
  { id: 2, prompt: "Trouve le mot mal écrit.", options: ["école", "ecrire", "cahier", "livre"], correctAnswer: "ecrire", speak: "Trouve le mot mal écrit.", difficulty: 1 },
  { id: 3, prompt: "Trouve le mot mal écrit.", options: ["papa", "maman", "fere", "sœur"], correctAnswer: "fere", speak: "Trouve le mot mal écrit.", difficulty: 1 },
  { id: 4, prompt: "Trouve le mot mal écrit.", options: ["rouje", "vert", "bleu", "jaune"], correctAnswer: "rouje", speak: "Trouve le mot mal écrit.", difficulty: 1 },
  { id: 5, prompt: "Trouve le mot mal écrit.", options: ["chat", "vach", "cheval", "lapin"], correctAnswer: "vach", speak: "Trouve le mot mal écrit.", difficulty: 1 },
  { id: 6, prompt: "Trouve le mot mal écrit.", options: ["pomme", "banane", "frèse", "cerise"], correctAnswer: "frèse", speak: "Trouve le mot mal écrit.", difficulty: 1 },
  { id: 7, prompt: "Trouve le mot mal écrit.", options: ["lundi", "mardi", "mercredi", "jeudy"], correctAnswer: "jeudy", speak: "Trouve le mot mal écrit.", difficulty: 1 },
  { id: 8, prompt: "Trouve le mot mal écrit.", options: ["soleil", "lune", "étoille", "nuage"], correctAnswer: "étoille", speak: "Trouve le mot mal écrit.", difficulty: 1 },
  { id: 9, prompt: "Trouve le mot mal écrit.", options: ["fenêtre", "porte", "mur", "toi"], correctAnswer: "toi", speak: "Trouve le mot qui n'est pas une partie de la maison.", difficulty: 1 },
  { id: 10, prompt: "Trouve le mot mal écrit.", options: ["voiture", "camion", "vélot", "train"], correctAnswer: "vélot", speak: "Trouve le mot mal écrit.", difficulty: 1 },

  // Niveau 2 — accord et conjugaison
  { id: 11, prompt: "Clique sur le mot fautif : « Les chien aboient fort. »", options: ["chien", "Les", "aboient", "fort"], correctAnswer: "chien", speak: "Les chien aboient fort.", difficulty: 2 },
  { id: 12, prompt: "Clique sur le mot fautif : « Elle mange des pomme rouges. »", options: ["pomme", "Elle", "mange", "rouges"], correctAnswer: "pomme", speak: "Elle mange des pomme rouges.", difficulty: 2 },
  { id: 13, prompt: "Clique sur le mot fautif : « Nous allon à l'école. »", options: ["allon", "Nous", "à", "école"], correctAnswer: "allon", speak: "Nous allon à l'école.", difficulty: 2 },
  { id: 14, prompt: "Clique sur le mot fautif : « Tu a fini ton travail. »", options: ["a", "Tu", "fini", "travail"], correctAnswer: "a", speak: "Tu a fini ton travail.", difficulty: 2 },
  { id: 15, prompt: "Clique sur le mot fautif : « Les fleur sentent bon. »", options: ["fleur", "Les", "sentent", "bon"], correctAnswer: "fleur", speak: "Les fleur sentent bon.", difficulty: 2 },
  { id: 16, prompt: "Clique sur le mot fautif : « Il sont partis très tôt. »", options: ["Il", "sont", "partis", "tôt"], correctAnswer: "Il", speak: "Il sont partis très tôt.", difficulty: 2 },
  { id: 17, prompt: "Clique sur le mot fautif : « Ma sœurs joue du piano. »", options: ["sœurs", "Ma", "joue", "piano"], correctAnswer: "sœurs", speak: "Ma sœurs joue du piano.", difficulty: 2 },
  { id: 18, prompt: "Clique sur le mot fautif : « Je vais a la piscine. »", options: ["a", "Je", "vais", "piscine"], correctAnswer: "a", speak: "Je vais a la piscine.", difficulty: 2 },
  { id: 19, prompt: "Clique sur le mot fautif : « Vous chantez très bien tous les deux. »", options: ["Aucune faute", "chantez", "bien", "deux"], correctAnswer: "Aucune faute", speak: "Vous chantez très bien tous les deux.", difficulty: 2 },
  { id: 20, prompt: "Clique sur le mot fautif : « Le petits chat dort. »", options: ["petits", "Le", "chat", "dort"], correctAnswer: "petits", speak: "Le petits chat dort.", difficulty: 2 },

  // Niveau 3 — accords complexes et homophones
  { id: 21, prompt: "Clique sur le mot fautif : « Les cahiers son sur la table. »", options: ["son", "cahiers", "sur", "table"], correctAnswer: "son", speak: "Les cahiers son sur la table.", difficulty: 3 },
  { id: 22, prompt: "Clique sur le mot fautif : « Elle a mis ces chaussures neuves. »", options: ["Aucune faute", "ces", "mis", "neuves"], correctAnswer: "Aucune faute", speak: "Elle a mis ces chaussures neuves.", difficulty: 3 },
  { id: 23, prompt: "Clique sur le mot fautif : « Ils ce préparent pour la fête. »", options: ["ce", "Ils", "préparent", "fête"], correctAnswer: "ce", speak: "Ils ce préparent pour la fête.", difficulty: 3 },
  { id: 24, prompt: "Clique sur le mot fautif : « Les enfants on gagné la course. »", options: ["on", "enfants", "gagné", "course"], correctAnswer: "on", speak: "Les enfants on gagné la course.", difficulty: 3 },
  { id: 25, prompt: "Clique sur le mot fautif : « La lettre qu'il a écrit est longue. »", options: ["écrit", "qu'il", "lettre", "longue"], correctAnswer: "écrit", speak: "La lettre qu'il a écrit est longue.", difficulty: 3 },
  { id: 26, prompt: "Clique sur le mot fautif : « Elles sont arrivé en retard. »", options: ["arrivé", "Elles", "sont", "retard"], correctAnswer: "arrivé", speak: "Elles sont arrivé en retard.", difficulty: 3 },
  { id: 27, prompt: "Clique sur le mot fautif : « Je leurs ai donné un bonbon. »", options: ["leurs", "Je", "donné", "bonbon"], correctAnswer: "leurs", speak: "Je leurs ai donné un bonbon.", difficulty: 3 },
  { id: 28, prompt: "Clique sur le mot fautif : « Quel que soit le temps, on sort. »", options: ["Aucune faute", "Quel", "soit", "sort"], correctAnswer: "Aucune faute", speak: "Quel que soit le temps, on sort.", difficulty: 3 },
  { id: 29, prompt: "Clique sur le mot fautif : « Ma mère ma appelé ce matin. »", options: ["ma", "mère", "appelé", "matin"], correctAnswer: "ma", speak: "Ma mère ma appelé ce matin.", difficulty: 3 },
  { id: 30, prompt: "Clique sur le mot fautif : « Cette histoire ce termine bien. »", options: ["ce", "Cette", "histoire", "termine"], correctAnswer: "ce", speak: "Cette histoire ce termine bien.", difficulty: 3 },
];
