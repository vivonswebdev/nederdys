import { FrChallenge } from "./types";

/** Le Piège des Homophones — a/à, ou/où, son/sont… (30 défis). */
export const piegeHomophonesChallenges: FrChallenge[] = [
  // Niveau 1 — a / à, et / est
  { id: 1, prompt: "Lina ___ un nouveau vélo.", hint: "a ou à ?", options: ["a", "à"], correctAnswer: "a", speak: "Lina a un nouveau vélo.", difficulty: 1 },
  { id: 2, prompt: "Nous allons ___ la piscine.", hint: "a ou à ?", options: ["a", "à"], correctAnswer: "à", speak: "Nous allons à la piscine.", difficulty: 1 },
  { id: 3, prompt: "Le chat ___ noir et blanc.", hint: "et ou est ?", options: ["est", "et"], correctAnswer: "est", speak: "Le chat est noir et blanc.", difficulty: 1 },
  { id: 4, prompt: "Papa ___ maman rentrent tard.", hint: "et ou est ?", options: ["et", "est"], correctAnswer: "et", speak: "Papa et maman rentrent tard.", difficulty: 1 },
  { id: 5, prompt: "Tu veux du lait ___ du jus ?", hint: "ou ou où ?", options: ["ou", "où"], correctAnswer: "ou", speak: "Tu veux du lait ou du jus ?", difficulty: 1 },
  { id: 6, prompt: "___ est ta trousse ?", hint: "ou ou où ?", options: ["Où", "Ou"], correctAnswer: "Où", speak: "Où est ta trousse ?", difficulty: 1 },
  { id: 7, prompt: "Il ___ huit ans aujourd'hui.", hint: "a ou à ?", options: ["a", "à"], correctAnswer: "a", speak: "Il a huit ans aujourd'hui.", difficulty: 1 },
  { id: 8, prompt: "Je pars ___ midi.", hint: "a ou à ?", options: ["à", "a"], correctAnswer: "à", speak: "Je pars à midi.", difficulty: 1 },
  { id: 9, prompt: "Le gâteau ___ délicieux.", hint: "et ou est ?", options: ["est", "et"], correctAnswer: "est", speak: "Le gâteau est délicieux.", difficulty: 1 },
  { id: 10, prompt: "La maison ___ je vis est petite.", hint: "ou ou où ?", options: ["où", "ou"], correctAnswer: "où", speak: "La maison où je vis est petite.", difficulty: 1 },

  // Niveau 2 — son/sont, on/ont, ce/se, mon/m'ont
  { id: 11, prompt: "Les enfants ___ dans le jardin.", hint: "son ou sont ?", options: ["sont", "son"], correctAnswer: "sont", speak: "Les enfants sont dans le jardin.", difficulty: 2 },
  { id: 12, prompt: "Tom range ___ cartable.", hint: "son ou sont ?", options: ["son", "sont"], correctAnswer: "son", speak: "Tom range son cartable.", difficulty: 2 },
  { id: 13, prompt: "___ va au parc cet après-midi.", hint: "on ou ont ?", options: ["On", "Ont"], correctAnswer: "On", speak: "On va au parc cet après-midi.", difficulty: 2 },
  { id: 14, prompt: "Ils ___ fini leurs devoirs.", hint: "on ou ont ?", options: ["ont", "on"], correctAnswer: "ont", speak: "Ils ont fini leurs devoirs.", difficulty: 2 },
  { id: 15, prompt: "___ livre est très drôle.", hint: "Ce ou Se ?", options: ["Ce", "Se"], correctAnswer: "Ce", speak: "Ce livre est très drôle.", difficulty: 2 },
  { id: 16, prompt: "Elle ___ lave les mains.", hint: "ce ou se ?", options: ["se", "ce"], correctAnswer: "se", speak: "Elle se lave les mains.", difficulty: 2 },
  { id: 17, prompt: "Mes amis ___ aidé à ranger.", hint: "m'ont ou mon ?", options: ["m'ont", "mon"], correctAnswer: "m'ont", speak: "Mes amis m'ont aidé à ranger.", difficulty: 2 },
  { id: 18, prompt: "J'ai perdu ___ crayon bleu.", hint: "mon ou m'ont ?", options: ["mon", "m'ont"], correctAnswer: "mon", speak: "J'ai perdu mon crayon bleu.", difficulty: 2 },
  { id: 19, prompt: "Le vent souffle ___ fort ce soir.", hint: "si ou s'y ?", options: ["si", "s'y"], correctAnswer: "si", speak: "Le vent souffle si fort ce soir.", difficulty: 2 },
  { id: 20, prompt: "___ frère joue de la guitare.", hint: "Mon ou M'ont ?", options: ["Mon", "M'ont"], correctAnswer: "Mon", speak: "Mon frère joue de la guitare.", difficulty: 2 },

  // Niveau 3 — la/l'a/là, sa/ça, quel/qu'elle, leur/leurs, peu/peut
  { id: 21, prompt: "Elle ___ vu partir sans rien dire.", hint: "l'a ou la ?", options: ["l'a", "la", "là", "l'as"], correctAnswer: "l'a", speak: "Elle l'a vu partir sans rien dire.", difficulty: 3 },
  { id: 22, prompt: "Pose le sac ___, près de la porte.", hint: "là / la / l'a", options: ["là", "la", "l'a", "l'as"], correctAnswer: "là", speak: "Pose le sac là, près de la porte.", difficulty: 3 },
  { id: 23, prompt: "___ ne me dérange pas du tout.", hint: "Ça ou Sa ?", options: ["Ça", "Sa", "Çà", "S'a"], correctAnswer: "Ça", speak: "Ça ne me dérange pas du tout.", difficulty: 3 },
  { id: 24, prompt: "Il a rangé ___ chambre hier soir.", hint: "sa ou ça ?", options: ["sa", "ça", "çà", "s'a"], correctAnswer: "sa", speak: "Il a rangé sa chambre hier soir.", difficulty: 3 },
  { id: 25, prompt: "Je ne sais pas ___ heure il arrive.", hint: "quel / qu'elle", options: ["quelle", "qu'elle", "quel", "qu'el"], correctAnswer: "quelle", speak: "Je ne sais pas quelle heure il arrive.", difficulty: 3 },
  { id: 26, prompt: "Je crois ___ a compris la leçon.", hint: "quelle / qu'elle", options: ["qu'elle", "quelle", "quel", "qu'els"], correctAnswer: "qu'elle", speak: "Je crois qu'elle a compris la leçon.", difficulty: 3 },
  { id: 27, prompt: "Les élèves ont rangé ___ affaires.", hint: "leur ou leurs ?", options: ["leurs", "leur", "leures", "l'heure"], correctAnswer: "leurs", speak: "Les élèves ont rangé leurs affaires.", difficulty: 3 },
  { id: 28, prompt: "Il ___ pleuvoir demain matin.", hint: "peut ou peu ?", options: ["peut", "peu", "peux", "peus"], correctAnswer: "peut", speak: "Il peut pleuvoir demain matin.", difficulty: 3 },
  { id: 29, prompt: "Il reste ___ de temps avant la sonnerie.", hint: "peu ou peut ?", options: ["peu", "peut", "peux", "peus"], correctAnswer: "peu", speak: "Il reste peu de temps avant la sonnerie.", difficulty: 3 },
  { id: 30, prompt: "___ font beaucoup de bruit, ces oiseaux !", hint: "Ils / Il", options: ["Ils", "Il", "Y'ls", "Il's"], correctAnswer: "Ils", speak: "Ils font beaucoup de bruit, ces oiseaux !", difficulty: 3 },
];
