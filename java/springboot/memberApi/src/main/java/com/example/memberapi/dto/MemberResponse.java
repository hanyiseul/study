// 회원 정보를 API 응답(JSON)으로 반환하기 위한 DTO
// 서버 -> 클라이언트로 보내는 데이터 객체
package com.example.memberapi.dto;

import com.example.memberapi.domain.Member;
import java.time.LocalDateTime;

public class MemberResponse {

    // 클라이언트에게 응답할 데이터들
    private Long id;
    private String email;
    private String name;
    private String role;
    private String status;
    private Integer loginCount;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public MemberResponse( // 회원 조회 결과를 json으로 반환
            Long id,
            String email,
            String name,
            String role,
            String status,
            Integer loginCount,
            LocalDateTime lastLoginAt,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
            // password : api응답으로 비밀번호 반환 x (응답으로 보내면 보안 문제 생김)
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.status = status;
        this.loginCount = loginCount;
        this.lastLoginAt = lastLoginAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // 생성자 : 응답 객체 생성 시 값 넣는 부분
    // 객체 변환 함수 : Member 객체 → MemberResponse 객체 변환
    public static MemberResponse from(Member member) { // from(Member member) : Member 객체를 MemberResponse로 변환하는 메서드
        return new MemberResponse(
                member.getId(),
                member.getEmail(),
                member.getName(),
                member.getRole(),
                member.getStatus(),
                member.getLoginCount(),
                member.getLastLoginAt(),
                member.getCreatedAt(),
                member.getUpdatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
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
