/** Roue des Genres — de of het ? (30 défis, 10 par niveau). */
export interface RoueGenresChallenge {
  id: number;
  word: string;
  wordFr: string;
  /** Article correct. */
  correctAnswer: "de" | "het";
  /** Règle expliquée après la réponse. */
  hintNl: string;
  hintFr: string;
  difficulty: 1 | 2 | 3;
}

export const roueGenresChallenges: RoueGenresChallenge[] = [
  // Niveau 1 — mots très courants
  { id: 1, word: "hond", wordFr: "le chien", correctAnswer: "de", hintNl: "Dieren zijn vaak « de ».", hintFr: "Les animaux sont souvent « de ».", difficulty: 1 },
  { id: 2, word: "huis", wordFr: "la maison", correctAnswer: "het", hintNl: "Het huis — gewoon onthouden.", hintFr: "Het huis — à retenir par cœur.", difficulty: 1 },
  { id: 3, word: "kat", wordFr: "le chat", correctAnswer: "de", hintNl: "De kat.", hintFr: "De kat.", difficulty: 1 },
  { id: 4, word: "boek", wordFr: "le livre", correctAnswer: "het", hintNl: "Het boek.", hintFr: "Het boek.", difficulty: 1 },
  { id: 5, word: "school", wordFr: "l'école", correctAnswer: "de", hintNl: "De school.", hintFr: "De school.", difficulty: 1 },
  { id: 6, word: "raam", wordFr: "la fenêtre", correctAnswer: "het", hintNl: "Het raam.", hintFr: "Het raam.", difficulty: 1 },
  { id: 7, word: "tafel", wordFr: "la table", correctAnswer: "de", hintNl: "De tafel.", hintFr: "De tafel.", difficulty: 1 },
  { id: 8, word: "water", wordFr: "l'eau", correctAnswer: "het", hintNl: "Het water.", hintFr: "Het water.", difficulty: 1 },
  { id: 9, word: "fiets", wordFr: "le vélo", correctAnswer: "de", hintNl: "De fiets.", hintFr: "De fiets.", difficulty: 1 },
  { id: 10, word: "brood", wordFr: "le pain", correctAnswer: "het", hintNl: "Het brood.", hintFr: "Het brood.", difficulty: 1 },

  // Niveau 2 — diminutifs et pièges
  { id: 11, word: "meisje", wordFr: "la fille", correctAnswer: "het", hintNl: "Verkleinwoorden op -je zijn altijd « het ».", hintFr: "Les diminutifs en -je sont toujours « het ».", difficulty: 2 },
  { id: 12, word: "jongen", wordFr: "le garçon", correctAnswer: "de", hintNl: "De jongen.", hintFr: "De jongen.", difficulty: 2 },
  { id: 13, word: "hondje", wordFr: "le petit chien", correctAnswer: "het", hintNl: "Verkleinwoord → het.", hintFr: "Diminutif → het.", difficulty: 2 },
  { id: 14, word: "kind", wordFr: "l'enfant", correctAnswer: "het", hintNl: "Het kind, maar de kinderen.", hintFr: "Het kind, mais de kinderen.", difficulty: 2 },
  { id: 15, word: "koekje", wordFr: "le biscuit", correctAnswer: "het", hintNl: "Verkleinwoord → het.", hintFr: "Diminutif → het.", difficulty: 2 },
  { id: 16, word: "zon", wordFr: "le soleil", correctAnswer: "de", hintNl: "De zon.", hintFr: "De zon.", difficulty: 2 },
  { id: 17, word: "bed", wordFr: "le lit", correctAnswer: "het", hintNl: "Het bed.", hintFr: "Het bed.", difficulty: 2 },
  { id: 18, word: "deur", wordFr: "la porte", correctAnswer: "de", hintNl: "De deur.", hintFr: "De deur.", difficulty: 2 },
  { id: 19, word: "paard", wordFr: "le cheval", correctAnswer: "het", hintNl: "Het paard — uitzondering bij dieren.", hintFr: "Het paard — exception chez les animaux.", difficulty: 2 },
  { id: 20, word: "stoel", wordFr: "la chaise", correctAnswer: "de", hintNl: "De stoel.", hintFr: "De stoel.", difficulty: 2 },

  // Niveau 3 — mots plus abstraits
  { id: 21, word: "geluk", wordFr: "le bonheur", correctAnswer: "het", hintNl: "Woorden met ge- zijn vaak « het ».", hintFr: "Les mots en ge- sont souvent « het ».", difficulty: 3 },
  { id: 22, word: "vriendschap", wordFr: "l'amitié", correctAnswer: "de", hintNl: "Woorden op -schap zijn « de ».", hintFr: "Les mots en -schap sont « de ».", difficulty: 3 },
  { id: 23, word: "verhaal", wordFr: "l'histoire", correctAnswer: "het", hintNl: "Het verhaal.", hintFr: "Het verhaal.", difficulty: 3 },
  { id: 24, word: "vakantie", wordFr: "les vacances", correctAnswer: "de", hintNl: "Woorden op -ie zijn « de ».", hintFr: "Les mots en -ie sont « de ».", difficulty: 3 },
  { id: 25, word: "gesprek", wordFr: "la conversation", correctAnswer: "het", hintNl: "Ge- → het.", hintFr: "Ge- → het.", difficulty: 3 },
  { id: 26, word: "koning", wordFr: "le roi", correctAnswer: "de", hintNl: "Woorden op -ing zijn « de ».", hintFr: "Les mots en -ing sont « de ».", difficulty: 3 },
  { id: 27, word: "weer", wordFr: "le temps (météo)", correctAnswer: "het", hintNl: "Het weer.", hintFr: "Het weer.", difficulty: 3 },
  { id: 28, word: "muziek", wordFr: "la musique", correctAnswer: "de", hintNl: "De muziek.", hintFr: "De muziek.", difficulty: 3 },
  { id: 29, word: "museum", wordFr: "le musée", correctAnswer: "het", hintNl: "Woorden op -um zijn « het ».", hintFr: "Les mots en -um sont « het ».", difficulty: 3 },
  { id: 30, word: "oefening", wordFr: "l'exercice", correctAnswer: "de", hintNl: "-ing → de.", hintFr: "-ing → de.", difficulty: 3 },
];
