import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Languages, { LanguageKey } from "../config/languages/Languages";
import i18n from "../i18n";

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
  const [lang, setLangState] = useState<Language>(i18n.language as Language);

  // Sync context state with i18n
  useEffect(() => {
    const handleLangChange = (lng: string) => {
      setLangState(lng as Language);
    };
    i18n.on("languageChanged", handleLangChange);
    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, []);

  const setLang = (lng: Language) => {
    i18n.changeLanguage(lng);
    // setLangState will be called by the languageChanged event
  };

  const t = (key: LanguageKey) => Languages[lang][key] || Languages.en[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);