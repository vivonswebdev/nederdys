import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { NumberShooterGame } from "@/components/maths/NumberShooterGame";
import { parseLevel } from "@/lib/mathSession";

const TirAuxNombres = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/tir-aux-nombres` : "/jeu/tir-aux-nombres";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Le Tir aux Nombres"
        emoji="🎯"
        intro="Choisis ton niveau : 5 nombres à repérer avant la fin du chrono."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Petits nombres (10 s)" },
          { level: 2, label: "Niveau 2", desc: "Confusions 13/30 (7 s)" },
          { level: 3, label: "Niveau 3", desc: "Nombres à 3 chiffres (5 s)" },
        ]}
      />
    );
  }

  return <NumberShooterGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default TirAuxNombres;
