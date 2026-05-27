package com.example.streamapi.domain;

import java.time.LocalDateTime;

// 금융 거래 한건을 표현하는 도메인 클래스
// DB의 finance_transactions 테이블 한 행이 이 객체 하나로 변환
public class FinanceTransaction { // 클래스 선언

    private Long id;
    private String accountNumber;
    private String transactionType;
    private Long amount;
    private String channel;
    private String requestKey;
    private String transactionStatus;
    private String memo;
    private LocalDateTime transactedAt;
    private LocalDateTime createdAt;

    // 생성자는 Repository에서 db 조회 결과를 객체로 바꿀 때 호출
    public FinanceTransaction( // 생성자(Constructor) : 객체 생성 시 실행되는 초기화 코드
            Long id,
            String accountNumber,
            String transactionType,
            Long amount,
            String channel,
            String requestKey,
            String transactionStatus,
            String memo,
            LocalDateTime transactedAt,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.transactionType = transactionType;
        this.amount = amount;
        this.channel = channel;
        this.requestKey = requestKey;
        this.transactionStatus = transactionStatus;
        this.memo = memo;
        this.transactedAt = transactedAt;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    // 거래 유형 반환
    // service에서 이 getter를 사용해 입금,출금,이체 거래를 구분
    public String getTransactionType() {
        return transactionType;
    }

    public Long getAmount() {
        return amount;
    }

    public String getChannel() {
        return channel;
    }

    public String getRequestKey() {
        return requestKey;
    }

    public String getTransactionStatus() {
        return transactionStatus;
    }

    public String getMemo() {
        return memo;
    }

    public LocalDateTime getTransactedAt() {
        return transactedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}