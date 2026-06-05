package com.example.wmspart2.repository;

import com.example.wmspart2.domain.Contract;
import com.example.wmspart2.dto.ContractForm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class ContractRepository {

    private final JdbcTemplate jdbcTemplate;

    public ContractRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(ContractForm form) {
        String sql = """
                INSERT INTO contracts
                (customer_name, product_name, quantity, warehouse_name,
                 storage_type, request_memo, contract_status, contract_date)
                VALUES (?, ?, ?, ?, ?, ?, 'REQUESTED', CURRENT_DATE)
                """;

        jdbcTemplate.update(
                sql,
                form.getCustomerName(),
                form.getProductName(),
                form.getQuantity(),
                form.getWarehouseName(),
                form.getStorageType(),
                form.getRequestMemo()
        );
    }

    public List<Contract> findAll() {
        String sql = """
                SELECT id, customer_name, product_name, quantity, warehouse_name,
                       storage_type, request_memo, contract_status, contract_date,
                       created_at, updated_at
                FROM contracts
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Timestamp updatedAt = rs.getTimestamp("updated_at");

            return new Contract(
                    rs.getLong("id"),
                    rs.getString("customer_name"),
                    rs.getString("product_name"),
                    rs.getInt("quantity"),
                    rs.getString("warehouse_name"),
                    rs.getString("storage_type"),
                    rs.getString("request_memo"),
                    rs.getString("contract_status"),
                    rs.getDate("contract_date").toLocalDate(),
                    rs.getTimestamp("created_at").toLocalDateTime(),
                    updatedAt == null ? null : updatedAt.toLocalDateTime()
            );
        });
    }

    public Optional<Contract> findById(Long id) {
        String sql = """
                SELECT id, customer_name, product_name, quantity, warehouse_name,
                       storage_type, request_memo, contract_status, contract_date,
                       created_at, updated_at
                FROM contracts
                WHERE id = ?
                """;

        List<Contract> contracts = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Timestamp updatedAt = rs.getTimestamp("updated_at");

            return new Contract(
                    rs.getLong("id"),
                    rs.getString("customer_name"),
                    rs.getString("product_name"),
                    rs.getInt("quantity"),
                    rs.getString("warehouse_name"),
                    rs.getString("storage_type"),
                    rs.getString("request_memo"),
                    rs.getString("contract_status"),
                    rs.getDate("contract_date").toLocalDate(),
                    rs.getTimestamp("created_at").toLocalDateTime(),
                    updatedAt == null ? null : updatedAt.toLocalDateTime()
            );
        }, id);

        return contracts.stream().findFirst();
    }

    public void updateStatus(Long id, String status) {
        String sql = """
                UPDATE contracts
                SET contract_status = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """;

        jdbcTemplate.update(sql, status, id);
    }
}