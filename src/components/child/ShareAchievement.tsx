import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ShareableAchievement {
  icon: string;
  labelFr: string;
  labelNl: string;
  /** Sous-titre facultatif (ex: "100% — Chapitre les fractions"). */
  detailFr?: string;
  detailNl?: string;
}

interface Props {
  childName: string;
  achievement: ShareableAchievement;
  /** Style compact pour une grille de badges. */
  compact?: boolean;
  className?: string;
}

/**
 * Génère une carte de réussite en image (html2canvas), puis la partage via
 * l'API Web Share si disponible, sinon la télécharge (repli desktop obligatoire).
 * La carte capturée est rendue hors écran pour éviter le clignotement.
 */
export function ShareAchievement({ childName, achievement, compact = false, className = "" }: Props) {
  const { lang, t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const label = lang === "nl" ? achievement.labelNl : achievement.labelFr;
  const detail = lang === "nl" ? achievement.detailNl : achievement.detailFr;

  async function handleShare() {
    if (!cardRef.current || busy) return;
    setBusy(true);
    try {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: "#ffffff", scale: 2 });
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const file = new File([blob], "reussite.png", { type: "image/png" });
      const shareTitle = t("share.title");
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: shareTitle });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "reussite.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      /* partage annulé par l'utilisateur ou non supporté : on ignore */
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Carte hors écran, uniquement pour la capture */}
      <div className="fixed -left-[9999px] top-0" aria-hidden>
        <div
          ref={cardRef}
          style={{ width: 600, height: 600 }}
          className="flex flex-col items-center justify-center gap-4 bg-white text-center"
        >
          <span style={{ fontSize: 160, lineHeight: 1 }}>{achievement.icon}</span>
          <p style={{ fontSize: 44, fontWeight: 800, color: "#166534" }}>{childName}</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: "#1f2937" }}>{label}</p>
          {detail && <p style={{ fontSize: 24, color: "#4b5563" }}>{detail}</p>}
          <p style={{ fontSize: 26, fontWeight: 800, color: "#22c55e", marginTop: 24 }}>NederDys</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleShare}
        disabled={busy}
        aria-label={t("share.button")}
        className={
          compact
            ? `mt-2 inline-flex items-center gap-1 rounded-full bg-secondary/25 px-3 py-1 text-[11px] font-bold text-foreground hover:bg-secondary/40 disabled:opacity-50 ${className}`
            : `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-secondary px-5 py-2 font-bold text-secondary-foreground hover:opacity-90 disabled:opacity-50 ${className}`
        }
      >
        📤 {t("share.button")}
      </button>
    </>
  );
}

export default ShareAchievement;
