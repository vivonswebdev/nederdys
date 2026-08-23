import { useState } from "react";
import { BADGES, BadgeDef } from "@/lib/gamification";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  achievements: { badge_name: string; unlocked_at: string }[];
}

export const BadgeGrid = ({ achievements }: Props) => {
  const [selected, setSelected] = useState<BadgeDef | null>(null);
  const unlocked = new Map(achievements.map((a) => [a.badge_name, a.unlocked_at]));
  const count = BADGES.filter((b) => unlocked.has(b.name)).length;
  const percent = Math.round((count / BADGES.length) * 100);

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">Badges</h2>
        <span className="text-sm text-muted-foreground tabular-nums">
          {count}/{BADGES.length} badges ({percent}%)
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {BADGES.map((b) => {
          const date = unlocked.get(b.name);
          return (
            <button
              key={b.name}
              onClick={() => setSelected(b)}
              title={date ? `Obtenu le ${new Date(date).toLocaleDateString("fr-BE")}` : "Verrouillé"}
              className={`rounded-xl border p-4 text-center transition ${
                date
                  ? "bg-card border-primary/40 hover:border-primary"
                  : "bg-muted border-border blur-[0.6px] opacity-60 hover:opacity-90"
              }`}
            >
              <span className="text-3xl block mb-1">{date ? b.icon : "🔒"}</span>
              <span className="text-xs font-medium text-foreground">{b.labelFr}</span>
              {date && (
                <span className="block text-[10px] text-muted-foreground mt-1 tabular-nums">
                  {new Date(date).toLocaleDateString("fr-BE")}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selected?.icon}</span> {selected?.labelFr}
            </DialogTitle>
            <DialogDescription>{selected?.descFr}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {selected && unlocked.has(selected.name)
              ? `Obtenu le ${new Date(unlocked.get(selected.name)!).toLocaleDateString("fr-BE")}`
              : "Pas encore débloqué."}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};
