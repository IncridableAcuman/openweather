package com.weather.backend.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ForecastResponse(
        String cod,
        Integer message,
        Integer cnt,
        List<ForecastItem> list,
        ForecastCity city
) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record ForecastItem(
        long dt,
        Main main,
        List<Weather> weather,
        Clouds clouds,
        Wind wind,
        Integer visibility,
        Double pop,
        @JsonProperty("dt_txt")
        String dtTxt
) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record ForecastCity(
        Long id,
        String name,
        Coord coord,
        String country,
        Long sunrise,
        Long sunset,
        Integer timezone
) {}
