package com.example.storagestreamapi.component;

import com.example.storagestreamapi.domain.FinanceTransaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionRiskPolicy {

    private static final long HIGH_AMOUNT_STANDARD = 1_000_000L;

    public boolean isHighAmount(FinanceTransaction transaction) {
        return transaction.getAmount() >= HIGH_AMOUNT_STANDARD;
    }

    public boolean isFailed(FinanceTransaction transaction) {
        return "FAILED".equals(transaction.getTransactionStatus());
    }

    public boolean isSuccess(FinanceTransaction transaction) {
        return "SUCCESS".equals(transaction.getTransactionStatus());
    }
}