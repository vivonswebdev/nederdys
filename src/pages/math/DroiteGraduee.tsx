import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { DroiteGradueeGame } from "@/components/maths/DroiteGradueeGame";
import { parseLevel } from "@/lib/mathSession";

const DroiteGraduee = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/droite-graduee` : "/jeu/droite-graduee";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Droite Graduée"
        emoji="📍"
        intro="Choisis ton niveau : Place le nombre au bon endroit sur la droite."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "De 0 à 10" },
          { level: 2, label: "Niveau 2", desc: "De 0 à 100" },
          { level: 3, label: "Niveau 3", desc: "De 0 à 1000" },
        ]}
      />
    );
  }

  return <DroiteGradueeGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default DroiteGraduee;
