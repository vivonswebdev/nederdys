import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameStat, SubjectStat, timeAgo } from "@/lib/parent";
import { BADGES } from "@/lib/gamification";
import { translations } from "@/lib/translations";
import { gameTitleKey } from "@/lib/parent";

interface Props {
  childName: string;
  periodLabel: string;
  stats: SubjectStat[];
  games: GameStat[];
  achievements: { badge_name: string; unlocked_at: string }[];
  streak: number;
  chartImage?: string | null;
}

const LABELS: Record<string, string> = {
  nl: "Néerlandais",
  fr: "Français",
  math: "Mathématiques",
};

const buildPdf = ({ childName, periodLabel, stats, games, achievements, streak, chartImage }: Props) => {
  const doc = new jsPDF();
  const today = new Date().toLocaleDateString("fr-BE");

  doc.setFontSize(18);
  doc.text("NederDys — Rapport de progression", 14, 20);
  doc.setFontSize(11);
  doc.text(`Enfant : ${childName}`, 14, 30);
  doc.text(`Période : ${periodLabel}`, 14, 37);
  doc.text(`Export du ${today} · Série : ${streak} jour(s)`, 14, 44);

  let cursorY = 52;
  if (chartImage) {
    doc.addImage(chartImage, "PNG", 14, cursorY, 180, 70);
    cursorY += 78;
  }

  autoTable(doc, {
    startY: cursorY,
    head: [["Matière", "XP", "Sessions", "Réussite", "Tendance 7j"]],
    body: stats.map((s) => [
      LABELS[s.subject],
      String(s.xp),
      String(s.sessions),
      `${s.successRate}%`,
      `${s.trend > 0 ? "+" : ""}${s.trend} XP`,
    ]),
  });

  const afterStats = (doc as any).lastAutoTable.finalY + 10;
  autoTable(doc, {
    startY: afterStats,
    head: [["Jeu", "Matière", "Parties", "Réussite", "Dernière session"]],
    body: [...games]
      .sort((a, b) => b.played - a.played)
      .slice(0, 5)
      .map((g) => [
        translations.fr[gameTitleKey(g.gameType) as keyof typeof translations.fr] ?? g.gameType,
        LABELS[g.subject],
        String(g.played),
        `${g.successRate}%`,
        timeAgo(g.lastPlayed),
      ]),
  });

  const unlocked = new Set(achievements.map((a) => a.badge_name));
  const afterGames = (doc as any).lastAutoTable.finalY + 10;
  autoTable(doc, {
    startY: afterGames,
    head: [["Badge", "Statut"]],
    body: BADGES.map((b) => [
      b.labelFr,
      unlocked.has(b.name) ? "Obtenu" : "Verrouillé",
    ]),
  });

  return doc;
};

export const ExportPDF = (
  props: Props & { chartRef?: React.RefObject<HTMLElement | null> }
) => {
  const { chartRef, ...pdfProps } = props;
  const [busy, setBusy] = useState(false);

  const capture = async (): Promise<string | null> => {
    if (!chartRef?.current) return props.chartImage ?? null;
    try {
      const canvas = await html2canvas(chartRef.current as HTMLElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });
      return canvas.toDataURL("image/png");
    } catch (e) {
      console.error("Capture du graphique impossible:", e);
      return null;
    }
  };

  const run = async (print: boolean) => {
    setBusy(true);
    try {
      const chartImage = await capture();
      const doc = buildPdf({ ...pdfProps, chartImage });
      if (print) {
        doc.autoPrint();
        window.open(doc.output("bloburl") as unknown as string, "_blank");
      } else {
        doc.save(`nederdys-${props.childName}-${Date.now()}.pdf`);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={() => run(false)} disabled={busy} className="gap-2">
        <Download className="w-4 h-4" /> Exporter PDF
      </Button>
      <Button variant="outline" className="gap-2" disabled={busy} onClick={() => run(true)}>
        <Printer className="w-4 h-4" /> Imprimer
      </Button>
    </div>
  );
};
