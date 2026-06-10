package com.example.storagestreamapi.dto;

public class DailySummaryResponse {

    private Long totalDepositAmount;
    private Long totalWithdrawAmount;
    private Long totalTransferOutAmount;
    private Long successCount;
    private Long failedCount;
    private Long totalTransactionCount;

    public DailySummaryResponse(
            Long totalDepositAmount,
            Long totalWithdrawAmount,
            Long totalTransferOutAmount,
            Long successCount,
            Long failedCount,
            Long totalTransactionCount
    ) {
        this.totalDepositAmount = totalDepositAmount;
        this.totalWithdrawAmount = totalWithdrawAmount;
        this.totalTransferOutAmount = totalTransferOutAmount;
        this.successCount = successCount;
        this.failedCount = failedCount;
        this.totalTransactionCount = totalTransactionCount;
    }

    public Long getTotalDepositAmount() {
        return totalDepositAmount;
    }

    public Long getTotalWithdrawAmount() {
        return totalWithdrawAmount;
    }

    public Long getTotalTransferOutAmount() {
        return totalTransferOutAmount;
    }

    public Long getSuccessCount() {
        return successCount;
    }

    public Long getFailedCount() {
        return failedCount;
    }

    public Long getTotalTransactionCount() {
        return totalTransactionCount;
    }
}