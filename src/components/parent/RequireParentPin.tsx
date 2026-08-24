import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isParentSessionActive } from "@/lib/pin";

/**
 * Garde d'accès sur toutes les routes /parent/*.
 * Vérifie la session PIN (30 min) à chaque montage : impossible d'accéder
 * directement à une page parent en tapant l'URL sans passer par /parent.
 */
export function RequireParentPin({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isParentSessionActive());
    setChecked(true);
  }, []);

  if (!checked) return null; // évite un flash de contenu sensible
  if (!active) return <Navigate to="/parent" replace />;
  return <>{children}</>;
}

export default RequireParentPin;
