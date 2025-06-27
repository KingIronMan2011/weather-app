import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Eye, Droplets } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
}

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { t } = useLanguage();

  const getWeatherIcon = (type: string) => {
    switch (type) {
      case 'sunny':
        return <Sun className="w-20 h-20 text-yellow-300" />;
      case 'cloudy':
        return <Cloud className="w-20 h-20 text-gray-300" />;
      case 'rainy':
        return <CloudRain className="w-20 h-20 text-blue-300" />;
      case 'snowy':
        return <CloudSnow className="w-20 h-20 text-blue-100" />;
      case 'stormy':
        return <CloudLightning className="w-20 h-20 text-purple-300" />;
      default:
        return <Sun className="w-20 h-20 text-yellow-300" />;
    }
  };

  const getBackgroundGradient = (type: string) => {
    switch (type) {
      case 'sunny':
        return 'from-yellow-400 via-orange-500 to-red-500 dark:from-yellow-500 dark:via-orange-600 dark:to-red-600';
      case 'cloudy':
        return 'from-gray-400 via-gray-500 to-gray-600 dark:from-gray-500 dark:via-gray-600 dark:to-gray-700';
      case 'rainy':
        return 'from-blue-400 via-blue-500 to-blue-600 dark:from-blue-500 dark:via-blue-600 dark:to-blue-700';
      case 'snowy':
        return 'from-blue-200 via-blue-300 to-blue-400 dark:from-blue-300 dark:via-blue-400 dark:to-blue-500';
      case 'stormy':
        return 'from-purple-400 via-purple-600 to-purple-800 dark:from-purple-500 dark:via-purple-700 dark:to-purple-900';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600 dark:from-blue-500 dark:via-blue-600 dark:to-blue-700';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getBackgroundGradient(weather.weatherType)} p-8 text-white shadow-2xl transition-all duration-700 hover:shadow-3xl hover:scale-105`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-white/10 blur-lg"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{weather.location}</h1>
            <p className="text-white/80 text-lg">{weather.country}</p>
          </div>
          <div className="transition-transform duration-500 hover:rotate-12">
            {getWeatherIcon(weather.weatherType)}
          </div>
        </div>

        {/* Temperature */}
        <div className="mb-8">
          <div className="flex items-baseline">
            <span className="text-7xl font-thin tracking-tighter">{weather.temperature}</span>
            <span className="text-3xl font-light ml-2">°C</span>
          </div>
          <p className="text-2xl font-medium text-white/90 mt-2">{weather.condition}</p>
          <p className="text-white/70 text-lg">{t("feelsLike")} {weather.feelsLike}°C</p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
            <Wind className="w-6 h-6 text-white/80" />
            <div>
              <p className="text-white/70 text-sm">{t("wind")}</p>
              <p className="font-semibold text-lg">{weather.windSpeed} km/h</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
            <Droplets className="w-6 h-6 text-white/80" />
            <div>
              <p className="text-white/70 text-sm">{t("humidity")}</p>
              <p className="font-semibold text-lg">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
            <Eye className="w-6 h-6 text-white/80" />
            <div>
              <p className="text-white/70 text-sm">{t("visibility")}</p>
              <p className="font-semibold text-lg">{weather.visibility} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;