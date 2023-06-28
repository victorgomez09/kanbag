package com.generalsoftware.kangab.dto;

public record ApiResponseDto<T>(Boolean success, String message, T data) {
}