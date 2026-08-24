export type ExerciseType = "qcm" | "fill_blank" | "true_false" | "order" | "match";

export type Difficulty = 1 | 2 | 3;

interface BaseExercise {
  id: number;
  difficulty: Difficulty;
  /** Énoncé en français. */
  question: string;
  /** Énoncé en néerlandais — affiché à côté du français pour les enfants NL. */
  questionNl?: string;
  /** Aide visuelle (emoji / schéma textuel) — niveaux faciles uniquement. */
  visualAid?: string;
  /** Étapes de résolution montrées après la réponse (problèmes multi-étapes). */
  steps?: { operation: string; description: string }[];
  /** Audio nl-BE optionnel (chapitres néerlandais). */
  audioUrl?: string;
}

export interface QcmExercise extends BaseExercise {
  type: "qcm";
  options: (string | number)[];
  /** Options en néerlandais, même ordre que `options` (affichage bilingue). */
  optionsNl?: (string | number)[];
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
