package com.weather.backend.service;

import com.weather.backend.dto.ForecastResponse;
import com.weather.backend.dto.WeatherResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WeatherServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private WeatherService weatherService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(weatherService, "key", "test-api-key");
        ReflectionTestUtils.setField(weatherService, "url", "https://api.openweathermap.org/data/2.5/weather");
        ReflectionTestUtils.setField(weatherService, "forecastUrl", "https://api.openweathermap.org/data/2.5/forecast");
    }

    @Test
    @DisplayName("getWeather by city name should call RestTemplate and return WeatherResponse")
    void getWeatherByCity_Success() {
        WeatherResponse mockResponse = new WeatherResponse(
                1L, "Tashkent", null, null, null, null, null, null, 10000, 1000L, 18000L, 200
        );

        when(restTemplate.getForObject(contains("q=Tashkent"), eq(WeatherResponse.class)))
                .thenReturn(mockResponse);

        WeatherResponse result = weatherService.getWeather("Tashkent");

        assertNotNull(result);
        assertEquals("Tashkent", result.name());
        verify(restTemplate, times(1)).getForObject(
                argThat((String uri) -> uri.contains("q=Tashkent") && uri.contains("appid=test-api-key") && uri.contains("units=metric")),
                eq(WeatherResponse.class)
        );
    }

    @Test
    @DisplayName("getWeather with empty city should throw IllegalArgumentException")
    void getWeather_EmptyCity_ThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> weatherService.getWeather(""));
        assertThrows(IllegalArgumentException.class, () -> weatherService.getWeather("   "));
        assertThrows(IllegalArgumentException.class, () -> weatherService.getWeather(null));
        verifyNoInteractions(restTemplate);
    }

    @Test
    @DisplayName("getWeatherByCoordinates should call RestTemplate with lat and lon")
    void getWeatherByCoordinates_Success() {
        WeatherResponse mockResponse = new WeatherResponse(
                1L, "Tashkent", null, null, null, null, null, null, 10000, 1000L, 18000L, 200
        );

        when(restTemplate.getForObject(contains("lat=41.2646"), eq(WeatherResponse.class)))
                .thenReturn(mockResponse);

        WeatherResponse result = weatherService.getWeatherByCoordinates(41.2646, 69.2163);

        assertNotNull(result);
        assertEquals("Tashkent", result.name());
        verify(restTemplate, times(1)).getForObject(
                argThat((String uri) -> uri.contains("lat=41.2646") && uri.contains("lon=69.2163") && uri.contains("appid=test-api-key")),
                eq(WeatherResponse.class)
        );
    }

    @Test
    @DisplayName("getForecast by city name should call RestTemplate and return ForecastResponse")
    void getForecastByCity_Success() {
        ForecastResponse mockResponse = new ForecastResponse(
                "200", 0, 40, null, null
        );

        when(restTemplate.getForObject(contains("q=Samarkand"), eq(ForecastResponse.class)))
                .thenReturn(mockResponse);

        ForecastResponse result = weatherService.getForecast("Samarkand");

        assertNotNull(result);
        assertEquals("200", result.cod());
        verify(restTemplate, times(1)).getForObject(
                argThat((String uri) -> uri.contains("q=Samarkand") && uri.contains("appid=test-api-key") && uri.contains("units=metric")),
                eq(ForecastResponse.class)
        );
    }

    @Test
    @DisplayName("getForecast with empty city should throw IllegalArgumentException")
    void getForecast_EmptyCity_ThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> weatherService.getForecast(""));
        assertThrows(IllegalArgumentException.class, () -> weatherService.getForecast(null));
        verifyNoInteractions(restTemplate);
    }

    @Test
    @DisplayName("getForecastByCoordinates should call RestTemplate with lat and lon")
    void getForecastByCoordinates_Success() {
        ForecastResponse mockResponse = new ForecastResponse(
                "200", 0, 40, null, null
        );

        when(restTemplate.getForObject(contains("lat=39.65"), eq(ForecastResponse.class)))
                .thenReturn(mockResponse);

        ForecastResponse result = weatherService.getForecastByCoordinates(39.65, 66.97);

        assertNotNull(result);
        assertEquals("200", result.cod());
        verify(restTemplate, times(1)).getForObject(
                argThat((String uri) -> uri.contains("lat=39.65") && uri.contains("lon=66.97") && uri.contains("appid=test-api-key")),
                eq(ForecastResponse.class)
        );
    }
}
