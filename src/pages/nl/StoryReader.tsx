import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, BookOpen, Check, Minus, Plus, Volume2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";
import { StoryPlayer } from "@/components/stories/StoryPlayer";
import { storyById } from "@/data/stories";
import type { StoryProgress } from "@/lib/storyProgress";
import { completeStoryOnServer, getStoryProgress, saveStoryProgress } from "@/lib/storyProgress";
import { bi } from "@/lib/bilingual";
import { biToast } from "@/lib/biToast";
import { useChild } from "@/contexts/ChildContext";

const emptyProgress: StoryProgress = { sceneIndex: 0, bookmarked: false, completed: false };
const readSettings = (childId?: string) => {
  if (typeof window === "undefined") return { fontSize: 22, lineHeight: 1.8 };
  try {
    const saved = JSON.parse(localStorage.getItem(`nederdys.reading-settings.v1.${childId ?? "guest"}`) ?? "{}") as { fontSize?: number; lineHeight?: number };
    return {
      fontSize: Math.min(32, Math.max(18, saved.fontSize ?? 22)),
      lineHeight: [1.5, 1.8, 2.1].includes(saved.lineHeight ?? 1.8) ? saved.lineHeight ?? 1.8 : 1.8,
    };
  } catch {
    return { fontSize: 22, lineHeight: 1.8 };
  }
};

const StoryReader = () => {
  const { id, storyId } = useParams<{ id: string; storyId: string }>();
  const navigate = useNavigate();
  const { children } = useChild();
  const story = storyById(storyId);
  const child = children.find((item) => item.id === id);
  const [progress, setProgress] = useState<StoryProgress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [fontSize, setFontSize] = useState(() => readSettings(id).fontSize);
  const [lineHeight, setLineHeight] = useState(() => readSettings(id).lineHeight);
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    getStoryProgress(id).then((items) => {
      if (!active) return;
      const saved = storyId ? items[storyId] ?? emptyProgress : emptyProgress;
      setProgress(saved);
      setSceneIndex(Math.min(story ? story.scenes.length - 1 : 0, saved.sceneIndex));
      setReady(true);
    });
    return () => { active = false; };
  }, [id, storyId, story]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  useEffect(() => {
    try {
      localStorage.setItem(`nederdys.reading-settings.v1.${id ?? "guest"}`, JSON.stringify({ fontSize, lineHeight }));
    } catch {
      // The controls still work for this session if browser storage is unavailable.
    }
  }, [fontSize, id, lineHeight]);

  const recordScene = useCallback((nextIndex: number) => {
    setSceneIndex(nextIndex);
    if (!storyId) return;
    setProgress((current) => {
      const next = { ...current, sceneIndex: nextIndex };
      void saveStoryProgress(id, storyId, next);
      return next;
    });
  }, [id, storyId]);

  const goBack = id ? `/child/${id}/nl/histoires` : "/enfant";
  const scene = story?.scenes[sceneIndex];
  const questionResults = useMemo(() => {
    if (!story?.questions) return { correct: 0, total: 0 };
    return {
      correct: story.questions.filter((question) => question.options.some((option) => option.id === answers[question.id] && option.isCorrect)).length,
      total: story.questions.length,
    };
  }, [answers, story]);

  if (!story) return <Navigate to={goBack} replace />;

  const toggleBookmark = () => {
    const next = { ...progress, bookmarked: !progress.bookmarked };
    setProgress(next);
    void saveStoryProgress(id, story.id, { ...next, sceneIndex });
  };

  const listen = () => {
    if (!scene || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setActiveWord(null);
    setListening(true);
    const utterance = new SpeechSynthesisUtterance(scene.text);
    utterance.lang = "nl-BE";
    utterance.rate = 0.82;
    const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith("nl"));
    if (voice) utterance.voice = voice;
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        setActiveWord(scene.text.slice(0, event.charIndex).trim().split(/\s+/).filter(Boolean).length);
      }
    };
    utterance.onend = () => { setListening(false); setActiveWord(null); };
    utterance.onerror = () => { setListening(false); setActiveWord(null); };
    window.speechSynthesis.speak(utterance);
  };

  const finishStory = async () => {
    const completedProgress = { ...progress, sceneIndex: story.scenes.length - 1, completed: true };
    setProgress(completedProgress);
    await saveStoryProgress(id, story.id, completedProgress);
    if (id) {
      const result = await completeStoryOnServer(id, story.id);
      if (result.xpAwarded > 0) biToast.success(bi(`+${result.xpAwarded} XP! 🎉`, `+${result.xpAwarded} XP ! 🎉`));
      else if (!result.ok) biToast.success(bi("Mooi gelezen! Je bladwijzer is bewaard. ⭐", "Bien lu ! Ta progression est gardée. ⭐"));
    }
    navigate(goBack);
  };

  const words = scene?.text.split(/(\s+)/) ?? [];
  let wordIndex = -1;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link to={goBack} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /><BilingualText nl="Terug naar verhalen" fr="Retour aux histoires" />
          </Link>
          <button type="button" onClick={toggleBookmark} aria-pressed={progress.bookmarked} className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 px-4 font-bold ${progress.bookmarked ? "border-amber-400 bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200" : "border-border bg-card hover:border-primary"}`}>
            <Bookmark className={`h-4 w-4 ${progress.bookmarked ? "fill-current" : ""}`} />
            <BilingualText nl={progress.bookmarked ? "Bewaard" : "Bewaar verhaal"} fr={progress.bookmarked ? "En favori" : "Ajouter aux favoris"} />
          </button>
        </div>

        <header className="mb-6 text-center">
          <span className="mb-1 block text-5xl" aria-hidden>{story.emoji}</span>
          <h1 className="text-2xl font-black sm:text-3xl"><BilingualText nl={story.title} fr={story.titleFr} stacked /></h1>
          <p className="mt-2 text-sm text-muted-foreground"><BilingualText nl={story.summary} fr={story.summaryFr} stacked /></p>
        </header>

        <div className="mb-5 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-card p-3">
          <span className="mr-1 text-sm font-extrabold"><BilingualText nl="Mijn leesinstellingen" fr="Mes réglages de lecture" /></span>
          <div className="inline-flex items-center gap-2 rounded-xl bg-muted px-2">
            <button type="button" aria-label="Réduire la taille du texte" onClick={() => setFontSize((value) => Math.max(18, value - 2))} disabled={fontSize <= 18} className="grid min-h-[44px] min-w-[40px] place-items-center rounded-lg disabled:opacity-40"><Minus className="h-4 w-4" /></button>
            <span className="min-w-8 text-center text-sm font-bold">{fontSize}</span>
            <button type="button" aria-label="Augmenter la taille du texte" onClick={() => setFontSize((value) => Math.min(32, value + 2))} disabled={fontSize >= 32} className="grid min-h-[44px] min-w-[40px] place-items-center rounded-lg disabled:opacity-40"><Plus className="h-4 w-4" /></button>
          </div>
          <label className="flex min-h-[44px] items-center gap-2 text-sm font-bold">
            <span><BilingualText nl="Ruimte" fr="Espacement" /></span>
            <select value={lineHeight} onChange={(event) => setLineHeight(Number(event.target.value))} className="min-h-[40px] rounded-lg border border-border bg-background px-2">
              <option value={1.5}>1.5</option><option value={1.8}>1.8</option><option value={2.1}>2.1</option>
            </select>
          </label>
          <button type="button" onClick={listen} disabled={listening || !scene} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-4 font-extrabold text-primary-foreground disabled:opacity-60">
            <Volume2 className="h-4 w-4" /><BilingualText nl={listening ? "Ik lees voor…" : "Lees voor"} fr={listening ? "Lecture en cours…" : "Lire à voix haute"} />
          </button>
          {listening && <button type="button" onClick={() => { window.speechSynthesis.cancel(); setListening(false); setActiveWord(null); }} className="min-h-[44px] rounded-xl px-3 font-bold text-muted-foreground"><BilingualText nl="Stop" fr="Arrêter" /></button>}
        </div>

        {!ready ? <div className="rounded-3xl bg-card p-8 text-center text-muted-foreground"><BilingualText nl="Je verhaal komt eraan…" fr="Ton histoire arrive…" /></div> : interactive ? (
          <div>
            <button type="button" onClick={() => setInteractive(false)} className="mb-4 min-h-[44px] rounded-xl border-2 border-border px-4 font-bold"><BookOpen className="mr-2 inline h-4 w-4" /><BilingualText nl="Terug naar rustig lezen" fr="Revenir à la lecture calme" /></button>
            <StoryPlayer key={`${story.id}-interactive`} story={story} childId={id} childName={child?.first_name} childGender={(child as { gender?: string } | undefined)?.gender ?? null} initialSceneIndex={sceneIndex} onSceneChange={recordScene} onComplete={finishStory} />
          </div>
        ) : showQuestions && story.questions?.length ? (
          <section className="rounded-3xl border-4 border-violet-200 bg-violet-50 p-5 shadow-sm dark:border-violet-900 dark:bg-violet-950/20 sm:p-7" aria-labelledby="story-questions-title">
            <span className="mb-2 block text-4xl" aria-hidden>💭</span>
            <h2 id="story-questions-title" className="mb-5 text-xl font-black"><BilingualText nl="Heb je het verhaal goed gevolgd?" fr="As-tu bien suivi l'histoire ?" stacked /></h2>
            <div className="space-y-5">
              {story.questions.map((question) => <fieldset key={question.id}>
                <legend className="mb-3 font-extrabold"><BilingualText nl={question.question} fr={question.questionFr} stacked /></legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => {
                    const picked = answers[question.id] === option.id;
                    const answered = !!answers[question.id];
                    const style = picked ? (option.isCorrect ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-950/40" : "border-orange-400 bg-orange-100 dark:bg-orange-950/30") : "border-border bg-card hover:border-primary";
                    return <button key={option.id} type="button" aria-pressed={picked} onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))} className={`min-h-[52px] rounded-2xl border-2 p-3 text-left font-bold ${style}`}>
                      <BilingualText nl={option.label} fr={option.labelFr} stacked />
                      {picked && answered && <span className="ml-2">{option.isCorrect ? "✅" : "💛"}</span>}
                    </button>;
                  })}
                </div>
              </fieldset>)}
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-sm font-bold text-muted-foreground"><BilingualText nl={`${questionResults.correct} juist van ${questionResults.total}`} fr={`${questionResults.correct} bonne(s) réponse(s) sur ${questionResults.total}`} /></p>
              <button type="button" onClick={finishStory} className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-primary px-6 font-extrabold text-primary-foreground"><Check className="h-5 w-5" /><BilingualText nl="Klaar!" fr="Terminer !" /></button>
            </div>
          </section>
        ) : scene ? (
          <section className="overflow-hidden rounded-3xl border-4 border-primary/20 bg-card shadow-md">
            <div className="h-2 bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${((sceneIndex + 1) / story.scenes.length) * 100}%` }} /></div>
            <div className="px-5 py-6 sm:px-10 sm:py-9">
              <div className="mb-5 flex items-center justify-between text-sm font-bold text-muted-foreground">
                <span><BilingualText nl={`Deel ${sceneIndex + 1} van ${story.scenes.length}`} fr={`Étape ${sceneIndex + 1} sur ${story.scenes.length}`} /></span>
                <span>{Math.round(((sceneIndex + 1) / story.scenes.length) * 100)}%</span>
              </div>
              <span className="mb-5 block text-center text-6xl" aria-hidden>{scene.image}</span>
              <p className="font-dyslexic text-center font-extrabold leading-loose" style={{ fontSize: `${fontSize}px`, lineHeight }} aria-live="polite">
                {words.map((part, index) => {
                  if (/^\s+$/.test(part)) return <span key={`space-${index}`}>{part}</span>;
                  wordIndex += 1;
                  return <span key={`${scene.id}-${index}`} className={activeWord === wordIndex ? "rounded bg-amber-200 px-0.5 text-amber-950 dark:bg-amber-400" : ""}>{part}</span>;
                })}
              </p>
              <p className="mt-5 text-center text-base leading-relaxed text-muted-foreground" style={{ lineHeight: Math.min(2.2, lineHeight + 0.1) }}>{scene.textFr}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={() => { window.speechSynthesis.cancel(); setListening(false); setActiveWord(null); recordScene(Math.max(0, sceneIndex - 1)); }} disabled={sceneIndex === 0} className="min-h-[48px] rounded-2xl border-2 border-border px-5 font-extrabold disabled:opacity-40"><BilingualText nl="Vorige" fr="Précédent" /></button>
                {sceneIndex + 1 === story.scenes.length && story.questions?.length ? <button type="button" onClick={() => { void saveStoryProgress(id, story.id, { ...progress, sceneIndex }); setShowQuestions(true); }} className="min-h-[48px] rounded-2xl bg-primary px-5 font-extrabold text-primary-foreground"><BilingualText nl="Begrijpen" fr="Comprendre" /> 💭</button>
                  : sceneIndex + 1 === story.scenes.length ? <button type="button" onClick={finishStory} className="min-h-[48px] rounded-2xl bg-primary px-5 font-extrabold text-primary-foreground"><BilingualText nl="Verhaal klaar" fr="Fin de l'histoire" /> ⭐</button>
                    : <button type="button" onClick={() => { window.speechSynthesis.cancel(); setListening(false); setActiveWord(null); recordScene(Math.min(story.scenes.length - 1, sceneIndex + 1)); }} className="min-h-[48px] rounded-2xl bg-primary px-5 font-extrabold text-primary-foreground"><BilingualText nl="Verder" fr="Continuer" /> →</button>}
              </div>
              <div className="mt-5 flex justify-center">
                <button type="button" onClick={() => setInteractive(true)} className="min-h-[44px] rounded-full px-4 text-sm font-bold text-primary hover:bg-primary/10"><BilingualText nl="Speel ook de interactieve versie" fr="Essayer aussi la version interactive" /></button>
              </div>
            </div>
          </section>
        ) : null}

        <p className="mx-auto mt-5 max-w-xl text-center text-xs text-muted-foreground"><BilingualText nl="Je leesinstellingen blijven op dit apparaat. Alleen de leespositie en bladwijzer worden met je account gesynchroniseerd." fr="Tes réglages de lecture restent sur cet appareil. Seuls la page et le favori sont synchronisés avec ton compte." stacked /></p>
      </main>
    </div>
  );
};

export default StoryReader;
