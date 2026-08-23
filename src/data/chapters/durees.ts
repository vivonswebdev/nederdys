import { Exercise } from "./types";

export const dureesExercises: Exercise[] = [
  {
    "id": 1,
    "type": "qcm",
    "difficulty": 1,
    "question": "Combien de minutes dans 1 heure ?",
    "options": [
      30,
      45,
      60,
      100
    ],
    "answer": 60,
    "visualAid": "⏰"
  },
  {
    "id": 2,
    "type": "qcm",
    "difficulty": 1,
    "question": "Combien de secondes dans 1 minute ?",
    "options": [
      24,
      60,
      90,
      100
    ],
    "answer": 60,
    "visualAid": "⏰"
  },
  {
    "id": 3,
    "type": "qcm",
    "difficulty": 1,
    "question": "Combien d'heures dans une journée ?",
    "options": [
      12,
      20,
      24,
      60
    ],
    "answer": 24,
    "visualAid": "⏰"
  },
  {
    "id": 4,
    "type": "qcm",
    "difficulty": 1,
    "question": "Une demi-heure = ? minutes",
    "options": [
      15,
      20,
      30,
      60
    ],
    "answer": 30,
    "visualAid": "⏰"
  },
  {
    "id": 5,
    "type": "qcm",
    "difficulty": 1,
    "question": "Un quart d'heure = ? minutes",
    "options": [
      10,
      15,
      20,
      30
    ],
    "answer": 15,
    "visualAid": "⏰"
  },
  {
    "id": 6,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "1 h 30 min = __ minutes",
    "answer": "90"
  },
  {
    "id": 7,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "2 h = __ minutes",
    "answer": "120"
  },
  {
    "id": 8,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "120 minutes = __ heures",
    "answer": "2"
  },
  {
    "id": 9,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "45 min + 15 min = __ heure",
    "answer": "1"
  },
  {
    "id": 10,
    "type": "fill_blank",
    "difficulty": 2,
    "question": "3 h = __ minutes",
    "answer": "180"
  },
  {
    "id": 11,
    "type": "qcm",
    "difficulty": 3,
    "question": "Le film commence à 14 h 00 et dure 1 h 30. Il finit à ?",
    "options": [
      "15 h 30",
      "1 h 00",
      "2 h 00",
      "45 min"
    ],
    "answer": "15 h 30",
    "steps": [
      {
        "operation": "14 h + 1 h = 15 h",
        "description": "J'ajoute les heures"
      },
      {
        "operation": "15 h + 30 min = 15 h 30",
        "description": "J'ajoute les minutes"
      }
    ]
  },
  {
    "id": 12,
    "type": "qcm",
    "difficulty": 3,
    "question": "De 9 h 15 à 10 h 45, il s'écoule ?",
    "options": [
      "1 h 30",
      "1 h 00",
      "2 h 00",
      "45 min"
    ],
    "answer": "1 h 30",
    "steps": [
      {
        "operation": "9 h 15 → 10 h 15 = 1 h",
        "description": "Je compte les heures"
      },
      {
        "operation": "10 h 15 → 10 h 45 = 30 min",
        "description": "Puis les minutes"
      }
    ]
  },
  {
    "id": 13,
    "type": "qcm",
    "difficulty": 3,
    "question": "La récréation dure de 10 h 20 à 10 h 50 : ?",
    "options": [
      "30 min",
      "1 h 00",
      "2 h 00",
      "45 min"
    ],
    "answer": "30 min",
    "steps": [
      {
        "operation": "10 h 50 - 10 h 20 = 30 min",
        "description": "Je soustrais les minutes"
      }
    ]
  },
  {
    "id": 14,
    "type": "qcm",
    "difficulty": 3,
    "question": "Le train part à 8 h 40 et roule 2 h 20. Arrivée ?",
    "options": [
      "11 h 00",
      "1 h 00",
      "2 h 00",
      "45 min"
    ],
    "answer": "11 h 00",
    "steps": [
      {
        "operation": "8 h 40 + 2 h = 10 h 40",
        "description": "J'ajoute les heures"
      },
      {
        "operation": "10 h 40 + 20 min = 11 h 00",
        "description": "J'ajoute les minutes"
      }
    ]
  },
  {
    "id": 15,
    "type": "qcm",
    "difficulty": 3,
    "question": "De 16 h 00 à 18 h 30 : ?",
    "options": [
      "2 h 30",
      "1 h 00",
      "2 h 00",
      "45 min"
    ],
    "answer": "2 h 30",
    "steps": [
      {
        "operation": "18 h 30 - 16 h 00 = 2 h 30",
        "description": "Je calcule l'écart"
      }
    ]
  }
];
