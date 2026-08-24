import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { chasseurErreursFrChallenges } from "@/data/fr/chasseurErreursFrChallenges";

const ChasseurErreursFrPage = () => (
  <FrQuizGame
    gameId="chasseurerreursfr"
    emoji="🔍"
    titleKey="game.chasseurerreursfr.title"
    instructionKey="chasseurerreursfr.instruction"
    pool={chasseurErreursFrChallenges}
    optionsClassName="grid grid-cols-2 gap-3 w-full"
    renderPrompt={(c) => (
      <p className="text-lg md:text-xl font-bold leading-relaxed">{c.prompt}</p>
    )}
  />
);

export default ChasseurErreursFrPage;
