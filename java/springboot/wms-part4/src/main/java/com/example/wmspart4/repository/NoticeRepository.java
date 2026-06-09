package com.example.wmspart4.repository;

import com.example.wmspart4.domain.Notice;
import com.example.wmspart4.dto.NoticeForm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NoticeRepository {

    private final JdbcTemplate jdbcTemplate;

    public NoticeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Long createdBy, NoticeForm form) {
        String sql = """
                INSERT INTO notices
                (title, content, visible, created_by)
                VALUES (?, ?, ?, ?)
                """;

        jdbcTemplate.update(sql, form.getTitle(), form.getContent(), form.getVisible(), createdBy);
    }

    public List<Notice> findVisible() {
        String sql = """
                SELECT id, title, content, visible, created_at
                FROM notices
                WHERE visible = TRUE
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new Notice(
                rs.getLong("id"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getBoolean("visible"),
                rs.getTimestamp("created_at").toLocalDateTime()
        ));
    }

    public List<Notice> findAll() {
        String sql = """
                SELECT id, title, content, visible, created_at
                FROM notices
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new Notice(
                rs.getLong("id"),
                rs.getString("title"),
                rs.getString("content"),
                rs.getBoolean("visible"),
                rs.getTimestamp("created_at").toLocalDateTime()
        ));
    }
}