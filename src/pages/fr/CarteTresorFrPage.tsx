import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { carteTresorFrChallenges } from "@/data/fr/carteTresorFrChallenges";

const CarteTresorFrPage = () => (
  <FrQuizGame
    gameId="cartetresorfr"
    emoji="🗺️"
    titleKey="game.cartetresorfr.title"
    instructionKey="cartetresorfr.instruction"
    pool={carteTresorFrChallenges}
    optionsClassName="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
  />
);

export default CarteTresorFrPage;
