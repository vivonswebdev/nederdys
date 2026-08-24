import { useQuery } from "@tanstack/react-query";
import { AvatarRenderer } from "./AvatarRenderer";
import { AvatarReaction, type ReactionTrigger } from "./AvatarReaction";
import { getAvatarConfig, type AvatarMood } from "@/lib/avatar";

interface Props {
  childId?: string | null;
  seed: string;
  gender?: string | null;
  mood?: AvatarMood;
  trigger?: ReactionTrigger | null;
  onReactionDone?: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

/**
 * Avatar de l'enfant avec humeur + badge de réaction animé.
 * État purement client : rien n'est stocké en base.
 */
export function AvatarBuddy({
  childId,
  seed,
  gender,
  mood,
  trigger = null,
  onReactionDone,
  size = "sm",
  className = "",
}: Props) {
  const { data: avatarConfig } = useQuery({
    queryKey: ["avatarConfig", childId],
    queryFn: () => getAvatarConfig(childId!),
    enabled: !!childId,
  });

  return (
    <div className={`relative inline-block ${className}`}>
      <AvatarRenderer
        seed={seed}
        gender={gender}
        options={avatarConfig ?? {}}
        size={size}
        mood={mood}
        animated
      />
      <AvatarReaction trigger={trigger} onDone={onReactionDone} />
    </div>
  );
}

export default AvatarBuddy;
