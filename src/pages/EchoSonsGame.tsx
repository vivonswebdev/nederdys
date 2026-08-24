import { NlQuizGame } from "@/components/nl/NlQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { echoSonsChallenges } from "@/data/nl/echoSonsChallenges";

const EchoSonsGame = () => (
  <NlQuizGame
    gameId="echosons"
    emoji="🔊"
    titleKey="game.echosons.title"
    instructionKey="echosons.instruction"
    pool={echoSonsChallenges}
    optionsClassName="grid grid-cols-3 gap-3 w-full"
    getOptions={(c) => c.options}
    isCorrect={(c, o) => o === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    speakText={(c) => c.word}
    renderPrompt={(c) => (
      <>
        <p className="text-4xl md:text-5xl font-bold tracking-wide">{c.word}</p>
        <p className="text-sm text-muted-foreground mt-2">
          <BilingualText nl={c.word} fr={c.wordFr} />
        </p>
      </>
    )}
  />
);

export default EchoSonsGame;
