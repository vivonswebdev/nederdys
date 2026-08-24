import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { dicteeMuetteChallenges } from "@/data/fr/dicteeMuetteChallenges";

/** Dictée Muette : l'énoncé reste caché, l'enfant se fie uniquement à l'audio. */
const DicteeMuettePage = () => (
  <FrQuizGame
    gameId="dicteemuette"
    emoji="🤫"
    titleKey="game.dicteemuette.title"
    instructionKey="dicteemuette.instruction"
    pool={dicteeMuetteChallenges}
    hidePrompt
    optionsClassName="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
  />
);

export default DicteeMuettePage;
