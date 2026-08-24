import { motion } from "framer-motion";
import { NlQuizGame } from "@/components/nl/NlQuizGame";
import { BilingualText } from "@/components/ui/BilingualText";
import { deSyllabesChallenges } from "@/data/nl/deSyllabesChallenges";

const DeSyllabesGame = () => (
  <NlQuizGame
    gameId="desyllabes"
    emoji="🎲"
    titleKey="game.desyllabes.title"
    instructionKey="desyllabes.instruction"
    pool={deSyllabesChallenges}
    getOptions={(c) => c.faces}
    isCorrect={(c, o) => o === c.correctAnswer}
    correctLabel={(c) => c.correctAnswer}
    speakText={(c) => c.fullWord}
    renderPrompt={(c) => (
      <>
        <motion.span
          key={c.id}
          initial={{ rotate: -180, scale: 0.4 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-5xl block mb-3"
        >
          🎲
        </motion.span>
        <p className="text-4xl md:text-5xl font-bold tracking-wider">{c.display}</p>
        <p className="text-sm text-muted-foreground mt-2">
          <BilingualText nl={c.fullWord} fr={c.wordFr} />
        </p>
      </>
    )}
  />
);

export default DeSyllabesGame;
