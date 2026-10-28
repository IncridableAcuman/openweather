import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ForecastData, ForecastItem } from '../types/weather';
import { formatTemp } from '../utils/weatherUtils';
import { CalendarDays, Clock, Droplets, Wind } from 'lucide-react';

interface ForecastProps {
  data: ForecastData;
  unit: 'C' | 'F';
}

interface DailySummary {
  dateKey: string;
  weekday: string;
  formattedDate: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
  pop: number; // max rain chance
  humidity: number;
  windSpeed: number;
}

export const Forecast: React.FC<ForecastProps> = ({ data, unit }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'hourly'>('daily');

  if (!data?.list || data.list.length === 0) {
    return null;
  }

  // 1. Soatlik prognoz (keyingi 8 ta interval, ya'ni 24 soat)
  const hourlyForecast: ForecastItem[] = data.list.slice(0, 8);

  // 2. Kunlik prognozni guruhlash (5 kunlik)
  const groupForecastByDay = (): DailySummary[] => {
    const daysMap = new Map<string, ForecastItem[]>();

    data.list.forEach((item) => {
      const dateKey = item.dt_txt.split(' ')[0]; // YYYY-MM-DD
      const existing = daysMap.get(dateKey) || [];
      existing.push(item);
      daysMap.set(dateKey, existing);
    });

    const uzbekWeekdays = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
    const todayStr = new Date().toISOString().split('T')[0];

    const summaries: DailySummary[] = [];

    daysMap.forEach((items, dateKey) => {
      const date = new Date(items[0].dt * 1000);
      let weekday = uzbekWeekdays[date.getDay()];
      if (dateKey === todayStr) {
        weekday = 'Bugun';
      }

      const formattedDate = `${date.getDate()}-${date.toLocaleDateString('uz-UZ', { month: 'short' })}`;

      // O'rtadagi (peshin 12:00 ga yaqin) yoki birinchi ob-havoni asosiy deb olamiz
      const noonItem = items.find((i) => i.dt_txt.includes('12:00:00')) || items[Math.floor(items.length / 2)];

      let minTemp = items[0].main.temp_min ?? items[0].main.temp;
      let maxTemp = items[0].main.temp_max ?? items[0].main.temp;
      let maxPop = 0;
      let totalHumidity = 0;
      let totalWind = 0;

      items.forEach((item) => {
        const itemMin = item.main.temp_min ?? item.main.temp;
        const itemMax = item.main.temp_max ?? item.main.temp;
        if (itemMin < minTemp) minTemp = itemMin;
        if (itemMax > maxTemp) maxTemp = itemMax;
        if (item.pop && item.pop > maxPop) maxPop = item.pop;
        totalHumidity += item.main.humidity;
        totalWind += item.wind?.speed || 0;
      });

      summaries.push({
        dateKey,
        weekday,
        formattedDate,
        minTemp,
        maxTemp,
        icon: noonItem.weather[0]?.icon || '01d',
        description: noonItem.weather[0]?.description || '',
        pop: Math.round(maxPop * 100),
        humidity: Math.round(totalHumidity / items.length),
        windSpeed: Math.round((totalWind / items.length) * 10) / 10,
      });
    });

    return summaries.slice(0, 5);
  };

  const dailySummaries = groupForecastByDay();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-4xl mt-6 mb-12 flex flex-col gap-4"
    >
      {/* Navigation Tabs Header */}
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl">
        <span className="text-white font-bold text-base sm:text-lg pl-3 flex items-center gap-2">
          Prognoz
        </span>

        <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
              activeTab === 'daily'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <CalendarDays size={16} />
            <span>5-Kunlik</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hourly')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
              activeTab === 'hourly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Clock size={16} />
            <span>24-Soatlik</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'daily' ? (
          /* 5-Day Daily Forecast Cards */
          <motion.div
            key="daily"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-5 gap-3"
          >
            {dailySummaries.map((day, idx) => (
              <motion.div
                key={day.dateKey}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`bg-white/10 hover:bg-white/15 backdrop-blur-2xl border rounded-2xl p-4 text-white shadow-lg flex flex-col items-center justify-between text-center transition-all ${
                  idx === 0 ? 'border-cyan-400/40 bg-white/15' : 'border-white/20'
                }`}
              >
                <div>
                  <span className="text-sm font-bold block">{day.weekday}</span>
                  <span className="text-[11px] text-white/60 block">{day.formattedDate}</span>
                </div>

                <div className="my-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                    className="w-16 h-16 mx-auto drop-shadow-md filter"
                  />
                  <span className="text-xs text-white/75 capitalize block line-clamp-1">
                    {day.description}
                  </span>
                </div>

                <div className="w-full pt-2 border-t border-white/10 flex flex-col gap-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base font-extrabold text-red-300">
                      {formatTemp(day.maxTemp, unit)}
                    </span>
                    <span className="text-xs text-white/50">/</span>
                    <span className="text-sm font-medium text-blue-300">
                      {formatTemp(day.minTemp, unit)}
                    </span>
                  </div>

                  <div className="flex items-center justify-around text-[10px] text-white/60">
                    {day.pop > 0 && (
                      <span className="flex items-center gap-0.5 text-cyan-300" title="Yog'ingarchilik ehtimoli">
                        <Droplets size={11} />
                        {day.pop}%
                      </span>
                    )}
                    <span className="flex items-center gap-0.5" title="O'rtacha shamol tezligi">
                      <Wind size={11} />
                      {day.windSpeed}m/s
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Hourly Forecast Carousel */
          <motion.div
            key="hourly"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20"
          >
            {hourlyForecast.map((hour, idx) => {
              const timeStr = hour.dt_txt.split(' ')[1].substring(0, 5); // "15:00"
              const popPercent = Math.round((hour.pop || 0) * 100);

              return (
                <motion.div
                  key={hour.dt}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className={`min-w-[100px] flex-1 bg-white/10 hover:bg-white/15 backdrop-blur-2xl border rounded-2xl p-3 text-white text-center shadow-lg flex flex-col items-center justify-between ${
                    idx === 0 ? 'border-cyan-400/40 bg-white/15' : 'border-white/20'
                  }`}
                >
                  <span className="text-xs font-semibold text-white/80">{timeStr}</span>

                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0]?.icon}.png`}
                    alt={hour.weather[0]?.description}
                    className="w-12 h-12 my-1 drop-shadow-md"
                  />

                  <span className="text-lg font-bold">
                    {formatTemp(hour.main.temp, unit)}
                  </span>

                  <div className="mt-1 flex flex-col items-center gap-0.5 text-[10px] text-white/60">
                    {popPercent > 0 ? (
                      <span className="flex items-center gap-0.5 text-cyan-300">
                        <Droplets size={10} />
                        {popPercent}%
                      </span>
                    ) : (
                      <span className="text-white/40">Yog'ingarchiliksiz</span>
                    )}
                    <span>{hour.wind?.speed || 0} m/s</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
