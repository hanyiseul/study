// 회원 권한

package com.signup.security.dto; // 이 클래스가 속한 패키지(폴더 구조) 지정

import java.sql.Date; // sql date 타입과 매핑되는 날짜 객체 -> db의 date 컬럼 저장용으로 자주 사용
import java.util.UUID; // 랜덤 고유값 생성용 클래스  -> 토큰, 식별자 인증키 등 만들때 사용

// 롬복 라이브러리 -> 코드 간결하게 만들어주는 도구
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data // 롬복 자동 생성 -> getter, setter, toString, equlals, hashCode 등
@Builder // 빌더 패턴 생성 -> 가독성 좋아짐
@AllArgsConstructor // 모든 필드를 받는 생성자 자동 생성 -> 편함

public class UserAuth { // UserAuth 클래스 정의 -> 회원 권한 정보 담는 DTO (Data Transfer Object) 역할
  private Long no; // 회원 권한 pk -> auto_increment
  @Builder.Default // 빌더 사용 시 기본값 유지
  private String id = UUID.randomUUID().toString(); // 외부 노출용 고유 식별자 -> 랜덤 uuid 생성
  private String username; // 회원 아이디
  private String auth; // 권한 정보
  private Date createdAt; // 생성일
  private Date updatedAt; // 수정일

  // 객체 생성시 UUID 자동 생성
  public UserAuth() { // 기본 생성자
    this.id = UUID.randomUUID().toString();
  }
}