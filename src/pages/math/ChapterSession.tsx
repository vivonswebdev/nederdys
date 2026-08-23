import { Navigate, useParams } from "react-router-dom";
import { ExerciseRunner } from "@/components/chapters/ExerciseRunner";
import { getChapter, parseDifficulty } from "@/lib/chapters";

const ChapterSession = () => {
  const { id, chapterId, level } = useParams<{ id: string; chapterId: string; level: string }>();
  const childId = id ?? "";
  const chapter = getChapter(chapterId);
  const difficulty = parseDifficulty(level);

  if (!chapter || !difficulty) {
    return <Navigate to={`/child/${childId}/math/chapitres`} replace />;
  }

  return <ExerciseRunner childId={childId} chapter={chapter} level={difficulty} />;
};

export default ChapterSession;
