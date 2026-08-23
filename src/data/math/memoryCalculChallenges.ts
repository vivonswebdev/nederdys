export interface MemoryCalculPair {
  operation: string;
  result: number;
}

export interface MemoryCalculChallenge {
  id: number;
  difficulty: 1 | 2 | 3;
  pairs: MemoryCalculPair[];
}

/** Memory Calcul — associer une opération à son résultat. */
export const memoryCalculChallenges: MemoryCalculChallenge[] = [
  {
    "id": 1,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "6 + 3",
        "result": 9
      },
      {
        "operation": "7 + 1",
        "result": 8
      },
      {
        "operation": "2 + 9",
        "result": 11
      }
    ]
  },
  {
    "id": 2,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "2 + 6",
        "result": 8
      },
      {
        "operation": "1 + 9",
        "result": 10
      },
      {
        "operation": "4 + 1",
        "result": 5
      }
    ]
  },
  {
    "id": 3,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "2 + 7",
        "result": 9
      },
      {
        "operation": "4 + 2",
        "result": 6
      },
      {
        "operation": "9 + 7",
        "result": 16
      }
    ]
  },
  {
    "id": 4,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "1 + 2",
        "result": 3
      },
      {
        "operation": "4 + 1",
        "result": 5
      },
      {
        "operation": "7 + 1",
        "result": 8
      }
    ]
  },
  {
    "id": 5,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "4 + 1",
        "result": 5
      },
      {
        "operation": "9 + 3",
        "result": 12
      },
      {
        "operation": "2 + 5",
        "result": 7
      }
    ]
  },
  {
    "id": 6,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "9 + 3",
        "result": 12
      },
      {
        "operation": "2 + 4",
        "result": 6
      },
      {
        "operation": "6 + 2",
        "result": 8
      }
    ]
  },
  {
    "id": 7,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "9 + 2",
        "result": 11
      },
      {
        "operation": "1 + 4",
        "result": 5
      },
      {
        "operation": "8 + 9",
        "result": 17
      }
    ]
  },
  {
    "id": 8,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "7 + 6",
        "result": 13
      },
      {
        "operation": "8 + 8",
        "result": 16
      },
      {
        "operation": "6 + 5",
        "result": 11
      }
    ]
  },
  {
    "id": 9,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "4 + 3",
        "result": 7
      },
      {
        "operation": "4 + 2",
        "result": 6
      },
      {
        "operation": "5 + 9",
        "result": 14
      }
    ]
  },
  {
    "id": 10,
    "difficulty": 1,
    "pairs": [
      {
        "operation": "8 + 6",
        "result": 14
      },
      {
        "operation": "8 + 5",
        "result": 13
      },
      {
        "operation": "2 + 2",
        "result": 4
      }
    ]
  },
  {
    "id": 11,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "8 × 4",
        "result": 32
      },
      {
        "operation": "7 × 4",
        "result": 28
      },
      {
        "operation": "9 × 8",
        "result": 72
      },
      {
        "operation": "2 × 3",
        "result": 6
      }
    ]
  },
  {
    "id": 12,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "7 × 7",
        "result": 49
      },
      {
        "operation": "7 × 9",
        "result": 63
      },
      {
        "operation": "9 × 3",
        "result": 27
      },
      {
        "operation": "3 × 6",
        "result": 18
      }
    ]
  },
  {
    "id": 13,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "9 × 3",
        "result": 27
      },
      {
        "operation": "2 × 6",
        "result": 12
      },
      {
        "operation": "9 × 6",
        "result": 54
      },
      {
        "operation": "8 × 7",
        "result": 56
      }
    ]
  },
  {
    "id": 14,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "2 × 9",
        "result": 18
      },
      {
        "operation": "7 × 4",
        "result": 28
      },
      {
        "operation": "3 × 9",
        "result": 27
      },
      {
        "operation": "2 × 5",
        "result": 10
      }
    ]
  },
  {
    "id": 15,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "6 × 4",
        "result": 24
      },
      {
        "operation": "5 × 8",
        "result": 40
      },
      {
        "operation": "8 × 9",
        "result": 72
      },
      {
        "operation": "3 × 4",
        "result": 12
      }
    ]
  },
  {
    "id": 16,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "9 × 8",
        "result": 72
      },
      {
        "operation": "6 × 4",
        "result": 24
      },
      {
        "operation": "8 × 6",
        "result": 48
      },
      {
        "operation": "8 × 7",
        "result": 56
      }
    ]
  },
  {
    "id": 17,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "8 × 5",
        "result": 40
      },
      {
        "operation": "4 × 3",
        "result": 12
      },
      {
        "operation": "4 × 4",
        "result": 16
      },
      {
        "operation": "5 × 5",
        "result": 25
      }
    ]
  },
  {
    "id": 18,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "2 × 9",
        "result": 18
      },
      {
        "operation": "4 × 6",
        "result": 24
      },
      {
        "operation": "6 × 2",
        "result": 12
      },
      {
        "operation": "4 × 8",
        "result": 32
      }
    ]
  },
  {
    "id": 19,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "7 × 7",
        "result": 49
      },
      {
        "operation": "4 × 2",
        "result": 8
      },
      {
        "operation": "9 × 8",
        "result": 72
      },
      {
        "operation": "8 × 8",
        "result": 64
      }
    ]
  },
  {
    "id": 20,
    "difficulty": 2,
    "pairs": [
      {
        "operation": "8 × 3",
        "result": 24
      },
      {
        "operation": "9 × 8",
        "result": 72
      },
      {
        "operation": "2 × 5",
        "result": 10
      },
      {
        "operation": "3 × 5",
        "result": 15
      }
    ]
  },
  {
    "id": 21,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "24 ÷ 4",
        "result": 6
      },
      {
        "operation": "14 ÷ 2",
        "result": 7
      },
      {
        "operation": "7 × 4",
        "result": 28
      },
      {
        "operation": "10 ÷ 2",
        "result": 5
      },
      {
        "operation": "32 ÷ 8",
        "result": 4
      }
    ]
  },
  {
    "id": 22,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "5 × 7",
        "result": 35
      },
      {
        "operation": "18 ÷ 3",
        "result": 6
      },
      {
        "operation": "15 ÷ 3",
        "result": 5
      },
      {
        "operation": "8 × 7",
        "result": 56
      },
      {
        "operation": "6 × 4",
        "result": 24
      }
    ]
  },
  {
    "id": 23,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "28 ÷ 7",
        "result": 4
      },
      {
        "operation": "7 × 2",
        "result": 14
      },
      {
        "operation": "5 × 3",
        "result": 15
      },
      {
        "operation": "5 × 7",
        "result": 35
      },
      {
        "operation": "5 × 5",
        "result": 25
      }
    ]
  },
  {
    "id": 24,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "9 × 7",
        "result": 63
      },
      {
        "operation": "7 × 5",
        "result": 35
      },
      {
        "operation": "9 × 8",
        "result": 72
      },
      {
        "operation": "4 × 5",
        "result": 20
      },
      {
        "operation": "5 × 2",
        "result": 10
      }
    ]
  },
  {
    "id": 25,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "54 ÷ 6",
        "result": 9
      },
      {
        "operation": "28 ÷ 7",
        "result": 4
      },
      {
        "operation": "8 × 7",
        "result": 56
      },
      {
        "operation": "15 ÷ 3",
        "result": 5
      },
      {
        "operation": "4 × 9",
        "result": 36
      }
    ]
  },
  {
    "id": 26,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "14 ÷ 2",
        "result": 7
      },
      {
        "operation": "8 × 7",
        "result": 56
      },
      {
        "operation": "3 × 3",
        "result": 9
      },
      {
        "operation": "4 × 8",
        "result": 32
      },
      {
        "operation": "5 × 3",
        "result": 15
      }
    ]
  },
  {
    "id": 27,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "64 ÷ 8",
        "result": 8
      },
      {
        "operation": "8 × 3",
        "result": 24
      },
      {
        "operation": "16 ÷ 4",
        "result": 4
      },
      {
        "operation": "7 × 9",
        "result": 63
      },
      {
        "operation": "4 × 9",
        "result": 36
      }
    ]
  },
  {
    "id": 28,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "5 × 4",
        "result": 20
      },
      {
        "operation": "8 ÷ 2",
        "result": 4
      },
      {
        "operation": "8 × 3",
        "result": 24
      },
      {
        "operation": "4 × 8",
        "result": 32
      },
      {
        "operation": "63 ÷ 7",
        "result": 9
      }
    ]
  },
  {
    "id": 29,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "24 ÷ 4",
        "result": 6
      },
      {
        "operation": "8 × 7",
        "result": 56
      },
      {
        "operation": "8 × 8",
        "result": 64
      },
      {
        "operation": "7 × 4",
        "result": 28
      },
      {
        "operation": "7 × 2",
        "result": 14
      }
    ]
  },
  {
    "id": 30,
    "difficulty": 3,
    "pairs": [
      {
        "operation": "9 × 4",
        "result": 36
      },
      {
        "operation": "36 ÷ 4",
        "result": 9
      },
      {
        "operation": "6 × 3",
        "result": 18
      },
      {
        "operation": "5 × 9",
        "result": 45
      },
      {
        "operation": "6 ÷ 2",
        "result": 3
      }
    ]
  }
];
