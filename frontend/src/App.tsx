import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "./hooks/useWeather";
import { Search } from "./components/Search";
import { CurrentWeather } from "./components/CurrentWeather";
import { Forecast } from "./components/Forecast";

const App: React.FC = () => {
  const { weather, forecast, loading, error, getWeather } = useWeather();

  // Dastlabki yuklanishda Toshkent shahrini ko'rsatish
  useEffect(() => {
    getWeather("Tashkent");
  }, [getWeather]);

  // Ob-havo turiga qarab dinamik fon gradienti
  const getBackground = () => {
    if (!weather || !weather.weather || !weather.weather[0])
      return "from-slate-900 to-indigo-950";
    const main = weather.weather[0].main?.toLowerCase() || "";
    if (main.includes("rain") || main.includes("drizzle"))
      return "from-blue-800 to-slate-900";
    if (main.includes("snow")) return "from-teal-700 to-blue-900";
    if (main.includes("clear")) return "from-amber-500 to-blue-600";
    return "from-sky-500 to-indigo-800";
  };

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${getBackground()} transition-all duration-1000 flex flex-col items-center justify-start p-6 font-sans overflow-x-hidden`}
    >
      <header className="w-full max-w-4xl flex flex-col items-center gap-4 my-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-extrabold text-white tracking-wide text-center drop-shadow-md"
        >
          SkyFlow Weather 🌤️
        </motion.h1>
        <Search onSearch={getWeather} />
      </header>

      <main className="w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white text-xl font-semibold mt-12 flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              Yuklanmoqda...
            </motion.div>
          )}

          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-300 bg-red-500/20 backdrop-blur-md px-4 py-2 rounded-xl mt-6 border border-red-500/30"
            >
              {error}
            </motion.p>
          )}

          {!loading && weather && (
            <motion.div
              key="content"
              className="w-full flex flex-col items-center"
            >
              <CurrentWeather data={weather} />
              {forecast && <Forecast data={forecast} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
