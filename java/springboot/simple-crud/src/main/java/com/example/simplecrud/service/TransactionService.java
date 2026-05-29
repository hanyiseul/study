package com.example.simplecrud.service;

import com.example.simplecrud.domain.Account;
import com.example.simplecrud.domain.AccountTransaction;
import com.example.simplecrud.dto.TransactionForm;
import com.example.simplecrud.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public List<Account> findAllAccounts() {
        return repository.findAllAccounts();
    }

    public List<AccountTransaction> findAllTransactions() {
        return repository.findAllTransactions();
    }

    @Transactional
    public void createTransaction(TransactionForm form) {
        validateTransactionForm(form);

        Account account = repository.findAccountByAccountNumber(form.getAccountNumber());

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