package com.example.wmspart4.domain;

import java.time.LocalDateTime;

public class Inquiry {

    private Long id;
    private Long customerId;
    private String customerName;
    private String title;
    private String content;
    private String answerContent;
    private String inquiryStatus;
    private LocalDateTime createdAt;
    private LocalDateTime answeredAt;

    public Inquiry(Long id, Long customerId, String customerName, String title,
                   String content, String answerContent, String inquiryStatus,
                   LocalDateTime createdAt, LocalDateTime answeredAt) {
        this.id = id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.title = title;
        this.content = content;
        this.answerContent = answerContent;
        this.inquiryStatus = inquiryStatus;
        this.createdAt = createdAt;
        this.answeredAt = answeredAt;
    }

    public Long getId() {
        return id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getAnswerContent() {
        return answerContent;
    }

    public String getInquiryStatus() {
        return inquiryStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getAnsweredAt() {
        return answeredAt;
    }

    public String getStatusLabel() {
        if ("WAITING".equals(inquiryStatus)) {
            return "답변대기";
        }

        if ("ANSWERED".equals(inquiryStatus)) {
            return "답변완료";
        }

        return inquiryStatus;
    }
}