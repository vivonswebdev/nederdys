import { motion } from "framer-motion";
import { MathQuizGame } from "./MathQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { desMathsChallenges, DICE_FACE } from "@/data/math/desMathsChallenges";
import { MathLevel } from "@/lib/mathSession";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

const Dice = ({ value, delay }: { value: number; delay: number }) => (
  <motion.div
    initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
    animate={{ rotate: 0, scale: 1, opacity: 1 }}
    transition={{ delay, type: "spring", stiffness: 120, damping: 10 }}
    className="w-20 h-20 rounded-2xl bg-card border-4 border-border flex items-center justify-center"
  >
    <span className="text-5xl leading-none">{DICE_FACE[value] ?? value}</span>
  </motion.div>
);

export const DesMathsGame = ({ childId, level, backTo }: Props) => (
  <MathQuizGame
    childId={childId}
    level={level}
    backTo={backTo}
    gameId="desmaths"
    title="Les Dés Mathématiques"
    emoji="🎲"
    pool={desMathsChallenges}
    sessionSize={5}
    getOptions={(c) => c.options}
    isCorrect={(c, o) => String(o) === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    getAudio={(c) => ({ url: c.audioUrl, text: c.audioText })}
    renderPrompt={(c) => (
      <>
        <p className="text-sm font-bold font-dyslexic mb-3">
          <BilingualText {...biFromFr("Les dés sont lancés, calcule !")} stacked />
        </p>
        <div key={c.id} className="flex items-center justify-center gap-4">
          <Dice value={c.diceA} delay={0} />
          <span className="text-4xl font-bold">{c.op}</span>
          <Dice value={c.diceB} delay={0.15} />
        </div>
        <p className="text-2xl font-bold font-dyslexic mt-3">
          {c.diceA} {c.op} {c.diceB} = ?
        </p>
      </>
    )}
  />
);

export default DesMathsGame;
