import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { bullesMotsFrChallenges } from "@/data/fr/bullesMotsFrChallenges";

const BullesMotsFrPage = () => (
  <FrQuizGame
    gameId="bullesmotsfr"
    emoji="🎈"
    titleKey="game.bullesmotsfr.title"
    instructionKey="bullesmotsfr.instruction"
    pool={bullesMotsFrChallenges}
    renderPrompt={(c) => (
      <p className="text-6xl md:text-7xl" aria-hidden>
        {c.prompt}
      </p>
    )}
  />
);

export default BullesMotsFrPage;
