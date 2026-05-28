// DB 조회 전용 Repository
// 테이블 데이터를 조회해서 자바 객체로 변환하는 것

/**
 * SQL 실행
 * ↓
 * DB 결과(ResultSet)
 * ↓
 * RowMapper
 * ↓
 * Domain 객체 생성
 * ↓
 * List 반환
 * */

package com.example.streamapi.repository;
import com.example.streamapi.domain.FinanceAccount; // 계좌 도메인 객체 사용
import com.example.streamapi.domain.FinanceTransaction; // 거래 도메인 객체 사용
import org.springframework.jdbc.core.JdbcTemplate; //JDBC 쉽게 사용하게 해주는 spring 클래스 (SQL 실행을 간단하게 도와주는 도구)
import org.springframework.jdbc.core.RowMapper; // db 결과 -> 객체 변환 도구
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // db 접근 계층
public class StorageStateRepository { // 저장소 상태 조회 Repository

    // final : 한번 초기화 후 변경 불가
    private final JdbcTemplate jdbcTemplate; // sql 실행 객체 저장

    // 생성자 주입
    public StorageStateRepository(JdbcTemplate jdbcTemplate) { // 스프링이 JdbcTemplate Bean 자동 주입
        this.jdbcTemplate = jdbcTemplate; // 전달받은 객체 저장
    }

    // DB 계좌 데이터 한줄을 FinanceAccount 객체로 변환
    // rs: ResultSet, rowNum: 현재 몇 번째 row인지 번호.
    // new FinanceAccount( : DB 결과로 객체 생성
    private final RowMapper<FinanceAccount> accountRowMapper = (rs, rowNum) -> new FinanceAccount(
            // DB 컬럼 값 꺼내기
            rs.getLong("id"),
            rs.getString("account_number"),
            rs.getString("owner_name"),
            rs.getString("account_type"),
            rs.getLong("balance"),
            rs.getString("status"),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    // private final RowMapper<FinanceTransaction> : 거래 데이터 RowMapper
    private final RowMapper<FinanceTransaction> transactionRowMapper = (rs, rowNum) -> new FinanceTransaction(
            rs.getLong("id"),
            rs.getString("account_number"),
            rs.getString("transaction_type"),
            rs.getLong("amount"),
            rs.getString("channel"),
            rs.getString("request_key"),
            rs.getString("transaction_status"),
            rs.getString("memo"),
            rs.getTimestamp("transacted_at").toLocalDateTime(),
            rs.getTimestamp("created_at").toLocalDateTime()
    );

    public List<FinanceAccount> findAllAccounts() {
        String sql = """
                SELECT id, account_number, owner_name, account_type,
                       balance, status, created_at
                FROM finance_accounts
                ORDER BY id
                """;

        return jdbcTemplate.query(sql, accountRowMapper);
    }

    public List<FinanceTransaction> findAllTransactions() {
        String sql = """
                SELECT id, account_number, transaction_type, amount,
                       channel, request_key, transaction_status,
                       memo, transacted_at, created_at
                FROM finance_transactions
                ORDER BY transacted_at DESC, id DESC
                """;

        return jdbcTemplate.query(sql, transactionRowMapper);
    }

    public List<FinanceTransaction> findTransactionsByAccountNumber(String accountNumber) {
        String sql = """
                SELECT id, account_number, transaction_type, amount,
                       channel, request_key, transaction_status,
                       memo, transacted_at, created_at
                FROM finance_transactions
                WHERE account_number = ?
                ORDER BY transacted_at DESC, id DESC
                """;

        return jdbcTemplate.query(sql, transactionRowMapper, accountNumber);
    }
}