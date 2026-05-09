package com.open.weather.controller;

import com.open.weather.dto.WeatherDto;
import com.open.weather.service.WeatherService;
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
    public ResponseEntity<WeatherDto> getWeather(@RequestParam String q){
        return ResponseEntity.ok(weatherService.getWeather(q));
    }
}
