package com.example.simplecrud.dto;

/**
 * [DTO 계층]
 * 화면에서 입력한 금융 거래 정보를 Controller로 전달하는 객체이다.
 */
public class TransactionForm {

    private String accountNumber;
    private String transactionType;
    private Long amount;
    private String memo;

    public TransactionForm() {
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

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }
}