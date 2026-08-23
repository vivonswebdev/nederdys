import { MathQuizGame } from "./MathQuizGame";
import { holeyNumberChallenges } from "@/data/math/holeyNumberChallenges";
import { MathLevel } from "@/lib/mathSession";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const HoleyNumberGame = ({ childId, level, backTo }: Props) => (
  <MathQuizGame
    childId={childId}
    level={level}
    backTo={backTo}
    gameId="nombre_troue"
    title="Le Nombre Troué"
    emoji="🕳️"
    pool={holeyNumberChallenges}
    sessionSize={5}
    getOptions={(c) => c.options}
    isCorrect={(c, o) => String(o) === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    getAudio={(c) => ({ url: c.audioUrl, text: c.audioText })}
    renderPrompt={(c) => (
      <p className="text-5xl md:text-6xl font-bold tracking-widest font-dyslexic">{c.display}</p>
    )}
  />
);

export default HoleyNumberGame;
