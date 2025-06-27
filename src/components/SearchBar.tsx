import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';

interface SearchBarProps {
  onLocationSelect: (location: string, lat: number, lon: number) => void;
}

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const recentSearches = useRef<Suggestion[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async (q: string) => {
      setLoading(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(q)}&format=json&limit=8`
      );
      const data = await res.json();
      setSuggestions(data);
      setLoading(false);
    };

    if (!debouncedQuery) return setSuggestions([]);
    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
  };

  const handleSearch = (s: Suggestion) => {
    setQuery(s.display_name);
    setIsOpen(false);
    onLocationSelect(s.display_name, parseFloat(s.lat), parseFloat(s.lon));
    // Save to recent searches (in-memory for demo)
    recentSearches.current = [
      s,
      ...recentSearches.current.filter((r) => r.display_name !== s.display_name),
    ].slice(0, 3);
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
          onChange={handleInput}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-4 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
          placeholder="Search for a city..."
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 z-50 overflow-hidden">
          <div className="py-2">
            {query.length === 0 && recentSearches.current.length > 0 && (
              <div>
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Recent Searches</div>
                {recentSearches.current.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(s)}
                    className="w-full flex items-center px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left group"
                  >
                    <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{s.display_name}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="px-4 py-3 text-sm text-gray-400">Searching...</div>
            )}
            {!loading && suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSearch(s)}
                className="w-full flex items-center px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left group"
              >
                <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{s.display_name}</div>
                </div>
              </button>
            ))}
            {!loading && suggestions.length === 0 && query.length > 1 && (
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