package com.example.wmspart4.repository;

import com.example.wmspart4.domain.Inbound;
import com.example.wmspart4.dto.InboundForm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class InboundRepository {

    private final JdbcTemplate jdbcTemplate;

    public InboundRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(InboundForm form) {
        String sql = """
                INSERT INTO inbounds
                (contract_id, received_quantity, warehouse_name, storage_zone,
                 pallet_no, inbound_status)
                VALUES (?, ?, ?, ?, ?, 'REGISTERED')
                """;

        jdbcTemplate.update(
                sql,
                form.getContractId(),
                form.getReceivedQuantity(),
                form.getWarehouseName(),
                form.getStorageZone(),
                form.getPalletNo()
        );
    }

    public List<Inbound> findAll() {
        String sql = """
                SELECT i.id, i.contract_id, u.name AS customer_name, c.product_name,
                       i.received_quantity, i.warehouse_name, i.storage_zone,
                       i.pallet_no, i.inbound_status, i.inbound_date,
                       i.created_at, i.updated_at
                FROM inbounds i
                JOIN contracts c ON i.contract_id = c.id
                JOIN users u ON c.customer_id = u.id
                ORDER BY i.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapInbound(rs));
    }

    public Optional<Inbound> findById(Long id) {
        String sql = """
                SELECT i.id, i.contract_id, u.name AS customer_name, c.product_name,
                       i.received_quantity, i.warehouse_name, i.storage_zone,
                       i.pallet_no, i.inbound_status, i.inbound_date,
                       i.created_at, i.updated_at
                FROM inbounds i
                JOIN contracts c ON i.contract_id = c.id
                JOIN users u ON c.customer_id = u.id
                WHERE i.id = ?
                """;

        List<Inbound> inbounds = jdbcTemplate.query(sql, (rs, rowNum) -> mapInbound(rs), id);
        return inbounds.stream().findFirst();
    }

    public void complete(Long id) {
        String sql = """
                UPDATE inbounds
                SET inbound_status = 'COMPLETED',
                    inbound_date = CURRENT_DATE,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """;

        jdbcTemplate.update(sql, id);
    }

    public long countAll() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM inbounds", Long.class);
        return count == null ? 0 : count;
    }

    private Inbound mapInbound(java.sql.ResultSet rs) throws java.sql.SQLException {
        Date inboundDate = rs.getDate("inbound_date");
        Timestamp updatedAt = rs.getTimestamp("updated_at");

        return new Inbound(
                rs.getLong("id"),
                rs.getLong("contract_id"),
                rs.getString("customer_name"),
                rs.getString("product_name"),
                rs.getInt("received_quantity"),
                rs.getString("warehouse_name"),
                rs.getString("storage_zone"),
                rs.getString("pallet_no"),
                rs.getString("inbound_status"),
                inboundDate == null ? null : inboundDate.toLocalDate(),
                rs.getTimestamp("created_at").toLocalDateTime(),
                updatedAt == null ? null : updatedAt.toLocalDateTime()
        );
    }
}