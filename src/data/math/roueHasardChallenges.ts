/** Roue du Hasard — la roue tombe sur une opération, trouve le résultat (30 défis). */
export interface RoueHasardChallenge {
  id: number;
  /** Secteur de la roue (opération affichée). */
  display: string;
  audioText: string;
  audioUrl: string;
  correctAnswer: string;
  options: string[];
  difficulty: 1 | 2 | 3;
}

const c = (
  id: number,
  display: string,
  audioText: string,
  correctAnswer: string,
  options: string[],
  difficulty: 1 | 2 | 3,
): RoueHasardChallenge => ({ id, display, audioText, audioUrl: "", correctAnswer, options, difficulty });

export const roueHasardChallenges: RoueHasardChallenge[] = [
  // Niveau 1 — additions et soustractions jusqu'à 20
  c(1, "3 + 4", "trois plus quatre", "7", ["6", "7", "8", "9"], 1),
  c(2, "5 + 5", "cinq plus cinq", "10", ["9", "10", "11", "15"], 1),
  c(3, "9 − 4", "neuf moins quatre", "5", ["3", "4", "5", "6"], 1),
  c(4, "8 + 6", "huit plus six", "14", ["12", "13", "14", "16"], 1),
  c(5, "12 − 5", "douze moins cinq", "7", ["6", "7", "8", "17"], 1),
  c(6, "7 + 8", "sept plus huit", "15", ["13", "14", "15", "16"], 1),
  c(7, "10 − 3", "dix moins trois", "7", ["6", "7", "8", "13"], 1),
  c(8, "6 + 6", "six plus six", "12", ["10", "11", "12", "13"], 1),
  c(9, "15 − 7", "quinze moins sept", "8", ["7", "8", "9", "22"], 1),
  c(10, "4 + 9", "quatre plus neuf", "13", ["12", "13", "14", "5"], 1),

  // Niveau 2 — tables de multiplication et nombres à 2 chiffres
  c(11, "6 × 3", "six fois trois", "18", ["15", "18", "21", "24"], 2),
  c(12, "7 × 4", "sept fois quatre", "28", ["24", "27", "28", "32"], 2),
  c(13, "24 + 17", "vingt-quatre plus dix-sept", "41", ["31", "40", "41", "42"], 2),
  c(14, "50 − 23", "cinquante moins vingt-trois", "27", ["23", "27", "33", "37"], 2),
  c(15, "8 × 5", "huit fois cinq", "40", ["35", "40", "45", "48"], 2),
  c(16, "36 + 28", "trente-six plus vingt-huit", "64", ["54", "62", "64", "68"], 2),
  c(17, "9 × 6", "neuf fois six", "54", ["45", "54", "56", "63"], 2),
  c(18, "72 − 35", "septante-deux moins trente-cinq", "37", ["27", "37", "43", "47"], 2),
  c(19, "45 + 19", "quarante-cinq plus dix-neuf", "64", ["54", "63", "64", "65"], 2),
  c(20, "7 × 7", "sept fois sept", "49", ["42", "47", "49", "56"], 2),

  // Niveau 3 — divisions et opérations mixtes
  c(21, "48 ÷ 6", "quarante-huit divisé par six", "8", ["6", "7", "8", "9"], 3),
  c(22, "81 ÷ 9", "quatre-vingt-un divisé par neuf", "9", ["7", "8", "9", "11"], 3),
  c(23, "12 × 4", "douze fois quatre", "48", ["44", "46", "48", "52"], 3),
  c(24, "125 + 78", "cent vingt-cinq plus septante-huit", "203", ["193", "203", "213", "293"], 3),
  c(25, "200 − 137", "deux cents moins cent trente-sept", "63", ["53", "63", "73", "137"], 3),
  c(26, "6 × 3 + 4", "six fois trois plus quatre", "22", ["18", "21", "22", "42"], 3),
  c(27, "56 ÷ 7", "cinquante-six divisé par sept", "8", ["6", "7", "8", "9"], 3),
  c(28, "15 × 3", "quinze fois trois", "45", ["35", "40", "45", "55"], 3),
  c(29, "100 ÷ 4", "cent divisé par quatre", "25", ["20", "24", "25", "40"], 3),
  c(30, "9 × 8 − 12", "neuf fois huit moins douze", "60", ["50", "58", "60", "72"], 3),
];
