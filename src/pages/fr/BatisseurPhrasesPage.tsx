import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { batisseurPhrasesChallenges } from "@/data/fr/batisseurPhrasesChallenges";

const BatisseurPhrasesPage = () => (
  <FrQuizGame
    gameId="batisseurphrases"
    emoji="🧱"
    titleKey="game.batisseurphrases.title"
    instructionKey="batisseurphrases.instruction"
    pool={batisseurPhrasesChallenges}
    optionsClassName="grid grid-cols-1 gap-3 w-full"
  />
);

export default BatisseurPhrasesPage;
