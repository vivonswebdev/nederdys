import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { Confetti } from "@/components/Confetti";
import { BilingualText } from "@/components/ui/BilingualText";
import { AvatarBuddy } from "@/components/child/AvatarBuddy";
import type { ReactionTrigger } from "@/components/child/AvatarReaction";
import type { AvatarMood } from "@/lib/avatar";
import { speakStory, type Story, type StoryChoice } from "@/lib/stories";
import { sounds } from "@/lib/sounds";
import { bi } from "@/lib/bilingual";

interface Props {
  story: Story;
  childId?: string;
  childName?: string;
  childGender?: string | null;
  onComplete: () => void;
}

const UI_STORY = {
  next: bi("Verder", "Suivant"),
  finish: bi("Klaar!", "Terminé !"),
  listen: bi("Nog eens luisteren", "Réécouter"),
  softWrong: bi(
    "Niet helemaal, maar we gaan verder!",
    "Pas tout à fait, mais continuons l'histoire !"
  ),
  nice: bi("Goed geluisterd!", "Bien écouté !"),
};

export function StoryPlayer({ story, childId, childName, childGender, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [choiceFeedback, setChoiceFeedback] = useState<"correct" | "wrong" | null>(null);
  const [reaction, setReaction] = useState<ReactionTrigger | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const scene = story.scenes[index];
  const isLastScene = index === story.scenes.length - 1;

  useEffect(() => {
    if (!scene) return;
    setSelected(null);
    setChoiceFeedback(null);
    const timer = window.setTimeout(() => speakStory(scene.text, scene.audioUrl, scene.textFr), 300);
    return () => window.clearTimeout(timer);
  }, [scene]);

  const goNext = () => {
    if (isLastScene) {
      setShowCelebration(true);
      setReaction("levelup");
      sounds.correct();
      window.setTimeout(() => onComplete(), 2600);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleChoice = (option: StoryChoice) => {
    if (selected) return;
    setSelected(option.id);
    setChoiceFeedback(option.isCorrect ? "correct" : "wrong");
    if (option.isCorrect) {
      sounds.correct();
      setReaction("correct");
    }
    // Une mauvaise réponse ne bloque jamais : l'histoire continue.
    window.setTimeout(goNext, option.isCorrect ? 1100 : 1800);
  };

  const mood: AvatarMood =
    choiceFeedback === "correct" || showCelebration
      ? "happy"
      : scene?.choice && !selected
        ? "thinking"
        : "neutral";

  if (!scene) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {showCelebration && <Confetti />}

      {/* Barre de progression */}
      <div className="h-3 bg-muted rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${((index + 1) / story.scenes.length) * 100}%` }}
        />
      </div>

      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="font-dyslexic text-sm text-muted-foreground">
          {index + 1}/{story.scenes.length}
        </p>
        {childName && (
          <AvatarBuddy
            childId={childId}
            seed={childName}
            gender={childGender}
            mood={mood}
            trigger={reaction}
            onReactionDone={() => setReaction(null)}
            size="sm"
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="bg-card border-4 border-primary/30 rounded-3xl p-6 kids-shadow-card text-center"
        >
          <span className="text-7xl block mb-4" aria-hidden>
            {scene.image}
          </span>

          <p className="text-xl font-bold font-dyslexic mb-2">
            <BilingualText nl={scene.text} fr={scene.textFr} stacked />
          </p>

          <button
            type="button"
            onClick={() => speakStory(scene.text, scene.audioUrl, scene.textFr)}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full text-primary hover:bg-primary/10 font-bold"
          >
            <Volume2 className="w-5 h-5" />
            <BilingualText nl={UI_STORY.listen.nl} fr={UI_STORY.listen.fr} />
          </button>

          {/* Point de choix */}
          {scene.choice && (
            <div className="mt-6">
              <p className="font-bold mb-3">
                <BilingualText nl={scene.choice.question} fr={scene.choice.questionFr} stacked />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scene.choice.options.map((option) => {
                  const isPicked = selected === option.id;
                  const state = isPicked
                    ? option.isCorrect
                      ? "border-kids-green-dark bg-kids-green-light"
                      : "border-orange-400 bg-kids-orange/40"
                    : "border-border bg-card hover:border-primary";
                  return (
                    <div key={option.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleChoice(option)}
                        disabled={!!selected}
                        className={`flex-1 min-h-[44px] border-4 rounded-2xl p-3 font-bold transition-colors ${state}`}
                      >
                        <BilingualText nl={option.label} fr={option.labelFr} stacked />
                      </button>
                      <button
                        type="button"
                        aria-label={`Écouter : ${option.label}`}
                        onClick={() => speakStory(option.label, option.audioUrl, option.labelFr)}
                        className="min-w-[44px] min-h-[44px] rounded-full text-primary hover:bg-primary/10 inline-flex items-center justify-center"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {choiceFeedback && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 font-dyslexic font-bold"
                >
                  <BilingualText
                    nl={choiceFeedback === "correct" ? UI_STORY.nice.nl : UI_STORY.softWrong.nl}
                    fr={choiceFeedback === "correct" ? UI_STORY.nice.fr : UI_STORY.softWrong.fr}
                    stacked
                  />
                </motion.p>
              )}
            </div>
          )}

          {/* Bouton suivant (scènes sans choix) */}
          {!scene.choice && (
            <button
              type="button"
              onClick={goNext}
              className="mt-6 inline-flex items-center gap-2 min-h-[44px] bg-primary text-primary-foreground font-bold px-6 py-3 rounded-2xl kids-shadow-card"
            >
              {isLastScene ? "✅ " : "➡️ "}
              <BilingualText
                nl={isLastScene ? UI_STORY.finish.nl : UI_STORY.next.nl}
                fr={isLastScene ? UI_STORY.finish.fr : UI_STORY.next.fr}
              />
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Écran de fin */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 bg-kids-green-light border-4 border-kids-green-dark rounded-3xl p-6 text-center"
        >
          <span className="text-5xl block mb-2" aria-hidden>
            🎉
          </span>
          <p className="text-lg font-bold font-dyslexic">
            <BilingualText
              nl={`Je hebt het verhaal "${story.title}" goed gevolgd!`}
              fr={`Tu as bien suivi l'histoire « ${story.titleFr} » !`}
              stacked
            />
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default StoryPlayer;
