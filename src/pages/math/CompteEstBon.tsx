import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { CompteEstBonGame } from "@/components/maths/CompteEstBonGame";
import { parseLevel } from "@/lib/mathSession";

const CompteEstBon = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/compte-est-bon` : "/jeu/compte-est-bon";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Le Compte est Bon"
        emoji="🎯"
        intro="Choisis ton niveau : Atteins la cible avec les 4 nombres donnés."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Additions seulement" },
          { level: 2, label: "Niveau 2", desc: "Additions et soustractions" },
          { level: 3, label: "Niveau 3", desc: "Toutes les opérations" },
        ]}
      />
    );
  }

  return <CompteEstBonGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default CompteEstBon;
