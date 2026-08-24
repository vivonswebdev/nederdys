import { createContext, useContext, useState, ReactNode } from "react";

interface ChildModeContextType {
  isChildMode: boolean;
  /** Enfant auquel l'appareil est verrouillé (null si mode parent). */
  lockedChildId: string | null;
  /** Verrouille l'appareil sur un enfant précis. */
  enterChildMode: (childId: string) => void;
  /** À appeler uniquement après un verifyPin() réussi (via ParentLogin). */
  exitChildMode: () => void;
}

const ChildModeContext = createContext<ChildModeContextType | null>(null);

const STORAGE_KEY = "nederdys.childMode";

/**
 * Mode enfant : l'appareil est verrouillé sur un profil enfant précis.
 * Persisté (localStorage) pour qu'un simple rafraîchissement ne permette pas
 * d'en sortir. Ce n'est pas une couche de sécurité serveur : les routes parent
 * restent protégées par RequireParentPin indépendamment de cet état.
 */
export function ChildModeProvider({ children }: { children: ReactNode }) {
  const [lockedChildId, setLockedChildId] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );

  const enterChildMode = (childId: string) => {
    localStorage.setItem(STORAGE_KEY, childId);
    setLockedChildId(childId);
  };

  const exitChildMode = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLockedChildId(null);
  };

  return (
    <ChildModeContext.Provider
      value={{
        isChildMode: !!lockedChildId,
        lockedChildId,
        enterChildMode,
        exitChildMode,
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
