package com.example.shopping.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponse {
    private boolean success;
    private String message;
    public static ErrorResponse of(String message) { return new ErrorResponse(false, message); }
}
