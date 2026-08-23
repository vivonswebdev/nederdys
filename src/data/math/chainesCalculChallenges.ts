export interface ChaineStep {
  op: string;
  value: number;
  result: number;
}

export interface ChaineCalculChallenge {
  id: number;
  difficulty: 1 | 2 | 3;
  start: number;
  steps: ChaineStep[];
  answer: number;
}

export const chainesCalculChallenges: ChaineCalculChallenge[] = [
  {
    "id": 1,
    "difficulty": 1,
    "start": 5,
    "steps": [
      {
        "op": "+",
        "value": 2,
        "result": 7
      },
      {
        "op": "+",
        "value": 1,
        "result": 8
      }
    ],
    "answer": 8
  },
  {
    "id": 2,
    "difficulty": 1,
    "start": 7,
    "steps": [
      {
        "op": "+",
        "value": 3,
        "result": 10
      },
      {
        "op": "-",
        "value": 1,
        "result": 9
      }
    ],
    "answer": 9
  },
  {
    "id": 3,
    "difficulty": 1,
    "start": 4,
    "steps": [
      {
        "op": "-",
        "value": 1,
        "result": 3
      },
      {
        "op": "+",
        "value": 2,
        "result": 5
      }
    ],
    "answer": 5
  },
  {
    "id": 4,
    "difficulty": 1,
    "start": 8,
    "steps": [
      {
        "op": "+",
        "value": 2,
        "result": 10
      },
      {
        "op": "+",
        "value": 2,
        "result": 12
      }
    ],
    "answer": 12
  },
  {
    "id": 5,
    "difficulty": 1,
    "start": 6,
    "steps": [
      {
        "op": "+",
        "value": 2,
        "result": 8
      },
      {
        "op": "+",
        "value": 2,
        "result": 10
      }
    ],
    "answer": 10
  },
  {
    "id": 6,
    "difficulty": 1,
    "start": 5,
    "steps": [
      {
        "op": "+",
        "value": 2,
        "result": 7
      },
      {
        "op": "+",
        "value": 2,
        "result": 9
      }
    ],
    "answer": 9
  },
  {
    "id": 7,
    "difficulty": 2,
    "start": 14,
    "steps": [
      {
        "op": "-",
        "value": 4,
        "result": 10
      },
      {
        "op": "×",
        "value": 2,
        "result": 20
      },
      {
        "op": "+",
        "value": 5,
        "result": 25
      }
    ],
    "answer": 25
  },
  {
    "id": 8,
    "difficulty": 2,
    "start": 15,
    "steps": [
      {
        "op": "+",
        "value": 5,
        "result": 20
      },
      {
        "op": "+",
        "value": 5,
        "result": 25
      },
      {
        "op": "+",
        "value": 5,
        "result": 30
      }
    ],
    "answer": 30
  },
  {
    "id": 9,
    "difficulty": 2,
    "start": 3,
    "steps": [
      {
        "op": "×",
        "value": 2,
        "result": 6
      },
      {
        "op": "+",
        "value": 10,
        "result": 16
      },
      {
        "op": "-",
        "value": 2,
        "result": 14
      }
    ],
    "answer": 14
  },
  {
    "id": 10,
    "difficulty": 2,
    "start": 14,
    "steps": [
      {
        "op": "+",
        "value": 10,
        "result": 24
      },
      {
        "op": "-",
        "value": 4,
        "result": 20
      },
      {
        "op": "×",
        "value": 2,
        "result": 40
      }
    ],
    "answer": 40
  },
  {
    "id": 11,
    "difficulty": 2,
    "start": 17,
    "steps": [
      {
        "op": "+",
        "value": 10,
        "result": 27
      },
      {
        "op": "×",
        "value": 2,
        "result": 54
      },
      {
        "op": "-",
        "value": 2,
        "result": 52
      }
    ],
    "answer": 52
  },
  {
    "id": 12,
    "difficulty": 2,
    "start": 4,
    "steps": [
      {
        "op": "-",
        "value": 2,
        "result": 2
      },
      {
        "op": "-",
        "value": 2,
        "result": 0
      },
      {
        "op": "+",
        "value": 4,
        "result": 4
      }
    ],
    "answer": 4
  },
  {
    "id": 13,
    "difficulty": 3,
    "start": 19,
    "steps": [
      {
        "op": "-",
        "value": 9,
        "result": 10
      },
      {
        "op": "+",
        "value": 25,
        "result": 35
      },
      {
        "op": "+",
        "value": 25,
        "result": 60
      },
      {
        "op": "+",
        "value": 12,
        "result": 72
      }
    ],
    "answer": 72
  },
  {
    "id": 14,
    "difficulty": 3,
    "start": 10,
    "steps": [
      {
        "op": "-",
        "value": 7,
        "result": 3
      },
      {
        "op": "+",
        "value": 7,
        "result": 10
      },
      {
        "op": "-",
        "value": 9,
        "result": 1
      },
      {
        "op": "+",
        "value": 12,
        "result": 13
      }
    ],
    "answer": 13
  },
  {
    "id": 15,
    "difficulty": 3,
    "start": 4,
    "steps": [
      {
        "op": "×",
        "value": 2,
        "result": 8
      },
      {
        "op": "×",
        "value": 3,
        "result": 24
      },
      {
        "op": "×",
        "value": 3,
        "result": 72
      },
      {
        "op": "-",
        "value": 7,
        "result": 65
      }
    ],
    "answer": 65
  },
  {
    "id": 16,
    "difficulty": 3,
    "start": 3,
    "steps": [
      {
        "op": "+",
        "value": 12,
        "result": 15
      },
      {
        "op": "-",
        "value": 7,
        "result": 8
      },
      {
        "op": "×",
        "value": 2,
        "result": 16
      },
      {
        "op": "×",
        "value": 2,
        "result": 32
      }
    ],
    "answer": 32
  },
  {
    "id": 17,
    "difficulty": 3,
    "start": 18,
    "steps": [
      {
        "op": "+",
        "value": 25,
        "result": 43
      },
      {
        "op": "-",
        "value": 7,
        "result": 36
      },
      {
        "op": "+",
        "value": 12,
        "result": 48
      },
      {
        "op": "×",
        "value": 2,
        "result": 96
      }
    ],
    "answer": 96
  },
  {
    "id": 18,
    "difficulty": 3,
    "start": 6,
    "steps": [
      {
        "op": "×",
        "value": 3,
        "result": 18
      },
      {
        "op": "×",
        "value": 2,
        "result": 36
      },
      {
        "op": "-",
        "value": 9,
        "result": 27
      },
      {
        "op": "-",
        "value": 9,
        "result": 18
      }
    ],
    "answer": 18
  }
];
