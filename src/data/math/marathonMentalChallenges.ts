/** Marathon Mental — calcul mental chronométré, sans s'arrêter (30 défis). */
export interface MarathonMentalChallenge {
  id: number;
  display: string;
  audioText: string;
  audioUrl: string;
  correctAnswer: string;
  options: string[];
  /** Secondes accordées pour ce défi. */
  timeLimit: number;
  /** Kilomètre du marathon (pour l'ambiance). */
  km: number;
  difficulty: 1 | 2 | 3;
}

const c = (
  id: number,
  display: string,
  audioText: string,
  correctAnswer: string,
  options: string[],
  timeLimit: number,
  difficulty: 1 | 2 | 3,
): MarathonMentalChallenge => ({
  id,
  display,
  audioText,
  audioUrl: "",
  correctAnswer,
  options,
  timeLimit,
  km: ((id - 1) % 10) + 1,
  difficulty,
});

export const marathonMentalChallenges: MarathonMentalChallenge[] = [
  // Niveau 1 — additions rapides (12 s)
  c(1, "2 + 3", "deux plus trois", "5", ["4", "5", "6", "7"], 12, 1),
  c(2, "4 + 4", "quatre plus quatre", "8", ["6", "7", "8", "9"], 12, 1),
  c(3, "6 + 3", "six plus trois", "9", ["8", "9", "10", "12"], 12, 1),
  c(4, "10 + 5", "dix plus cinq", "15", ["13", "14", "15", "16"], 12, 1),
  c(5, "7 − 2", "sept moins deux", "5", ["4", "5", "6", "9"], 12, 1),
  c(6, "9 + 2", "neuf plus deux", "11", ["10", "11", "12", "13"], 12, 1),
  c(7, "8 − 5", "huit moins cinq", "3", ["2", "3", "4", "13"], 12, 1),
  c(8, "5 + 7", "cinq plus sept", "12", ["11", "12", "13", "14"], 12, 1),
  c(9, "10 − 6", "dix moins six", "4", ["3", "4", "5", "16"], 12, 1),
  c(10, "3 + 8", "trois plus huit", "11", ["10", "11", "12", "5"], 12, 1),

  // Niveau 2 — mix + et − à 2 chiffres (9 s)
  c(11, "13 + 9", "treize plus neuf", "22", ["21", "22", "23", "31"], 9, 2),
  c(12, "25 − 8", "vingt-cinq moins huit", "17", ["16", "17", "18", "23"], 9, 2),
  c(13, "16 + 17", "seize plus dix-sept", "33", ["32", "33", "34", "43"], 9, 2),
  c(14, "40 − 15", "quarante moins quinze", "25", ["24", "25", "26", "35"], 9, 2),
  c(15, "6 × 4", "six fois quatre", "24", ["20", "24", "28", "30"], 9, 2),
  c(16, "18 + 14", "dix-huit plus quatorze", "32", ["30", "31", "32", "34"], 9, 2),
  c(17, "33 − 19", "trente-trois moins dix-neuf", "14", ["13", "14", "15", "24"], 9, 2),
  c(18, "5 × 6", "cinq fois six", "30", ["25", "30", "35", "36"], 9, 2),
  c(19, "27 + 26", "vingt-sept plus vingt-six", "53", ["43", "52", "53", "54"], 9, 2),
  c(20, "50 − 27", "cinquante moins vingt-sept", "23", ["22", "23", "27", "33"], 9, 2),

  // Niveau 3 — toutes opérations (7 s)
  c(21, "8 × 7", "huit fois sept", "56", ["48", "54", "56", "64"], 7, 3),
  c(22, "63 ÷ 9", "soixante-trois divisé par neuf", "7", ["6", "7", "8", "9"], 7, 3),
  c(23, "84 − 47", "quatre-vingt-quatre moins quarante-sept", "37", ["36", "37", "43", "47"], 7, 3),
  c(24, "9 × 9", "neuf fois neuf", "81", ["72", "79", "81", "91"], 7, 3),
  c(25, "156 + 47", "cent cinquante-six plus quarante-sept", "203", ["193", "202", "203", "213"], 7, 3),
  c(26, "72 ÷ 8", "septante-deux divisé par huit", "9", ["7", "8", "9", "12"], 7, 3),
  c(27, "12 × 6", "douze fois six", "72", ["62", "66", "72", "76"], 7, 3),
  c(28, "300 − 175", "trois cents moins cent septante-cinq", "125", ["115", "125", "135", "225"], 7, 3),
  c(29, "7 × 8 + 6", "sept fois huit plus six", "62", ["56", "60", "62", "68"], 7, 3),
  c(30, "144 ÷ 12", "cent quarante-quatre divisé par douze", "12", ["10", "11", "12", "14"], 7, 3),
];
