import { useMemo, useState } from "react";
import { GameStat, gameTitleKey, timeAgo } from "@/lib/parent";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { GameDetailDrawer } from "@/components/parent/GameDetailDrawer";

type SortKey = "played" | "successRate" | "recent";

const SUBJECT_BADGE: Record<string, { label: string; className: string }> = {
  nl: { label: "NL", className: "bg-chart-nl/15 text-chart-nl" },
  fr: { label: "FR", className: "bg-chart-fr/15 text-chart-fr" },
  math: { label: "Math", className: "bg-chart-math/15 text-chart-math" },
};

const PAGE_SIZE = 5;

export const TopGamesTable = ({ stats, childId }: { stats: GameStat[]; childId: string }) => {
  const { t } = useLanguage();
  const [sort, setSort] = useState<SortKey>("played");
  const [page, setPage] = useState(0);
  const [selectedGameType, setSelectedGameType] = useState<string | null>(null);

  const sorted = useMemo(() => {
    const copy = [...stats];
    copy.sort((a, b) => {
      if (sort === "played") return b.played - a.played;
      if (sort === "successRate") return b.successRate - a.successRate;
      return b.lastPlayed.localeCompare(a.lastPlayed);
    });
    return copy;
  }, [stats, sort]);

  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const rows = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="font-semibold text-foreground">Jeux les plus joués</h2>
        <div className="flex gap-2">
          {(
            [
              ["played", "Plus joués"],
              ["successRate", "Taux de réussite"],
              ["recent", "Récents"],
            ] as [SortKey, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setSort(key);
                setPage(0);
              }}
              className={`text-xs px-2.5 py-1 rounded-full border border-border ${
                sort === key ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Aucune partie enregistrée sur cette période.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-2 pr-3 font-medium">Jeu</th>
                  <th className="py-2 pr-3 font-medium">Matière</th>
                  <th className="py-2 pr-3 font-medium text-right">Parties</th>
                  <th className="py-2 pr-3 font-medium text-right">Réussite</th>
                  <th className="py-2 font-medium text-right">Dernière session</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((g) => {
                  const badge = SUBJECT_BADGE[g.subject];
                  return (
                    <tr
                      key={g.gameType}
                      onClick={() => setSelectedGameType(g.gameType)}
                      className="border-b border-border/60 last:border-0 cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-2.5 pr-3 font-medium text-foreground">
                        {t(gameTitleKey(g.gameType) as never)}
                      </td>
                      <td className="py-2.5 pr-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.className}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 text-right tabular-nums">{g.played}</td>
                      <td className="py-2.5 pr-3 text-right tabular-nums">{g.successRate}%</td>
                      <td className="py-2.5 text-right text-muted-foreground">{timeAgo(g.lastPlayed)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {pages > 1 && (
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                Précédent
              </Button>
              <span className="text-xs text-muted-foreground tabular-nums">
                {page + 1} / {pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Suivant
              </Button>
            </div>
          )}
        </>
      )}

      <GameDetailDrawer
        gameType={selectedGameType}
        childId={childId}
        isOpen={!!selectedGameType}
        onClose={() => setSelectedGameType(null)}
      />
    </div>
  );
};
