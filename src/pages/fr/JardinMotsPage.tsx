import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { jardinMotsChallenges } from "@/data/fr/jardinMotsChallenges";

const JardinMotsPage = () => (
  <FrQuizGame
    gameId="jardinmots"
    emoji="🌷"
    titleKey="game.jardinmots.title"
    instructionKey="jardinmots.instruction"
    pool={jardinMotsChallenges}
    renderPrompt={(c) => (
      <>
        <p className="text-7xl" aria-hidden>
          {c.prompt}
        </p>
        <p className="text-sm text-muted-foreground mt-2">Quel mot correspond à l'image ?</p>
      </>
    )}
  />
);

export default JardinMotsPage;
