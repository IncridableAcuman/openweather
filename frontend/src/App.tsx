import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "./hooks/useWeather";
import { Search } from "./components/Search";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";
import { CloudSun, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

const App: React.FC = () => {
  const {
    weather,
    forecast,
    loading,
    error,
    unit,
    recentCities,
    toggleUnit,
    getWeather,
    getWeatherByLocation,
    removeRecentCity,
  } = useWeather();

  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Dastlabki yuklanishda Toshkent shahri ob-havosini yuklash
  useEffect(() => {
    getWeather("Tashkent");
  }, [getWeather]);

  // Geolocation orqali joylashuvni aniqlash
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGeoError("Brauzeringiz joylashuvni aniqlashni qo'llab-quvvatlamaydi.");
      return;
    }

    setLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        getWeatherByLocation(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError("Joylashuvga ruxsat berilmadi. Shahar nomini qidiruvga yozing.");
        } else {
          setGeoError("Joylashuvni aniqlashda xatolik yuz berdi.");
        }
      },
      { timeout: 10000 }
    );
  };

  // Ob-havo holati va vaqtiga (kunduzgi / tungi) qarab dinamik premium fon gradienti
  const getThemeBackground = () => {
    if (!weather || !weather.weather || !weather.weather[0]) {
      return "from-slate-900 via-indigo-950 to-slate-900";
    }

    const icon = weather.weather[0].icon || "";
    const isNight = icon.endsWith("n");
    const main = (weather.weather[0].main || "").toLowerCase();

    if (isNight) {
      if (main.includes("rain") || main.includes("drizzle")) {
        return "from-slate-950 via-blue-950 to-slate-900";
      }
      if (main.includes("snow")) {
        return "from-slate-900 via-cyan-950 to-slate-950";
      }
      if (main.includes("thunder")) {
        return "from-gray-950 via-purple-950 to-slate-950";
      }
      return "from-slate-950 via-indigo-950 to-blue-950";
    }

    // Kunduzgi
    if (main.includes("thunder")) {
      return "from-slate-900 via-purple-900 to-indigo-950";
    }
    if (main.includes("rain") || main.includes("drizzle")) {
      return "from-sky-900 via-blue-900 to-slate-900";
    }
    if (main.includes("snow")) {
      return "from-teal-800 via-sky-900 to-blue-950";
    }
    if (main.includes("clear")) {
      return "from-sky-500 via-blue-600 to-indigo-800";
    }
    if (main.includes("clouds")) {
      return "from-blue-700 via-indigo-800 to-slate-900";
    }

    // Mist, Fog, Haze
    return "from-slate-700 via-zinc-800 to-slate-900";
  };

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${getThemeBackground()} transition-all duration-1000 flex flex-col items-center justify-between p-4 sm:p-6 font-sans text-white selection:bg-cyan-500 selection:text-white`}
    >
      {/* Top Navbar */}
      <header className="w-full max-w-4xl flex items-center justify-between py-4 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => getWeather("Tashkent")}
        >
          <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
            <CloudSun size={26} className="text-amber-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5 drop-shadow-md">
              SkyFlow
              <span className="text-cyan-300 font-light text-sm sm:text-base">Weather</span>
            </h1>
            <p className="text-[10px] text-white/50 tracking-wider uppercase font-semibold">
              Haqiqiy vaqt ob-havosi
            </p>
          </div>
        </motion.div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Unit Switcher Button (°C / °F) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={toggleUnit}
            title="Harorat o'lchov birligini o'zgartirish"
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <span className={unit === 'C' ? 'text-cyan-300 underline' : 'text-white/60'}>°C</span>
            <span className="text-white/30">|</span>
            <span className={unit === 'F' ? 'text-cyan-300 underline' : 'text-white/60'}>°F</span>
          </motion.button>

          {/* Refresh Button */}
          {weather?.name && (
            <motion.button
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              type="button"
              onClick={() => getWeather(weather.name)}
              title="Yangilash"
              className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl shadow-md transition cursor-pointer"
            >
              <RefreshCw size={18} className="text-white/80" />
            </motion.button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl flex flex-col items-center my-6 grow">
        {/* Search Component */}
        <Search
          onSearch={getWeather}
          onLocate={handleLocateMe}
          recentCities={recentCities}
          onRemoveRecent={removeRecentCity}
          locating={locating}
        />

        {/* Geolocation Error Alert */}
        {geoError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-amber-200 bg-amber-500/20 border border-amber-500/30 px-3.5 py-2 rounded-xl backdrop-blur-md"
          >
            <AlertCircle size={16} />
            <span>{geoError}</span>
          </motion.div>
        )}

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {/* Loading Skeleton Spinner */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="my-16 flex flex-col items-center gap-3"
            >
              <div className="relative">
                <div className="w-14 h-14 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
                <Sparkles size={20} className="absolute inset-0 m-auto text-cyan-300 animate-pulse" />
              </div>
              <span className="text-white/80 font-medium text-sm tracking-wide">
                Ma'lumotlar yuklanmoqda...
              </span>
            </motion.div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="my-12 flex flex-col items-center text-center p-6 bg-red-500/15 border border-red-500/30 rounded-3xl backdrop-blur-xl max-w-md shadow-xl"
            >
              <div className="p-3 bg-red-500/20 rounded-full text-red-300 mb-3">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Xatolik yuz berdi</h3>
              <p className="text-sm text-white/80 mb-4">{error}</p>
              <button
                type="button"
                onClick={() => getWeather("Tashkent")}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                Toshkentni ko'rsatish
              </button>
            </motion.div>
          )}

          {/* Success Weather & Forecast */}
          {!loading && weather && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center"
            >
              {/* Current Weather Card */}
              <CurrentWeather data={weather} unit={unit} />

              {/* 5-Day & Hourly Forecast */}
              {forecast && <Forecast data={forecast} unit={unit} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <div>
          <span>SkyFlow Weather &copy; {new Date().getFullYear()} &middot; OpenWeather API &amp; Spring Boot</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hover:text-white transition">Tezkor &middot; Aniq &middot; Zamonaviy</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
