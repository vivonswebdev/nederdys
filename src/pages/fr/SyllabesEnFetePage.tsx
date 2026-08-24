import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { syllabesFeteChallenges } from "@/data/fr/syllabesFeteChallenges";

const SyllabesEnFetePage = () => (
  <FrQuizGame
    gameId="syllabesfete"
    emoji="🎉"
    titleKey="game.syllabesfete.title"
    instructionKey="syllabesfete.instruction"
    pool={syllabesFeteChallenges}
  />
);

export default SyllabesEnFetePage;
