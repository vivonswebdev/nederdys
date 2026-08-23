import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CHAPTERS } from "@/lib/chapters";

const MathChapters = () => {
  const { id } = useParams<{ id: string }>();
  const childId = id ?? "";

  const ce2 = CHAPTERS.filter((c) => c.section === "ce2");
  const stretch = CHAPTERS.filter((c) => c.section === "stretch");

  const renderCard = (
    chapter: (typeof CHAPTERS)[number],
    i: number,
    variant: "ce2" | "stretch"
  ) => (
    <motion.div
      key={chapter.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
    >
      <Link to={`/child/${childId}/math/chapitre/${chapter.id}`}>
        <div
          className={`relative overflow-hidden border-4 rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow h-full ${
            variant === "ce2"
              ? "bg-kids-blue-light border-primary"
              : "bg-kids-purple-light border-kids-purple"
          }`}
        >
          {variant === "stretch" && (
            <span className="absolute top-3 right-3 bg-kids-purple text-white px-3 py-1 rounded-full text-xs font-bold">
              Niveau supérieur
            </span>
          )}
          <span className="text-5xl block mb-3">{chapter.emoji}</span>
          <h3 className="text-xl font-bold text-foreground">{chapter.name}</h3>
          <p className="text-muted-foreground font-dyslexic mt-1">3 niveaux de difficulté</p>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 py-8">
        <Link
          to={`/child/${childId}/matiere/math`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">📚 Mathématiques</h1>
          <p className="text-muted-foreground font-dyslexic mt-1">Choisis ton chapitre :</p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">📘 CE2</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ce2.map((c, i) => renderCard(c, i, "ce2"))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-kids-purple mb-4">🚀 Pour aller plus loin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stretch.map((c, i) => renderCard(c, i, "stretch"))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MathChapters;
