import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { MarathonMentalGame } from "@/components/maths/MarathonMentalGame";
import { parseLevel } from "@/lib/mathSession";

const MarathonMental = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/marathon-mental` : "/jeu/marathon-mental";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Marathon Mental"
        emoji="🏃"
        intro="Choisis ton niveau : 6 calculs à enchaîner sans t'arrêter."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Additions simples (12 s)" },
          { level: 2, label: "Niveau 2", desc: "Mélange + et - à 2 chiffres" },
          { level: 3, label: "Niveau 3", desc: "Toutes les opérations" },
        ]}
      />
    );
  }

  return <MarathonMentalGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default MarathonMental;
