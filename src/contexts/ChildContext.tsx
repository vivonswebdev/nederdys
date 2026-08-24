import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getChildren } from "@/lib/database";
import { useLanguage } from "@/contexts/LanguageContext";

type Child = Awaited<ReturnType<typeof getChildren>>[number];

interface ChildContextType {
  children: Child[];
  activeChild: Child | null;
  activeChildId: string | null;
  setActiveChildId: (id: string | null) => void;
  loading: boolean;
}

const STORAGE_KEY = "nederdys.activeChild";

const ChildContext = createContext<ChildContextType>({
  children: [],
  activeChild: null,
  activeChildId: null,
  setActiveChildId: () => {},
  loading: true,
});

export const useChild = () => useContext(ChildContext);

export const ChildProvider = ({ children: node }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [activeChildId, setActiveChildIdState] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );

  const { data: childList = [], isLoading } = useQuery({
    queryKey: ["children", user?.id],
    queryFn: () => getChildren(user!.id),
    enabled: !!user,
  });

  const setActiveChildId = (id: string | null) => {
    setActiveChildIdState(id);
    if (id) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);
  };

  // Réinitialise si l'enfant sélectionné n'existe plus
  useEffect(() => {
    if (!childList.length) return;
    if (!activeChildId || !childList.some((c) => c.id === activeChildId)) {
      setActiveChildId(childList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childList]);

  const activeChild = childList.find((c) => c.id === activeChildId) ?? null;

  // La langue du profil enfant pilote l'interface dès qu'il devient actif.
  const { setLang } = useLanguage();
  const childLanguage = (activeChild as { language?: string } | null)?.language;
  useEffect(() => {
    if (childLanguage === "fr" || childLanguage === "nl") setLang(childLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild?.id, childLanguage]);

  return (
    <ChildContext.Provider
      value={{
        children: childList,
        activeChild,
        activeChildId: activeChild?.id ?? null,
        setActiveChildId,
        loading: isLoading,
      }}
    >
      {node}
    </ChildContext.Provider>
  );
};
