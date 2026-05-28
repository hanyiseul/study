// domain : 핵심 비즈니스 대상과 그 규칙을 다루는 가장 중요한 계층
package com.example.crud.domain;
import java.time.LocalDateTime;

/**
 * [Domain 계층]
 * 소프트웨어의 핵심 비즈니스 대상과 데이터베이스 테이블을 매핑하는 클래스입니다.
 * MariaDB의 'members' 테이블의 한 행(Row)과 1:1로 대응되는 객체입니다.
 */
public class Member {

    // 데이터베이스의 각 컬럼(Column)과 매핑되는 필드 정의
    private Long id;              // 회원 고유 번호 (DB의 Primary Key, 자동 증가 분)
    private String name;          // 회원의 이름
    private String email;         // 회원의 이메일 주소
    private LocalDateTime createdAt; // 회원 등록 일시 (DB의 기본값 CURRENT_TIMESTAMP 매핑)

    /**
     * [생성자 (Constructor)]
     * 데이터베이스(Repository 계층)에서 조회된 결과를 바탕으로
     * 자바 세상에서 안전하게 사용할 Member 객체를 완성할 때 사용합니다.
     */
    public Member(Long id, String name, String email, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    /**
     * [Getter 메서드]
     * 외부(Service 계층이나 Thymeleaf 뷰 템플릿 등)에서 회원의 정보를 안전하게 읽어갈 수 있도록 제공합니다.
     * * 💡 왜 Setter는 없을까요?
     * 도메인의 데이터가 애플리케이션 사방에서 함부로 변경(오염)되는 것을 막기 위함입니다.
     * 데이터의 무결성을 유지하기 위해 생성자로만 값을 넣고 읽기 전용(Getter)으로 설계하는 것이 관례입니다.
     */
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}