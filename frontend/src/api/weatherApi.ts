import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/weather';

export const fetchWeatherByCity = async (city: string) => {
  // Spring Boot backendga so'rov yuborish
  const weatherRes = await axios.get(BASE_URL, {
    params: { city }
  });

  return {
    weather: weatherRes.data,
    forecast: null, // Backendda hozircha forecast endpoint yo'qligi uchun null qaytaramiz
  };
};