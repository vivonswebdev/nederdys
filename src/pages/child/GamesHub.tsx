import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useChild } from "@/contexts/ChildContext";
import { getChildLevel } from "@/lib/database";
import { getLevel } from "@/lib/levels";
import { gamesBySubject, Subject } from "@/lib/games";
import { chaptersBySubject, chaptersListRoute } from "@/lib/chapters";

interface SubjectSection {
  id: Subject;
  name: string;
  icon: string;
  cardClass: string;
  gamesCount: number;
  gamesRoute: string;
  exercisesRoute: string;
  exercisesCount: number;
}

const GamesHub = () => {
  const { id } = useParams<{ id: string }>();
  const childId = id ?? "";
  const navigate = useNavigate();
  const { children } = useChild();
  const child = children.find((c) => c.id === childId) ?? null;

  const { data: levelRow } = useQuery({
    queryKey: ["childLevel", childId],
    queryFn: () => getChildLevel(childId),
    enabled: !!childId,
  });

  const totalXp = levelRow?.xp ?? 0;
  const { level, title: levelTitle, progress, emoji } = getLevel(totalXp);

  const subjects: SubjectSection[] = (["nl", "math", "fr"] as Subject[]).map((s) => {
    const meta = {
      nl: { name: "Néerlandais", icon: "🇳🇱", cardClass: "border-kids-blue bg-kids-blue/20" },
      math: { name: "Mathématiques", icon: "🔢", cardClass: "border-kids-orange bg-kids-orange/20" },
      fr: { name: "Français", icon: "🇫🇷", cardClass: "border-kids-green-dark bg-kids-green-light/40" },
    }[s];
    return {
      id: s,
      ...meta,
      gamesCount: gamesBySubject(s).length,
      gamesRoute: `/child/${childId}/${s}`,
      exercisesRoute: chaptersListRoute(childId, s),
      exercisesCount: chaptersBySubject(s).length,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-5xl px-4 py-8">
        <Link
          to={`/child/${childId}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Mon tableau de bord
        </Link>

        <header className="bg-card border-4 border-border rounded-3xl p-6 kids-shadow-card mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-3">🎮 Mes Jeux</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[14rem]">
              <p className="text-xl font-bold text-foreground">{child?.first_name ?? "Mon profil"}</p>
              <p className="font-dyslexic text-muted-foreground">
                Niveau {level} — {levelTitle}
              </p>
              <div className="mt-3 h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 tabular-nums">{totalXp} XP</p>
            </div>
            <span className="text-5xl">{emoji}</span>
          </div>
        </header>

        {subjects.map((s, i) => (
          <motion.section
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{s.icon}</span>
              <h2 className="text-2xl font-bold text-foreground">{s.name}</h2>
              <span className="text-sm text-muted-foreground font-dyslexic">
                {s.gamesCount > 0 ? `${s.gamesCount} jeux` : "Bientôt"}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <button
                onClick={() => navigate(s.gamesRoute)}
                disabled={s.gamesCount === 0}
                className={`border-4 rounded-3xl p-6 text-left kids-shadow-card transition-shadow hover:kids-shadow-hover ${s.cardClass} ${
                  s.gamesCount === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="text-4xl block mb-2">🎮</span>
                <p className="text-xl font-bold text-foreground">
                  {s.gamesCount > 0 ? "Jouer" : "Bientôt…"}
                </p>
                <p className="font-dyslexic text-muted-foreground">
                  {s.gamesCount > 0 ? `${s.gamesCount} jeux disponibles` : "Des jeux arrivent !"}
                </p>
              </button>

              <button
                onClick={() => navigate(s.exercisesRoute)}
                disabled={s.exercisesCount === 0 && s.id !== "fr"}
                className={`border-4 rounded-3xl p-6 text-left kids-shadow-card transition-shadow hover:kids-shadow-hover ${s.cardClass}`}
              >
                <span className="text-4xl block mb-2">📚</span>
                <p className="text-xl font-bold text-foreground">
                  {s.exercisesCount > 0 ? "Exercices par chapitre" : "Bientôt…"}
                </p>
                <p className="font-dyslexic text-muted-foreground">
                  {s.exercisesCount > 0
                    ? `${s.exercisesCount} chapitres · 3 niveaux`
                    : "Des exercices arrivent !"}
                </p>
              </button>
            </div>
          </motion.section>
        ))}

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">🚀 Pour les plus grands (9-12 ans)</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <button
              onClick={() => navigate(`/child/${childId}/math/chapitres`)}
              className="border-4 border-kids-purple bg-kids-purple/30 rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
            >
              <span className="text-4xl block mb-2">🔥</span>
              <p className="text-xl font-bold text-foreground">Maths avancées</p>
              <p className="font-dyslexic text-muted-foreground">
                4e, 5e, 6e primaire — fractions, décimaux, pourcentages…
              </p>
            </button>

            <button
              onClick={() => navigate(`/child/${childId}/nl/exercices`)}
              className="border-4 border-kids-blue bg-kids-blue/30 rounded-3xl p-6 text-left kids-shadow-card hover:kids-shadow-hover transition-shadow"
            >
              <span className="text-4xl block mb-2">🎓</span>
              <p className="text-xl font-bold text-foreground">NL avancé</p>
              <p className="font-dyslexic text-muted-foreground">
                Grammaire, vocabulaire, compréhension…
              </p>
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default GamesHub;
