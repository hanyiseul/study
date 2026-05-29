package com.example.simplecrud.repository;

import com.example.simplecrud.domain.Account;
import com.example.simplecrud.domain.AccountTransaction;
import com.example.simplecrud.dto.TransactionForm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionRepository {

    private final JdbcTemplate jdbcTemplate;

    public TransactionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Account> accountRowMapper = (rs, rowNum) -> new Account(
            rs.getLong("id"),
            rs.getString("account_number"),
            rs.getString("owner_name"),
            rs.getLong("balance"),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    private final RowMapper<AccountTransaction> transactionRowMapper = (rs, rowNum) -> new AccountTransaction(
            rs.getLong("id"),
            rs.getString("account_number"),
            rs.getString("transaction_type"),
            rs.getLong("amount"),
            rs.getString("memo"),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    public List<Account> findAllAccounts() {
        String sql = """
                SELECT id, account_number, owner_name, balance, created_at
                FROM accounts
                ORDER BY id
                """;

        return jdbcTemplate.query(sql, accountRowMapper);
    }

    public List<AccountTransaction> findAllTransactions() {
        String sql = """
                SELECT id, account_number, transaction_type, amount, memo, created_at
                FROM account_transactions
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(sql, transactionRowMapper);
    }

    public Account findAccountByAccountNumber(String accountNumber) {
        String sql = """
                SELECT id, account_number, owner_name, balance, created_at
                FROM accounts
                WHERE account_number = ?
                """;

        return jdbcTemplate.queryForObject(sql, accountRowMapper, accountNumber);
    }

    public void saveTransaction(TransactionForm form) {
        String sql = """
                INSERT INTO account_transactions
                (account_number, transaction_type, amount, memo)
                VALUES (?, ?, ?, ?)
                """;

        jdbcTemplate.update(
                sql,
                form.getAccountNumber(),
                form.getTransactionType(),
                form.getAmount(),
                form.getMemo()
        );
    }

    public void increaseBalance(String accountNumber, Long amount) {
        String sql = """
                UPDATE accounts
                SET balance = balance + ?
                WHERE account_number = ?
                """;

        jdbcTemplate.update(sql, amount, accountNumber);
    }

    public void decreaseBalance(String accountNumber, Long amount) {
        String sql = """
                UPDATE accounts
                SET balance = balance - ?
                WHERE account_number = ?
                """;

        jdbcTemplate.update(sql, amount, accountNumber);
    }
}