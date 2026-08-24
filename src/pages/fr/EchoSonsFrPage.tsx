import { FrQuizGame } from "@/components/fr/FrQuizGame";
import { echoSonsFrChallenges } from "@/data/fr/echoSonsFrChallenges";

const EchoSonsFrPage = () => (
  <FrQuizGame
    gameId="echosonsfr"
    emoji="🔊"
    titleKey="game.echosonsfr.title"
    instructionKey="echosonsfr.instruction"
    pool={echoSonsFrChallenges}
    renderPrompt={(c) => (
      <p className="text-xl md:text-2xl font-bold leading-relaxed">{c.prompt}</p>
    )}
  />
);

export default EchoSonsFrPage;
