package com.example.wmspart3.repository;

import com.example.wmspart3.domain.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(String email, String passwordHash, String name, String role) {
        String sql = """
                INSERT INTO users
                (email, password_hash, name, role, status)
                VALUES (?, ?, ?, ?, 'ACTIVE')
                """;

        jdbcTemplate.update(sql, email, passwordHash, name, role);
    }

    public Optional<AppUser> findByEmail(String email) {
        String sql = """
                SELECT id, email, password_hash, name, role, status, created_at, updated_at
                FROM users
                WHERE email = ?
                """;

        List<AppUser> users = jdbcTemplate.query(sql, (rs, rowNum) -> {
            Timestamp updatedAt = rs.getTimestamp("updated_at");

            return new AppUser(
                    rs.getLong("id"),
                    rs.getString("email"),
                    rs.getString("password_hash"),
                    rs.getString("name"),
                    rs.getString("role"),
                    rs.getString("status"),
                    rs.getTimestamp("created_at").toLocalDateTime(),
                    updatedAt == null ? null : updatedAt.toLocalDateTime()
            );
        }, email);

        return users.stream().findFirst();
    }

    public boolean existsByEmail(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

    public long countAll() {
        String sql = "SELECT COUNT(*) FROM users";
        Long count = jdbcTemplate.queryForObject(sql, Long.class);
        return count == null ? 0 : count;
    }

    public long countByRole(String role) {
        String sql = "SELECT COUNT(*) FROM users WHERE role = ?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class, role);
        return count == null ? 0 : count;
    }
}