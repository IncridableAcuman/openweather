import React from 'react';
import type { WeatherData } from '../types/weather';
import { Wind, Droplets, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white w-full max-w-md text-center shadow-2xl mt-6"
    >
      <h2 className="text-3xl font-bold">{data.name}, {data.sys?.country || 'UZ'}</h2>
      <p className="text-white/70 capitalize mt-1">{data.weather[0]?.description}</p>
      
      <div className="flex justify-center items-center my-4">
        {data.weather[0]?.icon && (
          <img 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} 
            alt="weather icon"
            className="w-24 h-24 drop-shadow-[0_10px_10px_rgba(255,255,255,0.3)]"
          />
        )}
        <span className="text-6xl font-extrabold">{Math.round(data.main.temp)}°C</span>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 mt-4">
        <div className="flex flex-col items-center">
          <Thermometer size={20} className="text-red-400" />
          <span className="text-xs text-white/60 mt-1">Tuyulishi</span>
          <span className="font-semibold">{Math.round(data.main.feels_like)}°C</span>
        </div>
        <div className="flex flex-col items-center">
          <Droplets size={20} className="text-blue-400" />
          <span className="text-xs text-white/60 mt-1">Namlik</span>
          <span className="font-semibold">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <Wind size={20} className="text-teal-400" />
          <span className="text-xs text-white/60 mt-1">Shamol</span>
          <span className="font-semibold">{data.wind?.speed || 0} m/s</span>
        </div>
      </div>
    </motion.div>
  );
};