import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useChild } from "@/contexts/ChildContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { GAMES } from "@/lib/games";
import { ALL_CHAPTERS } from "@/lib/chapters";
import { toast } from "sonner";
import { X } from "lucide-react";

interface Props {
  activeChildId: string;
  onClose: () => void;
  onCreated?: () => void;
}

export function SiblingChallengeModal({ activeChildId, onClose, onCreated }: Props) {
  const { children } = useChild();
  const { t } = useLanguage();
  const siblings = children.filter((c) => c.id !== activeChildId);

  const [selectedSibling, setSelectedSibling] = useState<string | null>(null);
  const [challengeType, setChallengeType] = useState<"game" | "chapter">("game");
  const [gameType, setGameType] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [saving, setSaving] = useState(false);

  async function createChallenge() {
    if (!selectedSibling) return;
    if (challengeType === "game" && !gameType) return;
    if (challengeType === "chapter" && !chapterId) return;

    setSaving(true);
    const { error } = await supabase.from("sibling_challenges").insert({
      challenger_id: activeChildId,
      challenged_id: selectedSibling,
      game_type: challengeType === "game" ? gameType : null,
      chapter_id: challengeType === "chapter" ? chapterId : null,
    });
    setSaving(false);

    if (error) {
      toast.error("Erreur / Fout : " + error.message);
      return;
    }
    toast.success("Défi envoyé ! / Uitdaging verstuurd! 🚀");
    onCreated?.();
    onClose();
  }

  if (siblings.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-card rounded-3xl p-6 max-w-sm w-full text-center space-y-3 shadow-xl">
          <div className="text-5xl">👶</div>
          <h3 className="text-xl font-bold">
            <BilingualText {...biFromFr("Aucun frère ou sœur")} />
          </h3>
          <p className="text-sm text-muted-foreground">
            <BilingualText
              {...biFromFr(
                "Ajoute un autre profil enfant dans les paramètres pour pouvoir défier quelqu'un."
              )}
            />
          </p>
          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground rounded-xl px-4 py-3 font-bold min-h-[44px]"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card rounded-3xl p-6 max-w-md w-full space-y-5 shadow-xl my-8">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold">
            🏆 <BilingualText {...biFromFr("Défier un frère ou une sœur")} />
          </h3>
          <button onClick={onClose} aria-label="Fermer" className="p-2 min-h-[44px] min-w-[44px]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-sm">
            <BilingualText {...biFromFr("Qui veux-tu défier ?")} />
          </p>
          <div className="space-y-2">
            {siblings.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSibling(s.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all min-h-[44px] ${
                  selectedSibling === s.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground/40"
                }`}
              >
                <span className="text-2xl">{s.avatar_emoji ?? "🙂"}</span>
                <span className="font-bold">{s.first_name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-sm">
            <BilingualText {...biFromFr("Type de défi")} />
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setChallengeType("game")}
              className={`flex-1 px-4 py-2 rounded-xl font-bold min-h-[44px] ${
                challengeType === "game"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              🎮 <BilingualText {...biFromFr("Jeu")} />
            </button>
            <button
              onClick={() => setChallengeType("chapter")}
              className={`flex-1 px-4 py-2 rounded-xl font-bold min-h-[44px] ${
                challengeType === "chapter"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              📚 <BilingualText {...biFromFr("Exercice")} />
            </button>
          </div>
        </div>

        {challengeType === "game" ? (
          <select
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
            className="w-full border-2 border-border bg-background rounded-xl px-4 py-3 min-h-[44px]"
          >
            <option value="">Choisis un jeu… / Kies een spel…</option>
            {GAMES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.icon} {t(g.titleKey as never)}
              </option>
            ))}
          </select>
        ) : (
          <select
            value={chapterId}
            onChange={(e) => setChapterId(e.target.value)}
            className="w-full border-2 border-border bg-background rounded-xl px-4 py-3 min-h-[44px]"
          >
            <option value="">Choisis un chapitre… / Kies een hoofdstuk…</option>
            {ALL_CHAPTERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {c.name}
                {c.nameNl ? ` / ${c.nameNl}` : ""}
              </option>
            ))}
          </select>
        )}

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border px-4 py-3 font-bold min-h-[44px]"
          >
            <BilingualText {...biFromFr("Annuler")} />
          </button>
          <button
            onClick={createChallenge}
            disabled={saving || !selectedSibling}
            className="flex-1 rounded-xl bg-primary text-primary-foreground px-4 py-3 font-bold min-h-[44px] disabled:opacity-50"
          >
            🚀 <BilingualText {...biFromFr("Envoyer")} />
          </button>
        </div>
      </div>
    </div>
  );
}
