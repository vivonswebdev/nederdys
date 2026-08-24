import { NlQuizGame } from "@/components/nl/NlQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { magicienMotsChallenges, SPELL_LABEL } from "@/data/nl/magicienMotsChallenges";

const MagicienMotsGame = () => (
  <NlQuizGame
    gameId="magicienmots"
    emoji="🪄"
    titleKey="game.magicienmots.title"
    instructionKey="magicienmots.instruction"
    pool={magicienMotsChallenges}
    optionsClassName="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
    getOptions={(c) => c.options}
    isCorrect={(c, o) => o === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    speakText={(c) => c.word}
    renderPrompt={(c) => (
      <>
        <p className="text-sm font-bold text-primary mb-2">
          <BilingualText {...SPELL_LABEL[c.spell]} />
        </p>
        <p className="text-4xl md:text-5xl font-bold">✨ {c.word}</p>
        <p className="text-sm text-muted-foreground mt-2">
          <BilingualText nl={c.word} fr={c.wordFr} />
        </p>
      </>
    )}
  />
);

export default MagicienMotsGame;
