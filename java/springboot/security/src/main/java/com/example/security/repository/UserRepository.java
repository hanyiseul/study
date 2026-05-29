package com.example.security.repository;

import com.example.security.domain.AppUser;
import com.example.security.dto.SignupForm;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 로우 매퍼 객체
    private final RowMapper<AppUser> userRowMapper = (rs, rowNum) -> new AppUser(
            rs.getLong("id"),
            rs.getString("email"),
            rs.getString("password"),
            rs.getString("name"),
            rs.getString("role"),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    public Optional<AppUser> findByEmail(String email) {
        String sql = """
                SELECT id, email, password, name, role, created_at
                FROM users
                WHERE email = ?
                """;

        try {
            AppUser user = jdbcTemplate.queryForObject(sql, userRowMapper, email);
            return Optional.of(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public void save(SignupForm form, String encodedPassword) {
        String sql = """
                INSERT INTO users (email, password, name, role)
                VALUES (?, ?, ?, 'USER')
                """;

        jdbcTemplate.update(
                sql,
                form.getEmail(),
                encodedPassword,
                form.getName()
        );
    }
}