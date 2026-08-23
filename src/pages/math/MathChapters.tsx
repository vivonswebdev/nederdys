import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CHAPTERS, ChapterGrade } from "@/lib/chapters";

const GRADE_TABS: { id: "3eprimaire" | ChapterGrade; label: string; emoji: string }[] = [
  { id: "3eprimaire", label: "3e", emoji: "📗" },
  { id: "4eprimaire", label: "4e", emoji: "📙" },
  { id: "5eprimaire", label: "5e", emoji: "📕" },
  { id: "6eprimaire", label: "6e", emoji: "📒" },
];

const MathChapters = () => {
  const { id } = useParams<{ id: string }>();
  const childId = id ?? "";
  const [selectedGrade, setSelectedGrade] = useState<"3eprimaire" | ChapterGrade>("3eprimaire");

  const bases = CHAPTERS.filter((c) => c.section === "bases");
  const ce2 = CHAPTERS.filter((c) => c.section === "ce2");
  const stretch = CHAPTERS.filter((c) => c.section === "stretch");
  const advanced = CHAPTERS.filter((c) => c.section === "avance" && c.grade === selectedGrade);


  const renderCard = (
    chapter: (typeof CHAPTERS)[number],
    i: number,
    variant: "bases" | "ce2" | "stretch"
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
              ? "bg-kids-blue/40 border-primary"
              : variant === "bases"
                ? "bg-kids-green-light border-kids-green-dark"
                : "bg-kids-purple/30 border-kids-purple"
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
          to={`/child/${childId}/math`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">📚 Mathématiques</h1>
          <p className="text-muted-foreground font-dyslexic mt-1">Choisis ton chapitre :</p>
        </header>

        <Link
          to={`/child/${childId}/test-placement/math`}
          className="block mb-8 border-4 border-kids-orange bg-kids-orange/30 rounded-3xl p-5 kids-shadow-card hover:kids-shadow-hover transition-shadow"
        >
          <span className="text-3xl mr-2">🎯</span>
          <span className="text-lg font-bold text-foreground">Faire le test de placement</span>
          <p className="font-dyslexic text-muted-foreground mt-1">
            6 questions pour débloquer directement le bon niveau.
          </p>
        </Link>

        {bases.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-kids-green-dark mb-4">🌱 Pour bien démarrer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bases.map((c, i) => renderCard(c, i, "bases"))}
            </div>
          </section>
        )}

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
