package com.example.demo.dto;

public class MemberResponse {

    private Long id;
    private String email;
    private String name;
    private String message;

    public MemberResponse(Long id, String email, String name, String message) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }
}