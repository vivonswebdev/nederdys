/** Les Dés Mathématiques — deux dés tombent, applique l'opération (30 défis). */
export type DiceOp = "+" | "−" | "×";

export interface DesMathsChallenge {
  id: number;
  diceA: number;
  diceB: number;
  op: DiceOp;
  audioText: string;
  audioUrl: string;
  correctAnswer: string;
  options: string[];
  difficulty: 1 | 2 | 3;
}

const c = (
  id: number,
  diceA: number,
  diceB: number,
  op: DiceOp,
  audioText: string,
  correctAnswer: string,
  options: string[],
  difficulty: 1 | 2 | 3,
): DesMathsChallenge => ({ id, diceA, diceB, op, audioText, audioUrl: "", correctAnswer, options, difficulty });

export const desMathsChallenges: DesMathsChallenge[] = [
  // Niveau 1 — additions de deux dés
  c(1, 2, 3, "+", "deux plus trois", "5", ["4", "5", "6", "7"], 1),
  c(2, 4, 1, "+", "quatre plus un", "5", ["3", "5", "6", "8"], 1),
  c(3, 5, 6, "+", "cinq plus six", "11", ["10", "11", "12", "13"], 1),
  c(4, 3, 3, "+", "trois plus trois", "6", ["5", "6", "7", "9"], 1),
  c(5, 6, 6, "+", "six plus six", "12", ["10", "11", "12", "13"], 1),
  c(6, 1, 5, "+", "un plus cinq", "6", ["4", "5", "6", "7"], 1),
  c(7, 4, 4, "+", "quatre plus quatre", "8", ["6", "7", "8", "9"], 1),
  c(8, 2, 6, "+", "deux plus six", "8", ["7", "8", "9", "12"], 1),
  c(9, 3, 5, "+", "trois plus cinq", "8", ["7", "8", "9", "15"], 1),
  c(10, 6, 4, "+", "six plus quatre", "10", ["9", "10", "11", "24"], 1),

  // Niveau 2 — soustractions et petites multiplications
  c(11, 6, 2, "−", "six moins deux", "4", ["3", "4", "5", "8"], 2),
  c(12, 5, 3, "−", "cinq moins trois", "2", ["1", "2", "3", "8"], 2),
  c(13, 3, 4, "×", "trois fois quatre", "12", ["7", "10", "12", "14"], 2),
  c(14, 2, 5, "×", "deux fois cinq", "10", ["7", "9", "10", "12"], 2),
  c(15, 6, 1, "−", "six moins un", "5", ["4", "5", "6", "7"], 2),
  c(16, 4, 3, "×", "quatre fois trois", "12", ["7", "12", "15", "16"], 2),
  c(17, 6, 5, "−", "six moins cinq", "1", ["0", "1", "2", "11"], 2),
  c(18, 5, 5, "×", "cinq fois cinq", "25", ["10", "20", "25", "30"], 2),
  c(19, 6, 3, "×", "six fois trois", "18", ["9", "15", "18", "21"], 2),
  c(20, 4, 2, "−", "quatre moins deux", "2", ["1", "2", "3", "6"], 2),

  // Niveau 3 — multiplications et dés à 10 faces
  c(21, 6, 6, "×", "six fois six", "36", ["30", "32", "36", "42"], 3),
  c(22, 8, 7, "×", "huit fois sept", "56", ["48", "54", "56", "63"], 3),
  c(23, 9, 4, "×", "neuf fois quatre", "36", ["32", "36", "40", "45"], 3),
  c(24, 10, 7, "×", "dix fois sept", "70", ["60", "70", "77", "80"], 3),
  c(25, 9, 6, "−", "neuf moins six", "3", ["2", "3", "4", "15"], 3),
  c(26, 8, 8, "×", "huit fois huit", "64", ["56", "60", "64", "72"], 3),
  c(27, 10, 9, "×", "dix fois neuf", "90", ["80", "89", "90", "99"], 3),
  c(28, 7, 7, "×", "sept fois sept", "49", ["42", "47", "49", "56"], 3),
  c(29, 9, 9, "×", "neuf fois neuf", "81", ["72", "79", "81", "90"], 3),
  c(30, 10, 4, "×", "dix fois quatre", "40", ["14", "30", "40", "44"], 3),
];

/** Faces de dé en points (1 à 6) ou chiffre affiché au-delà. */
export const DICE_FACE: Record<number, string> = {
  1: "⚀",
  2: "⚁",
  3: "⚂",
  4: "⚃",
  5: "⚄",
  6: "⚅",
};
