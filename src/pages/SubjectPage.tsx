import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { SUBJECTS, gamesBySubject, Subject } from "@/lib/games";

const SubjectPage = () => {
  const { subject, id } = useParams<{ subject: string; id?: string }>();
  const { t } = useLanguage();

  const meta = SUBJECTS.find((s) => s.id === subject);
  if (!meta) return <Navigate to={id ? `/child/${id}` : "/enfant"} replace />;

  const games = gamesBySubject(meta.id as Subject).map((g) => ({
    id: g.id,
    title: t(g.titleKey as never),
    desc: t(g.descKey as never),
    icon: g.icon,
    color: g.color,
    level: t("games.adaptive"),
    route: id && g.subject === "math" ? `/child/${id}/math/${g.route.replace("/jeu/", "")}` : g.route,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 py-8">
        <Link
          to={id ? `/child/${id}` : "/enfant"}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {t("subject.back")}
        </Link>

        <div className="text-center mb-10">
          <span className="text-5xl block mb-2">{meta.emoji}</span>
          <h1 className="text-3xl font-bold text-foreground">{t(meta.labelKey as never)}</h1>
          <p className="text-muted-foreground font-dyslexic mt-1">
            {games.length > 0
              ? `${games.length} ${t("subject.count")}`
              : t(meta.descKey as never)}
          </p>
        </div>

        {meta.id === "math" && id && (
          <Link to={`/child/${id}/math/chapitres`} className="block mb-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-kids-blue/40 border-4 border-primary rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow flex items-center gap-4"
            >
              <span className="text-5xl">📚</span>
              <div>
                <h2 className="text-xl font-bold text-foreground">Les chapitres de maths</h2>
                <p className="font-dyslexic text-muted-foreground">
                  10 chapitres, 3 niveaux à débloquer un par un
                </p>
              </div>
            </motion.div>
          </Link>
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
      </main>
    </div>
  );
};

export default SubjectPage;
