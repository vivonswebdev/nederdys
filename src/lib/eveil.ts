import { getChildLanguage } from "@/lib/bilingual";
import { supabase } from "@/integrations/supabase/client";

/** Tout contenu Éveil est bilingue : néerlandais d'abord, français ensuite. */
export interface Bilingual {
  nl: string;
  fr: string;
}

export interface EveilActivity {
  id: string;
  name: Bilingual;
  emoji: string;
  category: "couleurs" | "motricite" | "premiers-mots" | "phrases-simples";
  description: Bilingual;
}

/** Une option de réponse Éveil est TOUJOURS visuelle — jamais un mot à lire. */
export interface EveilOption {
  id: string;
  visual: string; // emoji, image ou pastille de couleur
  audioLabel?: Bilingual; // ce que la voix dit si l'option est touchée
}

export const EVEIL_ACTIVITIES: EveilActivity[] = [
  {
    id: "arc-en-ciel",
    name: { nl: "De Regenboog", fr: "L'Arc-en-ciel" },
    emoji: "🌈",
    category: "couleurs",
    description: { nl: "Kies de juiste kleur", fr: "Touche la bonne couleur" },
  },
  {
    id: "trace-la-forme",
    name: { nl: "Teken de Vorm", fr: "Trace la Forme" },
    emoji: "✏️",
    category: "motricite",
    description: { nl: "Volg de lijn met je vinger", fr: "Suis le tracé avec ton doigt" },
  },
  {
    id: "mon-premier-mot",
    name: { nl: "Mijn Eerste Woord", fr: "Mon Premier Mot" },
    emoji: "🗣️",
    category: "premiers-mots",
    description: { nl: "Luister en zeg het woord na", fr: "Écoute et répète le mot" },
  },
  {
    id: "assemble-la-phrase",
    name: { nl: "Maak de Zin", fr: "Assemble la Phrase" },
    emoji: "🧩",
    category: "phrases-simples",
    description: { nl: "Kies de plaatjes van de zin", fr: "Choisis les images de la phrase" },
  },
  {
    id: "chasse-aux-couleurs",
    name: { nl: "Kleurenjacht", fr: "Chasse aux Couleurs" },
    emoji: "🔍",
    category: "couleurs",
    description: { nl: "Vind alles van één kleur", fr: "Trouve tous les objets d'une couleur" },
  },
  {
    id: "compte-avec-moi",
    name: { nl: "Tel met Mij", fr: "Compte avec Moi" },
    emoji: "🔢",
    category: "premiers-mots",
    description: { nl: "Tel de voorwerpen met de stem", fr: "Compte les objets avec la voix" },
  },
  {
    id: "quel-animal",
    name: { nl: "Welk Dier?", fr: "Quel Animal ?" },
    emoji: "🐾",
    category: "premiers-mots",
    description: { nl: "Hoor het geluid, raak het dier aan", fr: "Écoute le cri, touche l'animal" },
  },
  {
    id: "puzzle-formes",
    name: { nl: "Vormenpuzzel", fr: "Puzzle des Formes" },
    emoji: "🧩",
    category: "motricite",
    description: { nl: "Zet elke vorm op de juiste plaats", fr: "Place chaque forme au bon endroit" },
  },
];

export const eveilActivity = (id?: string) => EVEIL_ACTIVITIES.find((a) => a.id === id) ?? null;

function speak(text: string, lang: "nl-BE" | "fr-BE", onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.8;
  const prefix = lang.slice(0, 2);
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith(prefix));
  if (voice) utter.voice = voice;
  if (onEnd) utter.onend = () => onEnd();
  window.speechSynthesis.speak(utter);
}

/** Voix néerlandaise (Belgique). */
export function speakNl(text: string) {
  window.speechSynthesis?.cancel();
  speak(text, "nl-BE");
}

/** Voix française (Belgique). */
export function speakFr(text: string) {
  window.speechSynthesis?.cancel();
  speak(text, "fr-BE");
}

/**
 * Consigne Éveil : parlée dans la langue du profil enfant uniquement.
 * Éveil est un module d'éveil général (langue maternelle/cible), contrairement
 * aux chapitres NL où le néerlandais est la matière enseignée.
 */
export function speakBilingual(phrase: Bilingual) {
  window.speechSynthesis?.cancel();
  const fr = getChildLanguage() === "fr";
  speak(fr ? phrase.fr : phrase.nl, fr ? "fr-BE" : "nl-BE");
}

/** Félicitations bilingues réutilisées par toutes les activités. */
export const PRAISE: Bilingual = { nl: "Goed zo!", fr: "Bravo !" };
export const RETRY: Bilingual = { nl: "Probeer opnieuw", fr: "Essaie encore" };

/** Enregistre la fin d'une activité Éveil (XP, pièces, durée). */
export async function recordEveilCompletion(params: {
  childId: string;
  activityId: string;
  stars: number;
  maxStars: number;
  durationSeconds: number;
}) {
  const { error } = await supabase.rpc("record_game_completion", {
    p_child_id: params.childId,
    p_game_id: `eveil-${params.activityId}`,
    p_subject: "eveil",
    p_difficulty: 1,
    p_xp_earned: Math.max(5, params.stars * 5),
    p_score: params.stars,
    p_max_score: params.maxStars,
    p_duration_seconds: Math.max(0, Math.round(params.durationSeconds)),
    p_errors_count: 0,
  });
  if (error) console.error("record_game_completion (eveil)", error);
}
