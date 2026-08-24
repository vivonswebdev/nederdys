import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { completeHistoireChallenges } from "@/data/fr/completeHistoireChallenges";

const CompleteHistoirePage = () => (
  <FrQuizGame
    gameId="completehistoire"
    emoji="📖"
    titleKey="game.completehistoire.title"
    instructionKey="completehistoire.instruction"
    pool={completeHistoireChallenges}
    optionsClassName="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
    renderPrompt={(c) => (
      <p className="text-xl md:text-2xl font-bold whitespace-pre-line leading-relaxed">{c.prompt}</p>
    )}
  />
);

export default CompleteHistoirePage;
