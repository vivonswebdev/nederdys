import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getLevelInfo } from "@/lib/gamification";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChildLevelBadgeProps {
  totalXp: number;
}

export const ChildLevelBadge = ({ totalXp }: ChildLevelBadgeProps) => {
  const { lang } = useLanguage();
  const info = getLevelInfo(totalXp, lang);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-foreground rounded-full px-3 py-1 text-sm font-bold cursor-default">
          {info.level} {info.emoji} {info.title}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        {info.nextAt
          ? lang === "nl"
            ? `Volgend niveau bij ${info.nextAt} XP`
            : `Prochain niveau à ${info.nextAt} XP`
          : lang === "nl"
            ? "Hoogste niveau bereikt, goed zo!"
            : "Niveau maximum atteint, bravo !"}
      </TooltipContent>
    </Tooltip>
  );
};
