import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { ExerciseRunner } from "@/components/chapters/ExerciseRunner";
import { Chapter, LEVEL_EMOJI, LEVEL_LABEL, chaptersListRoute } from "@/lib/chapters";
import {
  PlacementChapterResult,
  buildPlacementTest,
  savePlacementResults,
} from "@/lib/placementTest";

const PlacementTest = () => {
  const { id, subject } = useParams<{ id: string; subject: string }>();
  const childId = id ?? "";
  const isValid = subject === "math" || subject === "nl";
  const matiere = (isValid ? subject : "math") as "math" | "nl";

  const questions = useMemo(() => buildPlacementTest(matiere), [matiere]);
  const [results, setResults] = useState<PlacementChapterResult[] | null>(null);

  if (!isValid) return <Navigate to={chaptersListRoute(childId, "math")} replace />;

  const listRoute = chaptersListRoute(childId, matiere);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-xl px-4 py-16 text-center">
          <p className="font-dyslexic text-muted-foreground">
            Pas encore assez de chapitres pour faire le test.
          </p>
          <Button className="mt-4" asChild>
            <Link to={listRoute}>Retour</Link>
          </Button>
        </main>
      </div>
    );
  }

  const pseudoChapter: Chapter = {
    id: "test-placement",
    name: "Test de placement",
    emoji: "🎯",
    section: "ce2",
    subject: matiere,
    exercises: questions.map((q) => q.exercise),
  };

  const finishedContent = results && (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-card border-4 border-border rounded-3xl p-8 text-center kids-shadow-card"
    >
      <Confetti count={30} />
      <span className="text-6xl block mb-3">🎯</span>
      <h1 className="text-2xl font-bold text-foreground mb-2">Test terminé !</h1>
      <p className="font-dyslexic text-muted-foreground mb-5">
        Voici les niveaux débloqués grâce à tes réponses :
      </p>
      <ul className="space-y-3 text-left">
        {results.map((r) => (
          <li
            key={r.chapterId}
            className="border-4 border-border rounded-2xl p-4 bg-background flex items-center justify-between gap-3"
          >
            <span className="font-bold text-foreground">{r.chapterName}</span>
            <span className="font-dyslexic text-sm text-muted-foreground">
              {r.correct}/{r.total} · {LEVEL_EMOJI[r.unlockedLevel]} {LEVEL_LABEL[r.unlockedLevel]}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <Button asChild>
          <Link to={listRoute}>Voir mes chapitres</Link>
        </Button>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Refaire le test
        </Button>
      </div>
    </motion.div>
  );

  return (
    <ExerciseRunner
      childId={childId}
      chapter={pseudoChapter}
      level={1}
      customExercises={pseudoChapter.exercises}
      exitTo={listRoute}
      onFinish={async (answers) => {
        const saved = await savePlacementResults({ childId, questions, results: answers });
        setResults(saved);
      }}
      finishedContent={finishedContent ?? <p className="text-center font-dyslexic">Enregistrement…</p>}
    />
  );
};

export default PlacementTest;
