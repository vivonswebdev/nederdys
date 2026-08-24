import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { BilingualText } from "@/components/ui/BilingualText";
import { biFromFr } from "@/lib/bilingual";
import { gamesBySubject, categoriesForSubject, GAME_CATEGORY } from "@/lib/games";
import { chaptersBySubject, chaptersListRoute } from "@/lib/chapters";

/**
 * Page "chapitres de jeux" Maths : navigation par catégories (Calcul, Logique,
 * Écoute, Vitesse) + accès direct à chaque jeu. Purement présentation : les
 * données Challenge[] de chaque jeu restent inchangées.
 */
const MathGamesChapters = () => {
  const { id } = useParams<{ id: string }>();
  const childId = id ?? "";
  const { t } = useLanguage();
  const [selected, setSelected] = useState("all");

  const categories = categoriesForSubject("math");
  const allGames = gamesBySubject("math");

  const gameRoute = (route: string) =>
    childId ? `/child/${childId}/math/${route.replace("/jeu/", "")}` : route;

  const sections = useMemo(
    () =>
      categories
        .filter((c) => c.id !== "all")
        .filter((c) => selected === "all" || c.id === selected)
        .map((c) => ({
          ...c,
          games: allGames.filter((g) => GAME_CATEGORY[g.id] === c.id),
        }))
        .filter((s) => s.games.length > 0),
    [categories, allGames, selected]
  );

  const chapterCount = chaptersBySubject("math").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 py-8">
        <Link
          to={childId ? `/child/${childId}/math` : "/matiere/math"}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> <BilingualText {...biFromFr("Retour")} />
        </Link>

        <header className="text-center mb-8">
          <span className="text-5xl block mb-2" aria-hidden>
            🔢
          </span>
          <h1 className="text-3xl font-bold text-foreground">
            <BilingualText nl="Rekenspellen" fr="Jeux de maths" stacked />
          </h1>
          <p className="text-muted-foreground font-dyslexic mt-1">
            <BilingualText
              nl={`${allGames.length} spellen · ${categories.length - 1} categorieën`}
              fr={`${allGames.length} jeux · ${categories.length - 1} catégories`}
            />
          </p>
        </header>

        {/* Navigation par catégories */}
        <nav
          aria-label="Catégories de jeux de maths"
          className="sticky top-2 z-10 flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              aria-pressed={selected === cat.id}
              className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-full font-bold whitespace-nowrap border-2 transition-colors ${
                selected === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-muted"
              }`}
            >
              <span aria-hidden>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </nav>

        {sections.map((section, si) => (
          <motion.section
            key={section.id}
            id={`cat-${section.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.05 }}
            className="mb-10 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              <span aria-hidden className="mr-2">
                {section.icon}
              </span>
              {section.name}
              <span className="text-base font-normal text-muted-foreground ml-2">
                ({section.games.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.games.map((g, i) => (
                <GameCard
                  key={g.id}
                  index={i}
                  game={{
                    id: g.id,
                    title: t(g.titleKey as never),
                    desc: t(g.descKey as never),
                    icon: g.icon,
                    color: g.color,
                    level: t("games.adaptive"),
                    route: gameRoute(g.route),
                  }}
                />
              ))}
            </div>
          </motion.section>
        ))}

        {childId && chapterCount > 0 && (
          <Link to={chaptersListRoute(childId, "math")} className="block mt-4">
            <div className="bg-kids-blue/40 border-4 border-primary rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow flex items-center gap-4">
              <span className="text-5xl" aria-hidden>
                📚
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">
                  <BilingualText {...biFromFr("Exercices par chapitre")} />
                </h2>
                <p className="font-dyslexic text-muted-foreground">
                  {chapterCount} chapitres · 3 niveaux à débloquer un par un
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-foreground" />
            </div>
          </Link>
        )}
      </main>
    </div>
  );
};

export default MathGamesChapters;
