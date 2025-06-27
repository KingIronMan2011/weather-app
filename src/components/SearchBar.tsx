import React, { useState } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { weatherDatabase } from '../data/weatherData';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const availableCities = Object.keys(weatherDatabase);
  const recentSearches = ['New York', 'London', 'Sydney'];
  
  const filteredSuggestions = availableCities
    .filter(city =>
      city.toLowerCase().includes(query.toLowerCase()) ||
      weatherDatabase[city].weather.country.toLowerCase().includes(query.toLowerCase())
    )
    .map(city => ({
      name: city,
      country: weatherDatabase[city].weather.country,
      recent: recentSearches.includes(city),
    }));

  const handleSearch = (location: string) => {
    setQuery(location);
    setIsOpen(false);
    onLocationSelect(location);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-4 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
          placeholder="Search for a city..."
        />
      </div>

      {isOpen && (query.length > 0 || true) && (
        <div className="absolute top-full mt-2 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 z-50 overflow-hidden">
          <div className="py-2">
            {query.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Recent Searches</div>
            )}
            {filteredSuggestions.map((city, index) => (
              <button
                key={index}
                onClick={() => handleSearch(city.name)}
                className="w-full flex items-center px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left group"
              >
                {city.recent ? (
                  <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                ) : (
                  <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                )}
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{city.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{city.country}</div>
                </div>
              </button>
            ))}
            {filteredSuggestions.length === 0 && query.length > 0 && (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                No cities found matching "{query}"
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;