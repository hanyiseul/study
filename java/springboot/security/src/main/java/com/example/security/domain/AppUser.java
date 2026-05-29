package com.example.security.domain;

import java.time.LocalDateTime;

public class AppUser {

    private Long id;
    private String email;
    private String password;
    private String name;
    private String role;
    private LocalDateTime createdAt;

    public AppUser(
            Long id,
            String email,
            String password,
            String name,
            String role,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}