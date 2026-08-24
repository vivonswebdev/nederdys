import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { deSyllabesFrChallenges } from "@/data/fr/deSyllabesFrChallenges";

const DeSyllabesFrPage = () => (
  <FrQuizGame
    gameId="desyllabesfr"
    emoji="🎲"
    titleKey="game.desyllabesfr.title"
    instructionKey="desyllabesfr.instruction"
    pool={deSyllabesFrChallenges}
  />
);

export default DeSyllabesFrPage;
