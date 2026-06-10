package com.example.storagestreamapi.controller;

import com.example.storagestreamapi.dto.AccountSummaryResponse;
import com.example.storagestreamapi.dto.DailySummaryResponse;
import com.example.storagestreamapi.dto.DuplicateKeyResponse;
import com.example.storagestreamapi.dto.TransactionCountResponse;
import com.example.storagestreamapi.dto.TransactionResponse;
import com.example.storagestreamapi.service.StorageStateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/storage")
public class StorageStateController {

    private final StorageStateService service;

    public StorageStateController(StorageStateService service) {
        this.service = service;
    }

    @GetMapping("/transactions")
    public List<TransactionResponse> findAllTransactions() {
        return service.findAllTransactions();
    }

    @GetMapping("/summary")
    public DailySummaryResponse getDailySummary() {
        return service.getDailySummary();
    }

    @GetMapping("/accounts/{accountNumber}/summary")
    public AccountSummaryResponse getAccountSummary(
            @PathVariable String accountNumber
    ) {
        return service.getAccountSummary(accountNumber);
    }

    @GetMapping("/transactions/high-amount")
    public List<TransactionResponse> findHighAmountTransactions() {
        return service.findHighAmountTransactions();
    }

    @GetMapping("/transactions/failed")
    public List<TransactionResponse> findFailedTransactions() {
        return service.findFailedTransactions();
    }

    @GetMapping("/transactions/top")
    public List<TransactionResponse> findTopTransactions(
            @RequestParam(defaultValue = "5") int limit
    ) {
        return service.findTopTransactions(limit);
    }

    @GetMapping("/duplicates/request-keys")
    public List<DuplicateKeyResponse> findDuplicateRequestKeys() {
        return service.findDuplicateRequestKeys();
    }

    @GetMapping("/accounts/unique")
    public List<String> findUniqueAccountNumbers() {
        return service.findUniqueAccountNumbers();
    }

    @GetMapping("/accounts/transaction-counts")
    public List<TransactionCountResponse> countTransactionsByAccount() {
        return service.countTransactionsByAccount();
    }
}