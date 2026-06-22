package com.weather.backend.service;

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

    private final RestTemplate template;

    public WeatherResponse getWeather(String city){
        String uri = UriComponentsBuilder
                .fromUriString(url)
                .queryParam("q",city)
                .queryParam("appid",key)
                .queryParam("units","metric").toUriString();
        return template.getForObject(uri,WeatherResponse.class);
    }
}
