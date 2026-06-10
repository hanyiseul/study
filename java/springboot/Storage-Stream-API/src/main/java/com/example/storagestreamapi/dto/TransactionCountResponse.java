package com.example.storagestreamapi.dto;

public class TransactionCountResponse {

    private String accountNumber;
    private Long count;

    public TransactionCountResponse(String accountNumber, Long count) {
        this.accountNumber = accountNumber;
        this.count = count;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public Long getCount() {
        return count;
    }
}