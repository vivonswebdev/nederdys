import { Navigate, useLocation } from "react-router-dom";
import { useChildMode } from "@/contexts/ChildModeContext";

/**
 * En mode enfant, l'appareil est verrouillé sur un seul profil :
 * - les pages d'un autre enfant redirigent vers l'enfant verrouillé
 * - les pages "parent" (profils, ajout d'enfant, espace parent, admin)
 *   sont inaccessibles sans sortir du mode enfant (code PIN).
 */
const PARENT_ONLY_PREFIXES = ["/profils", "/ajouter-enfant", "/parent", "/parents", "/admin", "/enfant"];

export function ChildModeGuard({ children }: { children: React.ReactNode }) {
  const { isChildMode, lockedChildId } = useChildMode();
  const { pathname } = useLocation();

  if (!isChildMode || !lockedChildId) return <>{children}</>;

  const home = `/child/${lockedChildId}`;

  if (PARENT_ONLY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return <Navigate to={home} replace />;
  }

  const match = pathname.match(/^\/child\/([^/]+)(\/.*)?$/);
  if (match && match[1] !== lockedChildId) {
    return <Navigate to={`${home}${match[2] ?? ""}`} replace />;
  }

  return <>{children}</>;
}

export default ChildModeGuard;
