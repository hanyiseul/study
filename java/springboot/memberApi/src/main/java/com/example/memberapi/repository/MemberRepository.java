// sql 실행 담당
package com.example.memberapi.repository; // db 접근 코드, sql, 조회/저장

import com.example.memberapi.domain.Member;
import org.springframework.jdbc.core.JdbcTemplate; // Spring JDBC SQL 실행 도구
import org.springframework.jdbc.core.RowMapper; // DB 조회 결과(ResultSet)를 자바 객체로 변환하는 인터페이스
import org.springframework.stereotype.Repository;

import java.util.List; // 자바의 배열 비슷한 컬렉션
import java.util.Optional; // null 안전 처리용.

// bean : 스프링이 관리하는 객체 (객체를 공유하고 자동 연결하기 위해서)
// bean 등록 : 스프링 컨테이너 안에 객체 저장
@Repository // 이 클래스는 db 접근 담당 객체임을 스프링에 전달 (bean 등록)
public class MemberRepository { // 회원 db 처리 클래스

    private final JdbcTemplate jdbcTemplate; // db에 sql 실행할 도구를 저장하는 변수

    // 생성자 주입 : 스프링이 JdbcTemplate 자동 넣어줌 (di-의존성 주입)
    public MemberRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // DB 조회 결과 -> Member 객체 변환
    // rs: ResultSet(DB 조회 결과) / rowNum: 현재 행 번호
    private final RowMapper<Member> memberRowMapper = (rs, rowNum) -> new Member(
            // 실제 변환
            rs.getLong("id"), // DB 컬럼 id 값 꺼냄
            rs.getString("email"),
            rs.getString("name"),
            rs.getString("password"),
            rs.getString("role"),
            rs.getString("status"),
            rs.getInt("login_count"),
            // null 체크 이유: db 값 없을 수도 있어서 (안하면 NullPointerException 가능)
            rs.getTimestamp("last_login_at") == null
                    ? null
                    : rs.getTimestamp("last_login_at").toLocalDateTime(),
            rs.getTimestamp("created_at") == null
                    ? null
                    : rs.getTimestamp("created_at").toLocalDateTime(),
            rs.getTimestamp("updated_at") == null
                    ? null
                    : rs.getTimestamp("updated_at").toLocalDateTime()
    );

    // Member 객체 여러개를 담는 목록
    public List<Member> findAll() { // 회원 전체 조회
        // 회원 목록 조회 (최신 id부터 정렬)
        String sql = """
                SELECT id, email, name, password, role, status,
                       login_count, last_login_at, created_at, updated_at
                FROM members
                ORDER BY id DESC
                """;

        // query(sql문, rowMapper, 바인딩값들(?))
        return jdbcTemplate.query(sql, memberRowMapper);
    }

    // Optional<Member> : 회원이 있을 수도 있고 없을 수도 있음
    public Optional<Member> findById(Long id) { // id 하나로 회원 1명 조회
        String sql = """
                SELECT id, email, name, password, role, status,
                       login_count, last_login_at, created_at, updated_at
                FROM members
                WHERE id = ?
                """;

        List<Member> members = jdbcTemplate.query(
                sql,
                memberRowMapper,
                id
        );

        // stream() : 리스트 데이터를 가공/검색/반복하기 쉽게 만드는 기능
        return members.stream().findFirst(); // 목록에서 첫 번째 회원 꺼내기
    }

    public Optional<Member> findByEmail(String email) {
        String sql = """
                SELECT id, email, name, password, role, status,
                       login_count, last_login_at, created_at, updated_at
                FROM members
                WHERE email = ?
                """;

        List<Member> members = jdbcTemplate.query(
                sql,
                memberRowMapper,
                email
        );

        return members.stream().findFirst();
    }

    public Member save(String email, String name, String encodedPassword) {
        String insertSql = """
                INSERT INTO members
                (email, name, password, role, status)
                VALUES (?, ?, ?, 'USER', 'ACTIVE')
                """;

        jdbcTemplate.update(
                insertSql,
                email,
                name,
                encodedPassword
        );

        String selectSql = """
                SELECT id, email, name, password, role, status,
                       login_count, last_login_at, created_at, updated_at
                FROM members
                WHERE email = ?
                """;

        return jdbcTemplate.queryForObject(
                selectSql,
                memberRowMapper,
                email
        );
    }

    public int update(Long id, String name, String status) {
        String sql = """
                UPDATE members
                SET name = ?,
                    status = ?
                WHERE id = ?
                """;

        return jdbcTemplate.update(
                sql,
                name,
                status,
                id
        );
    }

    public int increaseLoginCount(Long id) {
        String sql = """
                UPDATE members
                SET login_count = login_count + 1,
                    last_login_at = NOW()
                WHERE id = ?
                """;

        return jdbcTemplate.update(sql, id);
    }

    public int deleteById(Long id) {
        String sql = """
                DELETE FROM members
                WHERE id = ?
                """;

        return jdbcTemplate.update(sql, id);
    }

    public void insertLog(Long memberId, String action, String message) {
        String sql = """
                INSERT INTO member_logs
                (member_id, action, message)
                VALUES (?, ?, ?)
                """;

        jdbcTemplate.update(
                sql,
                memberId,
                action,
                message
        );
    }
}