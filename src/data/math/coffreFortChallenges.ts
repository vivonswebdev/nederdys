/** Coffre-Fort — déduis le code secret à partir des indices (30 défis). */
export interface CoffreFortChallenge {
  id: number;
  /** Indices logiques affichés (français). */
  clues: string[];
  cluesNl: string[];
  audioText: string;
  audioUrl: string;
  correctAnswer: string;
  options: string[];
  difficulty: 1 | 2 | 3;
}

const c = (
  id: number,
  clues: string[],
  cluesNl: string[],
  audioText: string,
  correctAnswer: string,
  options: string[],
  difficulty: 1 | 2 | 3,
): CoffreFortChallenge => ({ id, clues, cluesNl, audioText, audioUrl: "", correctAnswer, options, difficulty });

export const coffreFortChallenges: CoffreFortChallenge[] = [
  // Niveau 1 — un seul indice, nombres 1 à 20
  c(1, ["Le code est plus grand que 5", "Le code est plus petit que 8", "Le code est pair"], ["De code is groter dan 5", "De code is kleiner dan 8", "De code is even"], "trouve le code secret", "6", ["6", "7", "9", "4"], 1),
  c(2, ["Le code est entre 10 et 15", "Le code est impair", "Le code n'est pas 11"], ["De code ligt tussen 10 en 15", "De code is oneven", "De code is niet 11"], "trouve le code secret", "13", ["11", "12", "13", "14"], 1),
  c(3, ["Le code vaut 4 + 5"], ["De code is 4 + 5"], "trouve le code secret", "9", ["8", "9", "10", "11"], 1),
  c(4, ["Le code est le double de 4"], ["De code is het dubbel van 4"], "trouve le code secret", "8", ["6", "8", "10", "12"], 1),
  c(5, ["Le code est plus petit que 5", "Le code est impair", "Le code n'est pas 1"], ["De code is kleiner dan 5", "De code is oneven", "De code is niet 1"], "trouve le code secret", "3", ["1", "2", "3", "5"], 1),
  c(6, ["Le code vaut 10 − 3"], ["De code is 10 − 3"], "trouve le code secret", "7", ["5", "6", "7", "8"], 1),
  c(7, ["Le code est pair", "Le code est entre 14 et 18"], ["De code is even", "De code ligt tussen 14 en 18"], "trouve le code secret", "16", ["15", "16", "17", "18"], 1),
  c(8, ["Le code est la moitié de 20"], ["De code is de helft van 20"], "trouve le code secret", "10", ["5", "10", "15", "20"], 1),
  c(9, ["Le code est plus grand que 17", "Le code est impair"], ["De code is groter dan 17", "De code is oneven"], "trouve le code secret", "19", ["18", "19", "20", "17"], 1),
  c(10, ["Le code vaut 6 + 6"], ["De code is 6 + 6"], "trouve le code secret", "12", ["10", "11", "12", "13"], 1),

  // Niveau 2 — deux indices, nombres jusqu'à 100
  c(11, ["Le code est un multiple de 5", "Le code est entre 20 et 30", "Le code n'est pas 20"], ["De code is een veelvoud van 5", "De code ligt tussen 20 en 30", "De code is niet 20"], "trouve le code secret", "25", ["20", "25", "30", "35"], 2),
  c(12, ["Le code vaut 7 × 6"], ["De code is 7 × 6"], "trouve le code secret", "42", ["36", "42", "48", "54"], 2),
  c(13, ["Le code est un multiple de 3", "Le code est pair", "Le code est entre 15 et 20"], ["De code is een veelvoud van 3", "De code is even", "De code ligt tussen 15 en 20"], "trouve le code secret", "18", ["15", "16", "18", "20"], 2),
  c(14, ["Le code est le double de 23"], ["De code is het dubbel van 23"], "trouve le code secret", "46", ["43", "44", "46", "52"], 2),
  c(15, ["Le code a 2 chiffres", "La somme de ses chiffres est 9", "Le chiffre des dizaines est 4"], ["De code heeft 2 cijfers", "De som van de cijfers is 9", "Het tiental is 4"], "trouve le code secret", "45", ["36", "45", "54", "49"], 2),
  c(16, ["Le code vaut 100 − 37"], ["De code is 100 − 37"], "trouve le code secret", "63", ["53", "63", "67", "73"], 2),
  c(17, ["Le code est un multiple de 10", "Le code est plus grand que 60", "Le code est plus petit que 80"], ["De code is een veelvoud van 10", "De code is groter dan 60", "De code is kleiner dan 80"], "trouve le code secret", "70", ["60", "70", "80", "75"], 2),
  c(18, ["Le code est la moitié de 68"], ["De code is de helft van 68"], "trouve le code secret", "34", ["32", "34", "36", "38"], 2),
  c(19, ["Le code est impair", "Le code est un multiple de 9", "Le code est entre 20 et 30"], ["De code is oneven", "De code is een veelvoud van 9", "De code ligt tussen 20 en 30"], "trouve le code secret", "27", ["21", "25", "27", "29"], 2),
  c(20, ["Le code vaut 8 × 9"], ["De code is 8 × 9"], "trouve le code secret", "72", ["63", "72", "81", "89"], 2),

  // Niveau 3 — trois indices, nombres jusqu'à 1000
  c(21, ["Le code a 3 chiffres", "Le chiffre des centaines est 2", "Le code est un multiple de 50"], ["De code heeft 3 cijfers", "Het honderdtal is 2", "De code is een veelvoud van 50"], "trouve le code secret", "250", ["200", "250", "350", "205"], 3),
  c(22, ["Le code vaut 12 × 12"], ["De code is 12 × 12"], "trouve le code secret", "144", ["124", "132", "144", "156"], 3),
  c(23, ["Le code est un multiple de 25", "Le code est entre 300 et 400", "Le chiffre des unités est 5"], ["De code is een veelvoud van 25", "De code ligt tussen 300 en 400", "Het eenheidscijfer is 5"], "trouve le code secret", "375", ["325", "350", "375", "395"], 3),
  c(24, ["Le code vaut 500 ÷ 4"], ["De code is 500 ÷ 4"], "trouve le code secret", "125", ["115", "125", "135", "145"], 3),
  c(25, ["La somme des chiffres est 6", "Le code a 3 chiffres", "Le code est un multiple de 100"], ["De som van de cijfers is 6", "De code heeft 3 cijfers", "De code is een veelvoud van 100"], "trouve le code secret", "600", ["300", "500", "600", "150"], 3),
  c(26, ["Le code vaut 15 × 8"], ["De code is 15 × 8"], "trouve le code secret", "120", ["110", "118", "120", "128"], 3),
  c(27, ["Le code est un multiple de 7", "Le code est entre 90 et 100"], ["De code is een veelvoud van 7", "De code ligt tussen 90 en 100"], "trouve le code secret", "98", ["91", "94", "98", "99"], 3),
  c(28, ["Le code est le triple de 111"], ["De code is het drievoud van 111"], "trouve le code secret", "333", ["222", "321", "333", "444"], 3),
  c(29, ["Le code vaut 1000 − 456"], ["De code is 1000 − 456"], "trouve le code secret", "544", ["444", "534", "544", "556"], 3),
  c(30, ["Le code est un multiple de 11", "Le code a 2 chiffres", "Le code est plus grand que 80"], ["De code is een veelvoud van 11", "De code heeft 2 cijfers", "De code is groter dan 80"], "trouve le code secret", "88", ["77", "88", "99", "80"], 3),
];
