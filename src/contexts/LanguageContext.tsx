import { createContext, useContext, useState, ReactNode } from "react";
import Languages, { LanguageKey } from "../config/languages/Languages";

type Language = "en" | "de" | "it";

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: LanguageKey) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: "en",
  setLang: () => {},
  t: (key) => Languages.en[key],
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const t = (key: LanguageKey) => Languages[lang][key] || Languages.en[key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);