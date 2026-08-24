interface Props {
  nl: string;
  fr: string;
  className?: string;
  /** "both" (défaut) affiche NL puis FR ; "nl"/"fr" n'affiche qu'une langue. */
  priority?: "nl" | "fr" | "both";
  /** Empile les deux langues au lieu de les mettre sur une ligne. */
  stacked?: boolean;
}

/** Affiche un contenu toujours en néerlandais ET en français. */
export function BilingualText({ nl, fr, className = "", priority = "both", stacked = false }: Props) {
  if (priority === "nl") return <span className={className}>{nl}</span>;
  if (priority === "fr") return <span className={className}>{fr}</span>;

  if (stacked) {
    return (
      <span className={`block ${className}`}>
        <span className="block font-bold text-primary">{nl}</span>
        <span className="block text-muted-foreground">{fr}</span>
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="font-bold text-primary">{nl}</span>
      <span className="mx-2 text-muted-foreground/60">/</span>
      <span className="text-muted-foreground">{fr}</span>
    </span>
  );
}

export default BilingualText;
