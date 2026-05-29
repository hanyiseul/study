package com.example.security.domain;

import java.time.LocalDateTime;

public class Account {

    private Long id;
    private Long userId;
    private String accountNumber;
    private String ownerName;
    private Long balance;
    private LocalDateTime createdAt;

    public Account(
            Long id, // user 테이블의 ID 값
            Long userId,
            String accountNumber,
            String ownerName,
            Long balance,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.userId = userId;
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = balance;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public Long getBalance() {
        return balance;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}