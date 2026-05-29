package com.example.security.domain;

import java.time.LocalDateTime;

public class AccountTransaction {

    private Long id;
    private String accountNumber;
    private String transactionType;
    private Long amount;
    private String memo;
    private LocalDateTime createdAt;

    public AccountTransaction(
            Long id,
            String accountNumber,
            String transactionType,
            Long amount,
            String memo,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.transactionType = transactionType;
        this.amount = amount;
        this.memo = memo;
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

    public String getMemo() {
        return memo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}