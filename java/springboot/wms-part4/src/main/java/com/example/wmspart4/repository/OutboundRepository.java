package com.example.wmspart4.repository;

import com.example.wmspart4.domain.Outbound;
import com.example.wmspart4.dto.OutboundRequestForm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class OutboundRepository {

    private final JdbcTemplate jdbcTemplate;

    public OutboundRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Long customerId, OutboundRequestForm form) {
        String sql = """
                INSERT INTO outbounds
                (inventory_id, customer_id, request_quantity, desired_date,
                 request_memo, outbound_status)
                VALUES (?, ?, ?, ?, ?, 'REQUESTED')
                """;

        jdbcTemplate.update(
                sql,
                form.getInventoryId(),
                customerId,
                form.getRequestQuantity(),
                form.getDesiredDate(),
                form.getRequestMemo()
        );
    }

    public List<Outbound> findAll() {
        String sql = """
                SELECT o.id, o.inventory_id, o.customer_id, u.name AS customer_name,
                       i.product_name, o.request_quantity, o.outbound_status,
                       o.desired_date, o.requested_at, o.completed_at
                FROM outbounds o
                JOIN inventories i ON o.inventory_id = i.id
                JOIN users u ON o.customer_id = u.id
                ORDER BY o.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapOutbound(rs));
    }

    public List<Outbound> findByCustomerId(Long customerId) {
        String sql = """
                SELECT o.id, o.inventory_id, o.customer_id, u.name AS customer_name,
                       i.product_name, o.request_quantity, o.outbound_status,
                       o.desired_date, o.requested_at, o.completed_at
                FROM outbounds o
                JOIN inventories i ON o.inventory_id = i.id
                JOIN users u ON o.customer_id = u.id
                WHERE o.customer_id = ?
                ORDER BY o.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapOutbound(rs), customerId);
    }

    public Optional<Outbound> findById(Long id) {
        String sql = """
                SELECT o.id, o.inventory_id, o.customer_id, u.name AS customer_name,
                       i.product_name, o.request_quantity, o.outbound_status,
                       o.desired_date, o.requested_at, o.completed_at
                FROM outbounds o
                JOIN inventories i ON o.inventory_id = i.id
                JOIN users u ON o.customer_id = u.id
                WHERE o.id = ?
                """;

        List<Outbound> outbounds = jdbcTemplate.query(sql, (rs, rowNum) -> mapOutbound(rs), id);
        return outbounds.stream().findFirst();
    }

    public void complete(Long id) {
        String sql = """
                UPDATE outbounds
                SET outbound_status = 'COMPLETED',
                    completed_at = CURRENT_TIMESTAMP,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """;

        jdbcTemplate.update(sql, id);
    }

    public long countAll() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM outbounds", Long.class);
        return count == null ? 0 : count;
    }

    private Outbound mapOutbound(java.sql.ResultSet rs) throws java.sql.SQLException {
        Date desiredDate = rs.getDate("desired_date");
        Timestamp completedAt = rs.getTimestamp("completed_at");

        return new Outbound(
                rs.getLong("id"),
                rs.getLong("inventory_id"),
                rs.getLong("customer_id"),
                rs.getString("customer_name"),
                rs.getString("product_name"),
                rs.getInt("request_quantity"),
                rs.getString("outbound_status"),
                desiredDate == null ? null : desiredDate.toLocalDate(),
                rs.getTimestamp("requested_at").toLocalDateTime(),
                completedAt == null ? null : completedAt.toLocalDateTime()
        );
    }
}