import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { sounds } from "@/lib/sounds";
import {
  Difficulty,
  LEVEL_CARD,
  LEVEL_EMOJI,
  LEVEL_LABEL,
  fetchBestScores,
  fetchUnlockedLevel,
  getChapter,
} from "@/lib/chapters";

const REQUIREMENT: Record<Difficulty, string | null> = {
  1: null,
  2: "80 % de réussite en niveau Facile",
  3: "80 % de réussite en niveau Moyen",
};

const ChapterLevelSelect = () => {
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const navigate = useNavigate();
  const childId = id ?? "";
  const chapter = getChapter(chapterId);

  const [unlockedLevel, setUnlockedLevel] = useState<Difficulty>(1);
  const [bestScores, setBestScores] = useState<Record<Difficulty, number>>({ 1: 0, 2: 0, 3: 0 });
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!childId || !chapterId) return;
    let active = true;
    (async () => {
      setLoading(true);
      const [level, scores] = await Promise.all([
        fetchUnlockedLevel(childId, chapterId),
        fetchBestScores(childId, chapterId),
      ]);
      if (!active) return;
      const seenKey = `unlocked:${childId}:${chapterId}`;
      const seen = Number(localStorage.getItem(seenKey) ?? "1");
      if (level > seen) {
        setJustUnlocked(true);
        sounds.correct();
      }
      localStorage.setItem(seenKey, String(level));
      setUnlockedLevel(level);
      setBestScores(scores);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [childId, chapterId]);

  if (!chapter) return <Navigate to={listRoute} replace />;

  const levels: Difficulty[] = [1, 2, 3];

  const handleClick = (level: Difficulty) => {
    if (level > unlockedLevel) {
      toast(`🔒 Pour débloquer : ${REQUIREMENT[level]}`);
      return;
    }
    sounds.click();
    navigate(`/child/${childId}/${chapter.subject}/chapitre/${chapter.id}/${level}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-4xl px-4 py-8">
        <Link
          to={listRoute}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Tous les chapitres
        </Link>

        <div className="text-center mb-8">
          <span className="text-5xl block mb-2">{chapter.emoji}</span>
          <h1 className="text-3xl font-bold text-foreground">{chapter.name}</h1>
          <p className="text-muted-foreground font-dyslexic mt-1">Choisis ton niveau :</p>
        </div>

        {justUnlocked && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-kids-green-light border-4 border-kids-green-dark rounded-2xl p-4 mb-6 text-center"
          >
            <p className="font-bold text-lg">
              🎉 Bravo ! Tu as débloqué le niveau {LEVEL_LABEL[unlockedLevel]} !
            </p>
          </motion.div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          {levels.map((level, i) => {
            const locked = level > unlockedLevel;
            const best = Math.round(bestScores[level]);
            const played = best > 0;
            return (
              <motion.button
                key={level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={locked ? undefined : { y: -4, scale: 1.02 }}
                onClick={() => handleClick(level)}
                className={`${LEVEL_CARD[level]} border-4 rounded-2xl p-6 text-center kids-shadow-card relative ${
                  locked ? "opacity-60 grayscale" : "hover:kids-shadow-hover"
                }`}
              >
                <span className="absolute top-3 right-3 text-2xl">
                  {locked ? "🔒" : played ? "⭐" : "🔓"}
                </span>
                <span className="text-4xl block mb-2">{LEVEL_EMOJI[level]}</span>
                <h2 className="text-xl font-bold text-foreground">{LEVEL_LABEL[level]}</h2>

                {!locked && played && (
                  <div className="mt-3">
                    <p className="text-sm text-foreground/80 font-dyslexic">Meilleur score</p>
                    <p className="text-3xl font-bold text-foreground">{best} %</p>
                  </div>
                )}

                {locked && (
                  <div className="mt-3">
                    <p className="text-sm text-foreground/80 font-dyslexic">Pour débloquer :</p>
                    <p className="font-bold text-foreground font-dyslexic">{REQUIREMENT[level]}</p>
                  </div>
                )}

                {!locked && (
                  <div className="mt-4 text-sm text-foreground/80 font-dyslexic">
                    <p>💰 +2 XP par bonne réponse</p>
                    <p>🎉 +10 XP si tu atteins 80 %</p>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-muted rounded-2xl">
          <p className="text-center font-dyslexic text-muted-foreground">
            💡 Commence par le niveau Facile pour te mettre en confiance, puis monte petit à petit !
          </p>
        </div>

        {loading && <p className="sr-only">Chargement…</p>}
      </main>
    </div>
  );
};

export default ChapterLevelSelect;
