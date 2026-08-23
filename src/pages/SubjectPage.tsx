import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { SUBJECTS, gamesBySubject, Subject } from "@/lib/games";

const SubjectPage = () => {
  const { subject } = useParams<{ subject: string }>();
  const { t } = useLanguage();

  const meta = SUBJECTS.find((s) => s.id === subject);
  if (!meta) return <Navigate to="/enfant" replace />;

  const games = gamesBySubject(meta.id as Subject).map((g) => ({
    id: g.id,
    title: t(g.titleKey as never),
    desc: t(g.descKey as never),
    icon: g.icon,
    color: g.color,
    level: t("games.adaptive"),
    route: g.route,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 py-8">
        <Link
          to="/enfant"
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
