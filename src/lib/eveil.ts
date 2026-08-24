import { supabase } from "@/integrations/supabase/client";

export interface EveilActivity {
  id: string;
  name: string;
  emoji: string;
  category: "couleurs" | "motricite" | "premiers-mots" | "phrases-simples";
  description: string;
}

/** Une option de réponse Éveil est TOUJOURS visuelle — jamais un mot à lire. */
export interface EveilOption {
  id: string;
  visual: string; // emoji, image ou pastille de couleur
  audioLabel?: string; // ce que la voix dit si l'option est touchée
}

export const EVEIL_ACTIVITIES: EveilActivity[] = [
  {
    id: "arc-en-ciel",
    name: "L'Arc-en-ciel",
    emoji: "🌈",
    category: "couleurs",
    description: "Touche la bonne couleur",
  },
  {
    id: "trace-la-forme",
    name: "Trace la Forme",
    emoji: "✏️",
    category: "motricite",
    description: "Suis le tracé avec ton doigt",
  },
  {
    id: "mon-premier-mot",
    name: "Mon Premier Mot",
    emoji: "🗣️",
    category: "premiers-mots",
    description: "Écoute et répète le mot",
  },
  {
    id: "assemble-la-phrase",
    name: "Assemble la Phrase",
    emoji: "🧩",
    category: "phrases-simples",
    description: "Choisis les images de la phrase",
  },
];

export const eveilActivity = (id?: string) => EVEIL_ACTIVITIES.find((a) => a.id === id) ?? null;

/** Voix française (Belgique) — tout le palier Éveil est porté par la voix. */
export function speakFr(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr-BE";
  utter.rate = 0.8;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("fr"));
  if (voice) utter.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

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
