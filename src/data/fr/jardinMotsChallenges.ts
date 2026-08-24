import { FrChallenge } from "./types";

/** Le Jardin des Mots — choisis le mot qui correspond à l'image (30 défis). */
export const jardinMotsChallenges: FrChallenge[] = [
  // Niveau 1 — objets et animaux du quotidien
  { id: 1, prompt: "🌻", hint: "Quel est ce mot ?", options: ["le tournesol", "la tulipe", "la rose", "le trèfle"], correctAnswer: "le tournesol", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 2, prompt: "🐘", hint: "Quel est ce mot ?", options: ["l'éléphant", "le rhinocéros", "l'hippopotame", "le buffle"], correctAnswer: "l'éléphant", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 3, prompt: "🍓", hint: "Quel est ce mot ?", options: ["la fraise", "la framboise", "la cerise", "la pomme"], correctAnswer: "la fraise", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 4, prompt: "🚲", hint: "Quel est ce mot ?", options: ["le vélo", "la moto", "la trottinette", "la voiture"], correctAnswer: "le vélo", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 5, prompt: "🏠", hint: "Quel est ce mot ?", options: ["la maison", "l'école", "l'église", "la ferme"], correctAnswer: "la maison", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 6, prompt: "🐤", hint: "Quel est ce mot ?", options: ["le poussin", "le canard", "le pigeon", "le corbeau"], correctAnswer: "le poussin", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 7, prompt: "🌧️", hint: "Quel est ce mot ?", options: ["la pluie", "la neige", "le vent", "le soleil"], correctAnswer: "la pluie", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 8, prompt: "🥖", hint: "Quel est ce mot ?", options: ["la baguette", "le croissant", "le gâteau", "la tarte"], correctAnswer: "la baguette", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 9, prompt: "🪑", hint: "Quel est ce mot ?", options: ["la chaise", "la table", "le lit", "l'armoire"], correctAnswer: "la chaise", speak: "Quel mot correspond à l'image ?", difficulty: 1 },
  { id: 10, prompt: "🐟", hint: "Quel est ce mot ?", options: ["le poisson", "la grenouille", "le crabe", "la tortue"], correctAnswer: "le poisson", speak: "Quel mot correspond à l'image ?", difficulty: 1 },

  // Niveau 2 — vocabulaire plus fin
  { id: 11, prompt: "🦔", options: ["le hérisson", "l'écureuil", "la taupe", "la marmotte"], correctAnswer: "le hérisson", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 12, prompt: "🪁", options: ["le cerf-volant", "le parachute", "le ballon", "la montgolfière"], correctAnswer: "le cerf-volant", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 13, prompt: "🧦", options: ["les chaussettes", "les gants", "les bottes", "l'écharpe"], correctAnswer: "les chaussettes", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 14, prompt: "🐝", options: ["l'abeille", "la guêpe", "la mouche", "le moustique"], correctAnswer: "l'abeille", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 15, prompt: "🪵", options: ["la bûche", "la branche", "la feuille", "la racine"], correctAnswer: "la bûche", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 16, prompt: "🧹", options: ["le balai", "la pelle", "la brosse", "le râteau"], correctAnswer: "le balai", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 17, prompt: "🕯️", options: ["la bougie", "la lampe", "la torche", "la lanterne"], correctAnswer: "la bougie", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 18, prompt: "🦉", options: ["le hibou", "l'aigle", "la mouette", "le perroquet"], correctAnswer: "le hibou", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 19, prompt: "🪣", options: ["le seau", "le pot", "le bol", "le verre"], correctAnswer: "le seau", speak: "Quel mot correspond à l'image ?", difficulty: 2 },
  { id: 20, prompt: "🌉", options: ["le pont", "le tunnel", "la route", "le quai"], correctAnswer: "le pont", speak: "Quel mot correspond à l'image ?", difficulty: 2 },

  // Niveau 3 — mots précis
  { id: 21, prompt: "🧭", options: ["la boussole", "l'horloge", "le baromètre", "la loupe"], correctAnswer: "la boussole", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 22, prompt: "🪜", options: ["l'échelle", "l'escalier", "la passerelle", "l'estrade"], correctAnswer: "l'échelle", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 23, prompt: "🦢", options: ["le cygne", "l'oie", "le héron", "la cigogne"], correctAnswer: "le cygne", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 24, prompt: "🏰", options: ["le château", "le musée", "la mairie", "le manoir"], correctAnswer: "le château", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 25, prompt: "🪺", options: ["le nid", "la ruche", "la cage", "le terrier"], correctAnswer: "le nid", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 26, prompt: "⚓", options: ["l'ancre", "la voile", "la rame", "le gouvernail"], correctAnswer: "l'ancre", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 27, prompt: "🪶", options: ["la plume", "le poil", "l'écaille", "la fourrure"], correctAnswer: "la plume", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 28, prompt: "🧵", options: ["le fil", "la corde", "le ruban", "la ficelle"], correctAnswer: "le fil", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 29, prompt: "🌫️", options: ["le brouillard", "la fumée", "le nuage", "la vapeur"], correctAnswer: "le brouillard", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
  { id: 30, prompt: "🛎️", options: ["la sonnette", "la cloche", "le gong", "le carillon"], correctAnswer: "la sonnette", speak: "Quel mot correspond à l'image ?", difficulty: 3 },
];
