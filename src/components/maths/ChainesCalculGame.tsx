import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MathLevel } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { chainesCalculChallenges } from "@/data/math/chainesCalculChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const ChainesCalculGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: chainesCalculChallenges,
    level,
    gameId: "chaines_calcul",
    childId,
    backTo,
  });
  const c = run.challenge;

  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [mistake, setMistake] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setStep(0);
    setValue("");
    setWrong(false);
    setMistake(false);
    setLocked(false);
  }, [c?.id]);

  if (!c) {
    return (
      <MathGameLayout
        title="Chaînes de Calcul"
        emoji="🔗"
        level={level}
        index={run.index}
        total={run.total}
        score={run.score}
        xpPerCorrect={run.xpPerCorrect}
        finished={run.finished}
        backTo={backTo}
      >
        <p className="text-center font-dyslexic"><BilingualText {...biFromFr("Chargement...")} /></p>
      </MathGameLayout>
    );
  }

  const current = c.steps[step];

  function validate() {
    if (locked || !current) return;
    if (Number(value) === current.result) {
      sounds.correct();
      setWrong(false);
      setValue("");
      if (step >= c!.steps.length - 1) {
        setLocked(true);
        run.submit(!mistake);
      } else {
        setStep((s) => s + 1);
      }
    } else {
      sounds.wrong();
      setWrong(true);
      setMistake(true);
      setTimeout(() => setWrong(false), 900);
    }
  }

  return (
    <MathGameLayout
      title="Chaînes de Calcul"
      emoji="🔗"
      level={level}
      index={run.index}
      total={run.total}
      score={run.score}
      xpPerCorrect={run.xpPerCorrect}
      finished={run.finished}
      backTo={backTo}
    >
      <p className="text-center font-dyslexic text-muted-foreground mb-6">
        <BilingualText {...biFromFr("Suis la chaîne : calcule chaque étape l'une après l'autre.")} />
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="w-20 h-16 rounded-2xl bg-kids-blue text-foreground font-bold text-2xl flex items-center justify-center shadow">
          {c.start}
        </div>
        {c.steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xl font-bold text-muted-foreground">
              {s.op} {s.value} →
            </span>
            <div
              className={`w-20 h-16 rounded-2xl font-bold text-2xl flex items-center justify-center shadow ${
                i < step
                  ? "bg-kids-green-dark text-primary-foreground"
                  : i === step
                    ? "bg-card border-2 border-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? s.result : i === step ? "?" : ""}
            </div>
          </div>
        ))}
      </div>

      {!locked && current && (
        <motion.div
          animate={wrong ? { x: [-8, 8, -6, 0] } : { x: 0 }}
          className="flex justify-center gap-3 mt-8"
        >
          <input
            inputMode="numeric"
            autoFocus
            aria-label="Résultat de l'étape"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^\d-]/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && validate()}
            className={`w-32 h-14 rounded-xl text-center text-2xl font-bold border-2 outline-none ${
              wrong ? "border-destructive bg-destructive/10" : "border-border bg-card focus:border-primary"
            }`}
          />
          <button
            onClick={validate}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 rounded-xl kids-shadow-card"
          >
            <Check className="w-5 h-5" /> <BilingualText {...biFromFr("Valider")} />
          </button>
        </motion.div>
      )}
    </MathGameLayout>
  );
};

export default ChainesCalculGame;
