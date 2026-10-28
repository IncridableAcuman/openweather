import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, MapPin, X, Clock, Navigation } from 'lucide-react';

interface SearchProps {
  onSearch: (city: string) => void;
  onLocate: () => void;
  recentCities: string[];
  onRemoveRecent: (city: string) => void;
  locating?: boolean;
}

const POPULAR_CITIES = ['Toshkent', 'Samarqand', 'Buxoro', 'Xiva', 'Namangan', 'London', 'Dubai', 'Tokyo'];

export const Search: React.FC<SearchProps> = ({
  onSearch,
  onLocate,
  recentCities,
  onRemoveRecent,
  locating = false
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  const handleQuickCityClick = (city: string) => {
    onSearch(city);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-3">
      {/* Search Bar */}
      <motion.form
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="flex items-center w-full bg-white/10 hover:bg-white/15 focus-within:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2 shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-center pl-2 pr-1 text-white/70">
          <MapPin size={22} className="text-cyan-400" />
        </div>

        <input
          type="text"
          placeholder="Shahar yoki davlat nomini kiriting..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-white placeholder-white/60 outline-hidden grow px-2 py-1 text-base sm:text-lg"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition"
            title="Tozalash"
          >
            <X size={18} />
          </button>
        )}

        {/* GPS Geolocation Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onLocate}
          disabled={locating}
          title="Mening joylashuvim bo'yicha qidirish"
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-xs sm:text-sm font-medium px-3 py-2 rounded-xl mx-1 transition disabled:opacity-50"
        >
          <Navigation size={16} className={`text-cyan-300 ${locating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{locating ? 'Aniqlanmoqda...' : 'Joylashuv'}</span>
        </motion.button>

        {/* Submit Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-4 py-2 rounded-xl shadow-md font-medium text-sm flex items-center gap-1 transition"
        >
          <SearchIcon size={18} />
          <span className="hidden sm:inline">Qidirish</span>
        </motion.button>
      </motion.form>

      {/* Quick Popular Cities */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-1.5 w-full text-xs"
      >
        <span className="text-white/50 mr-1 font-medium">Ommabop:</span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handleQuickCityClick(city)}
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 hover:text-white transition cursor-pointer backdrop-blur-md"
          >
            {city}
          </button>
        ))}
      </motion.div>

      {/* Recent Searches */}
      {recentCities.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-1.5 w-full text-xs"
        >
          <div className="flex items-center gap-1 text-white/50 mr-1">
            <Clock size={12} />
            <span>So'nggi qidiruvlar:</span>
          </div>
          {recentCities.map((city) => (
            <div
              key={city}
              className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 text-xs backdrop-blur-md group"
            >
              <button
                type="button"
                onClick={() => handleQuickCityClick(city)}
                className="hover:underline cursor-pointer"
              >
                {city}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveRecent(city);
                }}
                className="text-white/40 hover:text-red-300 p-0.5 rounded-full transition"
                title="O'chirish"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
