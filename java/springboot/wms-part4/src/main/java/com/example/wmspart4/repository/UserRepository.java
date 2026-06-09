package com.example.wmspart4.repository;

import com.example.wmspart4.domain.AppUser;
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

    public Optional<AppUser> findById(Long id) {
        String sql = """
                SELECT id, email, password_hash, name, role, status, created_at, updated_at
                FROM users
                WHERE id = ?
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
        }, id);

        return users.stream().findFirst();
    }

    public List<AppUser> findCustomers() {
        String sql = """
                SELECT id, email, password_hash, name, role, status, created_at, updated_at
                FROM users
                WHERE role = 'ROLE_CUSTOMER'
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
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
        });
    }

    public boolean existsByEmail(String email) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM users WHERE email = ?",
                Integer.class,
                email
        );

        return count != null && count > 0;
    }

    public long countAll() {
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users", Long.class);
        return count == null ? 0 : count;
    }
}