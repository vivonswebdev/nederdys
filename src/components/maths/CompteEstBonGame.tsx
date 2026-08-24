import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { MathLevel } from "@/lib/mathSession";
import { useMathGameRun } from "@/hooks/useMathGameRun";
import { MathGameLayout } from "@/components/maths/MathGameLayout";
import { compteEstBonChallenges } from "@/data/math/compteEstBonChallenges";
import { sounds } from "@/lib/sounds";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

interface Token {
  id: string;
  value: number;
}

const apply = (a: number, op: string, b: number) =>
  op === "+" ? a + b : op === "-" ? a - b : a * b;

export const CompteEstBonGame = ({ childId, level, backTo }: Props) => {
  const run = useMathGameRun({
    pool: compteEstBonChallenges,
    level,
    gameId: "compte_est_bon",
    childId,
    backTo,
  });
  const c = run.challenge;

  const [tokens, setTokens] = useState<Token[]>([]);
  const [selected, setSelected] = useState<Token | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!c) return;
    setTokens(c.numbers.map((v, i) => ({ id: `${c.id}-${i}`, value: v })));
    setSelected(null);
    setOp(null);
    setHistory([]);
    setDone(false);
  }, [c]);

  if (!c) {
    return (
      <MathGameLayout
        title="Le Compte est Bon"
        emoji="🎯"
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

  function pick(tok: Token) {
    if (done) return;
    sounds.click();
    if (!selected) {
      setSelected(tok);
      return;
    }
    if (selected.id === tok.id) {
      setSelected(null);
      return;
    }
    if (!op) return;
    const value = apply(selected.value, op, tok.value);
    const line = `${selected.value} ${op} ${tok.value} = ${value}`;
    const next = [
      ...tokens.filter((t) => t.id !== selected.id && t.id !== tok.id),
      { id: `${tok.id}-r${history.length}`, value },
    ];
    setTokens(next);
    setHistory((h) => [...h, line]);
    setSelected(null);
    setOp(null);

    if (value === c!.target) {
      setDone(true);
      run.submit(true);
    } else if (next.length === 1) {
      setDone(true);
      run.submit(false);
    }
  }

  function reset() {
    if (!c || done) return;
    sounds.click();
    setTokens(c.numbers.map((v, i) => ({ id: `${c.id}-${i}`, value: v })));
    setSelected(null);
    setOp(null);
    setHistory([]);
  }

  return (
    <MathGameLayout
      title="Le Compte est Bon"
      emoji="🎯"
      level={level}
      index={run.index}
      total={run.total}
      score={run.score}
      xpPerCorrect={run.xpPerCorrect}
      finished={run.finished}
      backTo={backTo}
    >
      <div className="text-center mb-6">
        <p className="font-dyslexic text-muted-foreground"><BilingualText {...biFromFr("Atteins le nombre cible :")} /></p>
        <motion.p
          key={c.target}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-5xl font-bold text-primary tabular-nums"
        >
          {c.target}
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {tokens.map((t) => (
          <button
            key={t.id}
            onClick={() => pick(t)}
            disabled={done}
            className={`w-20 h-16 rounded-2xl text-2xl font-bold shadow transition-transform hover:scale-105 ${
              selected?.id === t.id
                ? "bg-primary text-primary-foreground scale-105"
                : "bg-kids-blue text-foreground"
            }`}
          >
            {t.value}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {c.operators.map((o) => (
          <button
            key={o}
            onClick={() => {
              sounds.click();
              setOp(o);
            }}
            disabled={done}
            className={`w-14 h-14 rounded-full text-2xl font-bold ${
              op === o ? "bg-kids-orange text-foreground scale-110" : "bg-muted text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-muted text-foreground font-bold px-4 rounded-full"
        >
          <RotateCcw className="w-4 h-4" /> <BilingualText {...biFromFr("Recommencer")} />
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground font-dyslexic mb-3">
        <BilingualText {...biFromFr("Choisis un nombre, une opération, puis un second nombre.")} />
      </p>

      <ul className="max-w-xs mx-auto space-y-1 text-center font-bold">
        {history.map((h, i) => (
          <li key={i} className="text-foreground tabular-nums">
            {h}
          </li>
        ))}
      </ul>
    </MathGameLayout>
  );
};

export default CompteEstBonGame;
