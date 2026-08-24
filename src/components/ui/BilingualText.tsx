import { Volume2 } from "lucide-react";
import { Bilingual, biFromKey, speakBoth, useChildLanguage } from "@/lib/bilingual";

interface Props {
  nl: string;
  fr: string;
  className?: string;
  /** "both" (défaut) affiche les deux langues ; "nl"/"fr" n'en affiche qu'une. */
  priority?: "nl" | "fr" | "both";
  /** Empile les deux langues au lieu de les mettre sur une ligne. */
  stacked?: boolean;
  /** N'affiche QUE la langue de l'enfant (interface générale, palier Éveil). */
  single?: boolean;
}

/**
 * Affiche un contenu toujours en néerlandais ET en français.
 * La langue de l'enfant (choisie à l'inscription) est affichée en premier, en gras.
 */
export function BilingualText({
  nl,
  fr,
  className = "",
  priority = "both",
  stacked = false,
  single = false,
}: Props) {
  const childLang = useChildLanguage();

  if (single) return <span className={className}>{childLang === "fr" ? fr : nl}</span>;

  if (priority === "nl") return <span className={className}>{nl}</span>;
  if (priority === "fr") return <span className={className}>{fr}</span>;

  const primary = childLang === "fr" ? fr : nl;
  const secondary = childLang === "fr" ? nl : fr;

  if (stacked) {
    return (
      <span className={`block ${className}`}>
        <span className="block font-bold text-primary">{primary}</span>
        <span className="block text-muted-foreground">{secondary}</span>
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="font-bold text-primary">{primary}</span>
      <span className="mx-2 text-muted-foreground/60">/</span>
      <span className="text-muted-foreground">{secondary}</span>
    </span>
  );
}

/** Raccourci pour les entrées du dictionnaire `UI`. */
export const Bi = ({ phrase, ...rest }: { phrase: Bilingual } & Omit<Props, "nl" | "fr">) => (
  <BilingualText nl={phrase.nl} fr={phrase.fr} {...rest} />
);

export default BilingualText;

/* ------------------------------------------------------------------ */
/* Affichage bilingue à partir d'une clé i18n (jeux/exercices 6-12)    */
/* ------------------------------------------------------------------ */

/** Affiche une clé du dictionnaire i18n simultanément en NL et en FR. */
export const Tb = ({ k, ...rest }: { k: string } & Omit<Props, "nl" | "fr">) => {
  const phrase = biFromKey(k);
  return <BilingualText nl={phrase.nl} fr={phrase.fr} {...rest} />;
};

/** Consigne bilingue + bouton d'écoute (NL puis FR). */
export function BilingualInstruction({
  k,
  className = "",
}: {
  k: string;
  className?: string;
}) {
  const childLang = useChildLanguage();
  const phrase = biFromKey(k);
  return (
    <span className={`inline-flex items-center justify-center gap-2 flex-wrap ${className}`}>
      <BilingualText nl={phrase.nl} fr={phrase.fr} stacked />
      <button
        type="button"
        aria-label={childLang === "fr" ? "Écouter la consigne" : "Luister naar de opdracht"}
        onClick={() => speakBoth(phrase, childLang)}
        className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-primary hover:bg-primary/10 transition-colors"
      >
        <Volume2 className="w-5 h-5" />
      </button>
    </span>
  );
}
