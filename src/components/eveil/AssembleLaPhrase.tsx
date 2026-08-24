import { useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { EveilLayout } from "./EveilLayout";
import { Confetti } from "@/components/Confetti";
import { sounds } from "@/lib/sounds";
import { recordEveilCompletion, speakBilingual } from "@/lib/eveil";

interface Props {
  childId: string;
}

interface Option {
  id: string;
  emoji: string;
  label: string;
  labelNl: string;
}

type SlotKey = "sujet" | "verbe" | "objet";

const OPTIONS: Record<SlotKey, Option[]> = {
  sujet: [
    { id: "chien", emoji: "🐶", label: "Le chien", labelNl: "De hond" },
    { id: "chat", emoji: "🐱", label: "Le chat", labelNl: "De kat" },
    { id: "fille", emoji: "👧", label: "La fille", labelNl: "Het meisje" },
  ],
  verbe: [
    { id: "court", emoji: "🏃", label: "court vers", labelNl: "rent naar" },
    { id: "mange", emoji: "🍽️", label: "mange", labelNl: "eet" },
    { id: "regarde", emoji: "👀", label: "regarde", labelNl: "kijkt naar" },
  ],
  objet: [
    { id: "maison", emoji: "🏠", label: "la maison", labelNl: "het huis" },
    { id: "pomme", emoji: "🍎", label: "la pomme", labelNl: "de appel" },
    { id: "ballon", emoji: "⚽", label: "le ballon", labelNl: "de bal" },
  ],
};

const SLOTS: SlotKey[] = ["sujet", "verbe", "objet"];

export const AssembleLaPhrase = ({ childId }: Props) => {
  const [slots, setSlots] = useState<Record<SlotKey, Option | null>>({
    sujet: null,
    verbe: null,
    objet: null,
  });
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  const complete = SLOTS.every((s) => slots[s]);

  const handleSelect = (slot: SlotKey, option: Option) => {
    sounds.click();
    setSlots((prev) => ({ ...prev, [slot]: option }));
    speakBilingual({ nl: option.labelNl, fr: option.label });
  };

  const speakSentence = () => {
    if (!complete) return;
    speakBilingual({
      nl: SLOTS.map((s) => slots[s]!.labelNl).join(" "),
      fr: SLOTS.map((s) => slots[s]!.label).join(" "),
    });
    sounds.correct();
    const nextStars = Math.min(3, stars + 1);
    setStars(nextStars);
    if (nextStars >= 3) {
      setDone(true);
      sounds.victory();
      void recordEveilCompletion({
        childId,
        activityId: "assemble-la-phrase",
        stars: nextStars,
        maxStars: 3,
        durationSeconds: (Date.now() - startedAt.current) / 1000,
      });
    } else {
      window.setTimeout(() => setSlots({ sujet: null, verbe: null, objet: null }), 2200);
    }
  };

  return (
    <EveilLayout childId={childId} title="Assemble la Phrase" titleNl="Maak de Zin" emoji="🧩" stars={stars} maxStars={3}>
      {done && <Confetti />}
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {SLOTS.map((slot) => (
            <div
              key={slot}
              className="min-h-[110px] rounded-3xl border-4 border-dashed border-primary/40 bg-card flex items-center justify-center text-5xl"
            >
              <span aria-label={slots[slot]?.label ?? "vide"}>{slots[slot]?.emoji ?? "❓"}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {SLOTS.map((slot) => (
            <div key={slot} className="space-y-3">
              {OPTIONS[slot].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(slot, opt)}
                  aria-label={opt.label}
                  className={`w-full min-h-[80px] rounded-2xl text-4xl transition-colors ${
                    slots[slot]?.id === opt.id
                      ? "bg-primary/30 border-4 border-primary"
                      : "bg-muted hover:bg-accent border-4 border-transparent"
                  }`}
                >
                  <span aria-hidden>{opt.emoji}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={speakSentence}
          disabled={!complete}
          aria-label="Écouter la phrase"
          className="min-h-[80px] w-full flex items-center justify-center gap-3 rounded-3xl bg-primary text-primary-foreground text-2xl font-bold disabled:opacity-40"
        >
          <Volume2 className="w-9 h-9" /> Zin / Phrase
        </button>
      </div>
    </EveilLayout>
  );
};

export default AssembleLaPhrase;
