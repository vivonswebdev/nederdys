export interface TangramSlot {
  id: string;
  shape: string;
  emoji: string;
  label: string;
}

export interface TangramChallenge {
  id: number;
  difficulty: 1 | 2 | 3;
  name: string;
  emoji: string;
  slots: TangramSlot[];
}

export const tangramChallenges: TangramChallenge[] = [
  {
    "id": 1,
    "difficulty": 1,
    "name": "Le bateau",
    "emoji": "⛵",
    "slots": [
      {
        "id": "s1",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      },
      {
        "id": "s2",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s3",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      }
    ]
  },
  {
    "id": 2,
    "difficulty": 1,
    "name": "La maison",
    "emoji": "🏠",
    "slots": [
      {
        "id": "s1",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s2",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s3",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      }
    ]
  },
  {
    "id": 3,
    "difficulty": 1,
    "name": "Le chat",
    "emoji": "🐱",
    "slots": [
      {
        "id": "s1",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s2",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s3",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      }
    ]
  },
  {
    "id": 4,
    "difficulty": 1,
    "name": "L'arbre",
    "emoji": "🌳",
    "slots": [
      {
        "id": "s1",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s2",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      },
      {
        "id": "s3",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      }
    ]
  },
  {
    "id": 5,
    "difficulty": 1,
    "name": "La fusée",
    "emoji": "🚀",
    "slots": [
      {
        "id": "s1",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s2",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s3",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      }
    ]
  },
  {
    "id": 6,
    "difficulty": 1,
    "name": "Le poisson",
    "emoji": "🐟",
    "slots": [
      {
        "id": "s1",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      },
      {
        "id": "s2",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s3",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      }
    ]
  },
  {
    "id": 7,
    "difficulty": 2,
    "name": "Le renard",
    "emoji": "🦊",
    "slots": [
      {
        "id": "s1",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s2",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      },
      {
        "id": "s3",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s4",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      }
    ]
  },
  {
    "id": 8,
    "difficulty": 2,
    "name": "Le moulin",
    "emoji": "🎡",
    "slots": [
      {
        "id": "s1",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      },
      {
        "id": "s2",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s3",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s4",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      }
    ]
  },
  {
    "id": 9,
    "difficulty": 2,
    "name": "Le robot",
    "emoji": "🤖",
    "slots": [
      {
        "id": "s1",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      },
      {
        "id": "s2",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s3",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      },
      {
        "id": "s4",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      }
    ]
  },
  {
    "id": 10,
    "difficulty": 2,
    "name": "Le lapin",
    "emoji": "🐰",
    "slots": [
      {
        "id": "s1",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      },
      {
        "id": "s2",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s3",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s4",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      }
    ]
  },
  {
    "id": 11,
    "difficulty": 2,
    "name": "La montagne",
    "emoji": "⛰️",
    "slots": [
      {
        "id": "s1",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s2",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s3",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s4",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      }
    ]
  },
  {
    "id": 12,
    "difficulty": 2,
    "name": "Le camion",
    "emoji": "🚚",
    "slots": [
      {
        "id": "s1",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s2",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s3",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s4",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      }
    ]
  },
  {
    "id": 13,
    "difficulty": 3,
    "name": "Le dragon",
    "emoji": "🐉",
    "slots": [
      {
        "id": "s1",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s2",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      },
      {
        "id": "s3",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s4",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s5",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      }
    ]
  },
  {
    "id": 14,
    "difficulty": 3,
    "name": "Le château",
    "emoji": "🏰",
    "slots": [
      {
        "id": "s1",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      },
      {
        "id": "s2",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s3",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s4",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s5",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      }
    ]
  },
  {
    "id": 15,
    "difficulty": 3,
    "name": "Le paon",
    "emoji": "🦚",
    "slots": [
      {
        "id": "s1",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s2",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s3",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s4",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s5",
        "shape": "triangle-sm",
        "emoji": "🔻",
        "label": "Petit triangle"
      }
    ]
  },
  {
    "id": 16,
    "difficulty": 3,
    "name": "Le voilier",
    "emoji": "🛥️",
    "slots": [
      {
        "id": "s1",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s2",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s3",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s4",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s5",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      }
    ]
  },
  {
    "id": 17,
    "difficulty": 3,
    "name": "La licorne",
    "emoji": "🦄",
    "slots": [
      {
        "id": "s1",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s2",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      },
      {
        "id": "s3",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s4",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      },
      {
        "id": "s5",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      }
    ]
  },
  {
    "id": 18,
    "difficulty": 3,
    "name": "L'éléphant",
    "emoji": "🐘",
    "slots": [
      {
        "id": "s1",
        "shape": "circle",
        "emoji": "🟡",
        "label": "Rond"
      },
      {
        "id": "s2",
        "shape": "square",
        "emoji": "🟧",
        "label": "Carré"
      },
      {
        "id": "s3",
        "shape": "triangle",
        "emoji": "🔺",
        "label": "Grand triangle"
      },
      {
        "id": "s4",
        "shape": "parallelo",
        "emoji": "🔷",
        "label": "Losange"
      },
      {
        "id": "s5",
        "shape": "rect",
        "emoji": "🟪",
        "label": "Rectangle"
      }
    ]
  }
];
