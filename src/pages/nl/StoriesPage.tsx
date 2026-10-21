import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, BookOpen, Moon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";
import { STORIES } from "@/data/stories";
import { getStoryProgress, type StoryProgress } from "@/lib/storyProgress";
import type { StoryCategory, StoryLevel } from "@/lib/stories";

const LEVELS: { id: "all" | StoryLevel; nl: string; fr: string }[] = [
  { id: "all", nl: "Alle niveaus", fr: "Tous les niveaux" },
  { id: 1, nl: "Ik begin", fr: "Je débute" },
  { id: 2, nl: "Ik oefen", fr: "Je m'entraîne" },
  { id: 3, nl: "Ik lees vlot", fr: "Je lis avec aisance" },
];

const CATEGORIES: { id: "all" | StoryCategory; nl: string; fr: string; emoji: string }[] = [
  { id: "all", nl: "Alle verhalen", fr: "Toutes les histoires", emoji: "📚" },
  { id: "bedtime", nl: "Bedtijd", fr: "Pour dormir", emoji: "🌙" },
  { id: "adventure", nl: "Avontuur", fr: "Aventure", emoji: "🧭" },
  { id: "animals", nl: "Dieren", fr: "Animaux", emoji: "🐾" },
  { id: "everyday", nl: "Elke dag", fr: "Vie quotidienne", emoji: "🌱" },
];

const StoriesPage = () => {
  const { id } = useParams<{ id: string }>();
  const [level, setLevel] = useState<"all" | StoryLevel>("all");
  const [category, setCategory] = useState<"all" | StoryCategory>("all");
  const [progress, setProgress] = useState<Record<string, StoryProgress>>({});

  useEffect(() => {
    let active = true;
    getStoryProgress(id).then((value) => { if (active) setProgress(value); });
    return () => { active = false; };
  }, [id]);

  const stories = STORIES.filter((story) =>
    (level === "all" || story.level === level) &&
    (category === "all" || story.category === category)
  );
  const bookmarked = STORIES.filter((story) => progress[story.id]?.bookmarked);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 py-8">
        <Link to={id ? `/child/${id}/nl` : "/enfant"} className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> <BilingualText nl="Terug" fr="Retour" />
        </Link>

        <header className="mb-8 rounded-[2rem] border-4 border-primary/20 bg-gradient-to-br from-sky-100 via-white to-violet-100 p-6 text-center shadow-sm dark:from-slate-900 dark:via-card dark:to-violet-950 sm:p-9">
          <span className="mb-2 block text-5xl" aria-hidden>📚</span>
          <h1 className="text-3xl font-black"><BilingualText nl="Mijn verhalen" fr="Mes histoires" stacked /></h1>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground"><BilingualText nl="Kies een verhaal, lees op je eigen tempo en luister mee als je wilt." fr="Choisis une histoire, lis à ton rythme et écoute en même temps si tu veux." stacked /></p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm font-bold">
            <span className="rounded-full bg-white/80 px-3 py-2 text-sky-800 dark:bg-slate-800 dark:text-sky-200">📖 {STORIES.length} <BilingualText nl="verhalen" fr="histoires" /></span>
            <span className="rounded-full bg-white/80 px-3 py-2 text-violet-800 dark:bg-slate-800 dark:text-violet-200">🌱 3 <BilingualText nl="leesniveaus" fr="niveaux de lecture" /></span>
            <span className="rounded-full bg-white/80 px-3 py-2 text-indigo-800 dark:bg-slate-800 dark:text-indigo-200">🌙 <BilingualText nl="Verhalen voor het slapengaan" fr="Histoires du soir" /></span>
          </div>
        </header>

        <section aria-label="Niveau de lecture" className="mb-5">
          <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-muted-foreground"><BilingualText nl="Kies je leesniveau" fr="Choisis ton niveau" /></h2>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((item) => <button key={item.id} type="button" aria-pressed={level === item.id} onClick={() => setLevel(item.id)} className={`min-h-[44px] rounded-full border-2 px-4 font-bold transition-colors ${level === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>
              <BilingualText nl={item.nl} fr={item.fr} />
            </button>)}
          </div>
        </section>

        <section aria-label="Catégorie d'histoire" className="mb-7">
          <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-muted-foreground"><BilingualText nl="Waar heb je zin in?" fr="De quoi as-tu envie ?" /></h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((item) => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)} className={`min-h-[48px] shrink-0 rounded-2xl border-2 px-4 font-bold ${category === item.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary"}`}>
              <span className="mr-1" aria-hidden>{item.emoji}</span><BilingualText nl={item.nl} fr={item.fr} />
            </button>)}
          </div>
        </section>

        {bookmarked.length > 0 && (
          <section className="mb-7 rounded-3xl border-2 border-amber-300 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
            <h2 className="mb-3 flex items-center gap-2 font-extrabold"><Bookmark className="h-4 w-4" /><BilingualText nl="Mijn bladwijzers" fr="Mes favoris" /></h2>
            <div className="flex flex-wrap gap-2">
              {bookmarked.map((story) => <Link key={story.id} to={`/child/${id}/nl/histoires/${story.id}`} className="rounded-xl bg-white px-3 py-2 font-bold shadow-sm hover:ring-2 hover:ring-primary dark:bg-card">{story.emoji} {story.title}</Link>)}
            </div>
          </section>
        )}

        {stories.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => {
            const saved = progress[story.id];
            const percent = saved ? Math.min(100, Math.round(((saved.sceneIndex + (saved.completed ? 1 : 0)) / story.scenes.length) * 100)) : 0;
            const levelLabel = LEVELS.find((item) => item.id === story.level)!;
            const categoryInfo = CATEGORIES.find((item) => item.id === story.category)!;
            return <motion.div key={story.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <Link to={`/child/${id}/nl/histoires/${story.id}`} className="group flex h-full flex-col rounded-3xl border-2 border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30">
                <div className="mb-4 flex items-start justify-between">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-4xl" aria-hidden>{story.emoji}</span>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold"><BilingualText nl={levelLabel.nl} fr={levelLabel.fr} /></span>
                    {saved?.bookmarked && <Bookmark className="mt-1 h-4 w-4 fill-amber-400 text-amber-600" aria-label="Favori" />}
                  </div>
                </div>
                <h2 className="text-xl font-black group-hover:text-primary"><BilingualText nl={story.title} fr={story.titleFr} stacked /></h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground"><BilingualText nl={story.summary} fr={story.summaryFr} stacked /></p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <span className="rounded-full bg-muted px-2.5 py-1">{categoryInfo.emoji} <BilingualText nl={categoryInfo.nl} fr={categoryInfo.fr} /></span>
                  <span className="rounded-full bg-muted px-2.5 py-1">{story.scenes.length} <BilingualText nl="stukjes" fr="étapes" /></span>
                  {story.category === "bedtime" && <Moon className="h-4 w-4 text-indigo-500" aria-hidden />}
                </div>
                {saved && <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs font-bold"><span>{saved.completed ? <BilingualText nl="Gelezen" fr="Lu" /> : <BilingualText nl="Verder lezen" fr="À continuer" />}</span><span>{percent}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} /></div>
                </div>}
                <span className="mt-4 inline-flex items-center gap-2 font-extrabold text-primary">{saved && !saved.completed ? <><BookOpen className="h-4 w-4" /><BilingualText nl="Verder lezen" fr="Continuer" /></> : <><Sparkles className="h-4 w-4" /><BilingualText nl="Verhaal openen" fr="Ouvrir l'histoire" /></>}</span>
              </Link>
            </motion.div>;
          })}
        </div> : <p className="rounded-3xl border-2 border-dashed border-border p-8 text-center text-muted-foreground"><BilingualText nl="Geen verhaal in deze keuze. Probeer een ander niveau of thema." fr="Aucune histoire pour ce choix. Essaie un autre niveau ou thème." stacked /></p>}
      </main>
    </div>
  );
};

export default StoriesPage;
