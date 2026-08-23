import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { NumberWallGame } from "@/components/maths/NumberWallGame";
import { parseLevel } from "@/lib/mathSession";

const MurDesNombres = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/mur-des-nombres` : "/jeu/mur-des-nombres";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Le Mur des Nombres"
        emoji="🧱"
        intro="Choisis ton niveau de difficulté : 5 défis par session."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Additions simples (1-10)" },
          { level: 2, label: "Niveau 2", desc: "Soustractions (1-20)" },
          { level: 3, label: "Niveau 3", desc: "Mélange + et - à 2 chiffres" },
        ]}
      />
    );
  }

  return <NumberWallGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default MurDesNombres;
