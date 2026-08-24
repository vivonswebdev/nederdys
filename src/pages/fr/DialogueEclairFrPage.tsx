import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { dialogueEclairFrChallenges } from "@/data/fr/dialogueEclairFrChallenges";

const DialogueEclairFrPage = () => (
  <FrQuizGame
    gameId="dialogueeclairfr"
    emoji="⚡"
    titleKey="game.dialogueeclairfr.title"
    instructionKey="dialogueeclairfr.instruction"
    pool={dialogueEclairFrChallenges}
    optionsClassName="grid grid-cols-1 gap-3 w-full"
    renderPrompt={(c) => (
      <p className="text-lg md:text-xl font-bold whitespace-pre-line leading-relaxed text-left">
        {c.prompt}
      </p>
    )}
  />
);

export default DialogueEclairFrPage;
