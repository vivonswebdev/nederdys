import { Navigate } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";

/** /apprendre → hub Apprendre de l'enfant actif (même logique que /jouer). */
const LearnRedirect = () => {
  const { children, activeChild } = useChild();
  const child = activeChild ?? children[0] ?? null;
  return <Navigate to={child ? `/child/${child.id}/apprendre` : "/profils"} replace />;
};

export default LearnRedirect;
