import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HourlyData {
  time: string;
  temperature: number;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
  precipitation: number;
}

interface HourlyForecastProps {
  hourlyData: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const { t } = useLanguage();

  const getWeatherIcon = (type: string) => {
    const iconClass = 'w-6 h-6';
    switch (type) {
      case 'sunny':
        return <Sun className={`${iconClass} text-yellow-500`} />;
      case 'cloudy':
        return <Cloud className={`${iconClass} text-gray-500 dark:text-gray-400`} />;
      case 'rainy':
        return <CloudRain className={`${iconClass} text-blue-500`} />;
      case 'snowy':
        return <CloudSnow className={`${iconClass} text-blue-300`} />;
      case 'stormy':
        return <CloudLightning className={`${iconClass} text-purple-500`} />;
      default:
        return <Sun className={`${iconClass} text-yellow-500`} />;
    }
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t("hourlyForecast")}</h2>
      
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-all duration-300 min-w-[80px] group"
          >
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{hour.time}</div>
            <div className="transition-transform duration-300 group-hover:scale-110 mb-2">
              {getWeatherIcon(hour.weatherType)}
            </div>
            <div className="font-bold text-gray-800 dark:text-white mb-1">{hour.temperature}°</div>
            {hour.precipitation > 0 && (
              <div className="text-xs text-blue-500 dark:text-blue-400">{hour.precipitation}% {t("precipitation")}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;