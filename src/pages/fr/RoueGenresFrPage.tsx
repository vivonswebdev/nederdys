import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { roueGenresFrChallenges } from "@/data/fr/roueGenresFrChallenges";

const RoueGenresFrPage = () => (
  <FrQuizGame
    gameId="rouegenresfr"
    emoji="🎡"
    titleKey="game.rouegenresfr.title"
    instructionKey="rouegenresfr.instruction"
    pool={roueGenresFrChallenges}
    renderPrompt={(c) => (
      <>
        <p className="text-3xl md:text-4xl font-bold">{c.prompt}</p>
        {c.hint && <p className="text-sm text-muted-foreground mt-2">{c.hint}</p>}
      </>
    )}
  />
);

export default RoueGenresFrPage;
