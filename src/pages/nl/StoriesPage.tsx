import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";
import { STORIES } from "@/data/stories";

const StoriesPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8">
        <Link
          to={id ? `/child/${id}/nl` : "/enfant"}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <BilingualText nl="Terug" fr="Retour" />
        </Link>

        <div className="text-center mb-8">
          <span className="text-5xl block mb-2" aria-hidden>
            📖
          </span>
          <h1 className="text-3xl font-bold">
            <BilingualText nl="Verhalen" fr="Histoires" stacked />
          </h1>
          <p className="text-muted-foreground font-dyslexic mt-1">
            <BilingualText
              nl={`${STORIES.length} interactieve verhalen`}
              fr={`${STORIES.length} histoires interactives`}
              stacked
            />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STORIES.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={id ? `/child/${id}/nl/histoires/${story.id}` : `/nl/histoires/${story.id}`}
                className="block bg-card border-4 border-primary/30 rounded-3xl p-6 text-center kids-shadow-card hover:kids-shadow-hover hover:border-primary transition-all"
              >
                <span className="text-6xl block mb-3" aria-hidden>
                  {story.emoji}
                </span>
                <h2 className="text-xl font-bold">
                  <BilingualText nl={story.title} fr={story.titleFr} stacked />
                </h2>
                <p className="text-sm text-muted-foreground font-dyslexic mt-2">
                  <BilingualText
                    nl={`${story.scenes.length} scènes`}
                    fr={`${story.scenes.length} scènes`}
                  />
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StoriesPage;
