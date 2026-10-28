package com.weather.backend.controller;

import com.weather.backend.dto.ForecastResponse;
import com.weather.backend.dto.WeatherResponse;
import com.weather.backend.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping
    public ResponseEntity<WeatherResponse> getWeather(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon
    ) {
        if (city != null && !city.trim().isEmpty()) {
            return ResponseEntity.ok(weatherService.getWeather(city));
        }
        if (lat != null && lon != null) {
            return ResponseEntity.ok(weatherService.getWeatherByCoordinates(lat, lon));
        }
        throw new IllegalArgumentException("Shahar nomi yoki koordinatalar (lat, lon) kiritilishi shart");
    }

    @GetMapping("/coordinates")
    public ResponseEntity<WeatherResponse> getWeatherByCoordinates(
            @RequestParam double lat,
            @RequestParam double lon
    ) {
        return ResponseEntity.ok(weatherService.getWeatherByCoordinates(lat, lon));
    }

    @GetMapping("/forecast")
    public ResponseEntity<ForecastResponse> getForecast(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon
    ) {
        if (city != null && !city.trim().isEmpty()) {
            return ResponseEntity.ok(weatherService.getForecast(city));
        }
        if (lat != null && lon != null) {
            return ResponseEntity.ok(weatherService.getForecastByCoordinates(lat, lon));
        }
        throw new IllegalArgumentException("Shahar nomi yoki koordinatalar (lat, lon) kiritilishi shart");
    }

    @GetMapping("/forecast/coordinates")
    public ResponseEntity<ForecastResponse> getForecastByCoordinates(
            @RequestParam double lat,
            @RequestParam double lon
    ) {
        return ResponseEntity.ok(weatherService.getForecastByCoordinates(lat, lon));
    }
}
