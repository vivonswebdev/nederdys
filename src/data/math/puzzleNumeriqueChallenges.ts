export interface PuzzleNumeriqueChallenge {
  id: number;
  difficulty: 1 | 2 | 3;
  emoji: string;
  label: string;
  /** Ordre correct attendu (croissant). */
  tiles: number[];
}

/** Puzzle Numérique — replacer les pièces dans l'ordre croissant. */
export const puzzleNumeriqueChallenges: PuzzleNumeriqueChallenge[] = [
  {
    "id": 1,
    "difficulty": 1,
    "emoji": "🐸",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 2,
    "difficulty": 1,
    "emoji": "🦋",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 3,
    "difficulty": 1,
    "emoji": "🌻",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 4,
    "difficulty": 1,
    "emoji": "🐸",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 5,
    "difficulty": 1,
    "emoji": "🦋",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 6,
    "difficulty": 1,
    "emoji": "🌻",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 7,
    "difficulty": 1,
    "emoji": "🐸",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 8,
    "difficulty": 1,
    "emoji": "🦋",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 9,
    "difficulty": 1,
    "emoji": "🌻",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 10,
    "difficulty": 1,
    "emoji": "🐸",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4
    ]
  },
  {
    "id": 11,
    "difficulty": 2,
    "emoji": "🚀",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 12,
    "difficulty": 2,
    "emoji": "🐙",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 13,
    "difficulty": 2,
    "emoji": "🍕",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 14,
    "difficulty": 2,
    "emoji": "🚀",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 15,
    "difficulty": 2,
    "emoji": "🐙",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 16,
    "difficulty": 2,
    "emoji": "🍕",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 17,
    "difficulty": 2,
    "emoji": "🚀",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 18,
    "difficulty": 2,
    "emoji": "🐙",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 19,
    "difficulty": 2,
    "emoji": "🍕",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 20,
    "difficulty": 2,
    "emoji": "🚀",
    "label": "Ordre croissant",
    "tiles": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ]
  },
  {
    "id": 21,
    "difficulty": 3,
    "emoji": "🦁",
    "label": "Multiples de 3",
    "tiles": [
      3,
      6,
      9,
      12,
      15,
      18,
      21,
      24,
      27
    ]
  },
  {
    "id": 22,
    "difficulty": 3,
    "emoji": "🌈",
    "label": "Multiples de 2",
    "tiles": [
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18
    ]
  },
  {
    "id": 23,
    "difficulty": 3,
    "emoji": "🐳",
    "label": "Multiples de 2",
    "tiles": [
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18
    ]
  },
  {
    "id": 24,
    "difficulty": 3,
    "emoji": "🦁",
    "label": "Multiples de 5",
    "tiles": [
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45
    ]
  },
  {
    "id": 25,
    "difficulty": 3,
    "emoji": "🌈",
    "label": "Multiples de 3",
    "tiles": [
      3,
      6,
      9,
      12,
      15,
      18,
      21,
      24,
      27
    ]
  },
  {
    "id": 26,
    "difficulty": 3,
    "emoji": "🐳",
    "label": "Multiples de 5",
    "tiles": [
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45
    ]
  },
  {
    "id": 27,
    "difficulty": 3,
    "emoji": "🦁",
    "label": "Multiples de 2",
    "tiles": [
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18
    ]
  },
  {
    "id": 28,
    "difficulty": 3,
    "emoji": "🌈",
    "label": "Multiples de 2",
    "tiles": [
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18
    ]
  },
  {
    "id": 29,
    "difficulty": 3,
    "emoji": "🐳",
    "label": "Multiples de 3",
    "tiles": [
      3,
      6,
      9,
      12,
      15,
      18,
      21,
      24,
      27
    ]
  },
  {
    "id": 30,
    "difficulty": 3,
    "emoji": "🦁",
    "label": "Multiples de 3",
    "tiles": [
      3,
      6,
      9,
      12,
      15,
      18,
      21,
      24,
      27
    ]
  }
];
