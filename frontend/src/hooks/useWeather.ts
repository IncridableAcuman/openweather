import { useState, useCallback } from 'react';
import axios from 'axios';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../api/weatherApi';
import type { WeatherData, ForecastData } from '../types/weather';

const STORAGE_KEY = 'openweather_recent_cities';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [recentCities, setRecentCities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['Tashkent', 'Samarkand', 'Bukhara'];
    } catch {
      return ['Tashkent', 'Samarkand', 'Bukhara'];
    }
  });

  const saveRecentCity = (cityName: string) => {
    setRecentCities((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
      const updated = [cityName, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeRecentCity = (cityName: string) => {
    setRecentCities((prev) => {
      const updated = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  const parseErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        return "Kiritilgan shahar topilmadi. Shahar nomini to'g'ri kiritganingizni tekshiring.";
      }
      if (err.response?.data?.message) {
        return err.response.data.message;
      }
      if (err.message.includes('Network Error')) {
        return "Server bilan aloqa yo'q. Backend serveri ishga tushirilganligini tekshiring.";
      }
    }
    return "Ob-havo ma'lumotlarini yuklashda xatolik yuz berdi.";
  };

  const getWeather = useCallback(async (city: string) => {
    if (!city || !city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data.weather);
      setForecast(data.forecast);
      if (data.weather?.name) {
        saveRecentCity(data.weather.name);
      }
    } catch (err: unknown) {
      setError(parseErrorMessage(err));
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getWeatherByLocation = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCoords(lat, lon);
      setWeather(data.weather);
      setForecast(data.forecast);
      if (data.weather?.name) {
        saveRecentCity(data.weather.name);
      }
    } catch (err: unknown) {
      setError(parseErrorMessage(err));
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
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
  };
};
