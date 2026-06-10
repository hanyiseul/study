package com.example.storagestreamapi.service;

import com.example.storagestreamapi.component.TransactionRiskPolicy;
import com.example.storagestreamapi.domain.FinanceTransaction;
import com.example.storagestreamapi.dto.AccountSummaryResponse;
import com.example.storagestreamapi.dto.DailySummaryResponse;
import com.example.storagestreamapi.dto.DuplicateKeyResponse;
import com.example.storagestreamapi.dto.TransactionCountResponse;
import com.example.storagestreamapi.dto.TransactionResponse;
import com.example.storagestreamapi.repository.StorageStateRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@Service
public class StorageStateService {

    private final StorageStateRepository repository;
    private final TransactionRiskPolicy riskPolicy;

    public StorageStateService(
            StorageStateRepository repository,
            TransactionRiskPolicy riskPolicy
    ) {
        this.repository = repository;
        this.riskPolicy = riskPolicy;
    }

    public List<TransactionResponse> findAllTransactions() {
        List<FinanceTransaction> transactions = repository.findAllTransactions();

        return transactions.stream()
                .map(TransactionResponse::from)
                .toList();
    }

    public DailySummaryResponse getDailySummary() {
        List<FinanceTransaction> transactions = repository.findAllTransactions();

        long totalDepositAmount = transactions.stream()
                .filter(transaction -> "DEPOSIT".equals(transaction.getTransactionType()))
                .filter(riskPolicy::isSuccess)
                .mapToLong(FinanceTransaction::getAmount)
                .sum();

        long totalWithdrawAmount = transactions.stream()
                .filter(transaction -> "WITHDRAW".equals(transaction.getTransactionType()))
                .filter(riskPolicy::isSuccess)
                .mapToLong(FinanceTransaction::getAmount)
                .sum();

        long totalTransferOutAmount = transactions.stream()
                .filter(transaction -> "TRANSFER_OUT".equals(transaction.getTransactionType()))
                .filter(riskPolicy::isSuccess)
                .mapToLong(FinanceTransaction::getAmount)
                .sum();

        long successCount = transactions.stream()
                .filter(riskPolicy::isSuccess)
                .count();

        long failedCount = transactions.stream()
                .filter(riskPolicy::isFailed)
                .count();

        return new DailySummaryResponse(
                totalDepositAmount,
                totalWithdrawAmount,
                totalTransferOutAmount,
                successCount,
                failedCount,
                (long) transactions.size()
        );
    }

    public AccountSummaryResponse getAccountSummary(String accountNumber) {
        List<FinanceTransaction> transactions =
                repository.findTransactionsByAccountNumber(accountNumber);

        long depositAmount = transactions.stream()
                .filter(transaction -> "DEPOSIT".equals(transaction.getTransactionType()))
                .filter(riskPolicy::isSuccess)
                .mapToLong(FinanceTransaction::getAmount)
                .sum();

        long withdrawAmount = transactions.stream()
                .filter(transaction -> "WITHDRAW".equals(transaction.getTransactionType()))
                .filter(riskPolicy::isSuccess)
                .mapToLong(FinanceTransaction::getAmount)
                .sum();

        long transferOutAmount = transactions.stream()
                .filter(transaction -> "TRANSFER_OUT".equals(transaction.getTransactionType()))
                .filter(riskPolicy::isSuccess)
                .mapToLong(FinanceTransaction::getAmount)
                .sum();

        long failedCount = transactions.stream()
                .filter(riskPolicy::isFailed)
                .count();

        return new AccountSummaryResponse(
                accountNumber,
                depositAmount,
                withdrawAmount,
                transferOutAmount,
                (long) transactions.size(),
                failedCount
        );
    }

    public List<TransactionResponse> findHighAmountTransactions() {
        List<FinanceTransaction> transactions = repository.findAllTransactions();

        return transactions.stream()
                .filter(riskPolicy::isHighAmount)
                .sorted((t1, t2) -> Long.compare(t2.getAmount(), t1.getAmount()))
                .map(TransactionResponse::from)
                .toList();
    }

    public List<TransactionResponse> findFailedTransactions() {
        List<FinanceTransaction> transactions = repository.findAllTransactions();

        return transactions.stream()
                .filter(riskPolicy::isFailed)
                .map(TransactionResponse::from)
                .toList();
    }

    public List<TransactionResponse> findTopTransactions(int limit) {
        List<FinanceTransaction> transactions = repository.findAllTransactions();

        return transactions.stream()
                .filter(riskPolicy::isSuccess)
                .sorted((t1, t2) -> Long.compare(t2.getAmount(), t1.getAmount()))
                .limit(limit)
                .map(TransactionResponse::from)
                .toList();
    }

    public List<DuplicateKeyResponse> findDuplicateRequestKeys() {
        List<FinanceTransaction> transactions = repository.findAllTransactions();

        Map<String, Long> requestKeyCountMap = new HashMap<>();

        for (FinanceTransaction transaction : transactions) {
            String requestKey = transaction.getRequestKey();
            requestKeyCountMap.put(
                    requestKey,
                    requestKeyCountMap.getOrDefault(requestKey, 0L) + 1
            );
        }

        return requestKeyCountMap.entrySet()
                .stream()
                .filter(entry -> entry.getValue() > 1)
                .map(entry -> new DuplicateKeyResponse(entry.getKey(), entry.getValue()))
                .toList();
    }

    public List<String> findUniqueAccountNumbers() {
        List<FinanceTransaction> transactions = repository.findAllTransactions();

        HashSet<String> accountNumbers = new HashSet<>();

        for (FinanceTransaction transaction : transactions) {
            accountNumbers.add(transaction.getAccountNumber());
        }

        return accountNumbers.stream()
                .sorted()
                .toList();
    }

    public List<TransactionCountResponse> countTransactionsByAccount() {
        List<FinanceTransaction> transactions = repository.findAllTransactions();

        Map<String, Long> countMap = new HashMap<>();

        for (FinanceTransaction transaction : transactions) {
            String accountNumber = transaction.getAccountNumber();
            countMap.put(
                    accountNumber,
                    countMap.getOrDefault(accountNumber, 0L) + 1
            );
        }

        return countMap.entrySet()
                .stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .map(entry -> new TransactionCountResponse(entry.getKey(), entry.getValue()))
                .toList();
    }
}