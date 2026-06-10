package com.example.storagestreamapi.dto;

public class AccountSummaryResponse {

    private String accountNumber;
    private Long depositAmount;
    private Long withdrawAmount;
    private Long transferOutAmount;
    private Long transactionCount;
    private Long failedCount;

    public AccountSummaryResponse(
            String accountNumber,
            Long depositAmount,
            Long withdrawAmount,
            Long transferOutAmount,
            Long transactionCount,
            Long failedCount
    ) {
        this.accountNumber = accountNumber;
        this.depositAmount = depositAmount;
        this.withdrawAmount = withdrawAmount;
        this.transferOutAmount = transferOutAmount;
        this.transactionCount = transactionCount;
        this.failedCount = failedCount;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public Long getDepositAmount() {
        return depositAmount;
    }

    public Long getWithdrawAmount() {
        return withdrawAmount;
    }

    public Long getTransferOutAmount() {
        return transferOutAmount;
    }

    public Long getTransactionCount() {
        return transactionCount;
    }

    public Long getFailedCount() {
        return failedCount;
    }
}