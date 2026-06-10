package com.example.storagestreamapi.domain;

import java.time.LocalDateTime;

public class FinanceTransaction {

    private Long id;
    private String accountNumber;
    private String transactionType;
    private Long amount;
    private String channel;
    private String requestKey;
    private String transactionStatus;
    private String memo;
    private LocalDateTime transactedAt;
    private LocalDateTime createdAt;

    public FinanceTransaction(
            Long id,
            String accountNumber,
            String transactionType,
            Long amount,
            String channel,
            String requestKey,
            String transactionStatus,
            String memo,
            LocalDateTime transactedAt,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.transactionType = transactionType;
        this.amount = amount;
        this.channel = channel;
        this.requestKey = requestKey;
        this.transactionStatus = transactionStatus;
        this.memo = memo;
        this.transactedAt = transactedAt;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public Long getAmount() {
        return amount;
    }

    public String getChannel() {
        return channel;
    }

    public String getRequestKey() {
        return requestKey;
    }

    public String getTransactionStatus() {
        return transactionStatus;
    }

    public String getMemo() {
        return memo;
    }

    public LocalDateTime getTransactedAt() {
        return transactedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}