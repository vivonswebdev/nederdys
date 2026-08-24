import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { rimeMalinFrChallenges } from "@/data/fr/rimeMalinFrChallenges";

const RimeMalinFrPage = () => (
  <FrQuizGame
    gameId="rimemalinfr"
    emoji="🎵"
    titleKey="game.rimemalinfr.title"
    instructionKey="rimemalinfr.instruction"
    pool={rimeMalinFrChallenges}
  />
);

export default RimeMalinFrPage;
