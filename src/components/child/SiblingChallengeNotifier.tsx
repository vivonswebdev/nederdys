import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useChild } from "@/contexts/ChildContext";
import { bi, getChildLanguage, orderedPair, Bilingual } from "@/lib/bilingual";
import { sounds } from "@/lib/sounds";

interface ChallengeRow {
  id: string;
  challenger_id: string;
  challenged_id: string;
  status: string;
  challenger_session_id: string | null;
  challenged_session_id: string | null;
}

/**
 * Notifications temps réel des défis frères et sœurs :
 * - l'enfant défié est prévenu dès la création,
 * - le challenger est prévenu quand son défi est relevé.
 */
export function SiblingChallengeNotifier() {
  const { activeChildId, children } = useChild();
  const navigate = useNavigate();
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!activeChildId) return;
    const childId = activeChildId;

    const nameOf = (id: string) =>
      children.find((c) => c.id === id)?.first_name ?? "?";
    const emojiOf = (id: string) =>
      (children.find((c) => c.id === id) as { avatar_emoji?: string } | undefined)
        ?.avatar_emoji ?? "🙂";

    const funToast = (phrase: Bilingual, emoji: string) => {
      const [first, second] = orderedPair(phrase, getChildLanguage());
      sounds.levelUp();
      toast(`${emoji} ${first}`, {
        description: second,
        duration: 8000,
        action: {
          label: "🏆",
          onClick: () => navigate(`/child/${childId}/defis`),
        },
      });
    };

    const channel = supabase
      .channel(`sibling-challenges-${childId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sibling_challenges" },
        ({ new: row }) => {
          const c = row as ChallengeRow;
          if (c.challenged_id !== childId) return;
          if (seen.current.has(`new-${c.id}`)) return;
          seen.current.add(`new-${c.id}`);
          const who = nameOf(c.challenger_id);
          funToast(
            bi(
              `${who} daagt je uit! Laat zien wat je kan! 🚀`,
              `${who} te lance un défi ! Montre ce que tu sais faire ! 🚀`
            ),
            emojiOf(c.challenger_id)
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "sibling_challenges" },
        ({ new: row, old }) => {
          const c = row as ChallengeRow;
          const before = old as Partial<ChallengeRow>;
          const iAmChallenger = c.challenger_id === childId;
          const iAmChallenged = c.challenged_id === childId;
          if (!iAmChallenger && !iAmChallenged) return;

          const otherId = iAmChallenger ? c.challenged_id : c.challenger_id;
          const otherSessionBefore = iAmChallenger
            ? before.challenged_session_id
            : before.challenger_session_id;
          const otherSessionNow = iAmChallenger
            ? c.challenged_session_id
            : c.challenger_session_id;

          if (!otherSessionBefore && otherSessionNow) {
            const key = `accept-${c.id}-${otherSessionNow}`;
            if (seen.current.has(key)) return;
            seen.current.add(key);
            const who = nameOf(otherId);
            funToast(
              bi(
                `${who} heeft je uitdaging aangenomen! Spannend! 🔥`,
                `${who} a relevé ton défi ! Ça chauffe ! 🔥`
              ),
              emojiOf(otherId)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChildId, children, navigate]);

  return null;
}
