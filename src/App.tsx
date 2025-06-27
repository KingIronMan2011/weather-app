import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ForecastCard from './components/ForecastCard';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import { weatherDatabase } from './data/weatherData';

function App() {
  const [currentLocation, setCurrentLocation] = useState('New York');

  const currentWeatherData = weatherDatabase[currentLocation];

  const handleLocationSelect = (location: string) => {
    if (weatherDatabase[location]) {
      setCurrentLocation(location);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <Header />

        <div className="relative z-10 p-6">
          {/* Main Title Section */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">
                  Weather
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent ml-2">
                    Dashboard
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Stay updated with accurate weather forecasts worldwide
                </p>
              </div>
              <SearchBar onLocationSelect={handleLocationSelect} />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Current Weather - Takes 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <WeatherCard weather={currentWeatherData.weather} />
              </div>
              
              {/* Weather Details */}
              <div>
                <WeatherDetails details={currentWeatherData.details} />
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="mb-8">
              <HourlyForecast hourlyData={currentWeatherData.hourly} />
            </div>

            {/* 5-Day Forecast */}
            <div>
              <ForecastCard forecasts={currentWeatherData.forecast} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;