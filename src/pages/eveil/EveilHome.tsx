import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EVEIL_ACTIVITIES, speakBilingual } from "@/lib/eveil";
import { BilingualText } from "@/components/ui/BilingualText";
import { useChildLanguage } from "@/lib/bilingual";

const EveilHome = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eveilLang = useChildLanguage();

  useEffect(() => {
    document.title = "Éveil 3-5 ans — activités ludiques | NederDys";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="container max-w-3xl px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(`/child/${id}`)}
            aria-label={eveilLang === "fr" ? "Retour" : "Terug"}
            className="min-h-[56px] min-w-[56px] rounded-2xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-foreground">
            🌟 <BilingualText nl="Ontwaken (3-5)" fr="Éveil (3-5)" single />
          </h1>
        </div>
      </header>

      <main className="container max-w-3xl px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {EVEIL_ACTIVITIES.map((activity, i) => (
            <motion.button
              key={activity.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => undefined}
              onClick={() => {
                speakBilingual(activity.name);
                navigate(`/child/${id}/eveil/${activity.id}`);
              }}
              className="min-h-[160px] rounded-3xl border-4 border-primary/25 bg-card p-6 text-center hover:border-primary transition-colors kids-shadow-card"
            >
              <span className="block text-6xl" aria-hidden>
                {activity.emoji}
              </span>
              <BilingualText nl={activity.name.nl} fr={activity.name.fr} single className="block text-lg font-bold mt-3" />
              <BilingualText
                nl={activity.description.nl}
                fr={activity.description.fr}
                single
                className="block font-dyslexic text-xs text-muted-foreground mt-2"
              />
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EveilHome;
