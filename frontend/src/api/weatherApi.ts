import axios from 'axios';

const API_KEY = 'Sizning_OpenWeather_API_Kalitingiz'; // .env faylga qo'yish tavsiya etiladi
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city: string) => {
  const weatherRes = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, units: 'metric', appid: API_KEY, lang: 'uz' }
  });
  
  const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, units: 'metric', appid: API_KEY, lang: 'uz' }
  });

  return {
    weather: weatherRes.data,
    forecast: forecastRes.data,
  };
};