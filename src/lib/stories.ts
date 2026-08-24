import { speakNlBe, speakFrBe } from "@/lib/bilingual";

export interface StoryChoice {
  id: string;
  /** Libellé néerlandais (court). */
  label: string;
  /** Traduction française affichée sous le NL. */
  labelFr: string;
  audioUrl?: string;
  isCorrect: boolean;
}

export interface StoryScene {
  id: string;
  /** Phrase néerlandaise de la scène. */
  text: string;
  /** Sous-titre français. */
  textFr: string;
  /** Narration nl-BE enregistrée ; repli sur la synthèse vocale si absente. */
  audioUrl?: string;
  /** Emoji ou image. */
  image: string;
  choice?: {
    question: string;
    questionFr: string;
    questionAudioUrl?: string;
    options: StoryChoice[];
  };
}

export interface Story {
  id: string;
  title: string;
  titleFr: string;
  emoji: string;
  subject: "nl";
  scenes: StoryScene[];
}

/** XP accordée pour une histoire terminée (via record_game_completion). */
export const STORY_XP = 15;

/**
 * Lit un texte néerlandais : MP3 si disponible, sinon synthèse vocale nl-BE.
 * `fr` optionnel : lu après le néerlandais (même esprit bilingue qu'ailleurs).
 */
export function speakStory(nl: string, url?: string, fr?: string) {
  if (url) {
    const audio = new Audio(url);
    audio.onended = () => {
      if (fr) window.setTimeout(() => speakFrBe(fr), 400);
    };
    audio.play().catch(() => {
      speakNlBe(nl);
      if (fr) window.setTimeout(() => speakFrBe(fr), 2200);
    });
    return;
  }
  speakNlBe(nl);
  if (fr) window.setTimeout(() => speakFrBe(fr), 2200);
}
