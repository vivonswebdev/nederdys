import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { LESSON_SUBJECTS, lessonsBySubject, parseLessonSubject } from "@/lib/lessons";
import { orderedPair } from "@/lib/bilingual";
import { LearnLangToggle, useLearnLanguage } from "@/components/learn/LearnLangToggle";

/** Liste des leçons d'une matière, avec aperçu (durée, notions, pastilles). */
const SubjectLessons = () => {
  const { id, subject } = useParams<{ id: string; subject: string }>();
  const navigate = useNavigate();
  const [lang, setLang] = useLearnLanguage();
  const subj = parseLessonSubject(subject);

  useEffect(() => {
    document.title = "Leçons — NederDys";
  }, []);

  if (!subj) return <Navigate to={`/child/${id}/apprendre`} replace />;

  const meta = LESSON_SUBJECTS.find((s) => s.id === subj)!;
  const lessons = lessonsBySubject(subj);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between gap-3 mb-6">
        <Link
          to={`/child/${id}/apprendre`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground "
        >
          <ArrowLeft className="w-4 h-4" /> {lang === "nl" ? "Terug" : "Retour"}
        </Link>
          <LearnLangToggle lang={lang} onChange={setLang} />
        </div>

        <header className="text-center mb-8">
          <span className="text-5xl block mb-2">{meta.emoji}</span>
          <h1 className="text-3xl font-bold text-foreground">
            {orderedPair({ nl: meta.titleNl, fr: meta.title }, lang)[0]}
          </h1>
          <p className="text-lg text-muted-foreground font-dyslexic">
            {orderedPair({ nl: meta.titleNl, fr: meta.title }, lang)[1]}
          </p>
          <p className="text-muted-foreground font-dyslexic mt-1">
            {orderedPair({ nl: "Lessen om te lezen", fr: "Des leçons à lire" }, lang)[0]}
            {" · "}
            {orderedPair({ nl: "Lessen om te lezen", fr: "Des leçons à lire" }, lang)[1]}
          </p>
        </header>

        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/child/${id}/apprendre/${subj}/${lesson.id}`)}
              className="w-full text-left bg-card border-4 border-border rounded-3xl p-5 kids-shadow-card hover:kids-shadow-hover transition-shadow"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl shrink-0">{lesson.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">
                      ⏱️ {lesson.durationMin} min
                    </span>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    {orderedPair({ nl: lesson.titleNl ?? lesson.title, fr: lesson.title }, lang)[0]}
                  </p>
                  <p className="text-sm font-dyslexic text-muted-foreground">
                    {orderedPair({ nl: lesson.titleNl ?? lesson.title, fr: lesson.title }, lang)[1]}
                  </p>
                  <p className="text-sm font-dyslexic text-muted-foreground mt-1">
                    {orderedPair({ nl: lesson.introNl ?? lesson.intro, fr: lesson.intro }, lang)[0]}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs font-bold">
                    <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      📖 {lesson.sections.length} {lang === "nl" ? "begrippen / notions" : "notions / begrippen"}
                    </span>
                    {lesson.linkedChapterId && (
                      <span className="px-2 py-1 rounded-full bg-kids-blue/30 text-foreground">
                        📚 {lang === "nl" ? "oefeningen / exercices" : "exercices / oefeningen"}
                      </span>
                    )}
                    {lesson.linkedGameIds?.length ? (
                      <span className="px-2 py-1 rounded-full bg-kids-yellow/40 text-foreground">
                        🎮 {lang === "nl" ? "spel / jeu" : "jeu / spel"}
                      </span>
                    ) : null}
                  </div>
                </div>
                <span className="text-2xl shrink-0">➡️</span>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SubjectLessons;
