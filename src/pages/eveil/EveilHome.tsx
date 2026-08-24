import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EVEIL_ACTIVITIES, speakFr } from "@/lib/eveil";

const EveilHome = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Éveil 3-5 ans — activités ludiques | NederDys";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="container max-w-3xl px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(`/child/${id}`)}
            aria-label="Retour"
            className="min-h-[56px] min-w-[56px] rounded-2xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">🌟 Éveil (3-5 ans)</h1>
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
                speakFr(activity.name);
                navigate(`/child/${id}/eveil/${activity.id}`);
              }}
              className="min-h-[160px] rounded-3xl border-4 border-primary/25 bg-card p-6 text-center hover:border-primary transition-colors kids-shadow-card"
            >
              <span className="block text-6xl" aria-hidden>
                {activity.emoji}
              </span>
              <span className="block text-xl font-bold text-foreground mt-3">{activity.name}</span>
              <span className="block font-dyslexic text-muted-foreground text-sm mt-1">
                {activity.description}
              </span>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EveilHome;
