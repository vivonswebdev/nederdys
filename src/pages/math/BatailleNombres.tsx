import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { BatailleNombresGame } from "@/components/maths/BatailleNombresGame";
import { parseLevel } from "@/lib/mathSession";

const BatailleNombres = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/bataille-nombres` : "/jeu/bataille-nombres";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Bataille des Nombres"
        emoji="⚔️"
        intro="Choisis ton niveau : Compare deux calculs avant la fin du chrono."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Additions, 15 s" },
          { level: 2, label: "Niveau 2", desc: "Additions et soustractions, 12 s" },
          { level: 3, label: "Niveau 3", desc: "Multiplications, 10 s" },
        ]}
      />
    );
  }

  return <BatailleNombresGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default BatailleNombres;
