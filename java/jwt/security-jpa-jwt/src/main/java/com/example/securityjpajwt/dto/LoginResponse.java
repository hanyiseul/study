package com.example.securityjpajwt.dto;

public class LoginResponse {

    private String tokenType;
    private String accessToken;
    private String email;
    private String role;
    private long expiresInMs;

    public LoginResponse(String accessToken, String email, String role, long expiresInMs) {
        this.tokenType = "Bearer";
        this.accessToken = accessToken;
        this.email = email;
        this.role = role;
        this.expiresInMs = expiresInMs;
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public long getExpiresInMs() {
        return expiresInMs;
    }
}