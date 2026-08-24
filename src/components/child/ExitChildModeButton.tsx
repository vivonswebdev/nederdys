import { useState } from "react";
import { ParentLogin } from "@/components/parent/ParentLogin";
import { useChildMode } from "@/contexts/ChildModeContext";

/**
 * Bouton discret visible en mode enfant. La sortie repasse par le vrai PIN
 * (ParentLogin → verifyPin, blocage 3 essais / 5 min inclus).
 */
export function ExitChildModeButton() {
  const { isChildMode, exitChildMode } = useChildMode();
  const [showPinPrompt, setShowPinPrompt] = useState(false);

  if (!isChildMode) return null;

  return (
    <>
      <button
        onClick={() => setShowPinPrompt(true)}
        className="fixed bottom-2 right-2 z-40 opacity-40 hover:opacity-100 transition-opacity text-xs min-w-[44px] min-h-[44px] rounded-full bg-card border border-border"
        aria-label="Quitter le mode enfant (code PIN parent)"
      >
        🔒
      </button>

      {showPinPrompt && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <ParentLogin
              onSuccess={() => {
                exitChildMode();
                setShowPinPrompt(false);
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
