package com.example.simplecrud.domain;

import java.time.LocalDateTime;

/**
 * [Domain 계층]
 * accounts 테이블의 한 행을 Java 객체로 표현하는 클래스이다.
 */
public class Account {

    private Long id;
    private String accountNumber;
    private String ownerName;
    private Long balance;
    private LocalDateTime createdAt;

    public Account(
            Long id,
            String accountNumber,
            String ownerName,
            Long balance,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = balance;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
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