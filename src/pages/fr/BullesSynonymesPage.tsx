import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { bullesSynonymesChallenges } from "@/data/fr/bullesSynonymesChallenges";

const BullesSynonymesPage = () => (
  <FrQuizGame
    gameId="bullessynonymes"
    emoji="🫧"
    titleKey="game.bullessynonymes.title"
    instructionKey="bullessynonymes.instruction"
    pool={bullesSynonymesChallenges}
  />
);

export default BullesSynonymesPage;
