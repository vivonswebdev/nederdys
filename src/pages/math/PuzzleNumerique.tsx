import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { PuzzleNumeriqueGame } from "@/components/maths/PuzzleNumeriqueGame";
import { parseLevel } from "@/lib/mathSession";

const PuzzleNumerique = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/puzzle-numerique` : "/jeu/puzzle-numerique";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Puzzle Numérique"
        emoji="🧮"
        intro="Choisis ton niveau : replace les pièces dans l'ordre croissant."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "4 pièces, nombres 1 à 4" },
          { level: 2, label: "Niveau 2", desc: "9 pièces, nombres 1 à 9" },
          { level: 3, label: "Niveau 3", desc: "9 pièces, suites de multiples" },
        ]}
      />
    );
  }

  return <PuzzleNumeriqueGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default PuzzleNumerique;
