import { MathQuizGame } from "./MathQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { coffreFortChallenges } from "@/data/math/coffreFortChallenges";
import { MathLevel } from "@/lib/mathSession";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const CoffreFortGame = ({ childId, level, backTo }: Props) => (
  <MathQuizGame
    childId={childId}
    level={level}
    backTo={backTo}
    gameId="coffrefort"
    title="Le Coffre-Fort"
    emoji="🔐"
    pool={coffreFortChallenges}
    sessionSize={5}
    getOptions={(c) => c.options}
    isCorrect={(c, o) => String(o) === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    getAudio={(c) => ({ url: c.audioUrl, text: c.audioText })}
    renderPrompt={(c) => (
      <>
        <p className="text-sm font-bold font-dyslexic mb-3">
          <BilingualText {...biFromFr("Trouve le code du coffre :")} stacked />
        </p>
        <span className="text-5xl block mb-3">🔐</span>
        <ul className="space-y-2 text-left max-w-sm mx-auto">
          {c.clues.map((clue, i) => (
            <li
              key={clue}
              className="bg-secondary rounded-xl px-4 py-2 text-sm font-dyslexic"
            >
              🔎 <BilingualText nl={c.cluesNl[i] ?? clue} fr={clue} stacked />
            </li>
          ))}
        </ul>
      </>
    )}
  />
);

export default CoffreFortGame;
