package com.weather.backend.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WeatherResponse(
        Long id,
        String name,
        Coord coord,
        Main main,
        List<Weather> weather,
        Wind wind,
        Clouds clouds,
        Sys sys,
        Integer visibility,
        Long dt,
        Long timezone,
        Integer cod
) {
}

@JsonIgnoreProperties(ignoreUnknown = true)
record Coord(
        Double lon,
        Double lat
) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record Main(
        double temp,
        @JsonProperty("feels_like")
        double feelsLike,
        @JsonProperty("temp_min")
        Double tempMin,
        @JsonProperty("temp_max")
        Double tempMax,
        Integer pressure,
        int humidity
) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record Weather(
        Integer id,
        String main,
        String description,
        String icon
) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record Wind(
        double speed,
        Double deg,
        Double gust
) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record Clouds(
        Integer all
) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record Sys(
        String country,
        Long sunrise,
        Long sunset
) {}
