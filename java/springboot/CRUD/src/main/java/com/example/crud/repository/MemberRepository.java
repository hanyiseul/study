// db와 직접 연결되는 계층
package com.example.crud.repository;

import com.example.crud.domain.Member;
import com.example.crud.dto.MemberForm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // DB와 직접 연결되는 계층
public class MemberRepository {

    private final JdbcTemplate jdbcTemplate; // SQL을 실행하는 Spring 객체

    public MemberRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper<Member> : DB 조회 결과 한 행을 Member 객체 하나로 바꿈
    private final RowMapper<Member> memberRowMapper = (rs, rowNum) -> new Member(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("email"),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    public List<Member> findAll() { // 전체 회원 목록 조회
        String sql = """
                SELECT id, name, email, created_at
                FROM members
                ORDER BY id DESC
                """;

        return jdbcTemplate.query(sql, memberRowMapper); // 여러 행을 조회할 때는 query() : 결과는 List<Member>
    }

    public Member findById(Long id) { // 회원 한명씩 단건 조회
        String sql = """
                SELECT id, name, email, created_at
                FROM members
                WHERE id = ?
                """;

        return jdbcTemplate.queryForObject(sql, memberRowMapper, id);
    }

    public void save(MemberForm form) { // 화면에서 입력한 이름과 이메일을 db에 저장
        String sql = """
                INSERT INTO members (name, email)
                VALUES (?, ?)
                """;

        jdbcTemplate.update(sql, form.getName(), form.getEmail());
    }

    // 선택한 회원의 이름과 이메일 수정
    public void update(Long id, MemberForm form) {
        String sql = """
                UPDATE members
                SET name = ?, email = ?
                WHERE id = ?
                """;

        jdbcTemplate.update(sql, form.getName(), form.getEmail(), id);
    }

    // 선택한 회원 삭제
    public void delete(Long id) {
        String sql = """
                DELETE FROM members
                WHERE id = ?
                """;

        jdbcTemplate.update(sql, id);
    }
}