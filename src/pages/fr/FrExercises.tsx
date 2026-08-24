import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FR_CHAPTERS } from "@/lib/chapters";
import { BilingualText, Bi } from "@/components/ui/BilingualText";
import { biFromFr, UI } from "@/lib/bilingual";

const FrExercises = () => {
  const { id } = useParams<{ id: string }>();
  const childId = id ?? "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 py-8">
        <Link
          to={`/child/${childId}/games`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> <BilingualText {...biFromFr("Retour aux jeux")} />
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">🇫🇷 Exercices de Français</h1>
          <p className="text-muted-foreground font-dyslexic mt-1">
            <BilingualText {...biFromFr("Choisis ton chapitre :")} />
          </p>
        </header>

        <Link
          to={`/child/${childId}/fr/jeux`}
          className="block mb-8 border-4 border-kids-pink bg-kids-pink/30 rounded-3xl p-5 kids-shadow-card hover:kids-shadow-hover transition-shadow"
        >
          <span className="text-3xl mr-2">🎮</span>
          <span className="text-lg font-bold text-foreground">
            <BilingualText {...biFromFr("Voir les 16 jeux de français")} />
          </span>
          <p className="font-dyslexic text-muted-foreground mt-1">
            <BilingualText {...biFromFr("Sons, vocabulaire, phrases, orthographe…")} />
          </p>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FR_CHAPTERS.map((chapter, i) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/child/${childId}/fr/chapitre/${chapter.id}`}>
                <div className="bg-kids-purple/30 border-4 border-kids-purple rounded-3xl p-6 kids-shadow-card hover:kids-shadow-hover transition-shadow h-full">
                  <span className="text-5xl block mb-3">{chapter.emoji}</span>
                  <h2 className="text-xl font-bold text-foreground">
                    <BilingualText nl={chapter.nameNl ?? chapter.name} fr={chapter.name} stacked />
                  </h2>
                  {chapter.description && (
                    <p className="font-dyslexic text-muted-foreground mt-1 text-sm">
                      <BilingualText
                        nl={chapter.descriptionNl ?? chapter.description}
                        fr={chapter.description}
                        stacked
                      />
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    {chapter.exercises.length} <Bi phrase={UI.exercisesCount} />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FrExercises;
