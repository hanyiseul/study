package com.example.wmspart4.repository;

import com.example.wmspart4.domain.Contract;
import com.example.wmspart4.domain.Inventory;
import com.example.wmspart4.domain.Inbound;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class InventoryRepository {

    private final JdbcTemplate jdbcTemplate;

    public InventoryRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void createFromInbound(Inbound inbound, Contract contract) {
        String sql = """
                INSERT INTO inventories
                (contract_id, customer_id, product_name, current_quantity,
                 warehouse_name, storage_zone, pallet_no, inventory_status)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'STORED')
                """;

        jdbcTemplate.update(
                sql,
                contract.getId(),
                contract.getCustomerId(),
                contract.getProductName(),
                inbound.getReceivedQuantity(),
                inbound.getWarehouseName(),
                inbound.getStorageZone(),
                inbound.getPalletNo()
        );
    }

    public List<Inventory> findAll() {
        String sql = """
                SELECT i.id, i.contract_id, i.customer_id, u.name AS customer_name,
                       i.product_name, i.current_quantity, i.warehouse_name,
                       i.storage_zone, i.pallet_no, i.inventory_status, i.updated_at
                FROM inventories i
                JOIN users u ON i.customer_id = u.id
                ORDER BY i.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapInventory(rs));
    }

    public List<Inventory> findByCustomerId(Long customerId) {
        String sql = """
                SELECT i.id, i.contract_id, i.customer_id, u.name AS customer_name,
                       i.product_name, i.current_quantity, i.warehouse_name,
                       i.storage_zone, i.pallet_no, i.inventory_status, i.updated_at
                FROM inventories i
                JOIN users u ON i.customer_id = u.id
                WHERE i.customer_id = ?
                ORDER BY i.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapInventory(rs), customerId);
    }

    public Optional<Inventory> findById(Long id) {
        String sql = """
                SELECT i.id, i.contract_id, i.customer_id, u.name AS customer_name,
                       i.product_name, i.current_quantity, i.warehouse_name,
                       i.storage_zone, i.pallet_no, i.inventory_status, i.updated_at
                FROM inventories i
                JOIN users u ON i.customer_id = u.id
                WHERE i.id = ?
                """;

        List<Inventory> inventories = jdbcTemplate.query(sql, (rs, rowNum) -> mapInventory(rs), id);
        return inventories.stream().findFirst();
    }

    public void decreaseQuantity(Long id, int quantity) {
        String sql = """
                UPDATE inventories
                SET current_quantity = current_quantity - ?,
                    inventory_status = CASE
                        WHEN current_quantity - ? <= 0 THEN 'EMPTY'
                        ELSE 'STORED'
                    END,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """;

        jdbcTemplate.update(sql, quantity, quantity, id);
    }

    public long countAll() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM inventories", Long.class);
        return count == null ? 0 : count;
    }

    private Inventory mapInventory(java.sql.ResultSet rs) throws java.sql.SQLException {
        Timestamp updatedAt = rs.getTimestamp("updated_at");

        return new Inventory(
                rs.getLong("id"),
                rs.getLong("contract_id"),
                rs.getLong("customer_id"),
                rs.getString("customer_name"),
                rs.getString("product_name"),
                rs.getInt("current_quantity"),
                rs.getString("warehouse_name"),
                rs.getString("storage_zone"),
                rs.getString("pallet_no"),
                rs.getString("inventory_status"),
                updatedAt == null ? null : updatedAt.toLocalDateTime()
        );
    }
}