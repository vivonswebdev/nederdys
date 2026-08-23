export interface LabyrintheStep {
  question: string;
  answer: number;
  wrong: number;
}

export interface LabyrintheChallenge {
  id: number;
  difficulty: 1 | 2 | 3;
  steps: LabyrintheStep[];
}

/** Labyrinthe des Nombres — choisir le bon chemin à chaque intersection. */
export const labyrintheNombresChallenges: LabyrintheChallenge[] = [
  {
    "id": 1,
    "difficulty": 1,
    "steps": [
      {
        "question": "9 + 9",
        "answer": 18,
        "wrong": 16
      },
      {
        "question": "5 + 8",
        "answer": 13,
        "wrong": 15
      },
      {
        "question": "9 + 8",
        "answer": 17,
        "wrong": 19
      }
    ]
  },
  {
    "id": 2,
    "difficulty": 1,
    "steps": [
      {
        "question": "4 + 9",
        "answer": 13,
        "wrong": 12
      },
      {
        "question": "9 + 4",
        "answer": 13,
        "wrong": 14
      },
      {
        "question": "3 + 7",
        "answer": 10,
        "wrong": 7
      }
    ]
  },
  {
    "id": 3,
    "difficulty": 1,
    "steps": [
      {
        "question": "7 + 8",
        "answer": 15,
        "wrong": 14
      },
      {
        "question": "2 + 4",
        "answer": 6,
        "wrong": 7
      },
      {
        "question": "2 + 4",
        "answer": 6,
        "wrong": 9
      }
    ]
  },
  {
    "id": 4,
    "difficulty": 1,
    "steps": [
      {
        "question": "5 + 2",
        "answer": 7,
        "wrong": 5
      },
      {
        "question": "6 + 3",
        "answer": 9,
        "wrong": 8
      },
      {
        "question": "3 + 8",
        "answer": 11,
        "wrong": 9
      }
    ]
  },
  {
    "id": 5,
    "difficulty": 1,
    "steps": [
      {
        "question": "2 + 7",
        "answer": 9,
        "wrong": 10
      },
      {
        "question": "3 + 4",
        "answer": 7,
        "wrong": 5
      },
      {
        "question": "7 + 9",
        "answer": 16,
        "wrong": 17
      }
    ]
  },
  {
    "id": 6,
    "difficulty": 1,
    "steps": [
      {
        "question": "6 + 7",
        "answer": 13,
        "wrong": 11
      },
      {
        "question": "6 + 6",
        "answer": 12,
        "wrong": 9
      },
      {
        "question": "6 + 1",
        "answer": 7,
        "wrong": 6
      }
    ]
  },
  {
    "id": 7,
    "difficulty": 1,
    "steps": [
      {
        "question": "9 + 8",
        "answer": 17,
        "wrong": 18
      },
      {
        "question": "1 + 7",
        "answer": 8,
        "wrong": 7
      },
      {
        "question": "9 + 5",
        "answer": 14,
        "wrong": 16
      }
    ]
  },
  {
    "id": 8,
    "difficulty": 1,
    "steps": [
      {
        "question": "2 + 2",
        "answer": 4,
        "wrong": 2
      },
      {
        "question": "2 + 2",
        "answer": 4,
        "wrong": 3
      },
      {
        "question": "5 + 1",
        "answer": 6,
        "wrong": 4
      }
    ]
  },
  {
    "id": 9,
    "difficulty": 1,
    "steps": [
      {
        "question": "5 + 3",
        "answer": 8,
        "wrong": 9
      },
      {
        "question": "5 + 7",
        "answer": 12,
        "wrong": 10
      },
      {
        "question": "9 + 9",
        "answer": 18,
        "wrong": 20
      }
    ]
  },
  {
    "id": 10,
    "difficulty": 1,
    "steps": [
      {
        "question": "8 + 6",
        "answer": 14,
        "wrong": 11
      },
      {
        "question": "5 + 1",
        "answer": 6,
        "wrong": 9
      },
      {
        "question": "3 + 7",
        "answer": 10,
        "wrong": 7
      }
    ]
  },
  {
    "id": 11,
    "difficulty": 2,
    "steps": [
      {
        "question": "10 + 2",
        "answer": 12,
        "wrong": 11
      },
      {
        "question": "17 + 2",
        "answer": 19,
        "wrong": 18
      },
      {
        "question": "24 − 1",
        "answer": 23,
        "wrong": 22
      },
      {
        "question": "23 − 5",
        "answer": 18,
        "wrong": 20
      }
    ]
  },
  {
    "id": 12,
    "difficulty": 2,
    "steps": [
      {
        "question": "26 + 4",
        "answer": 30,
        "wrong": 27
      },
      {
        "question": "18 − 1",
        "answer": 17,
        "wrong": 15
      },
      {
        "question": "19 + 5",
        "answer": 24,
        "wrong": 26
      },
      {
        "question": "19 − 8",
        "answer": 11,
        "wrong": 13
      }
    ]
  },
  {
    "id": 13,
    "difficulty": 2,
    "steps": [
      {
        "question": "18 − 6",
        "answer": 12,
        "wrong": 9
      },
      {
        "question": "11 − 1",
        "answer": 10,
        "wrong": 7
      },
      {
        "question": "27 − 4",
        "answer": 23,
        "wrong": 25
      },
      {
        "question": "24 + 2",
        "answer": 26,
        "wrong": 29
      }
    ]
  },
  {
    "id": 14,
    "difficulty": 2,
    "steps": [
      {
        "question": "23 − 8",
        "answer": 15,
        "wrong": 17
      },
      {
        "question": "22 − 9",
        "answer": 13,
        "wrong": 12
      },
      {
        "question": "17 − 6",
        "answer": 11,
        "wrong": 9
      },
      {
        "question": "30 − 3",
        "answer": 27,
        "wrong": 28
      }
    ]
  },
  {
    "id": 15,
    "difficulty": 2,
    "steps": [
      {
        "question": "11 − 3",
        "answer": 8,
        "wrong": 5
      },
      {
        "question": "18 + 7",
        "answer": 25,
        "wrong": 23
      },
      {
        "question": "22 + 9",
        "answer": 31,
        "wrong": 34
      },
      {
        "question": "29 − 4",
        "answer": 25,
        "wrong": 28
      }
    ]
  },
  {
    "id": 16,
    "difficulty": 2,
    "steps": [
      {
        "question": "24 + 3",
        "answer": 27,
        "wrong": 25
      },
      {
        "question": "10 + 5",
        "answer": 15,
        "wrong": 14
      },
      {
        "question": "27 − 6",
        "answer": 21,
        "wrong": 19
      },
      {
        "question": "19 + 4",
        "answer": 23,
        "wrong": 22
      }
    ]
  },
  {
    "id": 17,
    "difficulty": 2,
    "steps": [
      {
        "question": "20 + 7",
        "answer": 27,
        "wrong": 24
      },
      {
        "question": "26 + 4",
        "answer": 30,
        "wrong": 28
      },
      {
        "question": "10 − 2",
        "answer": 8,
        "wrong": 7
      },
      {
        "question": "14 − 7",
        "answer": 7,
        "wrong": 9
      }
    ]
  },
  {
    "id": 18,
    "difficulty": 2,
    "steps": [
      {
        "question": "10 + 5",
        "answer": 15,
        "wrong": 14
      },
      {
        "question": "12 − 9",
        "answer": 3,
        "wrong": 1
      },
      {
        "question": "29 − 7",
        "answer": 22,
        "wrong": 21
      },
      {
        "question": "25 − 3",
        "answer": 22,
        "wrong": 21
      }
    ]
  },
  {
    "id": 19,
    "difficulty": 2,
    "steps": [
      {
        "question": "30 − 3",
        "answer": 27,
        "wrong": 24
      },
      {
        "question": "26 − 7",
        "answer": 19,
        "wrong": 22
      },
      {
        "question": "26 − 3",
        "answer": 23,
        "wrong": 25
      },
      {
        "question": "28 − 1",
        "answer": 27,
        "wrong": 30
      }
    ]
  },
  {
    "id": 20,
    "difficulty": 2,
    "steps": [
      {
        "question": "30 − 4",
        "answer": 26,
        "wrong": 23
      },
      {
        "question": "14 + 6",
        "answer": 20,
        "wrong": 17
      },
      {
        "question": "24 + 9",
        "answer": 33,
        "wrong": 30
      },
      {
        "question": "30 − 9",
        "answer": 21,
        "wrong": 24
      }
    ]
  },
  {
    "id": 21,
    "difficulty": 3,
    "steps": [
      {
        "question": "5 × 9",
        "answer": 45,
        "wrong": 44
      },
      {
        "question": "2 × 9",
        "answer": 18,
        "wrong": 15
      },
      {
        "question": "3 × 3",
        "answer": 9,
        "wrong": 12
      },
      {
        "question": "9 × 6",
        "answer": 54,
        "wrong": 51
      },
      {
        "question": "6 × 5",
        "answer": 30,
        "wrong": 33
      }
    ]
  },
  {
    "id": 22,
    "difficulty": 3,
    "steps": [
      {
        "question": "5 × 5",
        "answer": 25,
        "wrong": 28
      },
      {
        "question": "9 × 9",
        "answer": 81,
        "wrong": 82
      },
      {
        "question": "3 × 9",
        "answer": 27,
        "wrong": 30
      },
      {
        "question": "6 × 2",
        "answer": 12,
        "wrong": 14
      },
      {
        "question": "5 × 3",
        "answer": 15,
        "wrong": 17
      }
    ]
  },
  {
    "id": 23,
    "difficulty": 3,
    "steps": [
      {
        "question": "4 × 7",
        "answer": 28,
        "wrong": 27
      },
      {
        "question": "6 × 4",
        "answer": 24,
        "wrong": 21
      },
      {
        "question": "9 × 2",
        "answer": 18,
        "wrong": 19
      },
      {
        "question": "6 × 3",
        "answer": 18,
        "wrong": 21
      },
      {
        "question": "5 × 9",
        "answer": 45,
        "wrong": 44
      }
    ]
  },
  {
    "id": 24,
    "difficulty": 3,
    "steps": [
      {
        "question": "6 × 9",
        "answer": 54,
        "wrong": 55
      },
      {
        "question": "9 × 3",
        "answer": 27,
        "wrong": 29
      },
      {
        "question": "5 × 6",
        "answer": 30,
        "wrong": 27
      },
      {
        "question": "9 × 2",
        "answer": 18,
        "wrong": 17
      },
      {
        "question": "9 × 3",
        "answer": 27,
        "wrong": 29
      }
    ]
  },
  {
    "id": 25,
    "difficulty": 3,
    "steps": [
      {
        "question": "9 × 6",
        "answer": 54,
        "wrong": 55
      },
      {
        "question": "5 × 5",
        "answer": 25,
        "wrong": 22
      },
      {
        "question": "3 × 4",
        "answer": 12,
        "wrong": 15
      },
      {
        "question": "6 × 7",
        "answer": 42,
        "wrong": 40
      },
      {
        "question": "6 × 3",
        "answer": 18,
        "wrong": 21
      }
    ]
  },
  {
    "id": 26,
    "difficulty": 3,
    "steps": [
      {
        "question": "7 × 5",
        "answer": 35,
        "wrong": 36
      },
      {
        "question": "9 × 8",
        "answer": 72,
        "wrong": 69
      },
      {
        "question": "4 × 2",
        "answer": 8,
        "wrong": 9
      },
      {
        "question": "9 × 8",
        "answer": 72,
        "wrong": 71
      },
      {
        "question": "4 × 8",
        "answer": 32,
        "wrong": 31
      }
    ]
  },
  {
    "id": 27,
    "difficulty": 3,
    "steps": [
      {
        "question": "8 × 7",
        "answer": 56,
        "wrong": 53
      },
      {
        "question": "7 × 2",
        "answer": 14,
        "wrong": 13
      },
      {
        "question": "7 × 8",
        "answer": 56,
        "wrong": 53
      },
      {
        "question": "5 × 2",
        "answer": 10,
        "wrong": 13
      },
      {
        "question": "6 × 6",
        "answer": 36,
        "wrong": 35
      }
    ]
  },
  {
    "id": 28,
    "difficulty": 3,
    "steps": [
      {
        "question": "3 × 8",
        "answer": 24,
        "wrong": 25
      },
      {
        "question": "3 × 7",
        "answer": 21,
        "wrong": 22
      },
      {
        "question": "6 × 2",
        "answer": 12,
        "wrong": 11
      },
      {
        "question": "3 × 2",
        "answer": 6,
        "wrong": 9
      },
      {
        "question": "6 × 4",
        "answer": 24,
        "wrong": 22
      }
    ]
  },
  {
    "id": 29,
    "difficulty": 3,
    "steps": [
      {
        "question": "6 × 8",
        "answer": 48,
        "wrong": 50
      },
      {
        "question": "7 × 5",
        "answer": 35,
        "wrong": 34
      },
      {
        "question": "8 × 2",
        "answer": 16,
        "wrong": 19
      },
      {
        "question": "8 × 5",
        "answer": 40,
        "wrong": 43
      },
      {
        "question": "3 × 2",
        "answer": 6,
        "wrong": 9
      }
    ]
  },
  {
    "id": 30,
    "difficulty": 3,
    "steps": [
      {
        "question": "8 × 9",
        "answer": 72,
        "wrong": 74
      },
      {
        "question": "4 × 6",
        "answer": 24,
        "wrong": 25
      },
      {
        "question": "2 × 4",
        "answer": 8,
        "wrong": 6
      },
      {
        "question": "9 × 8",
        "answer": 72,
        "wrong": 71
      },
      {
        "question": "6 × 6",
        "answer": 36,
        "wrong": 35
      }
    ]
  }
];
