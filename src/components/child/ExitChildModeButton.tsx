import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { ParentLogin } from "@/components/parent/ParentLogin";
import { useChildMode } from "@/contexts/ChildModeContext";

/**
 * Bouton discret visible en mode enfant. La sortie repasse par le vrai PIN
 * (ParentLogin → verifyPin, blocage 3 essais / 5 min inclus).
 */
export function ExitChildModeButton() {
  const { isChildMode, exitChildMode } = useChildMode();
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const navigate = useNavigate();

  if (!isChildMode) return null;

  return (
    <>
      <button
        onClick={() => setShowPinPrompt(true)}
        className="fixed bottom-2 right-2 z-40 opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-bold px-3 min-h-[44px] rounded-full bg-card border border-border text-muted-foreground"
        aria-label="Espace parent — code PIN requis"
      >
        <Lock className="w-4 h-4" /> Parent
      </button>

      {showPinPrompt && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <ParentLogin
              onSuccess={() => {
                exitChildMode();
                setShowPinPrompt(false);
                navigate("/parent/dashboard");
              }}
              onCancel={() => setShowPinPrompt(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ExitChildModeButton;
