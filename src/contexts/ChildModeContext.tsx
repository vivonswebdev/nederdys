import { createContext, useContext, useState, ReactNode } from "react";

interface ChildModeContextType {
  isChildMode: boolean;
  enterChildMode: () => void;
  /** À appeler uniquement après un verifyPin() réussi (via ParentLogin). */
  exitChildMode: () => void;
}

const ChildModeContext = createContext<ChildModeContextType | null>(null);

/**
 * Mode enfant : état purement client, volontairement NON persisté
 * (un rafraîchissement remet le mode à "off", comportement le plus sûr).
 * Ce n'est pas une couche de sécurité : les routes parent restent
 * protégées par RequireParentPin indépendamment de cet état.
 */
export function ChildModeProvider({ children }: { children: ReactNode }) {
  const [isChildMode, setIsChildMode] = useState(false);

  return (
    <ChildModeContext.Provider
      value={{
        isChildMode,
        enterChildMode: () => setIsChildMode(true),
        exitChildMode: () => setIsChildMode(false),
      }}
    >
      {children}
    </ChildModeContext.Provider>
  );
}

export const useChildMode = () => {
  const ctx = useContext(ChildModeContext);
  if (!ctx) throw new Error("useChildMode must be used within ChildModeProvider");
  return ctx;
};
