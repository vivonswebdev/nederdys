import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";
import { useAuth } from "@/contexts/AuthContext";
import { getCodeEpisode, trackOfEpisode } from "@/data/code/curriculum";
import { CODE_PASS_THRESHOLD, quizLevel, saveEpisodeResult } from "@/lib/codeCourse";
import { biToast } from "@/lib/biToast";
import { bi, speakBoth, useChildLanguage } from "@/lib/bilingual";
import { playCorrect, playWrong } from "@/lib/sounds";

type Phase = "slides" | "quiz" | "result";

const CodeEpisodePage = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const childLang = useChildLanguage();
  const queryClient = useQueryClient();

  const episode = getCodeEpisode(episodeId);
  const [phase, setPhase] = useState<Phase>("slides");
  const [slideIndex, setSlideIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [saved, setSaved] = useState(false);

  if (!episode) return <Navigate to={id ? `/child/${id}/code` : "/enfant"} replace />;

  const backTo = id ? `/child/${id}/code` : "/enfant";
  const total = episode.quiz.length;
  const scorePct = Math.round((correct / total) * 100);

  const finish = async (finalCorrect: number) => {
    setPhase("result");
    if (!user || !id || saved) return;
    setSaved(true);
    const pct = Math.round((finalCorrect / total) * 100);
    const res = await saveEpisodeResult({
      userId: user.id,
      childId: id,
      episodeId: episode.id,
      scorePct: pct,
      correct: finalCorrect,
      total,
      durationSeconds: Math.round((Date.now() - startedAt) / 1000),
    });
    queryClient.invalidateQueries({ queryKey: ["codeProgress", id] });
    if (res.xpAwarded > 0) {
      biToast.success(bi(`+${res.xpAwarded} XP! 🎉`, `+${res.xpAwarded} XP ! 🎉`));
    }
  };

  const answer = (index: number) => {
    if (picked !== null) return;
    setPicked(index);
    const isRight = index === episode.quiz[qIndex].answer;
    const next = correct + (isRight ? 1 : 0);
    if (isRight) {
      setCorrect(next);
      playCorrect();
      biToast.success(bi("Juist! 👏", "Correct ! 👏"));
    } else {
      playWrong();
      const good = episode.quiz[qIndex].options[episode.quiz[qIndex].answer];
      biToast.error(bi(`Bijna! Antwoord: ${good.nl}`, `Presque ! Réponse : ${good.fr}`));
    }
    window.setTimeout(() => {
      setPicked(null);
      if (qIndex + 1 < total) setQIndex(qIndex + 1);
      else finish(next);
    }, 1400);
  };

  const slide = episode.slides[slideIndex];
  const question = episode.quiz[qIndex];
  const lvl = quizLevel(scorePct);
  const passed = scorePct >= CODE_PASS_THRESHOLD;
  const track = trackOfEpisode(episode.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-2xl px-4 py-8">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <BilingualText nl="Terug" fr="Retour" />
        </Link>

        <h1 className="text-2xl font-bold text-center mb-1">
          <span aria-hidden>{episode.emoji} </span>
          <BilingualText nl={episode.title.nl} fr={episode.title.fr} stacked />
        </h1>
        <p className="text-center text-xs text-muted-foreground mb-8">
          {track?.emoji} {track?.ages} <BilingualText nl="jaar" fr="ans" />
        </p>

        {phase === "slides" && (
          <motion.section
            key={slideIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border-4 border-primary/30 rounded-3xl p-6 text-center kids-shadow-card"
          >
            <span className="text-6xl block mb-4" aria-hidden>
              {slide.emoji}
            </span>
            <p className="text-lg font-dyslexic">
              <BilingualText nl={slide.text.nl} fr={slide.text.fr} stacked />
            </p>
            {slide.tip && (
              <p className="mt-4 text-sm bg-secondary/40 rounded-2xl px-4 py-3 font-dyslexic">
                💡 <BilingualText nl={slide.tip.nl} fr={slide.tip.fr} stacked />
              </p>
            )}

            <button
              type="button"
              onClick={() => speakBoth(slide.text, childLang)}
              aria-label={childLang === "fr" ? "Écouter" : "Luister"}
              className="mt-4 inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-primary hover:bg-primary/10"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between gap-3 mt-6">
              <span className="text-sm text-muted-foreground tabular-nums">
                {slideIndex + 1}/{episode.slides.length}
              </span>
              <button
                onClick={() =>
                  slideIndex + 1 < episode.slides.length
                    ? setSlideIndex(slideIndex + 1)
                    : setPhase("quiz")
                }
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold min-h-[44px]"
              >
                {slideIndex + 1 < episode.slides.length ? (
                  <BilingualText nl="Verder" fr="Suivant" />
                ) : (
                  <BilingualText nl="Naar de quiz" fr="Le questionnaire" />
                )}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.section>
        )}

        {phase === "quiz" && (
          <motion.section
            key={qIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border-4 border-border rounded-3xl p-6 kids-shadow-card"
          >
            <p className="text-sm text-muted-foreground tabular-nums mb-2">
              <BilingualText nl="Vraag" fr="Question" /> {qIndex + 1}/{total}
            </p>
            <p className="text-xl font-bold mb-1">
              <BilingualText nl={question.question.nl} fr={question.question.fr} stacked />
            </p>
            <button
              type="button"
              onClick={() => speakBoth(question.question, childLang)}
              aria-label={childLang === "fr" ? "Écouter la question" : "Luister naar de vraag"}
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-primary hover:bg-primary/10 mb-4"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 gap-3">
              {question.options.map((opt, i) => {
                const isAnswer = i === question.answer;
                const state =
                  picked === null
                    ? "idle"
                    : isAnswer
                      ? "good"
                      : picked === i
                        ? "bad"
                        : "idle";
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={picked !== null}
                    className={`w-full text-left rounded-2xl px-5 py-4 border-4 font-dyslexic min-h-[44px] transition-colors ${
                      state === "good"
                        ? "bg-kids-green-light/60 border-primary"
                        : state === "bad"
                          ? "bg-destructive/15 border-destructive"
                          : "bg-background border-border hover:border-primary"
                    }`}
                  >
                    <BilingualText nl={opt.nl} fr={opt.fr} stacked />
                  </button>
                );
              })}
            </div>
          </motion.section>
        )}

        {phase === "result" && (
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border-4 border-primary/40 rounded-3xl p-8 text-center kids-shadow-card"
          >
            <span className="text-6xl block mb-3" aria-hidden>
              {lvl.emoji}
            </span>
            <p className="text-3xl font-bold tabular-nums">
              {correct}/{total} — {scorePct}%
            </p>
            <p className="text-lg font-bold text-primary mt-1">
              <BilingualText nl={lvl.nl} fr={lvl.fr} />
            </p>
            <p className="text-muted-foreground font-dyslexic mt-3">
              {passed ? (
                <BilingualText
                  nl="Gelukt! De volgende aflevering is open."
                  fr="Réussi ! L'épisode suivant est débloqué."
                  stacked
                />
              ) : (
                <BilingualText
                  nl="Bekijk de aflevering nog eens en probeer opnieuw."
                  fr="Revois l'épisode puis réessaie."
                  stacked
                />
              )}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                onClick={() => {
                  setPhase("slides");
                  setSlideIndex(0);
                  setQIndex(0);
                  setCorrect(0);
                  setPicked(null);
                  setSaved(false);
                }}
                className="bg-muted border-2 border-border rounded-full px-6 py-3 font-bold min-h-[44px]"
              >
                <BilingualText nl="Opnieuw" fr="Recommencer" />
              </button>
              <button
                onClick={() => navigate(backTo)}
                className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold min-h-[44px]"
              >
                <BilingualText nl="Afleveringen" fr="Les épisodes" />
              </button>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

export default CodeEpisodePage;
