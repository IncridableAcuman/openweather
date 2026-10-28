package com.weather.backend.service;

import com.weather.backend.dto.ForecastResponse;
import com.weather.backend.dto.WeatherResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class WeatherService {

    @Value("${weather.key}")
    private String key;

    @Value("${weather.url}")
    private String url;

    @Value("${weather.forecast-url}")
    private String forecastUrl;

    private final RestTemplate template;

    public WeatherResponse getWeather(String city) {
        if (city == null || city.trim().isEmpty()) {
            throw new IllegalArgumentException("Shahar nomi bo'sh bo'lishi mumkin emas");
        }
        String uri = UriComponentsBuilder
                .fromUriString(url)
                .queryParam("q", city.trim())
                .queryParam("appid", key)
                .queryParam("units", "metric")
                .toUriString();
        return template.getForObject(uri, WeatherResponse.class);
    }

    public WeatherResponse getWeatherByCoordinates(double lat, double lon) {
        String uri = UriComponentsBuilder
                .fromUriString(url)
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("appid", key)
                .queryParam("units", "metric")
                .toUriString();
        return template.getForObject(uri, WeatherResponse.class);
    }

    public ForecastResponse getForecast(String city) {
        if (city == null || city.trim().isEmpty()) {
            throw new IllegalArgumentException("Shahar nomi bo'sh bo'lishi mumkin emas");
        }
        String uri = UriComponentsBuilder
                .fromUriString(forecastUrl)
                .queryParam("q", city.trim())
                .queryParam("appid", key)
                .queryParam("units", "metric")
                .toUriString();
        return template.getForObject(uri, ForecastResponse.class);
    }

    public ForecastResponse getForecastByCoordinates(double lat, double lon) {
        String uri = UriComponentsBuilder
                .fromUriString(forecastUrl)
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("appid", key)
                .queryParam("units", "metric")
                .toUriString();
        return template.getForObject(uri, ForecastResponse.class);
    }
}
