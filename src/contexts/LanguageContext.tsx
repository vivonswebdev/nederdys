import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, TranslationKey } from "@/lib/translations";

export type Language = "fr" | "nl";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const detectBrowserLanguage = (): Language => {
  const stored = localStorage.getItem("nederdys-lang");
  if (stored === "fr" || stored === "nl") return stored;
  
  const browserLang = navigator.language || (navigator as any).userLanguage || "";
  if (browserLang.startsWith("nl")) return "nl";
  return "fr";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(detectBrowserLanguage);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("nederdys-lang", l);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations["fr"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
