import { FrChallenge } from "./types";

/** Écho des Sons (FR) — retrouve le mot qui contient le son entendu (30 défis). */
export const echoSonsFrChallenges: FrChallenge[] = [
  // Niveau 1 — sons voyelles simples
  { id: 1, prompt: "Quel mot contient le son [ou] ?", options: ["soupe", "pain", "lit", "bal"], correctAnswer: "soupe", speak: "Quel mot contient le son ou ?", difficulty: 1 },
  { id: 2, prompt: "Quel mot contient le son [an] ?", options: ["enfant", "moto", "tulipe", "cube"], correctAnswer: "enfant", speak: "Quel mot contient le son an ?", difficulty: 1 },
  { id: 3, prompt: "Quel mot contient le son [on] ?", options: ["ballon", "sac", "table", "lire"], correctAnswer: "ballon", speak: "Quel mot contient le son on ?", difficulty: 1 },
  { id: 4, prompt: "Quel mot contient le son [in] ?", options: ["lapin", "porte", "chaud", "roue"], correctAnswer: "lapin", speak: "Quel mot contient le son in ?", difficulty: 1 },
  { id: 5, prompt: "Quel mot contient le son [oi] ?", options: ["étoile", "banane", "sucre", "ferme"], correctAnswer: "étoile", speak: "Quel mot contient le son oi ?", difficulty: 1 },
  { id: 6, prompt: "Quel mot contient le son [é] ?", options: ["école", "loup", "mur", "pont"], correctAnswer: "école", speak: "Quel mot contient le son é ?", difficulty: 1 },
  { id: 7, prompt: "Quel mot contient le son [ch] ?", options: ["cheval", "table", "radis", "pomme"], correctAnswer: "cheval", speak: "Quel mot contient le son ch ?", difficulty: 1 },
  { id: 8, prompt: "Quel mot contient le son [eu] ?", options: ["fleur", "carotte", "sapin", "lampe"], correctAnswer: "fleur", speak: "Quel mot contient le son eu ?", difficulty: 1 },
  { id: 9, prompt: "Quel mot contient le son [au] ?", options: ["bateau", "sirop", "menu", "livre"], correctAnswer: "bateau", speak: "Quel mot contient le son au ?", difficulty: 1 },
  { id: 10, prompt: "Quel mot contient le son [ill] ?", options: ["papillon", "cartable", "fenêtre", "domino"], correctAnswer: "papillon", speak: "Quel mot contient le son ill ?", difficulty: 1 },

  // Niveau 2 — sons proches à discriminer
  { id: 11, prompt: "Quel mot commence par le son [b] ?", options: ["bulle", "pull", "dune", "tulipe"], correctAnswer: "bulle", speak: "Quel mot commence par le son b ?", difficulty: 2 },
  { id: 12, prompt: "Quel mot commence par le son [p] ?", options: ["poule", "boule", "moule", "foule"], correctAnswer: "poule", speak: "Quel mot commence par le son p ?", difficulty: 2 },
  { id: 13, prompt: "Quel mot contient le son [z] ?", options: ["maison", "poisson", "coussin", "saucisse"], correctAnswer: "maison", speak: "Quel mot contient le son z ?", difficulty: 2 },
  { id: 14, prompt: "Quel mot contient le son [s] ?", options: ["poisson", "maison", "rose", "vase"], correctAnswer: "poisson", speak: "Quel mot contient le son s ?", difficulty: 2 },
  { id: 15, prompt: "Quel mot contient le son [j] comme dans « jupe » ?", options: ["girafe", "cadeau", "chariot", "gorille"], correctAnswer: "girafe", speak: "Quel mot contient le son j comme dans jupe ?", difficulty: 2 },
  { id: 16, prompt: "Quel mot contient le son [g] comme dans « gare » ?", options: ["guitare", "girafe", "genou", "gilet"], correctAnswer: "guitare", speak: "Quel mot contient le son g comme dans gare ?", difficulty: 2 },
  { id: 17, prompt: "Quel mot contient le son [gn] ?", options: ["montagne", "manteau", "mouton", "moulin"], correctAnswer: "montagne", speak: "Quel mot contient le son gn ?", difficulty: 2 },
  { id: 18, prompt: "Quel mot contient le son [f] écrit « ph » ?", options: ["téléphone", "fenêtre", "farine", "fourmi"], correctAnswer: "téléphone", speak: "Quel mot contient le son f écrit p h ?", difficulty: 2 },
  { id: 19, prompt: "Quel mot contient le son [k] écrit « qu » ?", options: ["quatre", "carotte", "koala", "cube"], correctAnswer: "quatre", speak: "Quel mot contient le son k écrit q u ?", difficulty: 2 },
  { id: 20, prompt: "Quel mot contient le son [è] écrit « ai » ?", options: ["lait", "lit", "loup", "loup-garou"], correctAnswer: "lait", speak: "Quel mot contient le son è écrit a i ?", difficulty: 2 },

  // Niveau 3 — position du son et syllabes
  { id: 21, prompt: "Dans quel mot entend-on [ou] à la fin ?", options: ["bijou", "outil", "souris", "coude"], correctAnswer: "bijou", speak: "Dans quel mot entend-on ou à la fin ?", difficulty: 3 },
  { id: 22, prompt: "Dans quel mot entend-on [an] au début ?", options: ["ancre", "banane", "dimanche", "vacances"], correctAnswer: "ancre", speak: "Dans quel mot entend-on an au début ?", difficulty: 3 },
  { id: 23, prompt: "Quel mot a 3 syllabes ?", options: ["hôpital", "table", "chien", "école"], correctAnswer: "hôpital", speak: "Quel mot a trois syllabes ?", difficulty: 3 },
  { id: 24, prompt: "Quel mot a 4 syllabes ?", options: ["hélicoptère", "papillon", "bateau", "maison"], correctAnswer: "hélicoptère", speak: "Quel mot a quatre syllabes ?", difficulty: 3 },
  { id: 25, prompt: "Dans quel mot le son [in] est-il écrit « ein » ?", options: ["peinture", "matin", "cousin", "jardin"], correctAnswer: "peinture", speak: "Dans quel mot le son in est-il écrit e i n ?", difficulty: 3 },
  { id: 26, prompt: "Dans quel mot le son [o] est-il écrit « eau » ?", options: ["chapeau", "moto", "épaule", "gauche"], correctAnswer: "chapeau", speak: "Dans quel mot le son o est-il écrit e a u ?", difficulty: 3 },
  { id: 27, prompt: "Dans quel mot n'entend-on PAS le son [r] ?", options: ["ballon", "arbre", "carotte", "fourmi"], correctAnswer: "ballon", speak: "Dans quel mot n'entend-on pas le son r ?", difficulty: 3 },
  { id: 28, prompt: "Dans quel mot entend-on deux fois le son [s] ?", options: ["saucisse", "maison", "chemise", "cerise"], correctAnswer: "saucisse", speak: "Dans quel mot entend-on deux fois le son s ?", difficulty: 3 },
  { id: 29, prompt: "Quel mot rime avec « bateau » ?", options: ["gâteau", "batterie", "botte", "bâton"], correctAnswer: "gâteau", speak: "Quel mot rime avec bateau ?", difficulty: 3 },
  { id: 30, prompt: "Dans quel mot le son [ill] est-il écrit « y » ?", options: ["crayon", "papillon", "famille", "bouteille"], correctAnswer: "crayon", speak: "Dans quel mot le son ill est-il écrit y ?", difficulty: 3 },
];
