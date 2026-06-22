package com.weather.backend.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record WeatherResponse(
        String name,
        Main main,
        List<Weather> weather,
        Wind wind,     // 👈 Qo'shildi
        Sys sys        // 👈 Qo'shildi
) {
}

record Main(
        double temp,
        @JsonProperty("feels_like")
        double feelsLike,
        int humidity
){}

record Weather(
        String main,   // 👈 Qo'shildi (Clear, Clouds, Rain va h.k. - fon o'zgarishi uchun kerak)
        String description,
        String icon
){}

record Wind(
        double speed   // 👈 Qo'shildi
){}

record Sys(
        String country // 👈 Qo'shildi
){}