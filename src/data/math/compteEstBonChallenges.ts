export interface CompteEstBonChallenge {
  id: number;
  difficulty: 1 | 2 | 3;
  numbers: number[];
  target: number;
  operators: string[];
}

export const compteEstBonChallenges: CompteEstBonChallenge[] = [
  {
    "id": 1,
    "difficulty": 1,
    "numbers": [
      1,
      1,
      4,
      4
    ],
    "target": 6,
    "operators": [
      "+"
    ]
  },
  {
    "id": 2,
    "difficulty": 1,
    "numbers": [
      1,
      8,
      7,
      7
    ],
    "target": 16,
    "operators": [
      "+"
    ]
  },
  {
    "id": 3,
    "difficulty": 1,
    "numbers": [
      7,
      2,
      10,
      4
    ],
    "target": 19,
    "operators": [
      "+"
    ]
  },
  {
    "id": 4,
    "difficulty": 1,
    "numbers": [
      5,
      6,
      2,
      5
    ],
    "target": 13,
    "operators": [
      "+"
    ]
  },
  {
    "id": 5,
    "difficulty": 1,
    "numbers": [
      6,
      1,
      7,
      2
    ],
    "target": 14,
    "operators": [
      "+"
    ]
  },
  {
    "id": 6,
    "difficulty": 1,
    "numbers": [
      3,
      4,
      2,
      1
    ],
    "target": 9,
    "operators": [
      "+"
    ]
  },
  {
    "id": 7,
    "difficulty": 2,
    "numbers": [
      1,
      8,
      13,
      8
    ],
    "target": 4,
    "operators": [
      "+",
      "-"
    ]
  },
  {
    "id": 8,
    "difficulty": 2,
    "numbers": [
      3,
      11,
      9,
      4
    ],
    "target": 9,
    "operators": [
      "+",
      "-"
    ]
  },
  {
    "id": 9,
    "difficulty": 2,
    "numbers": [
      8,
      9,
      4,
      12
    ],
    "target": 25,
    "operators": [
      "+",
      "-"
    ]
  },
  {
    "id": 10,
    "difficulty": 2,
    "numbers": [
      13,
      3,
      7,
      11
    ],
    "target": 20,
    "operators": [
      "+",
      "-"
    ]
  },
  {
    "id": 11,
    "difficulty": 2,
    "numbers": [
      7,
      2,
      7,
      7
    ],
    "target": 9,
    "operators": [
      "+",
      "-"
    ]
  },
  {
    "id": 12,
    "difficulty": 2,
    "numbers": [
      4,
      1,
      5,
      14
    ],
    "target": 14,
    "operators": [
      "+",
      "-"
    ]
  },
  {
    "id": 13,
    "difficulty": 3,
    "numbers": [
      19,
      10,
      1,
      7
    ],
    "target": 58,
    "operators": [
      "+",
      "-",
      "×"
    ]
  },
  {
    "id": 14,
    "difficulty": 3,
    "numbers": [
      6,
      13,
      20,
      21
    ],
    "target": 38,
    "operators": [
      "+",
      "-",
      "×"
    ]
  },
  {
    "id": 15,
    "difficulty": 3,
    "numbers": [
      19,
      4,
      2,
      5
    ],
    "target": 46,
    "operators": [
      "+",
      "-",
      "×"
    ]
  },
  {
    "id": 16,
    "difficulty": 3,
    "numbers": [
      7,
      15,
      9,
      1
    ],
    "target": 44,
    "operators": [
      "+",
      "-",
      "×"
    ]
  },
  {
    "id": 17,
    "difficulty": 3,
    "numbers": [
      25,
      20,
      11,
      10
    ],
    "target": 90,
    "operators": [
      "+",
      "-",
      "×"
    ]
  },
  {
    "id": 18,
    "difficulty": 3,
    "numbers": [
      13,
      3,
      3,
      3
    ],
    "target": 32,
    "operators": [
      "+",
      "-",
      "×"
    ]
  }
];
