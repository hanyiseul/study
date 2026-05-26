// 회원 정보 수정 요청 DTO (회원 수정 API 호출 시 들어오는 데이터를 담는 객체)
package com.example.memberapi.dto; // dto 패키지 : 요청/응답 데이터 객체 넣는 곳

// 프론트에서 받은 json을 객체로 자동 변환
public class MemberUpdateRequest { // 회원 수정 요청 객체

    private String name;
    private String status;

    // 기본 생성자
    public MemberUpdateRequest() {
    }

    // getter
    public String getName() {
        return name;
    }

    public String getStatus() {
        return status;
    }
}
// curl -X PUT http://localhost:3100/api/members/22 -H "Content-Type: application/json" -d "{\"name\":\"수정회원\",\"status\":\"INACTIVE\"}"