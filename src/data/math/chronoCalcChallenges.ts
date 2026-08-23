// Généré : pools de défis Chrono Calcul
export interface ChronoCalcChallenge {
  id: number;
  question: string;
  audioUrl: string;
  audioText: string;
  correctAnswer: number;
  options: number[];
  timeLimit: number;
  difficulty: 1 | 2 | 3;
  /** Table de multiplication travaillée (Course aux Tables) */
  table?: number;
}

export const chronoCalcChallenges: ChronoCalcChallenge[] = [
  {
    "id": 1,
    "question": "7 + 5 = ?",
    "audioUrl": "/audio/math/chrono/sept-plus-cinq.mp3",
    "audioText": "sept plus cinq",
    "correctAnswer": 12,
    "options": [
      11,
      12,
      13,
      14
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 2,
    "question": "9 + 3 = ?",
    "audioUrl": "/audio/math/chrono/neuf-plus-trois.mp3",
    "audioText": "neuf plus trois",
    "correctAnswer": 12,
    "options": [
      11,
      12,
      13,
      14
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 3,
    "question": "6 + 4 = ?",
    "audioUrl": "/audio/math/chrono/six-plus-quatre.mp3",
    "audioText": "six plus quatre",
    "correctAnswer": 10,
    "options": [
      9,
      10,
      11,
      12
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 4,
    "question": "8 + 6 = ?",
    "audioUrl": "/audio/math/chrono/huit-plus-six.mp3",
    "audioText": "huit plus six",
    "correctAnswer": 14,
    "options": [
      13,
      14,
      15,
      16
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 5,
    "question": "5 + 7 = ?",
    "audioUrl": "/audio/math/chrono/cinq-plus-sept.mp3",
    "audioText": "cinq plus sept",
    "correctAnswer": 12,
    "options": [
      11,
      12,
      13,
      14
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 6,
    "question": "4 + 9 = ?",
    "audioUrl": "/audio/math/chrono/quatre-plus-neuf.mp3",
    "audioText": "quatre plus neuf",
    "correctAnswer": 13,
    "options": [
      12,
      13,
      14,
      15
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 7,
    "question": "3 + 8 = ?",
    "audioUrl": "/audio/math/chrono/trois-plus-huit.mp3",
    "audioText": "trois plus huit",
    "correctAnswer": 11,
    "options": [
      10,
      11,
      12,
      13
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 8,
    "question": "10 + 5 = ?",
    "audioUrl": "/audio/math/chrono/dix-plus-cinq.mp3",
    "audioText": "dix plus cinq",
    "correctAnswer": 15,
    "options": [
      14,
      15,
      16,
      17
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 9,
    "question": "2 + 7 = ?",
    "audioUrl": "/audio/math/chrono/deux-plus-sept.mp3",
    "audioText": "deux plus sept",
    "correctAnswer": 9,
    "options": [
      8,
      9,
      10,
      11
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 10,
    "question": "6 + 6 = ?",
    "audioUrl": "/audio/math/chrono/six-plus-six.mp3",
    "audioText": "six plus six",
    "correctAnswer": 12,
    "options": [
      11,
      12,
      13,
      14
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 11,
    "question": "9 + 9 = ?",
    "audioUrl": "/audio/math/chrono/neuf-plus-neuf.mp3",
    "audioText": "neuf plus neuf",
    "correctAnswer": 18,
    "options": [
      17,
      18,
      19,
      20
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 12,
    "question": "7 + 8 = ?",
    "audioUrl": "/audio/math/chrono/sept-plus-huit.mp3",
    "audioText": "sept plus huit",
    "correctAnswer": 15,
    "options": [
      14,
      15,
      16,
      17
    ],
    "timeLimit": 12,
    "difficulty": 1
  },
  {
    "id": 13,
    "question": "15 - 6 = ?",
    "audioUrl": "/audio/math/chrono/quinze-moins-six.mp3",
    "audioText": "quinze moins six",
    "correctAnswer": 9,
    "options": [
      8,
      9,
      10,
      11
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 14,
    "question": "18 - 7 = ?",
    "audioUrl": "/audio/math/chrono/dix-huit-moins-sept.mp3",
    "audioText": "dix-huit moins sept",
    "correctAnswer": 11,
    "options": [
      10,
      11,
      12,
      13
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 15,
    "question": "20 - 8 = ?",
    "audioUrl": "/audio/math/chrono/vingt-moins-huit.mp3",
    "audioText": "vingt moins huit",
    "correctAnswer": 12,
    "options": [
      11,
      12,
      13,
      14
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 16,
    "question": "14 - 5 = ?",
    "audioUrl": "/audio/math/chrono/quatorze-moins-cinq.mp3",
    "audioText": "quatorze moins cinq",
    "correctAnswer": 9,
    "options": [
      8,
      9,
      10,
      11
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 17,
    "question": "17 - 9 = ?",
    "audioUrl": "/audio/math/chrono/dix-sept-moins-neuf.mp3",
    "audioText": "dix-sept moins neuf",
    "correctAnswer": 8,
    "options": [
      7,
      8,
      9,
      10
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 18,
    "question": "12 - 4 = ?",
    "audioUrl": "/audio/math/chrono/douze-moins-quatre.mp3",
    "audioText": "douze moins quatre",
    "correctAnswer": 8,
    "options": [
      7,
      8,
      9,
      10
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 19,
    "question": "19 - 11 = ?",
    "audioUrl": "/audio/math/chrono/dix-neuf-moins-onze.mp3",
    "audioText": "dix-neuf moins onze",
    "correctAnswer": 8,
    "options": [
      7,
      8,
      9,
      10
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 20,
    "question": "16 - 8 = ?",
    "audioUrl": "/audio/math/chrono/seize-moins-huit.mp3",
    "audioText": "seize moins huit",
    "correctAnswer": 8,
    "options": [
      7,
      8,
      9,
      10
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 21,
    "question": "13 - 6 = ?",
    "audioUrl": "/audio/math/chrono/treize-moins-six.mp3",
    "audioText": "treize moins six",
    "correctAnswer": 7,
    "options": [
      6,
      7,
      8,
      9
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 22,
    "question": "20 - 13 = ?",
    "audioUrl": "/audio/math/chrono/vingt-moins-treize.mp3",
    "audioText": "vingt moins treize",
    "correctAnswer": 7,
    "options": [
      6,
      7,
      8,
      9
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 23,
    "question": "11 - 7 = ?",
    "audioUrl": "/audio/math/chrono/onze-moins-sept.mp3",
    "audioText": "onze moins sept",
    "correctAnswer": 4,
    "options": [
      3,
      4,
      5,
      6
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 24,
    "question": "18 - 12 = ?",
    "audioUrl": "/audio/math/chrono/dix-huit-moins-douze.mp3",
    "audioText": "dix-huit moins douze",
    "correctAnswer": 6,
    "options": [
      5,
      6,
      7,
      8
    ],
    "timeLimit": 8,
    "difficulty": 2
  },
  {
    "id": 25,
    "question": "8 × 3 = ?",
    "audioUrl": "/audio/math/chrono/huit-fois-trois.mp3",
    "audioText": "huit fois trois",
    "correctAnswer": 24,
    "options": [
      23,
      24,
      25,
      26
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 26,
    "question": "6 × 4 = ?",
    "audioUrl": "/audio/math/chrono/six-fois-quatre.mp3",
    "audioText": "six fois quatre",
    "correctAnswer": 24,
    "options": [
      23,
      24,
      25,
      26
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 27,
    "question": "7 × 5 = ?",
    "audioUrl": "/audio/math/chrono/sept-fois-cinq.mp3",
    "audioText": "sept fois cinq",
    "correctAnswer": 35,
    "options": [
      34,
      35,
      36,
      37
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 28,
    "question": "9 × 2 = ?",
    "audioUrl": "/audio/math/chrono/neuf-fois-deux.mp3",
    "audioText": "neuf fois deux",
    "correctAnswer": 18,
    "options": [
      17,
      18,
      19,
      20
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 29,
    "question": "24 + 17 = ?",
    "audioUrl": "/audio/math/chrono/vingt-quatre-plus-dix-sept.mp3",
    "audioText": "vingt-quatre plus dix-sept",
    "correctAnswer": 41,
    "options": [
      40,
      41,
      42,
      43
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 30,
    "question": "52 - 18 = ?",
    "audioUrl": "/audio/math/chrono/cinquante-deux-moins-dix-huit.mp3",
    "audioText": "cinquante-deux moins dix-huit",
    "correctAnswer": 34,
    "options": [
      33,
      34,
      35,
      36
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 31,
    "question": "5 × 6 = ?",
    "audioUrl": "/audio/math/chrono/cinq-fois-six.mp3",
    "audioText": "cinq fois six",
    "correctAnswer": 30,
    "options": [
      29,
      30,
      31,
      32
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 32,
    "question": "8 × 7 = ?",
    "audioUrl": "/audio/math/chrono/huit-fois-sept.mp3",
    "audioText": "huit fois sept",
    "correctAnswer": 56,
    "options": [
      55,
      56,
      57,
      58
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 33,
    "question": "36 + 25 = ?",
    "audioUrl": "/audio/math/chrono/trente-six-plus-vingt-cinq.mp3",
    "audioText": "trente-six plus vingt-cinq",
    "correctAnswer": 61,
    "options": [
      60,
      61,
      62,
      63
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 34,
    "question": "63 - 29 = ?",
    "audioUrl": "/audio/math/chrono/soixante-trois-moins-vingt-neuf.mp3",
    "audioText": "soixante-trois moins vingt-neuf",
    "correctAnswer": 34,
    "options": [
      33,
      34,
      35,
      36
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 35,
    "question": "9 × 4 = ?",
    "audioUrl": "/audio/math/chrono/neuf-fois-quatre.mp3",
    "audioText": "neuf fois quatre",
    "correctAnswer": 36,
    "options": [
      35,
      36,
      37,
      38
    ],
    "timeLimit": 6,
    "difficulty": 3
  },
  {
    "id": 36,
    "question": "47 + 34 = ?",
    "audioUrl": "/audio/math/chrono/quarante-sept-plus-trente-quatre.mp3",
    "audioText": "quarante-sept plus trente-quatre",
    "correctAnswer": 81,
    "options": [
      80,
      81,
      82,
      83
    ],
    "timeLimit": 6,
    "difficulty": 3
  }
,

  {
    "id": 37,
    "question": "2 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-2-3.mp3",
    "audioText": "2 fois 3",
    "correctAnswer": 6,
    "options": [
      4,
      6,
      7,
      8
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 2
  },
  {
    "id": 38,
    "question": "2 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-2-6.mp3",
    "audioText": "2 fois 6",
    "correctAnswer": 12,
    "options": [
      10,
      12,
      13,
      14
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 2
  },
  {
    "id": 39,
    "question": "2 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-2-8.mp3",
    "audioText": "2 fois 8",
    "correctAnswer": 16,
    "options": [
      14,
      16,
      17,
      18
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 2
  },
  {
    "id": 40,
    "question": "5 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-5-3.mp3",
    "audioText": "5 fois 3",
    "correctAnswer": 15,
    "options": [
      10,
      15,
      16,
      20
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 5
  },
  {
    "id": 41,
    "question": "5 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-5-6.mp3",
    "audioText": "5 fois 6",
    "correctAnswer": 30,
    "options": [
      25,
      30,
      31,
      35
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 5
  },
  {
    "id": 42,
    "question": "5 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-5-8.mp3",
    "audioText": "5 fois 8",
    "correctAnswer": 40,
    "options": [
      35,
      40,
      41,
      45
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 5
  },
  {
    "id": 43,
    "question": "10 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-10-3.mp3",
    "audioText": "10 fois 3",
    "correctAnswer": 30,
    "options": [
      20,
      30,
      31,
      40
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 10
  },
  {
    "id": 44,
    "question": "10 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-10-6.mp3",
    "audioText": "10 fois 6",
    "correctAnswer": 60,
    "options": [
      50,
      60,
      61,
      70
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 10
  },
  {
    "id": 45,
    "question": "10 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-10-8.mp3",
    "audioText": "10 fois 8",
    "correctAnswer": 80,
    "options": [
      70,
      80,
      81,
      90
    ],
    "timeLimit": 14,
    "difficulty": 1,
    "table": 10
  },
  {
    "id": 46,
    "question": "3 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-3-3.mp3",
    "audioText": "3 fois 3",
    "correctAnswer": 9,
    "options": [
      6,
      9,
      10,
      12
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 3
  },
  {
    "id": 47,
    "question": "3 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-3-6.mp3",
    "audioText": "3 fois 6",
    "correctAnswer": 18,
    "options": [
      15,
      18,
      19,
      21
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 3
  },
  {
    "id": 48,
    "question": "3 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-3-8.mp3",
    "audioText": "3 fois 8",
    "correctAnswer": 24,
    "options": [
      21,
      24,
      25,
      27
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 3
  },
  {
    "id": 49,
    "question": "4 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-4-3.mp3",
    "audioText": "4 fois 3",
    "correctAnswer": 12,
    "options": [
      8,
      12,
      13,
      16
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 4
  },
  {
    "id": 50,
    "question": "4 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-4-6.mp3",
    "audioText": "4 fois 6",
    "correctAnswer": 24,
    "options": [
      20,
      24,
      25,
      28
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 4
  },
  {
    "id": 51,
    "question": "4 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-4-8.mp3",
    "audioText": "4 fois 8",
    "correctAnswer": 32,
    "options": [
      28,
      32,
      33,
      36
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 4
  },
  {
    "id": 52,
    "question": "6 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-6-3.mp3",
    "audioText": "6 fois 3",
    "correctAnswer": 18,
    "options": [
      12,
      18,
      19,
      24
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 6
  },
  {
    "id": 53,
    "question": "6 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-6-6.mp3",
    "audioText": "6 fois 6",
    "correctAnswer": 36,
    "options": [
      30,
      36,
      37,
      42
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 6
  },
  {
    "id": 54,
    "question": "6 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-6-8.mp3",
    "audioText": "6 fois 8",
    "correctAnswer": 48,
    "options": [
      42,
      48,
      49,
      54
    ],
    "timeLimit": 11,
    "difficulty": 2,
    "table": 6
  },
  {
    "id": 55,
    "question": "7 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-7-3.mp3",
    "audioText": "7 fois 3",
    "correctAnswer": 21,
    "options": [
      14,
      21,
      22,
      28
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 7
  },
  {
    "id": 56,
    "question": "7 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-7-6.mp3",
    "audioText": "7 fois 6",
    "correctAnswer": 42,
    "options": [
      35,
      42,
      43,
      49
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 7
  },
  {
    "id": 57,
    "question": "7 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-7-8.mp3",
    "audioText": "7 fois 8",
    "correctAnswer": 56,
    "options": [
      49,
      56,
      57,
      63
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 7
  },
  {
    "id": 58,
    "question": "8 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-8-3.mp3",
    "audioText": "8 fois 3",
    "correctAnswer": 24,
    "options": [
      16,
      24,
      25,
      32
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 8
  },
  {
    "id": 59,
    "question": "8 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-8-6.mp3",
    "audioText": "8 fois 6",
    "correctAnswer": 48,
    "options": [
      40,
      48,
      49,
      56
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 8
  },
  {
    "id": 60,
    "question": "8 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-8-8.mp3",
    "audioText": "8 fois 8",
    "correctAnswer": 64,
    "options": [
      56,
      64,
      65,
      72
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 8
  },
  {
    "id": 61,
    "question": "9 × 3 = ?",
    "audioUrl": "/audio/math/chrono/table-9-3.mp3",
    "audioText": "9 fois 3",
    "correctAnswer": 27,
    "options": [
      18,
      27,
      28,
      36
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 9
  },
  {
    "id": 62,
    "question": "9 × 6 = ?",
    "audioUrl": "/audio/math/chrono/table-9-6.mp3",
    "audioText": "9 fois 6",
    "correctAnswer": 54,
    "options": [
      45,
      54,
      55,
      63
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 9
  },
  {
    "id": 63,
    "question": "9 × 8 = ?",
    "audioUrl": "/audio/math/chrono/table-9-8.mp3",
    "audioText": "9 fois 8",
    "correctAnswer": 72,
    "options": [
      63,
      72,
      73,
      81
    ],
    "timeLimit": 9,
    "difficulty": 3,
    "table": 9
  },
  {
    "id": 64,
    "question": "Juste calcul : 9 + 4 = ?",
    "audioUrl": "/audio/math/chrono/juste-9-4.mp3",
    "audioText": "9 plus 4",
    "correctAnswer": 13,
    "options": [
      10,
      13,
      18,
      23
    ],
    "timeLimit": 14,
    "difficulty": 1
  },
  {
    "id": 65,
    "question": "Juste calcul : 9 - 4 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-9-4.mp3",
    "audioText": "9 moins 4",
    "correctAnswer": 5,
    "options": [
      3,
      5,
      9,
      12
    ],
    "timeLimit": 14,
    "difficulty": 1
  },
  {
    "id": 66,
    "question": "Juste calcul : 8 + 7 = ?",
    "audioUrl": "/audio/math/chrono/juste-8-7.mp3",
    "audioText": "8 plus 7",
    "correctAnswer": 15,
    "options": [
      12,
      15,
      20,
      25
    ],
    "timeLimit": 14,
    "difficulty": 1
  },
  {
    "id": 67,
    "question": "Juste calcul : 8 - 7 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-8-7.mp3",
    "audioText": "8 moins 7",
    "correctAnswer": 1,
    "options": [
      0,
      1,
      5,
      8
    ],
    "timeLimit": 14,
    "difficulty": 1
  },
  {
    "id": 68,
    "question": "Juste calcul : 6 + 6 = ?",
    "audioUrl": "/audio/math/chrono/juste-6-6.mp3",
    "audioText": "6 plus 6",
    "correctAnswer": 12,
    "options": [
      9,
      12,
      17,
      22
    ],
    "timeLimit": 14,
    "difficulty": 1
  },
  {
    "id": 69,
    "question": "Juste calcul : 6 - 6 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-6-6.mp3",
    "audioText": "6 moins 6",
    "correctAnswer": 0,
    "options": [
      0,
      0,
      4,
      7
    ],
    "timeLimit": 14,
    "difficulty": 1
  },
  {
    "id": 70,
    "question": "Juste calcul : 19 + 12 = ?",
    "audioUrl": "/audio/math/chrono/juste-19-12.mp3",
    "audioText": "19 plus 12",
    "correctAnswer": 31,
    "options": [
      28,
      31,
      36,
      41
    ],
    "timeLimit": 11,
    "difficulty": 2
  },
  {
    "id": 71,
    "question": "Juste calcul : 19 - 12 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-19-12.mp3",
    "audioText": "19 moins 12",
    "correctAnswer": 7,
    "options": [
      5,
      7,
      11,
      14
    ],
    "timeLimit": 11,
    "difficulty": 2
  },
  {
    "id": 72,
    "question": "Juste calcul : 24 + 17 = ?",
    "audioUrl": "/audio/math/chrono/juste-24-17.mp3",
    "audioText": "24 plus 17",
    "correctAnswer": 41,
    "options": [
      38,
      41,
      46,
      51
    ],
    "timeLimit": 11,
    "difficulty": 2
  },
  {
    "id": 73,
    "question": "Juste calcul : 24 - 17 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-24-17.mp3",
    "audioText": "24 moins 17",
    "correctAnswer": 7,
    "options": [
      5,
      7,
      11,
      14
    ],
    "timeLimit": 11,
    "difficulty": 2
  },
  {
    "id": 74,
    "question": "Juste calcul : 31 + 15 = ?",
    "audioUrl": "/audio/math/chrono/juste-31-15.mp3",
    "audioText": "31 plus 15",
    "correctAnswer": 46,
    "options": [
      43,
      46,
      51,
      56
    ],
    "timeLimit": 11,
    "difficulty": 2
  },
  {
    "id": 75,
    "question": "Juste calcul : 31 - 15 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-31-15.mp3",
    "audioText": "31 moins 15",
    "correctAnswer": 16,
    "options": [
      14,
      16,
      20,
      23
    ],
    "timeLimit": 11,
    "difficulty": 2
  },
  {
    "id": 76,
    "question": "Juste calcul : 48 + 27 = ?",
    "audioUrl": "/audio/math/chrono/juste-48-27.mp3",
    "audioText": "48 plus 27",
    "correctAnswer": 75,
    "options": [
      72,
      75,
      80,
      85
    ],
    "timeLimit": 9,
    "difficulty": 3
  },
  {
    "id": 77,
    "question": "Juste calcul : 48 - 27 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-48-27.mp3",
    "audioText": "48 moins 27",
    "correctAnswer": 21,
    "options": [
      19,
      21,
      25,
      28
    ],
    "timeLimit": 9,
    "difficulty": 3
  },
  {
    "id": 78,
    "question": "Juste calcul : 63 + 39 = ?",
    "audioUrl": "/audio/math/chrono/juste-63-39.mp3",
    "audioText": "63 plus 39",
    "correctAnswer": 102,
    "options": [
      99,
      102,
      107,
      112
    ],
    "timeLimit": 9,
    "difficulty": 3
  },
  {
    "id": 79,
    "question": "Juste calcul : 63 - 39 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-63-39.mp3",
    "audioText": "63 moins 39",
    "correctAnswer": 24,
    "options": [
      22,
      24,
      28,
      31
    ],
    "timeLimit": 9,
    "difficulty": 3
  },
  {
    "id": 80,
    "question": "Juste calcul : 87 + 45 = ?",
    "audioUrl": "/audio/math/chrono/juste-87-45.mp3",
    "audioText": "87 plus 45",
    "correctAnswer": 132,
    "options": [
      129,
      132,
      137,
      142
    ],
    "timeLimit": 9,
    "difficulty": 3
  },
  {
    "id": 81,
    "question": "Juste calcul : 87 - 45 = ?",
    "audioUrl": "/audio/math/chrono/juste-m-87-45.mp3",
    "audioText": "87 moins 45",
    "correctAnswer": 42,
    "options": [
      40,
      42,
      46,
      49
    ],
    "timeLimit": 9,
    "difficulty": 3
  }
] as ChronoCalcChallenge[];

export const chronoPool = (level: 1 | 2 | 3) => chronoCalcChallenges.filter((c) => c.difficulty === level);
