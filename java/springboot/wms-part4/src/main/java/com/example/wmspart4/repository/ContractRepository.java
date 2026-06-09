package com.example.wmspart4.repository;

import com.example.wmspart4.domain.Contract;
import com.example.wmspart4.dto.ContractForm;
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
                (customer_id, product_name, quantity, warehouse_name,
                 storage_type, request_memo, contract_status, contract_date)
                VALUES (?, ?, ?, ?, ?, ?, 'REQUESTED', CURRENT_DATE)
                """;

        jdbcTemplate.update(
                sql,
                form.getCustomerId(),
                form.getProductName(),
                form.getQuantity(),
                form.getWarehouseName(),
                form.getStorageType(),
                form.getRequestMemo()
        );
    }

    public List<Contract> findAll() {
        String sql = """
                SELECT c.id, c.customer_id, u.name AS customer_name,
                       c.product_name, c.quantity, c.warehouse_name, c.storage_type,
                       c.request_memo, c.contract_status, c.contract_date,
                       c.created_at, c.updated_at
                FROM contracts c
                JOIN users u ON c.customer_id = u.id
                ORDER BY c.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapContract(rs));
    }

    public List<Contract> findByCustomerId(Long customerId) {
        String sql = """
                SELECT c.id, c.customer_id, u.name AS customer_name,
                       c.product_name, c.quantity, c.warehouse_name, c.storage_type,
                       c.request_memo, c.contract_status, c.contract_date,
                       c.created_at, c.updated_at
                FROM contracts c
                JOIN users u ON c.customer_id = u.id
                WHERE c.customer_id = ?
                ORDER BY c.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapContract(rs), customerId);
    }

    public Optional<Contract> findById(Long id) {
        String sql = """
                SELECT c.id, c.customer_id, u.name AS customer_name,
                       c.product_name, c.quantity, c.warehouse_name, c.storage_type,
                       c.request_memo, c.contract_status, c.contract_date,
                       c.created_at, c.updated_at
                FROM contracts c
                JOIN users u ON c.customer_id = u.id
                WHERE c.id = ?
                """;

        List<Contract> contracts = jdbcTemplate.query(sql, (rs, rowNum) -> mapContract(rs), id);
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

    public long countAll() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM contracts", Long.class);
        return count == null ? 0 : count;
    }

    private Contract mapContract(java.sql.ResultSet rs) throws java.sql.SQLException {
        Timestamp updatedAt = rs.getTimestamp("updated_at");

        return new Contract(
                rs.getLong("id"),
                rs.getLong("customer_id"),
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
    }
}