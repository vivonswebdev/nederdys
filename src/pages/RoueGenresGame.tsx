import { NlQuizGame } from "@/components/nl/NlQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { roueGenresChallenges } from "@/data/nl/roueGenresChallenges";

const RoueGenresGame = () => (
  <NlQuizGame
    gameId="rouegenres"
    emoji="🎡"
    titleKey="game.rouegenres.title"
    instructionKey="rouegenres.instruction"
    pool={roueGenresChallenges}
    optionsClassName="grid grid-cols-2 gap-4 w-full max-w-sm"
    getOptions={() => ["de", "het"]}
    isCorrect={(c, o) => o === c.correctAnswer}
    correctLabel={(c) => `${c.correctAnswer} ${c.word}`}
    speakText={(c) => c.word}
    renderPrompt={(c) => (
      <>
        <p className="text-4xl md:text-5xl font-bold">
          <span className="text-muted-foreground">___</span> {c.word}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          <BilingualText nl={c.word} fr={c.wordFr} />
        </p>
        <p className="text-xs text-muted-foreground mt-3 italic">
          <BilingualText nl={c.hintNl} fr={c.hintFr} />
        </p>
      </>
    )}
  />
);

export default RoueGenresGame;
