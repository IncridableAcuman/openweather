package com.open.weather.service;

import com.open.weather.dto.WeatherDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class WeatherService {
    @Value("${open.weather.key}")
    private String weatherKey;
    @Value("${open.weather.url}")
    private String weatherUrl;


    public WeatherDto getWeather(String q){
        RestTemplate template = new RestTemplate();
        String url = UriComponentsBuilder
                .fromUriString(weatherUrl + "/data/2.5/weather")
                .queryParam("q",q)
                .queryParam("appid",weatherKey)
                .queryParam("units","metric").toUriString();

        return template.getForObject(url,WeatherDto.class);
    }
}
