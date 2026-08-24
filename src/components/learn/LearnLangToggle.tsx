import { useCallback, useEffect, useState } from "react";
import { ChildLanguage, useChildLanguage } from "@/lib/bilingual";

const KEY = "nederdys.learnLang";

/**
 * Langue d'affichage des pages « Apprendre ».
 * Par défaut la langue de l'enfant, mais l'enfant/le parent peut basculer
 * en français (ou en néerlandais) et le choix est mémorisé.
 */
export function useLearnLanguage(): [ChildLanguage, (l: ChildLanguage) => void] {
  const childLang = useChildLanguage();
  const [lang, setLang] = useState<ChildLanguage>(() => {
    if (typeof window === "undefined") return childLang;
    const saved = window.localStorage.getItem(KEY);
    return saved === "fr" || saved === "nl" ? saved : childLang;
  });

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
    if (saved !== "fr" && saved !== "nl") setLang(childLang);
  }, [childLang]);

  const update = useCallback((l: ChildLanguage) => {
    setLang(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* stockage indisponible : on garde juste l'état en mémoire */
    }
  }, []);

  return [lang, update];
}

interface Props {
  lang: ChildLanguage;
  onChange: (l: ChildLanguage) => void;
}

/** Petit sélecteur FR / NL (44px, accessible) pour les pages Apprendre. */
export const LearnLangToggle = ({ lang, onChange }: Props) => (
  <div className="inline-flex items-center gap-1 rounded-full border-2 border-border bg-card p-1">
    {(
      [
        { id: "fr" as const, flag: "🇫🇷", label: "FR" },
        { id: "nl" as const, flag: "🇳🇱", label: "NL" },
      ]
    ).map((opt) => (
      <button
        key={opt.id}
        onClick={() => onChange(opt.id)}
        aria-pressed={lang === opt.id}
        aria-label={opt.id === "fr" ? "Français d'abord" : "Nederlands eerst"}
        className={`min-h-[36px] px-3 rounded-full text-sm font-bold transition-colors ${
          lang === opt.id
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        {opt.flag} {opt.label}
      </button>
    ))}
  </div>
);
