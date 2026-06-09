package com.example.wmspart4.repository;

import com.example.wmspart4.domain.Inquiry;
import com.example.wmspart4.dto.InquiryForm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class InquiryRepository {

    private final JdbcTemplate jdbcTemplate;

    public InquiryRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Long customerId, InquiryForm form) {
        String sql = """
                INSERT INTO inquiries
                (customer_id, title, content, inquiry_status)
                VALUES (?, ?, ?, 'WAITING')
                """;

        jdbcTemplate.update(sql, customerId, form.getTitle(), form.getContent());
    }

    public List<Inquiry> findAll() {
        String sql = """
                SELECT i.id, i.customer_id, u.name AS customer_name, i.title, i.content,
                       i.answer_content, i.inquiry_status, i.created_at, i.answered_at
                FROM inquiries i
                JOIN users u ON i.customer_id = u.id
                ORDER BY i.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapInquiry(rs));
    }

    public List<Inquiry> findByCustomerId(Long customerId) {
        String sql = """
                SELECT i.id, i.customer_id, u.name AS customer_name, i.title, i.content,
                       i.answer_content, i.inquiry_status, i.created_at, i.answered_at
                FROM inquiries i
                JOIN users u ON i.customer_id = u.id
                WHERE i.customer_id = ?
                ORDER BY i.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapInquiry(rs), customerId);
    }

    public void answer(Long id, String answerContent) {
        String sql = """
                UPDATE inquiries
                SET answer_content = ?,
                    inquiry_status = 'ANSWERED',
                    answered_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """;

        jdbcTemplate.update(sql, answerContent, id);
    }

    private Inquiry mapInquiry(java.sql.ResultSet rs) throws java.sql.SQLException {
        Timestamp answeredAt = rs.getTimestamp("answered_at");

        return new Inquiry(
                rs.getLong("id"),
                rs.getLong("customer_id"),
                rs.getString("customer_name"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getString("answer_content"),
                rs.getString("inquiry_status"),
                rs.getTimestamp("created_at").toLocalDateTime(),
                answeredAt == null ? null : answeredAt.toLocalDateTime()
        );
    }
}