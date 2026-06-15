package com.example.securityjpajwt.dto;

public class SignupRequest {

    private String email;
    private String password;
    private String role;

    public SignupRequest() {
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }
}