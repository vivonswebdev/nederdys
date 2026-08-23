export type ExerciseType = "qcm" | "fill_blank" | "true_false" | "order" | "match";

export type Difficulty = 1 | 2 | 3;

interface BaseExercise {
  id: number;
  difficulty: Difficulty;
  question: string;
  /** Aide visuelle (emoji / schéma textuel) — niveaux faciles uniquement. */
  visualAid?: string;
  /** Étapes de résolution montrées après la réponse (problèmes multi-étapes). */
  steps?: { operation: string; description: string }[];
  /** Audio nl-NL optionnel (chapitres néerlandais). */
  audioUrl?: string;
}

export interface QcmExercise extends BaseExercise {
  type: "qcm";
  options: (string | number)[];
  answer: string | number;
}

export interface FillBlankExercise extends BaseExercise {
  type: "fill_blank";
  answer: string;
}

export interface TrueFalseExercise extends BaseExercise {
  type: "true_false";
  answer: boolean;
}

export interface OrderExercise extends BaseExercise {
  type: "order";
  /** Ordre correct attendu. */
  answer: string[];
}

export interface MatchExercise extends BaseExercise {
  type: "match";
  pairs: { left: string; right: string }[];
}

export type Exercise =
  | QcmExercise
  | FillBlankExercise
  | TrueFalseExercise
  | OrderExercise
  | MatchExercise;
