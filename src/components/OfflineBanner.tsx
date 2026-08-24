import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { BilingualText } from "@/components/ui/BilingualText";

/**
 * Bandeau discret indiquant que l'app fonctionne hors connexion.
 * Les chapitres maths et les jeux restent jouables grâce au précache PWA.
 */
export const OfflineBanner = () => {
  const [offline, setOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border-2 border-kids-orange bg-kids-orange/90 px-4 py-2 text-sm font-bold text-foreground kids-shadow-card"
    >
      <WifiOff className="w-4 h-4 shrink-0" aria-hidden />
      <BilingualText
        nl="Geen internet — je kan verder spelen"
        fr="Pas de connexion — tu peux continuer à jouer"
      />
    </div>
  );
};

export default OfflineBanner;
