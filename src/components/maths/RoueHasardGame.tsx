import { motion } from "framer-motion";
import { MathQuizGame } from "./MathQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { roueHasardChallenges } from "@/data/math/roueHasardChallenges";
import { MathLevel } from "@/lib/mathSession";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const RoueHasardGame = ({ childId, level, backTo }: Props) => (
  <MathQuizGame
    childId={childId}
    level={level}
    backTo={backTo}
    gameId="rouehasard"
    title="La Roue du Hasard"
    emoji="🎡"
    pool={roueHasardChallenges}
    sessionSize={5}
    getOptions={(c) => c.options}
    isCorrect={(c, o) => String(o) === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    getAudio={(c) => ({ url: c.audioUrl, text: c.audioText })}
    renderPrompt={(c) => (
      <>
        <p className="text-sm font-bold font-dyslexic mb-3">
          <BilingualText {...biFromFr("La roue s'arrête sur :")} stacked />
        </p>
        <motion.div
          key={c.id}
          initial={{ rotate: -540, scale: 0.7 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          className="mx-auto w-40 h-40 rounded-full border-8 border-kids-orange bg-kids-yellow flex items-center justify-center"
        >
          <span className="text-3xl md:text-4xl font-bold font-dyslexic">{c.display}</span>
        </motion.div>
      </>
    )}
  />
);

export default RoueHasardGame;
