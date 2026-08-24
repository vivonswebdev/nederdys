/** Chasseur d'Erreurs — repère le mot fautif dans la phrase (30 défis, 10 par niveau). */
export interface ChasseurErreursChallenge {
  id: number;
  /** Phrase néerlandaise contenant une erreur. */
  sentence: string;
  sentenceFr: string;
  /** Mots proposés (dont un seul est fautif). */
  options: string[];
  /** Le mot fautif à repérer. */
  correctAnswer: string;
  /** Correction affichée après la réponse. */
  fix: string;
  difficulty: 1 | 2 | 3;
}

export const chasseurErreursChallenges: ChasseurErreursChallenge[] = [
  // Niveau 1 — articles de/het
  { id: 1, sentence: "Het hond blaft.", sentenceFr: "Le chien aboie.", options: ["Het", "hond", "blaft"], correctAnswer: "Het", fix: "De hond blaft.", difficulty: 1 },
  { id: 2, sentence: "De huis is groot.", sentenceFr: "La maison est grande.", options: ["De", "huis", "groot"], correctAnswer: "De", fix: "Het huis is groot.", difficulty: 1 },
  { id: 3, sentence: "Het kat slaapt.", sentenceFr: "Le chat dort.", options: ["Het", "kat", "slaapt"], correctAnswer: "Het", fix: "De kat slaapt.", difficulty: 1 },
  { id: 4, sentence: "De boek is dik.", sentenceFr: "Le livre est épais.", options: ["De", "boek", "dik"], correctAnswer: "De", fix: "Het boek is dik.", difficulty: 1 },
  { id: 5, sentence: "Het school is dicht.", sentenceFr: "L'école est fermée.", options: ["Het", "school", "dicht"], correctAnswer: "Het", fix: "De school is dicht.", difficulty: 1 },
  { id: 6, sentence: "De raam is open.", sentenceFr: "La fenêtre est ouverte.", options: ["De", "raam", "open"], correctAnswer: "De", fix: "Het raam is open.", difficulty: 1 },
  { id: 7, sentence: "De meisje speelt.", sentenceFr: "La fille joue.", options: ["De", "meisje", "speelt"], correctAnswer: "De", fix: "Het meisje speelt.", difficulty: 1 },
  { id: 8, sentence: "Het jongen loopt.", sentenceFr: "Le garçon marche.", options: ["Het", "jongen", "loopt"], correctAnswer: "Het", fix: "De jongen loopt.", difficulty: 1 },
  { id: 9, sentence: "De water is koud.", sentenceFr: "L'eau est froide.", options: ["De", "water", "koud"], correctAnswer: "De", fix: "Het water is koud.", difficulty: 1 },
  { id: 10, sentence: "Het tafel staat daar.", sentenceFr: "La table est là.", options: ["Het", "tafel", "staat"], correctAnswer: "Het", fix: "De tafel staat daar.", difficulty: 1 },

  // Niveau 2 — conjugaison et pluriel
  { id: 11, sentence: "Ik loopt naar school.", sentenceFr: "Je marche vers l'école.", options: ["Ik", "loopt", "school"], correctAnswer: "loopt", fix: "Ik loop naar school.", difficulty: 2 },
  { id: 12, sentence: "Hij spelen buiten.", sentenceFr: "Il joue dehors.", options: ["Hij", "spelen", "buiten"], correctAnswer: "spelen", fix: "Hij speelt buiten.", difficulty: 2 },
  { id: 13, sentence: "Wij is blij.", sentenceFr: "Nous sommes contents.", options: ["Wij", "is", "blij"], correctAnswer: "is", fix: "Wij zijn blij.", difficulty: 2 },
  { id: 14, sentence: "Ik zie drie honds.", sentenceFr: "Je vois trois chiens.", options: ["zie", "drie", "honds"], correctAnswer: "honds", fix: "Ik zie drie honden.", difficulty: 2 },
  { id: 15, sentence: "De kinds spelen samen.", sentenceFr: "Les enfants jouent ensemble.", options: ["De", "kinds", "spelen"], correctAnswer: "kinds", fix: "De kinderen spelen samen.", difficulty: 2 },
  { id: 16, sentence: "Zij hebt een fiets.", sentenceFr: "Elle a un vélo.", options: ["Zij", "hebt", "fiets"], correctAnswer: "hebt", fix: "Zij heeft een fiets.", difficulty: 2 },
  { id: 17, sentence: "Jij bent twee boeks.", sentenceFr: "Tu as deux livres.", options: ["bent", "twee", "boeks"], correctAnswer: "boeks", fix: "Jij hebt twee boeken.", difficulty: 2 },
  { id: 18, sentence: "Wij gaat naar huis.", sentenceFr: "Nous rentrons à la maison.", options: ["Wij", "gaat", "huis"], correctAnswer: "gaat", fix: "Wij gaan naar huis.", difficulty: 2 },
  { id: 19, sentence: "De autos rijden snel.", sentenceFr: "Les voitures roulent vite.", options: ["De", "autos", "snel"], correctAnswer: "autos", fix: "De auto's rijden snel.", difficulty: 2 },
  { id: 20, sentence: "Het meisjes zingen.", sentenceFr: "Les filles chantent.", options: ["Het", "meisjes", "zingen"], correctAnswer: "Het", fix: "De meisjes zingen.", difficulty: 2 },

  // Niveau 3 — ordre des mots et adjectifs
  { id: 21, sentence: "Morgen ik ga zwemmen.", sentenceFr: "Demain je vais nager.", options: ["Morgen", "ik", "ga"], correctAnswer: "ik", fix: "Morgen ga ik zwemmen.", difficulty: 3 },
  { id: 22, sentence: "Het grote huis is oud.", sentenceFr: "La grande maison est vieille.", options: ["grote", "huis", "oud"], correctAnswer: "grote", fix: "Correct : het grote huis (piège, la phrase est juste avec 'grote').", difficulty: 3 },
  { id: 23, sentence: "Een groot man loopt daar.", sentenceFr: "Un grand homme marche là.", options: ["Een", "groot", "loopt"], correctAnswer: "groot", fix: "Een grote man loopt daar.", difficulty: 3 },
  { id: 24, sentence: "Vandaag wij eten pannenkoeken.", sentenceFr: "Aujourd'hui nous mangeons des crêpes.", options: ["Vandaag", "wij", "eten"], correctAnswer: "wij", fix: "Vandaag eten wij pannenkoeken.", difficulty: 3 },
  { id: 25, sentence: "Ik heb geen tijd niet.", sentenceFr: "Je n'ai pas le temps.", options: ["geen", "tijd", "niet"], correctAnswer: "niet", fix: "Ik heb geen tijd.", difficulty: 3 },
  { id: 26, sentence: "Zij woont in Meise sinds drie jaren.", sentenceFr: "Elle habite à Meise depuis trois ans.", options: ["woont", "sinds", "jaren"], correctAnswer: "jaren", fix: "Zij woont in Meise sinds drie jaar.", difficulty: 3 },
  { id: 27, sentence: "De kleine kindje slaapt.", sentenceFr: "Le petit enfant dort.", options: ["De", "kleine", "slaapt"], correctAnswer: "De", fix: "Het kleine kindje slaapt.", difficulty: 3 },
  { id: 28, sentence: "Hij kan goed zwemt.", sentenceFr: "Il sait bien nager.", options: ["kan", "goed", "zwemt"], correctAnswer: "zwemt", fix: "Hij kan goed zwemmen.", difficulty: 3 },
  { id: 29, sentence: "Wij hebben gisteren gespeeld voetbal.", sentenceFr: "Nous avons joué au foot hier.", options: ["gisteren", "gespeeld", "voetbal"], correctAnswer: "gespeeld", fix: "Wij hebben gisteren voetbal gespeeld.", difficulty: 3 },
  { id: 30, sentence: "Dat is de mooiste huis van de straat.", sentenceFr: "C'est la plus belle maison de la rue.", options: ["de", "mooiste", "straat"], correctAnswer: "de", fix: "Dat is het mooiste huis van de straat.", difficulty: 3 },
];
