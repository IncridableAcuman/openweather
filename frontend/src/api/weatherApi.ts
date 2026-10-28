import axios from 'axios';
import type { WeatherData, ForecastData } from '../types/weather';

// Render va local muhit uchun dinamik API URL
const RAW_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  'https://openweather-backend-46nb.onrender.com';

// Protocol (http:// yoki https://) bo'lmasa, avtomatik https:// qo'shish
const WITH_PROTO = RAW_URL.startsWith('http://') || RAW_URL.startsWith('https://')
  ? RAW_URL
  : `https://${RAW_URL}`;

const CLEAN_URL = WITH_PROTO.replace(/\/+$/, '');
const BASE_URL = CLEAN_URL.endsWith('/api/v1/weather')
  ? CLEAN_URL
  : `${CLEAN_URL}/api/v1/weather`;

export interface WeatherApiResponse {
  weather: WeatherData;
  forecast: ForecastData;
}

export const fetchWeatherByCity = async (city: string): Promise<WeatherApiResponse> => {
  const [weatherRes, forecastRes] = await Promise.all([
    axios.get<WeatherData>(BASE_URL, { params: { city: city.trim() } }),
    axios.get<ForecastData>(`${BASE_URL}/forecast`, { params: { city: city.trim() } })
  ]);

  return {
    weather: weatherRes.data,
    forecast: forecastRes.data,
  };
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherApiResponse> => {
  const [weatherRes, forecastRes] = await Promise.all([
    axios.get<WeatherData>(BASE_URL, { params: { lat, lon } }),
    axios.get<ForecastData>(`${BASE_URL}/forecast`, { params: { lat, lon } })
  ]);

  return {
    weather: weatherRes.data,
    forecast: forecastRes.data,
  };
};
