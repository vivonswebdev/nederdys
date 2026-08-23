import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { MemoryCalculGame } from "@/components/maths/MemoryCalculGame";
import { parseLevel } from "@/lib/mathSession";

const MemoryCalcul = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/memory-calcul` : "/jeu/memory-calcul";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Memory Calcul"
        emoji="🃏"
        intro="Choisis ton niveau : retourne les cartes et associe chaque calcul à son résultat."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "3 paires, additions jusqu'à 18" },
          { level: 2, label: "Niveau 2", desc: "4 paires, tables de multiplication" },
          { level: 3, label: "Niveau 3", desc: "5 paires, multiplications et divisions" },
        ]}
      />
    );
  }

  return <MemoryCalculGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default MemoryCalcul;
