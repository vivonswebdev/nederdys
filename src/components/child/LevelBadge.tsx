import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getLevel } from "@/lib/levels";

interface ChildLevelBadgeProps {
  totalXp: number;
}

export const ChildLevelBadge = ({ totalXp }: ChildLevelBadgeProps) => {
  const info = getLevel(totalXp);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-foreground rounded-full px-3 py-1 text-sm font-bold cursor-default">
          {info.level} {info.emoji} {info.title}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        {info.nextAt
          ? `Prochain niveau à ${info.nextAt} XP`
          : "Niveau maximum atteint, bravo !"}
      </TooltipContent>
    </Tooltip>
  );
};
