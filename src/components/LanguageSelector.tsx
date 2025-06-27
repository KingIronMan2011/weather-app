import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
];

const LanguageSelector: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-tr from-blue-100 via-white to-purple-100 dark:from-blue-900 dark:via-gray-900 dark:to-purple-950 border border-blue-200 dark:border-blue-800 shadow hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={t("selectLanguage")}
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <Globe className="w-5 h-5 text-blue-500 dark:text-blue-300" />
        <span className="font-semibold text-gray-700 dark:text-gray-200 capitalize">
          {LANGUAGES.find((l) => l.code === lang)?.label}
        </span>
        <svg
          className={`w-4 h-4 ml-1 text-blue-400 dark:text-blue-300 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-800 rounded-xl shadow-lg z-50">
          <ul className="py-2">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors duration-150 ${
                    lang === l.code
                      ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-800"
                  }`}
                  onClick={() => {
                    setLang(l.code as typeof lang);
                    setOpen(false);
                  }}
                  aria-current={lang === l.code}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;