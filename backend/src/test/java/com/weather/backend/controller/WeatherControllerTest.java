package com.weather.backend.controller;

import com.weather.backend.dto.ForecastResponse;
import com.weather.backend.dto.WeatherResponse;
import com.weather.backend.exception.GlobalExceptionHandler;
import com.weather.backend.service.WeatherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.HttpClientErrorException;

import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class WeatherControllerTest {

    private MockMvc mockMvc;

    @Mock
    private WeatherService weatherService;

    @InjectMocks
    private WeatherController weatherController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(weatherController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("GET /api/v1/weather?city=Tashkent should return 200 and weather data")
    void getWeatherByCity_Success() throws Exception {
        WeatherResponse response = new WeatherResponse(
                1512569L, "Tashkent", null, null, null, null, null, null, 10000, 1000L, 18000L, 200
        );
        when(weatherService.getWeather("Tashkent")).thenReturn(response);

        mockMvc.perform(get("/api/v1/weather")
                        .param("city", "Tashkent")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Tashkent"))
                .andExpect(jsonPath("$.id").value(1512569));

        verify(weatherService, times(1)).getWeather("Tashkent");
    }

    @Test
    @DisplayName("GET /api/v1/weather?lat=41.26&lon=69.21 should return 200 and weather data")
    void getWeatherByCoordsParam_Success() throws Exception {
        WeatherResponse response = new WeatherResponse(
                1512569L, "Tashkent", null, null, null, null, null, null, 10000, 1000L, 18000L, 200
        );
        when(weatherService.getWeatherByCoordinates(41.26, 69.21)).thenReturn(response);

        mockMvc.perform(get("/api/v1/weather")
                        .param("lat", "41.26")
                        .param("lon", "69.21")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Tashkent"));

        verify(weatherService, times(1)).getWeatherByCoordinates(41.26, 69.21);
    }

    @Test
    @DisplayName("GET /api/v1/weather/coordinates?lat=41.26&lon=69.21 should return 200")
    void getWeatherByCoordinatesEndpoint_Success() throws Exception {
        WeatherResponse response = new WeatherResponse(
                1512569L, "Tashkent", null, null, null, null, null, null, 10000, 1000L, 18000L, 200
        );
        when(weatherService.getWeatherByCoordinates(41.26, 69.21)).thenReturn(response);

        mockMvc.perform(get("/api/v1/weather/coordinates")
                        .param("lat", "41.26")
                        .param("lon", "69.21")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Tashkent"));

        verify(weatherService, times(1)).getWeatherByCoordinates(41.26, 69.21);
    }

    @Test
    @DisplayName("GET /api/v1/weather without parameters should return 400 Bad Request")
    void getWeather_MissingParams_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/weather")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").isNotEmpty());

        verifyNoInteractions(weatherService);
    }

    @Test
    @DisplayName("GET /api/v1/weather with unknown city should return 404 Not Found")
    void getWeather_CityNotFound_Returns404() throws Exception {
        when(weatherService.getWeather("UnknownCity"))
                .thenThrow(HttpClientErrorException.create(HttpStatus.NOT_FOUND, "Not Found", null, null, null));

        mockMvc.perform(get("/api/v1/weather")
                        .param("city", "UnknownCity")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Shahar topilmadi / City not found"));

        verify(weatherService, times(1)).getWeather("UnknownCity");
    }

    @Test
    @DisplayName("GET /api/v1/weather/forecast?city=Bukhara should return 200 and forecast data")
    void getForecastByCity_Success() throws Exception {
        ForecastResponse response = new ForecastResponse("200", 0, 40, null, null);
        when(weatherService.getForecast("Bukhara")).thenReturn(response);

        mockMvc.perform(get("/api/v1/weather/forecast")
                        .param("city", "Bukhara")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cod").value("200"));

        verify(weatherService, times(1)).getForecast("Bukhara");
    }

    @Test
    @DisplayName("GET /api/v1/weather/forecast?lat=39.77&lon=64.42 should return 200")
    void getForecastByCoords_Success() throws Exception {
        ForecastResponse response = new ForecastResponse("200", 0, 40, null, null);
        when(weatherService.getForecastByCoordinates(39.77, 64.42)).thenReturn(response);

        mockMvc.perform(get("/api/v1/weather/forecast")
                        .param("lat", "39.77")
                        .param("lon", "64.42")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cod").value("200"));

        verify(weatherService, times(1)).getForecastByCoordinates(39.77, 64.42);
    }

    @Test
    @DisplayName("GET /api/v1/weather/forecast/coordinates?lat=39.77&lon=64.42 should return 200")
    void getForecastByCoordinatesEndpoint_Success() throws Exception {
        ForecastResponse response = new ForecastResponse("200", 0, 40, null, null);
        when(weatherService.getForecastByCoordinates(39.77, 64.42)).thenReturn(response);

        mockMvc.perform(get("/api/v1/weather/forecast/coordinates")
                        .param("lat", "39.77")
                        .param("lon", "64.42")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cod").value("200"));

        verify(weatherService, times(1)).getForecastByCoordinates(39.77, 64.42);
    }

    @Test
    @DisplayName("GET /api/v1/weather/forecast without params should return 400 Bad Request")
    void getForecast_MissingParams_Returns400() throws Exception {
        mockMvc.perform(get("/api/v1/weather/forecast")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));

        verifyNoInteractions(weatherService);
    }
}
