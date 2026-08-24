import { FrChallenge } from "./types";

/** Syllabes en Fête — assemble les syllabes pour retrouver le mot (30 défis). */
export const syllabesFeteChallenges: FrChallenge[] = [
  // Niveau 1 — 2 syllabes simples
  { id: 1, prompt: "cha · peau", hint: "Assemble les syllabes", options: ["chapeau", "chameau", "château", "chapelle"], correctAnswer: "chapeau", speak: "cha ... peau", difficulty: 1 },
  { id: 2, prompt: "ba · teau", hint: "Assemble les syllabes", options: ["bateau", "gâteau", "cadeau", "bureau"], correctAnswer: "bateau", speak: "ba ... teau", difficulty: 1 },
  { id: 3, prompt: "la · pin", hint: "Assemble les syllabes", options: ["lapin", "sapin", "matin", "malin"], correctAnswer: "lapin", speak: "la ... pin", difficulty: 1 },
  { id: 4, prompt: "ma · man", hint: "Assemble les syllabes", options: ["maman", "manteau", "matin", "moment"], correctAnswer: "maman", speak: "ma ... man", difficulty: 1 },
  { id: 5, prompt: "sou · ris", hint: "Assemble les syllabes", options: ["souris", "sourire", "secours", "soupir"], correctAnswer: "souris", speak: "sou ... ris", difficulty: 1 },
  { id: 6, prompt: "vé · lo", hint: "Assemble les syllabes", options: ["vélo", "volet", "valise", "violon"], correctAnswer: "vélo", speak: "vé ... lo", difficulty: 1 },
  { id: 7, prompt: "pou · pée", hint: "Assemble les syllabes", options: ["poupée", "poussée", "poulet", "poivre"], correctAnswer: "poupée", speak: "pou ... pée", difficulty: 1 },
  { id: 8, prompt: "ca · nard", hint: "Assemble les syllabes", options: ["canard", "cabane", "carnet", "casque"], correctAnswer: "canard", speak: "ca ... nard", difficulty: 1 },
  { id: 9, prompt: "bo · nnet", hint: "Assemble les syllabes", options: ["bonnet", "bonbon", "banane", "bouton"], correctAnswer: "bonnet", speak: "bo ... nnet", difficulty: 1 },
  { id: 10, prompt: "ta · pis", hint: "Assemble les syllabes", options: ["tapis", "tulipe", "tortue", "tomate"], correctAnswer: "tapis", speak: "ta ... pis", difficulty: 1 },

  // Niveau 2 — 3 syllabes
  { id: 11, prompt: "ba · na · ne", options: ["banane", "cabane", "bandana", "baleine"], correctAnswer: "banane", speak: "ba ... na ... ne", difficulty: 2 },
  { id: 12, prompt: "or · di · na · teur", options: ["ordinateur", "ordonnance", "aspirateur", "opérateur"], correctAnswer: "ordinateur", speak: "or ... di ... na ... teur", difficulty: 2 },
  { id: 13, prompt: "cro · co · dile", options: ["crocodile", "coccinelle", "crocus", "coquelicot"], correctAnswer: "crocodile", speak: "cro ... co ... dile", difficulty: 2 },
  { id: 14, prompt: "pa · pi · llon", options: ["papillon", "pavillon", "papier", "pantalon"], correctAnswer: "papillon", speak: "pa ... pi ... llon", difficulty: 2 },
  { id: 15, prompt: "cho · co · lat", options: ["chocolat", "chocolatier", "colocataire", "cacahuète"], correctAnswer: "chocolat", speak: "cho ... co ... lat", difficulty: 2 },
  { id: 16, prompt: "té · lé · phone", options: ["téléphone", "télévision", "tétine", "trombone"], correctAnswer: "téléphone", speak: "té ... lé ... phone", difficulty: 2 },
  { id: 17, prompt: "pan · ta · lon", options: ["pantalon", "papillon", "pantoufle", "panneau"], correctAnswer: "pantalon", speak: "pan ... ta ... lon", difficulty: 2 },
  { id: 18, prompt: "to · ma · te", options: ["tomate", "tortue", "tomber", "tapisse"], correctAnswer: "tomate", speak: "to ... ma ... te", difficulty: 2 },
  { id: 19, prompt: "pa · ra · pluie", options: ["parapluie", "parachute", "paravent", "parapet"], correctAnswer: "parapluie", speak: "pa ... ra ... pluie", difficulty: 2 },
  { id: 20, prompt: "hi · ppo · pota · me", options: ["hippopotame", "hippocampe", "hélicoptère", "hirondelle"], correctAnswer: "hippopotame", speak: "hi ... ppo ... po ... tame", difficulty: 2 },

  // Niveau 3 — mots longs et pièges
  { id: 21, prompt: "bi · bli · o · thèque", options: ["bibliothèque", "biberon", "bibelot", "bicyclette"], correctAnswer: "bibliothèque", speak: "bi ... bli ... o ... thèque", difficulty: 3 },
  { id: 22, prompt: "an · ni · ver · saire", options: ["anniversaire", "universitaire", "animalerie", "adversaire"], correctAnswer: "anniversaire", speak: "an ... ni ... ver ... saire", difficulty: 3 },
  { id: 23, prompt: "res · tau · rant", options: ["restaurant", "réservoir", "résistant", "restaurer"], correctAnswer: "restaurant", speak: "res ... tau ... rant", difficulty: 3 },
  { id: 24, prompt: "gym · nas · tique", options: ["gymnastique", "gymnase", "magnétique", "majestueux"], correctAnswer: "gymnastique", speak: "gym ... nas ... tique", difficulty: 3 },
  { id: 25, prompt: "é · lec · tri · cité", options: ["électricité", "électrique", "électeur", "excentricité"], correctAnswer: "électricité", speak: "é ... lec ... tri ... cité", difficulty: 3 },
  { id: 26, prompt: "in · for · ma · tion", options: ["information", "informatique", "inflammation", "importation"], correctAnswer: "information", speak: "in ... for ... ma ... tion", difficulty: 3 },
  { id: 27, prompt: "tour · ne · sol", options: ["tournesol", "tournevis", "tourniquet", "tournoi"], correctAnswer: "tournesol", speak: "tour ... ne ... sol", difficulty: 3 },
  { id: 28, prompt: "ex · tra · or · di · naire", options: ["extraordinaire", "extraterrestre", "ordinaire", "extravagant"], correctAnswer: "extraordinaire", speak: "ex ... tra ... or ... di ... naire", difficulty: 3 },
  { id: 29, prompt: "pha · rma · cie", options: ["pharmacie", "pharmacien", "phalange", "photographie"], correctAnswer: "pharmacie", speak: "phar ... ma ... cie", difficulty: 3 },
  { id: 30, prompt: "gé · o · gra · phie", options: ["géographie", "géométrie", "photographie", "biographie"], correctAnswer: "géographie", speak: "gé ... o ... gra ... phie", difficulty: 3 },
];
