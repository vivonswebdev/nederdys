import { MathQuizGame } from "./MathQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { numberShooterChallenges } from "@/data/math/numberShooterChallenges";
import { MathLevel, pickSession } from "@/lib/mathSession";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const NumberShooterGame = ({ childId, level, backTo }: Props) => (
  <MathQuizGame
    childId={childId}
    level={level}
    backTo={backTo}
    gameId="tir_aux_nombres"
    title="Le Tir aux Nombres"
    emoji="🎯"
    pool={numberShooterChallenges}
    sessionSize={5}
    // Le bon nombre est TOUJOURS fusionné aux distracteurs, sans doublon
    getOptions={(c) => {
      const unique = Array.from(new Set([c.targetNumber, ...c.distractors]));
      return pickSession(unique, unique.length);
    }}
    isCorrect={(c, o) => Number(o) === c.targetNumber}
    correctLabel={(c) => String(c.targetNumber)}
    getAudio={(c) => ({ url: c.audioUrl, text: c.audioText })}
    getTimeLimit={(c) => c.timeLimit}
    optionsClassName="grid grid-cols-2 sm:grid-cols-5 gap-3"
    renderPrompt={(c) => (
      <>
        <p className="text-xl font-bold font-dyslexic">
          <BilingualText {...biFromFr("Trouve le nombre :")} stacked />
        </p>
        <p className="text-4xl font-bold mt-1">{c.audioText}</p>
      </>
    )}
  />
);

export default NumberShooterGame;
