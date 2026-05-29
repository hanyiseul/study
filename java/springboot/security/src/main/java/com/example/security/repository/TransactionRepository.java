package com.example.security.repository;

import com.example.security.domain.Account;
import com.example.security.domain.AccountTransaction;
import com.example.security.dto.TransactionForm;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TransactionRepository {

    private final JdbcTemplate jdbcTemplate;

    public TransactionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Account> accountRowMapper = (rs, rowNum) -> new Account(
            rs.getLong("id"),
            rs.getLong("user_id"),
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

    public List<Account> findAccountsByUserId(Long userId) {
        String sql = """
                SELECT id, user_id, account_number, owner_name, balance, created_at
                FROM accounts
                WHERE user_id = ?
                ORDER BY id
                """;

        return jdbcTemplate.query(sql, accountRowMapper, userId);
    }

    public List<AccountTransaction> findTransactionsByUserId(Long userId) {
        String sql = """
                SELECT t.id, t.account_number, t.transaction_type, t.amount, t.memo, t.created_at
                FROM account_transactions t
                JOIN accounts a ON t.account_number = a.account_number
                WHERE a.user_id = ?
                ORDER BY t.id DESC
                """;

        return jdbcTemplate.query(sql, transactionRowMapper, userId);
    }

    public Optional<Account> findAccountByAccountNumberAndUserId(String accountNumber, Long userId) {
        String sql = """
                SELECT id, user_id, account_number, owner_name, balance, created_at
                FROM accounts
                WHERE account_number = ?
                  AND user_id = ?
                """;

        try {
            Account account = jdbcTemplate.queryForObject(
                    sql,
                    accountRowMapper,
                    accountNumber,
                    userId
            );

            return Optional.of(account);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
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