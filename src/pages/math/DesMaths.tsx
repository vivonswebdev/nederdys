import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { DesMathsGame } from "@/components/maths/DesMathsGame";
import { parseLevel } from "@/lib/mathSession";

const DesMaths = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/des-mathematiques` : "/jeu/des-mathematiques";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Les Dés Mathématiques"
        emoji="🎲"
        intro="Choisis ton niveau : lance les dés et calcule le résultat."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Additions de deux dés" },
          { level: 2, label: "Niveau 2", desc: "Soustractions et petites tables" },
          { level: 3, label: "Niveau 3", desc: "Multiplications jusqu'à 10" },
        ]}
      />
    );
  }

  return <DesMathsGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default DesMaths;
