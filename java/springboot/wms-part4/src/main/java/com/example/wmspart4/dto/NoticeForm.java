package com.example.wmspart4.dto;

public class NoticeForm {

    private String title;
    private String content;
    private Boolean visible = true;

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }
}