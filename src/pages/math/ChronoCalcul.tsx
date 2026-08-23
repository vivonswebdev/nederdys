import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { ChronoCalcGame } from "@/components/maths/ChronoCalcGame";
import { parseLevel } from "@/lib/mathSession";

const ChronoCalcul = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/chrono-calcul` : "/jeu/chrono-calcul";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Chrono Calcul"
        emoji="⏱️"
        intro="Choisis ton niveau de difficulté : 6 défis chronométrés par session."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Additions (12 s)" },
          { level: 2, label: "Niveau 2", desc: "Soustractions (8 s)" },
          { level: 3, label: "Niveau 3", desc: "Mélange +, -, × (6 s)" },
        ]}
      />
    );
  }

  return <ChronoCalcGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default ChronoCalcul;
