import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { getLesson, lessonChapterRoute, lessonGames } from "@/lib/lessons";
import { useChildLanguage, orderedPair, speakBoth } from "@/lib/bilingual";
import { useLanguage } from "@/contexts/LanguageContext";

/** Une leçon : lecture seule, jamais notée, avec liens vers la pratique. */
const LessonPage = () => {
  const { id, subject, lessonId } = useParams<{ id: string; subject: string; lessonId: string }>();
  const lang = useChildLanguage();
  const { t } = useLanguage();
  const lesson = getLesson(lessonId);

  useEffect(() => {
    if (lesson) document.title = `${lesson.title} — NederDys`;
  }, [lesson]);

  if (!lesson) return <Navigate to={`/child/${id}/apprendre`} replace />;

  const title = orderedPair({ nl: lesson.titleNl ?? lesson.title, fr: lesson.title }, lang);
  const intro = orderedPair({ nl: lesson.introNl ?? lesson.intro, fr: lesson.intro }, lang);
  const chapterRoute = lessonChapterRoute(lesson, id ?? "");
  const games = lessonGames(lesson);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8">
        <Link
          to={`/child/${id}/apprendre/${subject ?? lesson.subject}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {lang === "nl" ? "Terug" : "Retour"}
        </Link>

        <header className="text-center mb-8">
          <span className="text-5xl block mb-2">{lesson.emoji}</span>
          <h1 className="text-3xl font-bold text-foreground">{title[0]}</h1>
          <p className="text-lg text-muted-foreground font-dyslexic">{title[1]}</p>
          <p className="text-xs font-bold text-muted-foreground mt-2">
            ⏱️ {lesson.durationMin} min · 📖 {lesson.sections.length}{" "}
            {lang === "nl" ? "begrippen" : "notions"}
          </p>
          <p className="mt-4 font-dyslexic text-foreground">{intro[0]}</p>
          <p className="font-dyslexic text-muted-foreground">{intro[1]}</p>
        </header>

        <div className="space-y-5">
          {lesson.sections.map((section, i) => {
            const heading = orderedPair(
              { nl: section.headingNl ?? section.heading, fr: section.heading },
              lang
            );
            const content = orderedPair(
              { nl: section.contentNl ?? section.content, fr: section.content },
              lang
            );
            const example = section.example
              ? orderedPair({ nl: section.exampleNl ?? section.example, fr: section.example }, lang)
              : null;
            return (
              <motion.section
                key={section.heading}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border-4 border-border rounded-3xl p-5 kids-shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-foreground">{heading[0]}</h2>
                  <button
                    onClick={() =>
                      speakBoth(
                        {
                          nl: `${section.headingNl ?? section.heading}. ${section.contentNl ?? section.content}`,
                          fr: `${section.heading}. ${section.content}`,
                        },
                        lang
                      )
                    }
                    aria-label={lang === "nl" ? "Voorlezen" : "Écouter"}
                    className="p-2 rounded-full bg-muted text-foreground hover:bg-accent shrink-0"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground font-dyslexic">{heading[1]}</p>

                <p className="mt-3 font-dyslexic text-foreground leading-relaxed">{content[0]}</p>
                <p className="mt-1 font-dyslexic text-muted-foreground leading-relaxed">
                  {content[1]}
                </p>

                {example && (
                  <div className="mt-4 rounded-2xl bg-kids-yellow/30 border-2 border-kids-yellow p-3">
                    <p className="text-xs font-bold text-muted-foreground mb-1">
                      {lang === "nl" ? "Voorbeeld" : "Exemple"}
                    </p>
                    <p className="font-dyslexic text-foreground">{example[0]}</p>
                    <p className="font-dyslexic text-muted-foreground text-sm">{example[1]}</p>
                  </div>
                )}
              </motion.section>
            );
          })}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {chapterRoute && (
            <Link
              to={chapterRoute}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground font-bold py-4 px-5 text-center"
            >
              📚 {lang === "nl" ? "Oefenen op dit hoofdstuk" : "S'exercer sur ce chapitre"}
            </Link>
          )}
          {games.map((game) => (
            <Link
              key={game.id}
              to={game.route}
              className="flex items-center justify-center gap-2 rounded-2xl bg-secondary text-secondary-foreground font-bold py-4 px-5 text-center"
            >
              🎮 {t(game.titleKey)}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
