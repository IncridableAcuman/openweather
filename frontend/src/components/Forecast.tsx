import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type { ForecastData } from '../types/weather';

interface ForecastProps {
  data: ForecastData;
}

export const Forecast: React.FC<ForecastProps> = ({ data }) => {
  // Har kunlik soat 12:00 dagi ob-havoni filtrlab olamiz
  const dailyForecast = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full max-w-4xl mt-8"
    >
      {dailyForecast.map((item, index) => {
        const date = new Date(item.dt * 1000).toLocaleDateString('uz-UZ', { weekday: 'short', day: 'numeric' });
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, translateY: -5 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 text-center text-white shadow-lg"
          >
            <p className="text-sm font-medium text-white/80">{date}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
              alt="icon" 
              className="w-12 h-12 mx-auto my-1"
            />
            <p className="text-xl font-bold">{Math.round(item.main.temp)}°C</p>
            <p className="text-xs text-white/50 capitalize">{item.weather[0].main}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};