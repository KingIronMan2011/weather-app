import React from 'react';
import { Thermometer, Eye, Wind, Droplets, Sun, Gauge } from 'lucide-react';

interface WeatherDetailsProps {
  details: {
    realFeel: number;
    uvIndex: number;
    windDirection: string;
    pressure: number;
    dewPoint: number;
    visibility: number;
  };
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ details }) => {
  const getUVLevel = (index: number) => {
    if (index <= 2) return { level: 'Low', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
    if (index <= 5) return { level: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
    if (index <= 7) return { level: 'High', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' };
    if (index <= 10) return { level: 'Very High', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
    return { level: 'Extreme', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' };
  };

  const uvInfo = getUVLevel(details.uvIndex);

  const detailItems = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: 'Real Feel',
      value: `${details.realFeel}°C`,
      description: 'How the temperature feels'
    },
    {
      icon: <Sun className="w-6 h-6" />,
      label: 'UV Index',
      value: details.uvIndex.toString(),
      description: uvInfo.level,
      extra: (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${uvInfo.color} ${uvInfo.bg}`}>
          {uvInfo.level}
        </span>
      )
    },
    {
      icon: <Wind className="w-6 h-6" />,
      label: 'Wind Direction',
      value: details.windDirection,
      description: 'Current wind direction'
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      label: 'Pressure',
      value: `${details.pressure} hPa`,
      description: 'Atmospheric pressure'
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: 'Dew Point',
      value: `${details.dewPoint}°C`,
      description: 'Temperature of saturation'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      label: 'Visibility',
      value: `${details.visibility} km`,
      description: 'How far you can see'
    }
  ];

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Weather Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detailItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-all duration-300 group"
          >
            <div className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">{item.label}</h3>
                {item.extra}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{item.value}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;