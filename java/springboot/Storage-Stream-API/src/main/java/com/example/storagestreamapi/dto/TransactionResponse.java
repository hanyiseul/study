package com.example.storagestreamapi.dto;

import com.example.storagestreamapi.domain.FinanceTransaction;

import java.time.LocalDateTime;

public class TransactionResponse {

    private Long id;
    private String accountNumber;
    private String transactionType;
    private Long amount;
    private String channel;
    private String requestKey;
    private String transactionStatus;
    private String memo;
    private LocalDateTime transactedAt;

    public TransactionResponse(
            Long id,
            String accountNumber,
            String transactionType,
            Long amount,
            String channel,
            String requestKey,
            String transactionStatus,
            String memo,
            LocalDateTime transactedAt
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
    }

    public static TransactionResponse from(FinanceTransaction transaction) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getAccountNumber(),
                transaction.getTransactionType(),
                transaction.getAmount(),
                transaction.getChannel(),
                transaction.getRequestKey(),
                transaction.getTransactionStatus(),
                transaction.getMemo(),
                transaction.getTransactedAt()
        );
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
}