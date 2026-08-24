import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BilingualText, Bi } from "@/components/ui/BilingualText";
import { UI, biFromFr } from "@/lib/bilingual";

interface Props {
  title: string;
  emoji: string;
  level: number;
  index: number;
  total: number;
  score: number;
  xpPerCorrect: number;
  finished: boolean;
  backTo: string;
  children: ReactNode;
}

export const MathGameLayout = ({
  title,
  emoji,
  level,
  index,
  total,
  score,
  xpPerCorrect,
  finished,
  backTo,
  children,
}: Props) => {
  const navigate = useNavigate();
  const titleBi = biFromFr(title);

  if (finished) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-lg px-4 py-16 text-center">
          <span className="text-6xl block mb-4">🎉</span>
          <h1 className="text-3xl font-bold mb-2">
            <Bi phrase={UI.sessionDone} stacked />
          </h1>
          <p className="text-lg font-dyslexic text-muted-foreground">
            <Bi phrase={UI.score} /> : {score}/{total} — {score * xpPerCorrect} XP
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> <Bi phrase={UI.quit} />
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            <span className="mr-1">{emoji}</span>
            <BilingualText nl={titleBi.nl} fr={titleBi.fr} stacked />
            <span className="block text-base font-normal text-muted-foreground">
              <Bi phrase={UI.level} priority="nl" /> {level}
            </span>
          </h1>
          <p className="text-muted-foreground font-dyslexic">
            <Bi phrase={UI.challenge} /> {Math.min(index + 1, total)}/{total} · <Bi phrase={UI.score} />{" "}
            {score}/{total} · {xpPerCorrect} XP
          </p>
          <div className="h-3 bg-muted rounded-full overflow-hidden mt-3">
            <motion.div
              className="h-full bg-kids-green-dark"
              animate={{ width: `${((index + 1) / Math.max(1, total)) * 100}%` }}
            />
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};

export default MathGameLayout;
