import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DayForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
  precipitation: number;
}

interface ForecastCardProps {
  forecasts: DayForecast[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecasts }) => {
  const { t } = useLanguage();

  const getWeatherIcon = (type: string, size = 'w-8 h-8') => {
    const iconClass = `${size} text-gray-600 dark:text-gray-400`;
    switch (type) {
      case 'sunny':
        return <Sun className={`${iconClass} text-yellow-500`} />;
      case 'cloudy':
        return <Cloud className={iconClass} />;
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
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t("dailyForecast")}</h2>
      
      <div className="space-y-4">
        {forecasts.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="transition-transform duration-300 group-hover:scale-110">
                {getWeatherIcon(day.weatherType)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 dark:text-white">{day.day}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{day.date}</div>
              </div>
              <div className="text-center min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{day.condition}</div>
                {day.precipitation > 0 && (
                  <div className="text-xs text-blue-500 dark:text-blue-400">
                    {day.precipitation}% {t("precipitation")}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-bold text-lg text-gray-800 dark:text-white">{day.high}°</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{day.low}°</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;