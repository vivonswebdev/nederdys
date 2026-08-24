import { NlQuizGame } from "@/components/nl/NlQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { dialogueEclairChallenges } from "@/data/nl/dialogueEclairChallenges";

const DialogueEclairGame = () => (
  <NlQuizGame
    gameId="dialogueeclair"
    emoji="⚡"
    titleKey="game.dialogueeclair.title"
    instructionKey="dialogueeclair.instruction"
    pool={dialogueEclairChallenges}
    optionsClassName="grid grid-cols-1 gap-3 w-full"
    getOptions={(c) => c.options}
    isCorrect={(c, o) => o === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    speakText={(c) => c.line1}
    renderPrompt={(c) => (
      <>
        <p className="text-2xl md:text-3xl font-bold">🧒 {c.line1}</p>
        <p className="text-sm text-muted-foreground mt-2">
          <BilingualText nl={c.line1} fr={c.line1Fr} />
        </p>
        <p className="text-2xl md:text-3xl font-bold mt-4">👦 …</p>
      </>
    )}
  />
);

export default DialogueEclairGame;
