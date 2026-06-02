package com.example.simplecrud.domain;

import java.time.LocalDateTime;

public class Member {

    private Long id;
    private String email;
    private String password;
    private String name;
    private LocalDateTime createdAt;

    public Member(
            Long id,
            String email,
            String password,
            String name,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}