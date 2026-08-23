import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { PyramideNombresGame } from "@/components/maths/PyramideNombresGame";
import { parseLevel } from "@/lib/mathSession";

const PyramideNombres = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/pyramide-nombres` : "/jeu/pyramide-nombres";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Pyramide des Nombres"
        emoji="🔺"
        intro="Choisis ton niveau : Additionne en cascade jusqu'au sommet."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Pyramide à 3 étages, nombres 1-10" },
          { level: 2, label: "Niveau 2", desc: "Pyramide à 4 étages, nombres 1-20" },
          { level: 3, label: "Niveau 3", desc: "Pyramide à 5 étages, nombres à 2 chiffres" },
        ]}
      />
    );
  }

  return <PyramideNombresGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default PyramideNombres;
