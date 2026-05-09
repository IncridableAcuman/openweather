package com.open.weather.dto;

import lombok.Data;

import java.util.List;

@Data
public class WeatherDto {
    private List<Weather> weather;
    private Main main;
    private Wind wind;
    private Sys sys;
    private String name;

}
