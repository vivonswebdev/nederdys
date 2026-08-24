import { MathQuizGame } from "./MathQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { magicEarChallenges } from "@/data/math/magicEarChallenges";
import { MathLevel } from "@/lib/mathSession";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const MagicEarGame = ({ childId, level, backTo }: Props) => (
  <MathQuizGame
    childId={childId}
    level={level}
    backTo={backTo}
    gameId="oreille_nombres"
    title="L'Oreille des Nombres"
    emoji="👂"
    pool={magicEarChallenges}
    sessionSize={5}
    getOptions={(c) => c.options}
    isCorrect={(c, o) => Number(o) === c.correctAnswer}
    correctLabel={(c) => String(c.correctAnswer)}
    getAudio={(c) => ({ url: c.audioUrl, text: c.audioText })}
    renderPrompt={() => (
      <p className="text-2xl font-bold font-dyslexic">
        <BilingualText {...biFromFr("Écoute bien, puis clique sur le nombre entendu 🎧")} stacked />
      </p>
    )}
  />
);

export default MagicEarGame;
