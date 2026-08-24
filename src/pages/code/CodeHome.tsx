import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";
import { useChild } from "@/contexts/ChildContext";
import { CODE_TRACKS } from "@/data/code/curriculum";
import { fetchCodeProgress, quizLevel, recommendedTrack } from "@/lib/codeCourse";

const CodeHome = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { children } = useChild();
  const child = children.find((c) => c.id === id);

  const [trackId, setTrackId] = useState<string>(() => recommendedTrack(child?.age).id);
  const track = CODE_TRACKS.find((t) => t.id === trackId) ?? CODE_TRACKS[0];

  const { data: progress = [] } = useQuery({
    queryKey: ["codeProgress", id],
    queryFn: () => fetchCodeProgress(id!),
    enabled: !!id,
  });

  const byEpisode = useMemo(
    () => new Map(progress.map((p) => [p.episode_id, p])),
    [progress]
  );

  const doneCount = track.episodes.filter((e) => byEpisode.get(e.id)?.passed).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8">
        <Link
          to={id ? `/child/${id}` : "/enfant"}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <BilingualText nl="Terug" fr="Retour" />
        </Link>

        <div className="text-center mb-8">
          <span className="text-5xl block mb-2" aria-hidden>
            🧑‍💻
          </span>
          <h1 className="text-3xl font-bold">
            <BilingualText nl="Coderen & AI" fr="Coder & IA" stacked />
          </h1>
          <p className="text-muted-foreground font-dyslexic mt-1">
            <BilingualText
              nl="Van A tot Z, aflevering per aflevering, met een quiz op het einde."
              fr="De A à Z, épisode par épisode, avec un questionnaire à la fin."
              stacked
            />
          </p>
        </div>

        {/* Choix du parcours par âge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {CODE_TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTrackId(t.id)}
              className={`rounded-3xl p-4 border-4 text-left transition-all min-h-[44px] ${
                t.id === track.id
                  ? "bg-primary/15 border-primary kids-shadow-card"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <span className="text-3xl block" aria-hidden>
                {t.emoji}
              </span>
              <p className="font-bold text-foreground">
                <BilingualText nl={t.label.nl} fr={t.label.fr} stacked />
              </p>
              <p className="text-xs text-muted-foreground tabular-nums">{t.ages} {" "}
                <BilingualText nl="jaar" fr="ans" />
              </p>
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground font-dyslexic mb-4">
          <BilingualText nl={track.description.nl} fr={track.description.fr} stacked />
        </p>

        <div className="bg-secondary/30 border border-border rounded-2xl px-4 py-3 mb-6 text-sm font-bold tabular-nums">
          {doneCount}/{track.episodes.length}{" "}
          <BilingualText nl="afleveringen gelukt" fr="épisodes réussis" />
        </div>

        <ol className="space-y-4">
          {track.episodes.map((ep, i) => {
            const row = byEpisode.get(ep.id);
            const prev = i === 0 ? null : byEpisode.get(track.episodes[i - 1].id);
            const locked = i > 0 && !prev?.passed;
            const lvl = row ? quizLevel(row.best_score_pct) : null;

            return (
              <motion.li
                key={ep.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  disabled={locked}
                  onClick={() => navigate(`/child/${id}/code/${ep.id}`)}
                  className={`w-full flex items-center gap-4 text-left rounded-3xl p-5 border-4 transition-all ${
                    locked
                      ? "bg-muted border-border opacity-60 cursor-not-allowed"
                      : row?.passed
                        ? "bg-kids-green-light/40 border-primary kids-shadow-card"
                        : "bg-card border-border hover:border-primary kids-shadow-card"
                  }`}
                >
                  <span className="text-4xl" aria-hidden>
                    {locked ? "🔒" : ep.emoji}
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs text-muted-foreground tabular-nums">
                      <BilingualText nl="Aflevering" fr="Épisode" /> {i + 1}
                    </span>
                    <span className="block text-lg font-bold text-foreground">
                      <BilingualText nl={ep.title.nl} fr={ep.title.fr} stacked />
                    </span>
                    <span className="block text-sm text-muted-foreground font-dyslexic mt-1">
                      <BilingualText nl={ep.goal.nl} fr={ep.goal.fr} stacked />
                    </span>
                    {row && (
                      <span className="inline-flex items-center gap-1.5 mt-2 text-sm font-bold tabular-nums">
                        {row.passed ? <Check className="w-4 h-4 text-primary" /> : null}
                        {lvl?.emoji} {row.best_score_pct}% —{" "}
                        <BilingualText nl={lvl!.nl} fr={lvl!.fr} />
                      </span>
                    )}
                  </span>
                  {locked && <Lock className="w-5 h-5 text-muted-foreground" />}
                </button>
              </motion.li>
            );
          })}
        </ol>
      </main>
    </div>
  );
};

export default CodeHome;
