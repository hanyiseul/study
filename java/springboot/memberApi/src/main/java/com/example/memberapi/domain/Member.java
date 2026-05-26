// domain : 핵심 비즈니스 데이터 객체, db 테이블 대응 객체
package com.example.memberapi.domain; // domain 패키지 소속이라는 의미

import java.time.LocalDateTime; // LocalDateTime

// DB 조회 결과를 담는 역할
// DB에서 회원 데이터를 조회할 때마다 Repository가 조회 결과를 바탕으로 생성하는 데이터 객체
public class Member { // 회원 한명을 표현

    // private : 외부 클래스에서 직접 접근 금지
    private Long id;                   // 회원 번호
    private String email;              // 이메일
    private String name;               // 이름
    private String password;           // 비밀번호
    private String role;               // 권한
    private String status;             // 회원 상태
    private Integer loginCount;        // 로그인 횟수
    private LocalDateTime lastLoginAt; // 마지막 로그인 시간
    private LocalDateTime createdAt;   // 회원 생성 시간
    private LocalDateTime updatedAt;   // 업데이트 시간

    public Member( // 생성자 : 객체 생성 시 값 넣는 부분
            Long id,
            String email,
            String name,
            String password,
            String role,
            String status,
            Integer loginCount,
            LocalDateTime lastLoginAt,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) { // this.객체 자신의 필드 = 생성자 파라미터 -> 전달 받은 파라미터 값을 객체 내부 변수값에 저장
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
        this.status = status;
        this.loginCount = loginCount;
        this.lastLoginAt = lastLoginAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // getter : private 필드 값을 외부에서 읽기 위해 사용하는 메서드
    // getter 사용 이유 : 캡슐화 (데이터 보호 + 안전한 접근)
    // 데이터 조회용 메서드
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }

    public Integer getLoginCount() {
        return loginCount;
    }

    public LocalDateTime getLastLoginAt() {
        return lastLoginAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}

/**
 * DB
 *  ↓
 * Repository
 *  ↓
 * Member 객체 생성
 *  ↓
 * Service
 *  ↓
 * Controller
 *  ↓
 * JSON 응답
 */