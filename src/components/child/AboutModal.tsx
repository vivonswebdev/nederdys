import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AvatarRenderer } from "./AvatarRenderer";
import { AvatarConfig } from "@/lib/avatar";
import { getLevel } from "@/lib/levels";
import { allBadges } from "@/data/badges";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  child: {
    id: string;
    first_name: string;
    age: number;
    school_level: string;
    created_at: string;
  };
  totalXp: number;
  badgeCount: number;
  avatarConfig?: AvatarConfig;
  onEditAvatar: () => void;
}

export const AboutModal = ({
  open,
  onOpenChange,
  child,
  totalXp,
  badgeCount,
  avatarConfig,
  onEditAvatar,
}: Props) => {
  const info = getLevel(totalXp);
  const created = new Date(child.created_at).toLocaleDateString("fr-BE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>À propos de moi</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3">
          <AvatarRenderer seed={child.first_name} gender={child.gender} options={avatarConfig ?? {}} size="lg" animated />
          <p className="text-2xl font-bold text-foreground">{child.first_name}</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-primary/15 text-primary font-bold text-sm px-3 py-1">
              Niveau {info.level} {info.emoji} {info.title}
            </span>
            <span className="rounded-full bg-muted text-muted-foreground font-bold text-sm px-3 py-1 tabular-nums">
              {totalXp} XP
            </span>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
            <span className="text-xl">🎓</span>
            <div>
              <p className="text-xs text-muted-foreground">Niveau scolaire</p>
              <p className="font-bold text-foreground">
                {String(child.school_level).toUpperCase()} · {child.age} ans
              </p>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
            <span className="text-xl">📅</span>
            <div>
              <p className="text-xs text-muted-foreground">Inscrit depuis</p>
              <p className="font-bold text-foreground">{created}</p>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
            <span className="text-xl">🏅</span>
            <div>
              <p className="text-xs text-muted-foreground">Badges</p>
              <p className="font-bold text-foreground tabular-nums">
                {badgeCount} / {allBadges.length}
              </p>
            </div>
          </li>
        </ul>

        <button
          onClick={() => {
            onOpenChange(false);
            onEditAvatar();
          }}
          className="mt-4 w-full bg-primary text-primary-foreground rounded-2xl py-3 font-bold hover:opacity-90 transition-opacity"
        >
          🎨 Changer mon avatar
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
