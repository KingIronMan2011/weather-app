import { CloudSun } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Loader = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="relative flex items-center justify-center">
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-gradient-to-tr from-blue-300/30 via-purple-200/30 to-yellow-100/30 blur-2xl animate-pulse"></span>
        <CloudSun className="h-14 w-14 text-blue-400 dark:text-blue-300 animate-bounce-slow drop-shadow-lg" />
        <span className="absolute h-16 w-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin-slow"></span>
      </div>
      <p className="mt-8 text-xl font-semibold text-blue-700 dark:text-blue-200 tracking-wide text-center">
        {t("loading")}
      </p>
      <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">
        {t("loadingSub")}
      </p>
    </div>
  );
};

export default Loader;