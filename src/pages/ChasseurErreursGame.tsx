import { NlQuizGame } from "@/components/nl/NlQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { chasseurErreursChallenges } from "@/data/nl/chasseurErreursChallenges";

const ChasseurErreursGame = () => (
  <NlQuizGame
    gameId="chasseurerreurs"
    emoji="🔍"
    titleKey="game.chasseurerreurs.title"
    instructionKey="chasseurerreurs.instruction"
    pool={chasseurErreursChallenges}
    optionsClassName="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
    getOptions={(c) => c.options}
    isCorrect={(c, o) => o === c.correctAnswer}
    correctLabel={(c) => `${c.correctAnswer} → ${c.fix}`}
    speakText={(c) => c.sentence}
    renderPrompt={(c) => (
      <>
        <p className="text-2xl md:text-3xl font-bold">{c.sentence}</p>
        <p className="text-sm text-muted-foreground mt-2">
          <BilingualText nl={c.sentence} fr={c.sentenceFr} />
        </p>
      </>
    )}
  />
);

export default ChasseurErreursGame;
