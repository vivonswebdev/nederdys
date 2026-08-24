import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { LESSON_SUBJECTS, lessonsBySubject } from "@/lib/lessons";
import { orderedPair } from "@/lib/bilingual";
import { LearnLangToggle, useLearnLanguage } from "@/components/learn/LearnLangToggle";

/** Hub « Apprendre » : leçons NL / Math / FR + accès au parcours Code & IA. */
const LearnHome = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lang, setLang] = useLearnLanguage();

  useEffect(() => {
    document.title = "Apprendre — NederDys";
  }, []);

  const cards = [
    ...LESSON_SUBJECTS.map((s) => ({
      key: s.id,
      emoji: s.emoji,
      label: orderedPair({ nl: s.titleNl, fr: s.title }, lang),
      sub: `${lessonsBySubject(s.id).length} ${lang === "nl" ? "lessen / leçons" : "leçons / lessen"}`,
      cardClass: s.cardClass,
      route: `/child/${id}/apprendre/${s.id}`,
    })),
    {
      key: "code",
      emoji: "🧑‍💻",
      label: orderedPair({ nl: "Coderen & AI", fr: "Coder & IA" }, lang),
      sub: lang === "nl" ? "12 afleveringen / épisodes" : "12 épisodes / afleveringen",
      cardClass: "border-kids-purple bg-kids-purple/20",
      route: `/child/${id}/code`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between gap-3 mb-6">
        <Link
          to={`/child/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground "
        >
          <ArrowLeft className="w-4 h-4" /> {lang === "nl" ? "Terug" : "Retour"}
        </Link>
          <LearnLangToggle lang={lang} onChange={setLang} />
        </div>

        <header className="text-center mb-8">
          <span className="text-5xl block mb-2">📘</span>
          <h1 className="text-3xl font-bold text-foreground">
            {orderedPair({ nl: "Wat wil je leren?", fr: "Que veux-tu apprendre ?" }, lang)[0]}
          </h1>
          <p className="text-lg text-muted-foreground font-dyslexic">
            {orderedPair({ nl: "Wat wil je leren?", fr: "Que veux-tu apprendre ?" }, lang)[1]}
          </p>
          <p className="text-muted-foreground font-dyslexic mt-1">
            {orderedPair(
              {
                nl: "Lees rustig de uitleg, daarna mag je oefenen of spelen.",
                fr: "Lis l'explication tranquillement, ensuite tu pourras t'exercer ou jouer.",
              },
              lang
            )[0]}
          </p>

        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => (
            <motion.button
              key={c.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate(c.route)}
              className={`border-4 rounded-3xl p-6 text-left kids-shadow-card transition-shadow hover:kids-shadow-hover ${c.cardClass}`}
            >
              <span className="text-5xl block mb-3">{c.emoji}</span>
              <p className="text-xl font-bold text-foreground">{c.label[0]}</p>
              <p className="font-dyslexic text-muted-foreground">{c.label[1]}</p>
              <p className="mt-3 text-sm font-bold text-foreground">{c.sub} ▸</p>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LearnHome;
