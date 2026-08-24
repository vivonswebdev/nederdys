import { NlQuizGame } from "@/components/nl/NlQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { rimeMalinChallenges } from "@/data/nl/rimeMalinChallenges";

const RimeMalinGame = () => (
  <NlQuizGame
    gameId="rimemalin"
    emoji="🎵"
    titleKey="game.rimemalin.title"
    instructionKey="rimemalin.instruction"
    pool={rimeMalinChallenges}
    getOptions={(c) => c.options}
    isCorrect={(c, o) => o === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    speakText={(c) => c.word}
    renderPrompt={(c) => (
      <>
        <p className="text-4xl md:text-5xl font-bold">{c.word}</p>
        <p className="text-sm text-muted-foreground mt-2">
          <BilingualText nl={c.word} fr={c.wordFr} />
        </p>
      </>
    )}
  />
);

export default RimeMalinGame;
