import { Exercise } from "./types";

export const multiplications2ChiffresExercises: Exercise[] = [
  {
    "id": 1,
    "type": "qcm",
    "difficulty": 1,
    "question": "12 × 2 = ?",
    "options": [
      23,
      24,
      25,
      26
    ],
    "answer": 24
  },
  {
    "id": 2,
    "type": "qcm",
    "difficulty": 1,
    "question": "11 × 3 = ?",
    "options": [
      32,
      33,
      34,
      35
    ],
    "answer": 33
  },
  {
    "id": 3,
    "type": "qcm",
    "difficulty": 1,
    "question": "21 × 4 = ?",
    "options": [
      83,
      84,
      85,
      86
    ],
    "answer": 84
  },
  {
    "id": 4,
    "type": "qcm",
    "difficulty": 1,
    "question": "13 × 2 = ?",
    "options": [
      25,
      26,
      27,
      28
    ],
    "answer": 26
  },
  {
    "id": 5,
    "type": "qcm",
    "difficulty": 1,
    "question": "22 × 3 = ?",
    "options": [
      65,
      66,
      67,
      68
    ],
    "answer": 66
  },
  {
    "id": 6,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "14 × 5 = __",
    "answer": "70"
  },
  {
    "id": 7,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "23 × 4 = __",
    "answer": "92"
  },
  {
    "id": 8,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "32 × 3 = __",
    "answer": "96"
  },
  {
    "id": 9,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "16 × 5 = __",
    "answer": "80"
  },
  {
    "id": 10,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "25 × 4 = __",
    "answer": "100"
  },
  {
    "id": 11,
    "type": "qcm",
    "difficulty": 3,
    "question": "24 × 12 = ?",
    "options": [
      287,
      288,
      289,
      290
    ],
    "answer": 288,
    "steps": [
      {
        "operation": "24 × 2 = 48",
        "description": "Je multiplie par les unités"
      },
      {
        "operation": "24 × 10 = 240",
        "description": "Puis par les dizaines"
      },
      {
        "operation": "48 + 240 = 288",
        "description": "J'additionne les deux résultats"
      }
    ]
  },
  {
    "id": 12,
    "type": "qcm",
    "difficulty": 3,
    "question": "31 × 13 = ?",
    "options": [
      402,
      403,
      404,
      405
    ],
    "answer": 403,
    "steps": [
      {
        "operation": "31 × 3 = 93",
        "description": "Je multiplie par les unités"
      },
      {
        "operation": "31 × 10 = 310",
        "description": "Puis par les dizaines"
      },
      {
        "operation": "93 + 310 = 403",
        "description": "J'additionne les deux résultats"
      }
    ]
  },
  {
    "id": 13,
    "type": "qcm",
    "difficulty": 3,
    "question": "15 × 14 = ?",
    "options": [
      209,
      210,
      211,
      212
    ],
    "answer": 210,
    "steps": [
      {
        "operation": "15 × 4 = 60",
        "description": "Je multiplie par les unités"
      },
      {
        "operation": "15 × 10 = 150",
        "description": "Puis par les dizaines"
      },
      {
        "operation": "60 + 150 = 210",
        "description": "J'additionne les deux résultats"
      }
    ]
  },
  {
    "id": 14,
    "type": "qcm",
    "difficulty": 3,
    "question": "23 × 21 = ?",
    "options": [
      482,
      483,
      484,
      485
    ],
    "answer": 483,
    "steps": [
      {
        "operation": "23 × 1 = 23",
        "description": "Je multiplie par les unités"
      },
      {
        "operation": "23 × 20 = 460",
        "description": "Puis par les dizaines"
      },
      {
        "operation": "23 + 460 = 483",
        "description": "J'additionne les deux résultats"
      }
    ]
  },
  {
    "id": 15,
    "type": "qcm",
    "difficulty": 3,
    "question": "34 × 12 = ?",
    "options": [
      407,
      408,
      409,
      410
    ],
    "answer": 408,
    "steps": [
      {
        "operation": "34 × 2 = 68",
        "description": "Je multiplie par les unités"
      },
      {
        "operation": "34 × 10 = 340",
        "description": "Puis par les dizaines"
      },
      {
        "operation": "68 + 340 = 408",
        "description": "J'additionne les deux résultats"
      }
    ]
  },
  {
    "id": 16,
    "type": "qcm",
    "difficulty": 3,
    "question": "45 × 11 = ?",
    "options": [
      494,
      495,
      496,
      497
    ],
    "answer": 495,
    "steps": [
      {
        "operation": "45 × 1 = 45",
        "description": "Je multiplie par les unités"
      },
      {
        "operation": "45 × 10 = 450",
        "description": "Puis par les dizaines"
      },
      {
        "operation": "45 + 450 = 495",
        "description": "J'additionne les deux résultats"
      }
    ]
  }
];
