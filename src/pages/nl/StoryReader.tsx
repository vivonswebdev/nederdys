import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { biToast } from "@/lib/biToast";
import { bi } from "@/lib/bilingual";
import { Navbar } from "@/components/Navbar";
import { BilingualText } from "@/components/ui/BilingualText";
import { StoryPlayer } from "@/components/stories/StoryPlayer";
import { storyById } from "@/data/stories";
import { STORY_XP } from "@/lib/stories";
import { recordGameCompletion } from "@/lib/mathSession";
import { useChild } from "@/contexts/ChildContext";

const StoryReader = () => {
  const { id, storyId } = useParams<{ id: string; storyId: string }>();
  const navigate = useNavigate();
  const { children } = useChild();
  const [startedAt] = useState(() => Date.now());

  const story = storyById(storyId);
  if (!story) return <Navigate to={id ? `/child/${id}/nl/histoires` : "/enfant"} replace />;

  const child = children.find((c) => c.id === id);

  const handleComplete = async () => {
    if (id) {
      const res = await recordGameCompletion({
        childId: id,
        gameId: `histoire-${story.id}`,
        subject: "nl",
        difficulty: 1,
        xpEarned: STORY_XP,
        score: 1,
        maxScore: 1,
        durationSeconds: Math.round((Date.now() - startedAt) / 1000),
        errorsCount: 0,
      });
      if (res.ok) biToast.success(bi(`+${res.xp_awarded ?? STORY_XP} XP! 🎉`, `+${res.xp_awarded ?? STORY_XP} XP ! 🎉`));
    }
    navigate(id ? `/child/${id}/nl/histoires` : "/enfant");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-3xl px-4 py-8">
        <Link
          to={id ? `/child/${id}/nl/histoires` : "/enfant"}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <BilingualText nl="Terug" fr="Retour" />
        </Link>

        <h1 className="text-2xl font-bold text-center mb-6">
          <span aria-hidden>{story.emoji} </span>
          <BilingualText nl={story.title} fr={story.titleFr} />
        </h1>

        <StoryPlayer
          story={story}
          childId={id}
          childName={child?.first_name}
          childGender={(child as { gender?: string } | undefined)?.gender ?? null}
          onComplete={handleComplete}
        />
      </main>
    </div>
  );
};

export default StoryReader;
