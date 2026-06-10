package com.example.storagestreamapi.dto;

public class DuplicateKeyResponse {

    private String requestKey;
    private Long count;

    public DuplicateKeyResponse(String requestKey, Long count) {
        this.requestKey = requestKey;
        this.count = count;
    }

    public String getRequestKey() {
        return requestKey;
    }

    public Long getCount() {
        return count;
    }
}