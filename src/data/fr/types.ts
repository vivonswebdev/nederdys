/**
 * Format plat commun aux 16 jeux de français (même esprit que les données NL
 * et Maths) : un défi = un énoncé, 4 options, une bonne réponse, un niveau.
 */
export interface FrChallenge {
  id: number;
  /** Énoncé affiché (mot, phrase, emoji-image, syllabes…). */
  prompt: string;
  /** Aide/consigne courte affichée sous l'énoncé. */
  hint?: string;
  options: string[];
  correctAnswer: string;
  /** Texte lu à voix haute en français (fr-BE). */
  speak: string;
  difficulty: 1 | 2 | 3;
}
