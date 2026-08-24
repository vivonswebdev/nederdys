import { Navigate, useParams } from "react-router-dom";

/**
 * Ancien hub de jeux : tout est désormais réuni sur le tableau de bord enfant
 * (/child/:id). On redirige pour garder un seul écran.
 */
const GamesHub = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={id ? `/child/${id}` : "/profils"} replace />;
};

export default GamesHub;
