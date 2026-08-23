import { Navigate, useParams } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { LevelSelect } from "@/components/maths/LevelSelect";
import { BlackSheepMathGame } from "@/components/maths/BlackSheepMathGame";
import { parseLevel } from "@/lib/mathSession";

const MoutonNoirMaths = () => {
  const { id, level } = useParams<{ id?: string; level?: string }>();
  const { activeChild } = useChild();
  const childId = id ?? activeChild?.id;

  const base = id ? `/child/${id}/math/mouton-noir` : "/jeu/mouton-noir-maths";
  const subjectPage = id ? `/child/${id}/math` : "/matiere/math";

  if (!childId) return <Navigate to="/profils" replace />;

  const parsed = parseLevel(level);
  if (level && !parsed) return <Navigate to={base} replace />;

  if (!parsed) {
    return (
      <LevelSelect
        title="Le Mouton Noir Maths"
        emoji="🐑"
        intro="Choisis ton niveau : 5 listes de nombres, trouve l'intrus à chaque fois."
        backTo={subjectPage}
        levels={[
          { level: 1, label: "Niveau 1", desc: "Pairs et impairs" },
          { level: 2, label: "Niveau 2", desc: "Multiples de 3, 5, 10..." },
          { level: 3, label: "Niveau 3", desc: "Suites logiques" },
        ]}
      />
    );
  }

  return <BlackSheepMathGame childId={childId} level={parsed} backTo={subjectPage} />;
};

export default MoutonNoirMaths;
