package com.weather.backend.dto;

public record ErrorResponse(
        int status,
        String message,
        long timestamp
) {
}
