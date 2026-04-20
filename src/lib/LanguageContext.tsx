import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "./translations";

type TranslationsType = typeof translations["no"];

// Non-recursive, safe path generator for our 2-level translation object
type ValidPaths = {
  [K in keyof TranslationsType]: TranslationsType[K] extends Record<string, string> 
    ? `${K}.${keyof TranslationsType[K] & string}` 
    : never
}[keyof TranslationsType];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: ValidPaths) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("no");

  const t = (path: ValidPaths): string => {
    const keys = path.split(".");
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path}`);
        return path;
      }
      current = current[key];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
