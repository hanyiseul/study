package com.example.wmspart1.domain;

public class StatusDefinition {

    private Long id;
    private String businessArea;
    private String statusCode;
    private String statusLabel;
    private String description;

    public StatusDefinition(Long id, String businessArea, String statusCode,
                            String statusLabel, String description) {
        this.id = id;
        this.businessArea = businessArea;
        this.statusCode = statusCode;
        this.statusLabel = statusLabel;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getBusinessArea() {
        return businessArea;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public String getDescription() {
        return description;
    }
}