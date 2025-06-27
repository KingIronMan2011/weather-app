import { useState, useEffect } from 'react';
import { fetchWeatherData, getLocationFromGeolocation, getLocationFromIP } from './components/WeatherData';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import Header from './components/Header';
import Footer from './components/Footer';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ForecastCard from './components/ForecastCard';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import Loader from './components/Loader';

function App() {
  type WeatherDataType = {
    weather: any;
    forecast: any;
    details: any;
    hourly: any;
  };

  const [location, setLocation] = useState<{ name: string; lat: number; lon: number } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [loading, setLoading] = useState(false);

  // Detect user location on mount
  useEffect(() => {
    if (!location) {
      getLocationFromGeolocation()
        .then(setLocation)
        .catch(async () => {
          const fallback = await getLocationFromIP();
          setLocation(fallback);
        });
    }
  }, []);

  // Fetch weather when location is set/changed
  useEffect(() => {
    if (!location) return;
    setLoading(true);
    fetchWeatherData(location.name, location.lat, location.lon)
      .then(({ weather, forecast, details, hourly }) => {
        setWeatherData({ weather, forecast, details, hourly });
        setLoading(false);
      })
      .catch(() => {
        setWeatherData(null);
        setLoading(false);
      });
  }, [location]);

  // Accepts name, lat, lon from SearchBar
  const handleLocationSelect = (name: string, lat: number, lon: number) => {
    setLocation({ name, lat, lon });
  };

  const { t } = useLanguage();

  if (!location || loading) {
    return (
      <LanguageProvider>
        <ThemeProvider>
          <Loader />
        </ThemeProvider>
      </LanguageProvider>
    );
  }

  if (!weatherData) {
    return (
      <LanguageProvider>
        <ThemeProvider>
          <div className="flex items-center justify-center min-h-[40vh] text-lg text-gray-600 dark:text-gray-300">
            {t("noData")}
          </div>
        </ThemeProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <Header />

          <div className="relative z-10 p-2 sm:p-4 md:p-6">
            {/* Main Title Section */}
            <div className="max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto mb-4 md:mb-8">
              <div className="flex flex-col gap-3 md:gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">
                    {t("appTitle")}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent ml-2">
                      {t("dashboard") || "Dashboard"}
                    </span>
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                    {t("appSubtitle")}
                  </p>
                </div>
                <div className="w-full md:w-auto flex-1 md:max-w-3xl lg:max-w-3xl">
                  <div className="w-full">
                    <SearchBar onLocationSelect={handleLocationSelect} />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl md:max-w-4xl lg:max-w-7xl mx-auto">
              <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-8 mb-4 md:mb-8">
                {/* Current Weather - Takes 2 columns on md+ screens */}
                <div className="md:col-span-2">
                  <WeatherCard weather={weatherData.weather} />
                </div>
                {/* Weather Details */}
                <div>
                  <WeatherDetails details={weatherData.details} />
                </div>
              </div>

              {/* Hourly Forecast */}
              <div className="mb-4 md:mb-8">
                <HourlyForecast hourlyData={weatherData.hourly} />
              </div>

              {/* 5-Day Forecast */}
              <div>
                <ForecastCard forecasts={weatherData.forecast} />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;