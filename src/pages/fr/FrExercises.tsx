import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const FrExercises = () => {
  const { id } = useParams<{ id: string }>();
  const childId = id ?? "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-2xl px-4 py-8">
        <Link
          to={`/child/${childId}/games`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux jeux
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">🇫🇷 Exercices de Français</h1>
          <p className="text-muted-foreground font-dyslexic mt-1">Bientôt disponible !</p>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border-4 border-border rounded-3xl p-10 text-center kids-shadow-card"
        >
          <span className="text-6xl block mb-3">🚀</span>
          <h2 className="text-2xl font-bold text-foreground mb-2">Des exercices arrivent !</h2>
          <p className="font-dyslexic text-muted-foreground">
            Orthographe, grammaire, conjugaison, vocabulaire…
          </p>
          <p className="text-4xl mt-6 space-x-3">
            <span>📝</span>
            <span>✏️</span>
            <span>📚</span>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default FrExercises;
