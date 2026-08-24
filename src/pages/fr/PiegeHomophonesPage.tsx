import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { piegeHomophonesChallenges } from "@/data/fr/piegeHomophonesChallenges";

const PiegeHomophonesPage = () => (
  <FrQuizGame
    gameId="piegehomophones"
    emoji="🪤"
    titleKey="game.piegehomophones.title"
    instructionKey="piegehomophones.instruction"
    pool={piegeHomophonesChallenges}
    renderPrompt={(c) => (
      <>
        <p className="text-2xl md:text-3xl font-bold">{c.prompt}</p>
        {c.hint && <p className="text-sm text-muted-foreground mt-2">{c.hint}</p>}
      </>
    )}
  />
);

export default PiegeHomophonesPage;
