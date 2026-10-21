import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Brain, Ear, Languages, ListOrdered, Mic2, Pencil, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";

const activities = [
  { icon: Brain, emoji: "🧩", fr: "Associer le vocabulaire", nl: "Woordjes koppelen", detailFr: "Relie les mots aux images et aux bonnes réponses.", detailNl: "Koppel woorden aan plaatjes en antwoorden.", to: "chapitre/dieren-nl" },
  { icon: Languages, emoji: "🔤", fr: "Construire des mots", nl: "Woorden bouwen", detailFr: "Joue avec les sons, les lettres et les rimes.", detailNl: "Speel met klanken, letters en rijm.", to: "chapitre/rimes-nl" },
  { icon: Ear, emoji: "👂", fr: "Compréhension orale", nl: "Luisterbegrip", detailFr: "Écoute une phrase puis réponds à une question.", detailNl: "Luister naar een zin en beantwoord een vraag.", to: "chapitre/vrai-faux-nl" },
  { icon: ListOrdered, emoji: "🧱", fr: "Remettre une phrase en ordre", nl: "Zinnen op volgorde", detailFr: "Replace les mots pour former une phrase.", detailNl: "Zet woorden in de goede volgorde.", to: "chapitre/zinnen-nl" },
  { icon: Pencil, emoji: "🎧", fr: "Dictée progressive", nl: "Stap voor stap dictee", detailFr: "Écoute un mot et écris-le, du plus simple au plus long.", detailNl: "Luister en schrijf, van makkelijk naar moeilijk.", to: "chapitre/dictee-nl" },
  { icon: BookOpen, emoji: "📖", fr: "Lecture guidée", nl: "Samen lezen", detailFr: "Lis une histoire adaptée à ton niveau.", detailNl: "Lees een verhaal op jouw niveau.", to: "histoires" },
  { icon: RotateCcw, emoji: "🔁", fr: "Réviser le vocabulaire", nl: "Woordjes herhalen", detailFr: "Retrouve les notions déjà apprises.", detailNl: "Herhaal wat je al hebt geleerd.", to: "../reviser" },
  { icon: Languages, emoji: "🕵️", fr: "Missions de grammaire", nl: "Grammatica-missies", detailFr: "Choisis de/het, les pluriels et les adjectifs.", detailNl: "Oefen de/het, meervoud en bijvoeglijke naamwoorden.", to: "chapitre/de-of-het" },
  { icon: Mic2, emoji: "🗣️", fr: "S’entraîner à parler", nl: "Spreekoefening", detailFr: "Répète des phrases sans enregistrer ta voix.", detailNl: "Zeg zinnen hardop, zonder opname.", to: "parler" },
];

export default function LearningActivitiesPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <div className="min-h-screen bg-background"><Navbar /><main className="container max-w-5xl px-4 py-8">
    <Link to={`/child/${id}/nl/exercices`} className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /><BilingualText fr="Retour aux exercices" nl="Terug naar oefeningen" /></Link>
    <header className="mb-7 rounded-3xl border-4 border-kids-purple/40 bg-gradient-to-br from-violet-100 to-sky-100 p-6 text-center dark:from-violet-950 dark:to-slate-900"><span className="text-4xl" aria-hidden>🌈</span><h1 className="mt-2 text-3xl font-black"><BilingualText fr="Jeux et petits devoirs" nl="Spelletjes en huiswerk" stacked /></h1><p className="mx-auto mt-2 max-w-2xl text-muted-foreground"><BilingualText fr="Choisis une activité courte. Tu peux la refaire autant de fois que tu veux." nl="Kies een korte activiteit. Je mag zo vaak oefenen als je wilt." stacked /></p></header>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{activities.map(({ icon: Icon, emoji, fr, nl, detailFr, detailNl, to }) => <Link key={to} to={`/child/${id}/nl/${to}`} className="group rounded-3xl border-2 border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"><div className="mb-3 flex items-center justify-between"><span className="text-4xl" aria-hidden>{emoji}</span><Icon className="h-5 w-5 text-primary" aria-hidden /></div><h2 className="font-extrabold"><BilingualText fr={fr} nl={nl} stacked /></h2><p className="mt-2 text-sm text-muted-foreground"><BilingualText fr={detailFr} nl={detailNl} stacked /></p><span className="mt-4 inline-block text-sm font-bold text-primary"><BilingualText fr="Commencer →" nl="Beginnen →" /></span></Link>)}</div>
  </main></div>;
}
