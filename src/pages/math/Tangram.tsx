import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { TangramGame } from "@/components/maths/TangramGame";
import { parseLevel } from "@/lib/mathSession";

const Tangram = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/tangram` : "/jeu/tangram";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Tangram"
        emoji="🧩"
        intro="Choisis ton niveau : Reconstitue la forme avec les bonnes pièces."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "3 pièces" },
          { level: 2, label: "Niveau 2", desc: "4 pièces" },
          { level: 3, label: "Niveau 3", desc: "5 pièces" },
        ]}
      />
    );
  }

  return <TangramGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default Tangram;
