import { MathQuizGame } from "./MathQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { marathonMentalChallenges } from "@/data/math/marathonMentalChallenges";
import { MathLevel } from "@/lib/mathSession";

interface Props {
  childId: string;
  level: MathLevel;
  backTo: string;
}

export const MarathonMentalGame = ({ childId, level, backTo }: Props) => (
  <MathQuizGame
    childId={childId}
    level={level}
    backTo={backTo}
    gameId="marathonmental"
    title="Marathon Mental"
    emoji="🏃"
    pool={marathonMentalChallenges}
    sessionSize={6}
    getOptions={(c) => c.options}
    isCorrect={(c, o) => String(o) === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    getAudio={(c) => ({ url: c.audioUrl, text: c.audioText })}
    getTimeLimit={(c) => c.timeLimit}
    renderPrompt={(c) => (
      <>
        <p className="text-sm font-bold font-dyslexic mb-2">
          <BilingualText {...biFromFr("Ne t'arrête pas, continue à courir !")} stacked />
        </p>
        <p className="text-5xl md:text-6xl font-bold font-dyslexic">{c.display}</p>
        <div className="mt-4 h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-kids-green-dark rounded-full transition-all"
            style={{ width: `${(c.km / 10) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">🏁 km {c.km}/10</p>
      </>
    )}
  />
);

export default MarathonMentalGame;
