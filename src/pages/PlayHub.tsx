import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { gamesBySubject, Subject } from "@/lib/games";

const SUBJECT_CARDS: {
  id: Subject;
  name: string;
  icon: string;
  desc: string;
  cardClass: string;
}[] = [
  {
    id: "nl",
    name: "Néerlandais",
    icon: "🇳🇱",
    desc: "Sons, mots et phrases en NL",
    cardClass: "border-kids-blue bg-kids-blue/20",
  },
  {
    id: "math",
    name: "Mathématiques",
    icon: "🔢",
    desc: "Calcul, écoute et logique",
    cardClass: "border-kids-orange bg-kids-orange/20",
  },
  {
    id: "fr",
    name: "Français",
    icon: "🇫🇷",
    desc: "Lecture et orthographe",
    cardClass: "border-kids-green-dark bg-kids-green-light/40",
  },
];

/** Page « Jouer » : choix de la matière (NL / Math / FR). */
const PlayHub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { children, activeChild, setActiveChildId } = useChild();

  useEffect(() => {
    document.title = "Choisis ta matière — NederDys";
  }, []);

  const child = activeChild ?? children[0] ?? null;

  const routeFor = (subject: Subject) =>
    child ? `/child/${child.id}/${subject}` : `/matiere/${subject}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-4xl px-4 py-8">
        <Link
          to={user ? "/profils" : "/"}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>

        <header className="text-center mb-8">
          <span className="text-5xl block mb-2">🎮</span>
          <h1 className="text-3xl font-bold text-foreground">Que veux-tu travailler ?</h1>
          <p className="text-muted-foreground font-dyslexic mt-1">
            Choisis une matière pour voir tous les jeux
          </p>
        </header>

        {children.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {children.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChildId(c.id)}
                className={`px-4 py-2 rounded-full font-bold border-2 transition-colors ${
                  child?.id === c.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-muted"
                }`}
              >
                {c.avatar_emoji} {c.first_name}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-3">
          {SUBJECT_CARDS.map((s, i) => {
            const count = gamesBySubject(s.id).length;
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => navigate(routeFor(s.id))}
                className={`border-4 rounded-3xl p-6 text-left kids-shadow-card transition-shadow hover:kids-shadow-hover ${s.cardClass}`}
              >
                <span className="text-5xl block mb-3">{s.icon}</span>
                <p className="text-xl font-bold text-foreground">{s.name}</p>
                <p className="font-dyslexic text-muted-foreground">{s.desc}</p>
                <p className="mt-3 text-sm font-bold text-foreground">
                  {count > 0 ? `${count} jeux ▸` : "Bientôt…"}
                </p>
              </motion.button>
            );
          })}
        </div>

        {child && (
          <Link
            to={`/child/${child.id}/games`}
            className="block mt-8 text-center font-bold text-primary hover:underline"
          >
            📚 Voir aussi les exercices par chapitre
          </Link>
        )}
      </main>
    </div>
  );
};

export default PlayHub;
