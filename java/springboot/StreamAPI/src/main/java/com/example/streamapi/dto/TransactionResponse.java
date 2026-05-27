/**
 * DB
 * ↓
 * Repository
 * ↓
 * FinanceTransaction (Domain)
 * ↓
 * TransactionResponse (DTO)
 * ↓
 * */

package com.example.streamapi.dto;
import com.example.streamapi.domain.FinanceTransaction; // 도메인 객체 사용

import java.time.LocalDateTime;

// 거래 목록 조회 API가 외부로 반환할 응답 DTO
// Domain 객체인 FinanceTransaction을 그대로 외부에 반환하지 않고, API 응답에 필요한 구조로 변환
public class TransactionResponse {
    // 캡슐화 : 외부 직접 접근 차단
    private Long id;
    private String accountNumber;
    private String transactionType;
    private Long amount;
    private String channel;
    private String requestKey;
    private String transactionStatus;
    private String memo;
    private LocalDateTime transactedAt;

    // 객체 생성 시 초기값 저장
    public TransactionResponse(
            Long id,
            String accountNumber,
            String transactionType,
            Long amount,
            String channel,
            String requestKey,
            String transactionStatus,
            String memo,
            LocalDateTime transactedAt
    ) {
        // 객체 필드 = 생성자 파라미터
        this.id = id;
        this.accountNumber = accountNumber;
        this.transactionType = transactionType;
        this.amount = amount;
        this.channel = channel;
        this.requestKey = requestKey;
        this.transactionStatus = transactionStatus;
        this.memo = memo;
        this.transactedAt = transactedAt;
    }

    // static : 객체 생성 없이 호출 가능
    // from 메서드 : Domain -> DTO 변환
    // 외부 API 응답 데이터 제한 -> API 응답 최적화/가공 역할
    public static TransactionResponse from(FinanceTransaction transaction) { // transaction 객체를 TransactionResponse 객체로 변환
        return new TransactionResponse( // 새 DTO 객체 생성
                transaction.getId(),
                transaction.getAccountNumber(),
                transaction.getTransactionType(),
                transaction.getAmount(),
                transaction.getChannel(),
                transaction.getRequestKey(),
                transaction.getTransactionStatus(),
                transaction.getMemo(),
                transaction.getTransactedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

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
}