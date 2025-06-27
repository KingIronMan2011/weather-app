import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import your translations
import en from "./config/languages/en";
import de from "./config/languages/de";
import it from "./config/languages/it";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      it: { translation: it },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "de", "it"],
    detection: {
      order: ["navigator", "localStorage", "htmlTag", "cookie", "querystring", "sessionStorage", "path", "subdomain"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;