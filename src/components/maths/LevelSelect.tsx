import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { LEVEL_META, MathLevel, XP_PER_LEVEL } from "@/lib/mathSession";
import { sounds } from "@/lib/sounds";
import { BilingualText, Bi } from "@/components/ui/BilingualText";
import { UI, biFromFr } from "@/lib/bilingual";

interface Props {
  title: string;
  emoji: string;
  intro: string;
  levels: { level: MathLevel; label: string; desc: string }[];
  backTo: string;
}

export const LevelSelect = ({ title, emoji, intro, levels, backTo }: Props) => {
  const navigate = useNavigate();
  const titleBi = biFromFr(title);
  const introBi = biFromFr(intro);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-4xl px-4 py-8">
        <button
          onClick={() => navigate(backTo)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> <Bi phrase={UI.back} />
        </button>

        <div className="text-center mb-8">
          <span className="text-5xl block mb-2">{emoji}</span>
          <h1 className="text-3xl font-bold text-foreground">
            <BilingualText nl={titleBi.nl} fr={titleBi.fr} stacked />
          </h1>
          <p className="text-muted-foreground font-dyslexic mt-2">
            <BilingualText nl={introBi.nl} fr={introBi.fr} stacked />
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {levels.map(({ level, label, desc }, i) => {
            const meta = LEVEL_META[level];
            const labelBi = biFromFr(label);
            const descBi = biFromFr(desc);
            return (
              <motion.button
                key={level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => {
                  sounds.click();
                  navigate(`${level}`);
                }}
                className={`${meta.card} ${meta.ring} border-4 rounded-2xl p-6 text-center kids-shadow-card hover:kids-shadow-hover transition-shadow`}
              >
                <span className="text-4xl block mb-2">{meta.emoji}</span>
                <h2 className="text-xl font-bold text-foreground">
                  {labelBi.nl === labelBi.fr ? (
                    labelBi.fr
                  ) : (
                    <BilingualText nl={labelBi.nl} fr={labelBi.fr} stacked />
                  )}
                </h2>
                <p className="text-sm text-foreground/80 font-dyslexic mt-1">
                  <BilingualText nl={descBi.nl} fr={descBi.fr} stacked />
                </p>
                <p className="text-sm font-bold text-foreground mt-3">
                  {XP_PER_LEVEL[level]} XP · <Bi phrase={UI.xpPerCorrect} />
                </p>
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default LevelSelect;
