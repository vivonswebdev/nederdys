import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { chasseSonsChallenges } from "@/data/fr/chasseSonsChallenges";

const ChasseSonsPage = () => (
  <FrQuizGame
    gameId="chassesonsfr"
    emoji="🎯"
    titleKey="game.chassesonsfr.title"
    instructionKey="chassesonsfr.instruction"
    pool={chasseSonsChallenges}
  />
);

export default ChasseSonsPage;
