import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MathLevel } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { pyramideNombresChallenges } from "@/data/math/pyramideNombresChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const PyramideNombresGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: pyramideNombresChallenges,
    level,
    gameId: "pyramide_nombres",
    childId,
    backTo,
  });
  const c = run.challenge;
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    setInputs({});
    setFeedback(null);
  }, [c?.id]);

  if (!c) {
    return (
      <MathGameLayout
        title="Pyramide des Nombres"
        emoji="🔺"
        level={level}
        index={run.index}
        total={run.total}
        score={run.score}
        xpPerCorrect={run.xpPerCorrect}
        finished={run.finished}
        backTo={backTo}
      >
        <p className="text-center font-dyslexic">Chargement...</p>
      </MathGameLayout>
    );
  }

  const upperRows = c.rows.slice(1);

  function check() {
    if (!c || feedback) return;
    const ok = upperRows.every((row, r) =>
      row.every((v, k) => Number(inputs[`${r}-${k}`]) === v)
    );
    setFeedback(ok ? "correct" : "wrong");
    if (ok) {
      run.submit(true);
    } else {
      sounds.wrong();
      setTimeout(() => setFeedback(null), 1200);
    }
  }

  function giveUp() {
    if (feedback) return;
    setFeedback("wrong");
    run.submit(false);
  }

  return (
    <MathGameLayout
      title="Pyramide des Nombres"
      emoji="🔺"
      level={level}
      index={run.index}
      total={run.total}
      score={run.score}
      xpPerCorrect={run.xpPerCorrect}
      finished={run.finished}
      backTo={backTo}
    >
      <p className="text-center font-dyslexic text-muted-foreground mb-6">
        Chaque brique est la <strong>somme des deux briques juste en dessous</strong>. Remplis
        jusqu'au sommet !
      </p>

      <div className="flex flex-col-reverse items-center gap-2">
        <div className="flex gap-2">
          {c.base.map((v, k) => (
            <div
              key={`b-${k}`}
              className="w-16 h-14 rounded-xl bg-kids-blue text-foreground font-bold text-xl flex items-center justify-center shadow"
            >
              {v}
            </div>
          ))}
        </div>
        {upperRows.map((row, r) => (
          <div key={`r-${r}`} className="flex gap-2">
            {row.map((_, k) => (
              <motion.input
                key={`i-${r}-${k}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                inputMode="numeric"
                aria-label={`Brique étage ${r + 2}, position ${k + 1}`}
                value={inputs[`${r}-${k}`] ?? ""}
                onChange={(e) =>
                  setInputs((p) => ({ ...p, [`${r}-${k}`]: e.target.value.replace(/\D/g, "") }))
                }
                disabled={feedback === "correct"}
                className={`w-16 h-14 rounded-xl text-center font-bold text-xl border-2 outline-none transition-colors ${
                  feedback === "correct"
                    ? "bg-kids-green-dark text-primary-foreground border-kids-green-dark"
                    : feedback === "wrong"
                      ? "border-destructive bg-destructive/10"
                      : "border-border bg-card focus:border-primary"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-8">
        <button
          onClick={check}
          disabled={feedback === "correct"}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl kids-shadow-card disabled:opacity-60"
        >
          <Check className="w-5 h-5" /> Vérifier
        </button>
        <button
          onClick={giveUp}
          disabled={feedback === "correct"}
          className="bg-muted text-foreground font-bold px-6 py-3 rounded-xl disabled:opacity-60"
        >
          Passer
        </button>
      </div>
    </MathGameLayout>
  );
};

export default PyramideNombresGame;
