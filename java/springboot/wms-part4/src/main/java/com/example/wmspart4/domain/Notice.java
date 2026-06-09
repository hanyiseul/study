package com.example.wmspart4.domain;

import java.time.LocalDateTime;

public class Notice {

    private Long id;
    private String title;
    private String content;
    private Boolean visible;
    private LocalDateTime createdAt;

    public Notice(Long id, String title, String content, Boolean visible, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.visible = visible;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Boolean getVisible() {
        return visible;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}