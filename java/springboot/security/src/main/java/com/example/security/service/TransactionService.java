package com.example.security.service;

import com.example.security.domain.Account;
import com.example.security.domain.AccountTransaction;
import com.example.security.dto.TransactionForm;
import com.example.security.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public List<Account> findAccounts(Long userId) {
        return repository.findAccountsByUserId(userId);
    }

    public List<AccountTransaction> findTransactions(Long userId) {
        return repository.findTransactionsByUserId(userId);
    }

    @Transactional
    public void createTransaction(Long userId, TransactionForm form) {
        validateTransactionForm(form);

        Account account = repository.findAccountByAccountNumberAndUserId(
                form.getAccountNumber(),
                userId
        ).orElseThrow(() -> new IllegalArgumentException("본인 계좌만 거래할 수 있습니다."));

        if ("DEPOSIT".equals(form.getTransactionType())) {
            repository.saveTransaction(form);
            repository.increaseBalance(form.getAccountNumber(), form.getAmount());
            return;
        }

        if ("WITHDRAW".equals(form.getTransactionType())) {
            if (account.getBalance() < form.getAmount()) {
                throw new IllegalArgumentException("잔액이 부족합니다.");
            }

            repository.saveTransaction(form);
            repository.decreaseBalance(form.getAccountNumber(), form.getAmount());
            return;
        }

        throw new IllegalArgumentException("지원하지 않는 거래 유형입니다.");
    }

    private void validateTransactionForm(TransactionForm form) {
        if (form.getAccountNumber() == null || form.getAccountNumber().isBlank()) {
            throw new IllegalArgumentException("계좌번호가 필요합니다.");
        }

        if (form.getTransactionType() == null || form.getTransactionType().isBlank()) {
            throw new IllegalArgumentException("거래 유형이 필요합니다.");
        }

        if (form.getAmount() == null || form.getAmount() <= 0) {
            throw new IllegalArgumentException("거래 금액은 1원 이상이어야 합니다.");
        }
    }
}
