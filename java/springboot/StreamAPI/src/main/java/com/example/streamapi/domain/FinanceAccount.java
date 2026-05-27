// domain : DB 조회 결과를 표현하는 핵심 데이터 객체가 들어감
package com.example.streamapi.domain;

import java.time.LocalDateTime; // DATETIME 값을 java에서  날짜·시간 객체로 다루기 위해 사용

// DB의 finance_accounts 테이블 한 행이 Java에서는 FinanceAccount 객체 하나
public class FinanceAccount { // 계좌 한건을 표현하는 클래스

    // private : 외부에서 계좌 상태를 직접 수정하지 못하게 하기 위해
    private Long id;                  // db 내부 식별자
    private String accountNumber;     // 계좌번호
    private String ownerName;         // 예금주명
    private String accountType;       // NORMAL, VIP 같은 계좌 유형
    private Long balance;             // 현재 잔액
    private String status;            // ACTIVE, INACTIVE 같은 계좌 상태
    private LocalDateTime createdAt;  // 계좌 생성 시각

    // 생성자 (반환 타입이 없음) : DB 조회 결과를 객체로 만듦
    // Repository의 RowMapper가 ResultSet에서 값을 꺼내 이 생성자에 전달
    public FinanceAccount(
            Long id,
            String accountNumber,
            String ownerName,
            String accountType,
            Long balance,
            String status,
            LocalDateTime createdAt
    ) { // 생성자로 전달받은 값을 객체 내부 상태로 저장
        // 객체의 필드 = 생성자의 매개변수
        this.id = id;
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.accountType = accountType;
        this.balance = balance;
        this.status = status;
        this.createdAt = createdAt;
    }

    // getter : private 변수 값을 꺼내는 메서드
    public Long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public String getAccountType() {
        return accountType;
    }

    public Long getBalance() {
        return balance;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
