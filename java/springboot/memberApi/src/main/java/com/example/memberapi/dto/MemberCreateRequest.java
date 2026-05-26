// dto : 요청과 응답 데이터를 전달하는 코드
package com.example.memberapi.dto; // 회원 생성 요청 데이터를 받는 DTO (클라이언트가 회원가입 요청할 때 보내는 데이터를 담는 객체)

// 프론트에서 보내는 JSON을 객체로 변환
public class MemberCreateRequest { // 회원 생성 요청 객체
    // 클라이언트가 보내는 데이터
    private String email;
    private String name;
    private String password;

    // 기본 생성자 : 객체를 만드는 행위 자체(없으면 객체 생성 못해서 오류날 수 있음)
    public MemberCreateRequest() {
        // 매개변수 없이 객체 생성 가능
    }

    // getter 값 조회용
    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}