import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { HoleyNumberGame } from "@/components/maths/HoleyNumberGame";
import { parseLevel } from "@/lib/mathSession";

const NombreTroue = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/nombre-troue` : "/jeu/nombre-troue";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Le Nombre Troué"
        emoji="🕳️"
        intro="Choisis ton niveau : 5 opérations à compléter par session."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Trou après le signe +" },
          { level: 2, label: "Niveau 2", desc: "Trou au début, + et -" },
          { level: 3, label: "Niveau 3", desc: "Nombres à 2 chiffres" },
        ]}
      />
    );
  }

  return <HoleyNumberGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default NombreTroue;
