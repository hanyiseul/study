package com.example.storagestreamapi.repository;

import com.example.storagestreamapi.domain.FinanceAccount;
import com.example.storagestreamapi.domain.FinanceTransaction;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StorageStateRepository {

    private final JdbcTemplate jdbcTemplate;

    public StorageStateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<FinanceAccount> accountRowMapper = (rs, rowNum) -> new FinanceAccount(
            rs.getLong("id"),
            rs.getString("account_number"),
            rs.getString("owner_name"),
            rs.getString("account_type"),
            rs.getLong("balance"),
            rs.getString("status"),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    private final RowMapper<FinanceTransaction> transactionRowMapper = (rs, rowNum) -> new FinanceTransaction(
            rs.getLong("id"),
            rs.getString("account_number"),
            rs.getString("transaction_type"),
            rs.getLong("amount"),
            rs.getString("channel"),
            rs.getString("request_key"),
            rs.getString("transaction_status"),
            rs.getString("memo"),
            rs.getTimestamp("transacted_at").toLocalDateTime(),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    public List<FinanceAccount> findAllAccounts() {
        String sql = """
                SELECT id, account_number, owner_name, account_type,
                       balance, status, created_at
                FROM finance_accounts
                ORDER BY id
                """;

        return jdbcTemplate.query(sql, accountRowMapper);
    }

    public List<FinanceTransaction> findAllTransactions() {
        String sql = """
                SELECT id, account_number, transaction_type, amount,
                       channel, request_key, transaction_status,
                       memo, transacted_at, created_at
                FROM finance_transactions
                ORDER BY transacted_at DESC, id DESC
                """;

        return jdbcTemplate.query(sql, transactionRowMapper);
    }

    public List<FinanceTransaction> findTransactionsByAccountNumber(String accountNumber) {
        String sql = """
                SELECT id, account_number, transaction_type, amount,
                       channel, request_key, transaction_status,
                       memo, transacted_at, created_at
                FROM finance_transactions
                WHERE account_number = ?
                ORDER BY transacted_at DESC, id DESC
                """;

        return jdbcTemplate.query(sql, transactionRowMapper, accountNumber);
    }
}