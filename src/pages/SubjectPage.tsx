import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SUBJECTS,
  gamesBySubject,
  categoriesForSubject,
  GAME_CATEGORY,
  Subject,
} from "@/lib/games";
import { chaptersBySubject, chaptersListRoute } from "@/lib/chapters";
import { BilingualText } from "@/components/ui/BilingualText";
import { STORIES } from "@/data/stories";

const SubjectPage = () => {
  const { subject, id } = useParams<{ subject: string; id?: string }>();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const meta = SUBJECTS.find((s) => s.id === subject);
  if (!meta) return <Navigate to={id ? `/child/${id}` : "/enfant"} replace />;

  const subjectId = meta.id as Subject;
  const categories = categoriesForSubject(subjectId);
  const allGames = gamesBySubject(subjectId);

  const games = allGames
    .filter(
      (g) => selectedCategory === "all" || GAME_CATEGORY[g.id] === selectedCategory
    )
    .map((g) => ({
      id: g.id,
      title: t(g.titleKey as never),
      desc: t(g.descKey as never),
      icon: g.icon,
      color: g.color,
      level: t("games.adaptive"),
      route:
        id && g.subject === "math"
          ? `/child/${id}/math/${g.route.replace("/jeu/", "")}`
          : g.route,
    }));

  const chapterCount = chaptersBySubject(subjectId).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 py-8">
        <Link
          to={id ? `/child/${id}/games` : "/enfant"}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {id ? "Mes jeux" : t("subject.back")}
        </Link>

        <div className="text-center mb-8">
          <span className="text-5xl block mb-2">{meta.emoji}</span>
          <h1 className="text-3xl font-bold text-foreground">{t(meta.labelKey as never)}</h1>
          <p className="text-muted-foreground font-dyslexic mt-1">
            {allGames.length > 0
              ? `${allGames.length} ${t("subject.count")}`
              : t(meta.descKey as never)}
          </p>
        </div>

        {allGames.length > 0 && categories.length > 2 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold whitespace-nowrap border-2 transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-muted"
                }`}
              >
                <span aria-hidden>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        )}

        {games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-3xl p-10 text-center kids-shadow-card max-w-lg mx-auto"
          >
            <span className="text-5xl block mb-3">🚧</span>
            <h2 className="text-xl font-bold text-foreground mb-2">{t("subject.soon")}</h2>
            <p className="text-muted-foreground font-dyslexic">{t("subject.soon.desc")}</p>
          </motion.div>
        )}

        {id && chapterCount > 0 && (
          <Link to={chaptersListRoute(id, subjectId)} className="block mt-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-kids-blue/40 border-4 border-primary rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow flex items-center gap-4"
            >
              <span className="text-5xl">📚</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">
                  Voir les exercices par chapitre
                </h2>
                <p className="font-dyslexic text-muted-foreground">
                  {chapterCount} chapitres · 3 niveaux à débloquer un par un
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-foreground" />
            </motion.div>
          </Link>
        )}

        {id && subjectId === "nl" && (
          <Link to={`/child/${id}/nl/histoires`} className="block mt-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-kids-orange/40 border-4 border-orange-400 rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow flex items-center gap-4"
            >
              <span className="text-5xl" aria-hidden>📖</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">
                  <BilingualText nl="Verhalen" fr="Histoires" stacked />
                </h2>
                <p className="font-dyslexic text-muted-foreground">
                  <BilingualText
                    nl={`${STORIES.length} interactieve verhalen`}
                    fr={`${STORIES.length} histoires interactives`}
                    stacked
                  />
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-foreground" />
            </motion.div>
          </Link>
        )}

      </main>
    </div>
  );
};

export default SubjectPage;
