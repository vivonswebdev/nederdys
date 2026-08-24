import { useChild } from "@/contexts/ChildContext";
import { translations } from "@/lib/translations";
import { nlFor } from "@/data/nl/uiStringsNl";

/** Tout texte montré à un enfant existe TOUJOURS en néerlandais et en français. */
export interface Bilingual {
  nl: string;
  fr: string;
}

export type ChildLanguage = "nl" | "fr";

export const CHILD_LANGUAGES: { id: ChildLanguage; flag: string; label: Bilingual }[] = [
  { id: "nl", flag: "🇳🇱", label: { nl: "Nederlands", fr: "Néerlandais" } },
  { id: "fr", flag: "🇫🇷", label: { nl: "Frans", fr: "Français" } },
];

export const bi = (nl: string, fr: string): Bilingual => ({ nl, fr });

/** Langue principale de l'enfant actif (affichée et lue en premier). */
export function useChildLanguage(): ChildLanguage {
  const { activeChild } = useChild();
  const lang = (activeChild as { language?: string } | null)?.language;
  return lang === "fr" ? "fr" : "nl";
}

/** Retourne [texte principal, texte secondaire] selon la langue de l'enfant. */
export const orderedPair = (phrase: Bilingual, primary: ChildLanguage): [string, string] =>
  primary === "fr" ? [phrase.fr, phrase.nl] : [phrase.nl, phrase.fr];

/* ------------------------------------------------------------------ */
/* Synthèse vocale bilingue                                            */
/* ------------------------------------------------------------------ */

function speakOne(text: string, lang: "nl-BE" | "fr-BE", onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.85;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith(lang.slice(0, 2)));
  if (voice) utter.voice = voice;
  if (onEnd) utter.onend = () => onEnd();
  window.speechSynthesis.speak(utter);
}

export const speakNlBe = (text: string) => {
  window.speechSynthesis?.cancel();
  speakOne(text, "nl-BE");
};

export const speakFrBe = (text: string) => {
  window.speechSynthesis?.cancel();
  speakOne(text, "fr-BE");
};

/**
 * Lit une consigne dans les deux langues : langue de l'enfant d'abord,
 * puis l'autre après une courte pause (même comportement que le palier Éveil).
 */
export function speakBoth(phrase: Bilingual, primary: ChildLanguage = "nl") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const first = primary === "fr" ? { t: phrase.fr, l: "fr-BE" as const } : { t: phrase.nl, l: "nl-BE" as const };
  const second = primary === "fr" ? { t: phrase.nl, l: "nl-BE" as const } : { t: phrase.fr, l: "fr-BE" as const };
  speakOne(first.t, first.l, () => {
    window.setTimeout(() => speakOne(second.t, second.l), 400);
  });
}

/** Hook pratique : lecture bilingue calée sur la langue de l'enfant actif. */
export function useSpeakBoth() {
  const primary = useChildLanguage();
  return (phrase: Bilingual) => speakBoth(phrase, primary);
}

/* ------------------------------------------------------------------ */
/* Dictionnaire UI enfant : chaque clé a NL + FR                       */
/* ------------------------------------------------------------------ */

export const UI = {
  quit: bi("Stoppen", "Quitter"),
  back: bi("Terug", "Retour"),
  backToChapter: bi("Terug naar het hoofdstuk", "Retour au chapitre"),
  replay: bi("Opnieuw spelen", "Rejouer"),
  replayLevel: bi("Dit niveau opnieuw", "Rejouer ce niveau"),
  listenAgain: bi("Nog eens luisteren", "Réécouter"),
  listenNl: bi("Luister in het Nederlands", "Écouter en néerlandais"),
  validate: bi("Bevestigen", "Valider"),
  restart: bi("Opnieuw beginnen", "Recommencer"),
  yourAnswer: bi("Jouw antwoord", "Ta réponse"),
  clickInOrder: bi("Klik in de juiste volgorde…", "Clique dans le bon ordre…"),
  matchHint: bi("Kies links, dan het antwoord rechts.", "Choisis à gauche, puis sa réponse à droite."),
  true: bi("Waar", "Vrai"),
  false: bi("Niet waar", "Faux"),
  loading: bi("Laden…", "Chargement…"),
  saving: bi("Opslaan…", "Enregistrement…"),
  level: bi("Niveau", "Niveau"),
  challenge: bi("Opdracht", "Défi"),
  score: bi("Score", "Score"),
  xpPerCorrect: bi("XP per juist antwoord", "XP par bonne réponse"),
  sessionDone: bi("Sessie klaar!", "Session terminée !"),
  wellDone: bi("Goed zo, gelukt!", "Bravo, c'est réussi !"),
  keepGoing: bi("Goed gedaan, ga zo door!", "Bien joué, continue !"),
  correct: bi("Super, dat is juist!", "Super, c'est juste !"),
  wrong: bi("Nog niet — kijk naar de oplossing:", "Pas encore — regarde la solution :"),
  correctShort: bi("Goed zo! Juist antwoord!", "Bravo ! Bonne réponse !"),
  timeout: bi("Tijd om!", "Temps écoulé !"),
  theAnswerWas: bi("Het juiste antwoord was", "La bonne réponse était"),
  masteryGoal: bi(
    "Doel: 80 % om het volgende niveau te openen. Je bent er bijna!",
    "Objectif : 80 % pour débloquer le niveau suivant. Tu y es presque !"
  ),
  noExercises: bi(
    "Dit niveau heeft nog geen oefeningen. Kom snel terug!",
    "Ce niveau n'a pas encore d'exercices. Reviens bientôt !"
  ),
  goodAnswersOutOf: bi("juiste antwoorden op", "bonnes réponses sur"),
  coins: bi("muntjes", "pièces"),
} satisfies Record<string, Bilingual>;

export type UiKey = keyof typeof UI;

/* ------------------------------------------------------------------ */
/* Résolution FR -> NL des chaînes codées en dur                       */
/* ------------------------------------------------------------------ */

/** Index inverse construit depuis le dictionnaire i18n : texte FR -> texte NL. */
const FR_TO_NL: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const key of Object.keys(translations.fr)) {
    const fr = translations.fr[key as keyof typeof translations.fr];
    const nl = translations.nl[key as keyof typeof translations.nl];
    if (fr && nl && !(fr in map)) map[fr.trim()] = nl;
  }
  return map;
})();

/**
 * Construit un couple NL/FR à partir d'une chaîne française d'interface enfant.
 * Cherche d'abord dans l'i18n existant, puis dans le dictionnaire dédié.
 */
export function biFromFr(fr: string): Bilingual {
  const trimmed = fr.trim();
  return { nl: FR_TO_NL[trimmed] ?? nlFor(trimmed) ?? fr, fr };
}

/** Vrai si une traduction NL existe pour cette chaîne FR. */
export const hasNl = (fr: string): boolean => {
  const trimmed = fr.trim();
  return Boolean(FR_TO_NL[trimmed] ?? nlFor(trimmed));
};
