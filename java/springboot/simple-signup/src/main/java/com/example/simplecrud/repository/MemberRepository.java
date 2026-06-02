package com.example.simplecrud.repository;

import com.example.demo.domain.Member;
import com.example.demo.dto.SignupForm;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MemberRepository {

    private final JdbcTemplate jdbcTemplate;

    public MemberRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Member> memberRowMapper = (rs, rowNum) -> new Member(
            rs.getLong("id"),
            rs.getString("email"),
            rs.getString("password"),
            rs.getString("name"),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    public void save(SignupForm form) {
        String sql = """
                INSERT INTO members (email, password, name)
                VALUES (?, ?, ?)
                """;

        jdbcTemplate.update(
                sql,
                form.getEmail(),
                form.getPassword(),
                form.getName()
        );
    }

    public List<Member> findAll() {
        String sql = """
                SELECT id, email, password, name, created_at
                FROM members
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(sql, memberRowMapper);
    }
}