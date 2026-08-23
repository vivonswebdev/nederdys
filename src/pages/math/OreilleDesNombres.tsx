import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { MagicEarGame } from "@/components/maths/MagicEarGame";
import { parseLevel } from "@/lib/mathSession";

const OreilleDesNombres = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/oreille-des-nombres` : "/jeu/oreille-des-nombres";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="L'Oreille des Nombres"
        emoji="👂"
        intro="Choisis ton niveau : 5 nombres à reconnaître à l'oreille."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Nombres de 1 à 10" },
          { level: 2, label: "Niveau 2", desc: "Nombres de 10 à 100" },
          { level: 3, label: "Niveau 3", desc: "Pièges : 13/30, 16/60..." },
        ]}
      />
    );
  }

  return <MagicEarGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default OreilleDesNombres;
