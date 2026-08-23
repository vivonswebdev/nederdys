import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { ChainesCalculGame } from "@/components/maths/ChainesCalculGame";
import { parseLevel } from "@/lib/mathSession";

const ChainesCalcul = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/chaines-calcul` : "/jeu/chaines-calcul";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Chaînes de Calcul"
        emoji="🔗"
        intro="Choisis ton niveau : Suis la suite d'opérations sans te tromper."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "2 étapes, petits nombres" },
          { level: 2, label: "Niveau 2", desc: "3 étapes" },
          { level: 3, label: "Niveau 3", desc: "4 étapes avec multiplications" },
        ]}
      />
    );
  }

  return <ChainesCalculGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default ChainesCalcul;
