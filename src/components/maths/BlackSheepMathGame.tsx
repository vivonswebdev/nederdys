import { MathQuizGame } from "./MathQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { blackSheepMathChallenges } from "@/data/math/blackSheepMathChallenges";
import { MathLevel, pickSession } from "@/lib/mathSession";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const BlackSheepMathGame = ({ childId, level, backTo }: Props) => (
  <MathQuizGame
    childId={childId}
    level={level}
    backTo={backTo}
    gameId="mouton_noir_maths"
    title="Le Mouton Noir Maths"
    emoji="🐑"
    pool={blackSheepMathChallenges}
    sessionSize={5}
    // Les nombres sont re-mélangés à chaque défi
    getOptions={(c) => pickSession(c.numbers, c.numbers.length)}
    isCorrect={(c, o) => Number(o) === c.numbers[c.intruderIndex]}
    correctLabel={(c) => String(c.numbers[c.intruderIndex])}
    getAudio={(c) => ({ url: c.audioUrl, text: c.audioText })}
    optionsClassName="grid grid-cols-2 sm:grid-cols-5 gap-3"
    renderPrompt={(c) => (
      <p className="text-xl font-bold font-dyslexic">
        <BilingualText {...biFromFr(c.rule)} stacked />
      </p>
    )}
  />
);

export default BlackSheepMathGame;
