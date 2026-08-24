import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { CoffreFortGame } from "@/components/maths/CoffreFortGame";
import { parseLevel } from "@/lib/mathSession";

const CoffreFort = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/coffre-fort` : "/jeu/coffre-fort";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Le Coffre-Fort"
        emoji="🔐"
        intro="Choisis ton niveau : déduis le code secret grâce aux indices."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Nombres de 1 à 20" },
          { level: 2, label: "Niveau 2", desc: "Nombres jusqu'à 100" },
          { level: 3, label: "Niveau 3", desc: "Nombres jusqu'à 1000" },
        ]}
      />
    );
  }

  return <CoffreFortGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default CoffreFort;
