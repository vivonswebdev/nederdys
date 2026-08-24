import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { RoueHasardGame } from "@/components/maths/RoueHasardGame";
import { parseLevel } from "@/lib/mathSession";

const RoueDuHasard = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/roue-du-hasard` : "/jeu/roue-du-hasard";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="La Roue du Hasard"
        emoji="🎡"
        intro="Choisis ton niveau : la roue tire une opération, trouve le résultat."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Additions et soustractions" },
          { level: 2, label: "Niveau 2", desc: "Tables et nombres à 2 chiffres" },
          { level: 3, label: "Niveau 3", desc: "Divisions et calculs mixtes" },
        ]}
      />
    );
  }

  return <RoueHasardGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default RoueDuHasard;
