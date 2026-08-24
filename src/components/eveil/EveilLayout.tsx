import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  childId: string;
  title: string;
  emoji: string;
  stars?: number;
  maxStars?: number;
  children: ReactNode;
}

/** Cadre commun des activités Éveil : gros bouton retour, étoiles, zéro texte indispensable. */
export const EveilLayout = ({ childId, title, emoji, stars = 0, maxStars = 0, children }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="container max-w-3xl px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(`/child/${childId}/eveil`)}
            aria-label="Retour aux activités"
            className="min-h-[56px] min-w-[56px] rounded-2xl bg-muted flex items-center justify-center text-foreground hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            {emoji} {title}
          </h1>
          {maxStars > 0 && (
            <span
              className="ml-auto text-2xl sm:text-3xl tracking-tight"
              aria-label={`${stars} étoiles sur ${maxStars}`}
            >
              {"⭐".repeat(stars)}
              <span className="opacity-25">{"☆".repeat(Math.max(0, maxStars - stars))}</span>
            </span>
          )}
        </div>
      </header>
      <main className="container max-w-3xl px-4 py-6 sm:py-10">{children}</main>
    </div>
  );
};

export default EveilLayout;
