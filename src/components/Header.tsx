import React from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="relative z-30 bg-gradient-to-br from-blue-50/80 via-white/80 to-purple-100/80 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-blue-950/80 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center">
              <Cloud className="w-9 h-9 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight drop-shadow-sm">
                {t("footerCompany")}
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                {t("appSubtitle")}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6 md:space-x-8 mt-2 md:mt-0">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold px-2 py-1 rounded hover:bg-blue-50/60 dark:hover:bg-blue-900/30">
              {t("currentWeather")}
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold px-2 py-1 rounded hover:bg-blue-50/60 dark:hover:bg-blue-900/30">
              {t("dailyForecast")}
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold px-2 py-1 rounded hover:bg-blue-50/60 dark:hover:bg-blue-900/30">
              {t("footerWeatherMaps")}
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold px-2 py-1 rounded hover:bg-blue-50/60 dark:hover:bg-blue-900/30">
              {t("alerts")}
            </a>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <LanguageSelector />
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 group shadow"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-blue-700 group-hover:rotate-12 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;