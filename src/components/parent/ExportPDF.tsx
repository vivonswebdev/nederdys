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
}

const LABELS: Record<string, string> = {
  nl: "Néerlandais",
  fr: "Français",
  math: "Mathématiques",
};

const buildPdf = ({ childName, periodLabel, stats, games, achievements, streak }: Props) => {
  const doc = new jsPDF();
  const today = new Date().toLocaleDateString("fr-BE");

  doc.setFontSize(18);
  doc.text("NederDys — Rapport de progression", 14, 20);
  doc.setFontSize(11);
  doc.text(`Enfant : ${childName}`, 14, 30);
  doc.text(`Période : ${periodLabel}`, 14, 37);
  doc.text(`Export du ${today} · Série : ${streak} jour(s)`, 14, 44);

  autoTable(doc, {
    startY: 52,
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

export const ExportPDF = (props: Props) => (
  <div className="flex gap-2">
    <Button
      onClick={() => buildPdf(props).save(`nederdys-${props.childName}-${Date.now()}.pdf`)}
      className="gap-2"
    >
      <Download className="w-4 h-4" /> Exporter PDF
    </Button>
    <Button
      variant="outline"
      className="gap-2"
      onClick={() => {
        const doc = buildPdf(props);
        doc.autoPrint();
        window.open(doc.output("bloburl") as unknown as string, "_blank");
      }}
    >
      <Printer className="w-4 h-4" /> Imprimer
    </Button>
  </div>
);
