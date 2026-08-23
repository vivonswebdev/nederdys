import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { LabyrintheNombresGame } from "@/components/maths/LabyrintheNombresGame";
import { parseLevel } from "@/lib/mathSession";

const LabyrintheNombres = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/labyrinthe-nombres` : "/jeu/labyrinthe-nombres";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Labyrinthe des Nombres"
        emoji="🌀"
        intro="Choisis ton niveau : choisis le bon chemin à chaque intersection."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "3 intersections, additions" },
          { level: 2, label: "Niveau 2", desc: "4 intersections, + et −" },
          { level: 3, label: "Niveau 3", desc: "5 intersections, multiplications" },
        ]}
      />
    );
  }

  return <LabyrintheNombresGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default LabyrintheNombres;
