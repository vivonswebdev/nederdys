import { Bilingual, useChildLanguage } from "@/lib/bilingual";

interface Props {
  nl: string;
  fr: string;
  className?: string;
  /** "both" (défaut) affiche les deux langues ; "nl"/"fr" n'en affiche qu'une. */
  priority?: "nl" | "fr" | "both";
  /** Empile les deux langues au lieu de les mettre sur une ligne. */
  stacked?: boolean;
}

/**
 * Affiche un contenu toujours en néerlandais ET en français.
 * La langue de l'enfant (choisie à l'inscription) est affichée en premier, en gras.
 */
export function BilingualText({ nl, fr, className = "", priority = "both", stacked = false }: Props) {
  const childLang = useChildLanguage();

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
