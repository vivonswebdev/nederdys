export interface BatailleChallenge {
  id: number;
  difficulty: 1 | 2 | 3;
  left: string;
  leftValue: number;
  right: string;
  rightValue: number;
  timeLimit: number;
}

export const batailleNombresChallenges: BatailleChallenge[] = [
  {
    "id": 1,
    "difficulty": 1,
    "left": "9 + 6",
    "leftValue": 15,
    "right": "1 + 3",
    "rightValue": 4,
    "timeLimit": 15
  },
  {
    "id": 2,
    "difficulty": 1,
    "left": "6 + 6",
    "leftValue": 12,
    "right": "2 + 8",
    "rightValue": 10,
    "timeLimit": 15
  },
  {
    "id": 3,
    "difficulty": 1,
    "left": "2 + 7",
    "leftValue": 9,
    "right": "1 + 8",
    "rightValue": 9,
    "timeLimit": 15
  },
  {
    "id": 4,
    "difficulty": 1,
    "left": "1 + 7",
    "leftValue": 8,
    "right": "7 + 1",
    "rightValue": 8,
    "timeLimit": 15
  },
  {
    "id": 5,
    "difficulty": 1,
    "left": "2 + 2",
    "leftValue": 4,
    "right": "2 + 2",
    "rightValue": 4,
    "timeLimit": 15
  },
  {
    "id": 6,
    "difficulty": 1,
    "left": "5 + 7",
    "leftValue": 12,
    "right": "6 + 7",
    "rightValue": 13,
    "timeLimit": 15
  },
  {
    "id": 7,
    "difficulty": 2,
    "left": "19 + 8",
    "leftValue": 27,
    "right": "7 - 9",
    "rightValue": -2,
    "timeLimit": 12
  },
  {
    "id": 8,
    "difficulty": 2,
    "left": "5 - 5",
    "leftValue": 0,
    "right": "20 + 1",
    "rightValue": 21,
    "timeLimit": 12
  },
  {
    "id": 9,
    "difficulty": 2,
    "left": "8 - 8",
    "leftValue": 0,
    "right": "20 - 5",
    "rightValue": 15,
    "timeLimit": 12
  },
  {
    "id": 10,
    "difficulty": 2,
    "left": "16 + 5",
    "leftValue": 21,
    "right": "11 + 9",
    "rightValue": 20,
    "timeLimit": 12
  },
  {
    "id": 11,
    "difficulty": 2,
    "left": "15 + 8",
    "leftValue": 23,
    "right": "12 + 6",
    "rightValue": 18,
    "timeLimit": 12
  },
  {
    "id": 12,
    "difficulty": 2,
    "left": "13 - 4",
    "leftValue": 9,
    "right": "11 + 4",
    "rightValue": 15,
    "timeLimit": 12
  },
  {
    "id": 13,
    "difficulty": 3,
    "left": "7 × 5",
    "leftValue": 35,
    "right": "22 - 7",
    "rightValue": 15,
    "timeLimit": 10
  },
  {
    "id": 14,
    "difficulty": 3,
    "left": "27 - 6",
    "leftValue": 21,
    "right": "9 × 9",
    "rightValue": 81,
    "timeLimit": 10
  },
  {
    "id": 15,
    "difficulty": 3,
    "left": "5 × 8",
    "leftValue": 40,
    "right": "59 - 7",
    "rightValue": 52,
    "timeLimit": 10
  },
  {
    "id": 16,
    "difficulty": 3,
    "left": "9 × 7",
    "leftValue": 63,
    "right": "22 - 6",
    "rightValue": 16,
    "timeLimit": 10
  },
  {
    "id": 17,
    "difficulty": 3,
    "left": "6 × 7",
    "leftValue": 42,
    "right": "2 × 4",
    "rightValue": 8,
    "timeLimit": 10
  },
  {
    "id": 18,
    "difficulty": 3,
    "left": "37 - 2",
    "leftValue": 35,
    "right": "60 - 4",
    "rightValue": 56,
    "timeLimit": 10
  }
];
