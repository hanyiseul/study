package com.example.securityjpajwt.dto;

import java.util.Collection;

public class MeResponse {

    private String email;
    private Collection<?> authorities;
    private String message;

    public MeResponse(String email, Collection<?> authorities, String message) {
        this.email = email;
        this.authorities = authorities;
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public Collection<?> getAuthorities() {
        return authorities;
    }

    public String getMessage() {
        return message;
    }
}