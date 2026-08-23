export interface DroiteGradueeChallenge {
  id: number;
  difficulty: 1 | 2 | 3;
  min: number;
  max: number;
  step: number;
  target: number;
  /** Écart accepté (en unités) */
  tolerance: number;
}

export const droiteGradueeChallenges: DroiteGradueeChallenge[] = [
  {
    "id": 1,
    "difficulty": 1,
    "min": 0,
    "max": 10,
    "step": 1,
    "target": 9,
    "tolerance": 1
  },
  {
    "id": 2,
    "difficulty": 1,
    "min": 0,
    "max": 10,
    "step": 1,
    "target": 3,
    "tolerance": 1
  },
  {
    "id": 3,
    "difficulty": 1,
    "min": 0,
    "max": 10,
    "step": 1,
    "target": 1,
    "tolerance": 1
  },
  {
    "id": 4,
    "difficulty": 1,
    "min": 0,
    "max": 10,
    "step": 1,
    "target": 1,
    "tolerance": 1
  },
  {
    "id": 5,
    "difficulty": 1,
    "min": 0,
    "max": 10,
    "step": 1,
    "target": 8,
    "tolerance": 1
  },
  {
    "id": 6,
    "difficulty": 1,
    "min": 0,
    "max": 10,
    "step": 1,
    "target": 6,
    "tolerance": 1
  },
  {
    "id": 7,
    "difficulty": 2,
    "min": 0,
    "max": 100,
    "step": 10,
    "target": 50,
    "tolerance": 2
  },
  {
    "id": 8,
    "difficulty": 2,
    "min": 0,
    "max": 100,
    "step": 10,
    "target": 10,
    "tolerance": 2
  },
  {
    "id": 9,
    "difficulty": 2,
    "min": 0,
    "max": 100,
    "step": 10,
    "target": 10,
    "tolerance": 2
  },
  {
    "id": 10,
    "difficulty": 2,
    "min": 0,
    "max": 100,
    "step": 10,
    "target": 20,
    "tolerance": 2
  },
  {
    "id": 11,
    "difficulty": 2,
    "min": 0,
    "max": 100,
    "step": 10,
    "target": 80,
    "tolerance": 2
  },
  {
    "id": 12,
    "difficulty": 2,
    "min": 0,
    "max": 100,
    "step": 10,
    "target": 20,
    "tolerance": 2
  },
  {
    "id": 13,
    "difficulty": 3,
    "min": 0,
    "max": 1000,
    "step": 100,
    "target": 500,
    "tolerance": 5
  },
  {
    "id": 14,
    "difficulty": 3,
    "min": 0,
    "max": 1000,
    "step": 100,
    "target": 600,
    "tolerance": 5
  },
  {
    "id": 15,
    "difficulty": 3,
    "min": 0,
    "max": 1000,
    "step": 100,
    "target": 300,
    "tolerance": 5
  },
  {
    "id": 16,
    "difficulty": 3,
    "min": 0,
    "max": 1000,
    "step": 100,
    "target": 200,
    "tolerance": 5
  },
  {
    "id": 17,
    "difficulty": 3,
    "min": 0,
    "max": 1000,
    "step": 100,
    "target": 200,
    "tolerance": 5
  },
  {
    "id": 18,
    "difficulty": 3,
    "min": 0,
    "max": 1000,
    "step": 100,
    "target": 800,
    "tolerance": 5
  }
];
