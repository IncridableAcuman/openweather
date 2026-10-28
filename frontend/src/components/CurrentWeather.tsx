import React from 'react';
import { motion } from 'framer-motion';
import type { WeatherData } from '../types/weather';
import {
  formatTemp,
  getWindDirection,
  formatUnixTime,
  formatUzbekDate,
  getHumidityLevel,
  getVisibilityLevel
} from '../utils/weatherUtils';
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Cloud,
  Sunrise,
  Sunset,
  Calendar,
  Compass
} from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  const currentDate = new Date();
  const weatherCondition = data.weather?.[0];
  const timezoneOffset = data.timezone ?? 0;
  const humidityInfo = getHumidityLevel(data.main.humidity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl flex flex-col gap-5 mt-6"
    >
      {/* Main Glass Card */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: City, Country, Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {data.name}
              </h2>
              {data.sys?.country && (
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded-lg bg-white/20 border border-white/25 text-white tracking-widest">
                  {data.sys.country}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm mt-1">
              <Calendar size={14} className="text-cyan-300" />
              <span>{formatUzbekDate(currentDate)}</span>
            </div>
          </div>

          {/* Condition pill */}
          {weatherCondition && (
            <div className="px-4 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-sm font-medium capitalize text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {weatherCondition.description}
            </div>
          )}
        </div>

        {/* Hero Section: Icon, Temperature, Min-Max */}
        <div className="flex flex-col sm:flex-row items-center justify-around py-6 gap-6">
          {/* Temperature & Icon */}
          <div className="flex items-center gap-2 sm:gap-6">
            {weatherCondition?.icon && (
              <motion.img
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@4x.png`}
                alt={weatherCondition.description}
                className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] filter"
              />
            )}
            <div>
              <div className="flex items-start">
                <span className="text-6xl sm:text-8xl font-black tracking-tighter">
                  {Math.round(unit === 'F' ? (data.main.temp * 9) / 5 + 32 : data.main.temp)}
                </span>
                <span className="text-3xl sm:text-4xl font-light text-cyan-300 mt-2">
                  °{unit}
                </span>
              </div>
              <div className="text-white/70 text-xs sm:text-sm flex items-center gap-2 mt-1">
                <span>Tuyulishi: <strong>{formatTemp(data.main.feels_like, unit)}</strong></span>
              </div>
            </div>
          </div>

          {/* Min / Max & Summary Box */}
          <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 min-w-[200px] text-center sm:text-left">
            <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
              Kunning chegaralari
            </span>
            <div className="flex items-center justify-between gap-4 text-sm font-semibold">
              <span className="text-red-300">
                Maks: {formatTemp(data.main.temp_max ?? data.main.temp, unit)}
              </span>
              <span className="text-blue-300">
                Min: {formatTemp(data.main.temp_min ?? data.main.temp, unit)}
              </span>
            </div>
            {data.coord && (
              <div className="text-[11px] text-white/40 pt-2 border-t border-white/10 flex items-center gap-1 justify-center sm:justify-start">
                <Compass size={12} />
                <span>{data.coord.lat.toFixed(2)}°N, {data.coord.lon.toFixed(2)}°E</span>
              </div>
            )}
          </div>
        </div>

        {/* 6 Grid Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-white/10">
          {/* 1. Feels Like */}
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-200">
            <Thermometer size={22} className="text-amber-400 mb-1" />
            <span className="text-xs text-white/60">Tuyulishi</span>
            <span className="text-base font-bold mt-0.5">{formatTemp(data.main.feels_like, unit)}</span>
            <span className="text-[10px] text-white/40 mt-1">
              {data.main.feels_like > data.main.temp ? 'Iliqroq' : 'Salqinroq'}
            </span>
          </div>

          {/* 2. Humidity */}
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-200">
            <Droplets size={22} className="text-blue-400 mb-1" />
            <span className="text-xs text-white/60">Namlik</span>
            <span className="text-base font-bold mt-0.5">{data.main.humidity}%</span>
            <span className={`text-[10px] mt-1 font-medium ${humidityInfo.color}`}>
              {humidityInfo.label}
            </span>
          </div>

          {/* 3. Wind */}
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-200">
            <Wind size={22} className="text-teal-300 mb-1" />
            <span className="text-xs text-white/60">Shamol</span>
            <span className="text-base font-bold mt-0.5">{data.wind?.speed || 0} m/s</span>
            <span className="text-[10px] text-white/50 mt-1 truncate max-w-full">
              {getWindDirection(data.wind?.deg) || 'Sokin'}
            </span>
          </div>

          {/* 4. Pressure */}
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-200">
            <Gauge size={22} className="text-purple-300 mb-1" />
            <span className="text-xs text-white/60">Bosim</span>
            <span className="text-base font-bold mt-0.5">{data.main.pressure ?? 1013} hPa</span>
            <span className="text-[10px] text-white/40 mt-1">Normal</span>
          </div>

          {/* 5. Visibility */}
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-200">
            <Eye size={22} className="text-cyan-300 mb-1" />
            <span className="text-xs text-white/60">Ko'rinish</span>
            <span className="text-base font-bold mt-0.5">
              {data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : "Noma'lum"}
            </span>
            <span className="text-[10px] text-white/40 mt-1">
              {getVisibilityLevel(data.visibility)}
            </span>
          </div>

          {/* 6. Cloudiness */}
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-200">
            <Cloud size={22} className="text-sky-300 mb-1" />
            <span className="text-xs text-white/60">Bulutlilik</span>
            <span className="text-base font-bold mt-0.5">{data.clouds?.all ?? 0}%</span>
            <span className="text-[10px] text-white/40 mt-1">
              {(data.clouds?.all ?? 0) > 75 ? 'Qoplagan' : (data.clouds?.all ?? 0) > 25 ? 'Qisman' : 'Ochiq'}
            </span>
          </div>
        </div>

        {/* Sunrise & Sunset Bar */}
        {(data.sys?.sunrise || data.sys?.sunset) && (
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-row items-center justify-around bg-white/5 rounded-2xl p-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
                <Sunrise size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60">Quyosh chiqishi</span>
                <span className="text-sm font-semibold">
                  {formatUnixTime(data.sys?.sunrise, timezoneOffset)}
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/15" />

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-400/20 text-orange-300">
                <Sunset size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60">Quyosh botishi</span>
                <span className="text-sm font-semibold">
                  {formatUnixTime(data.sys?.sunset, timezoneOffset)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
