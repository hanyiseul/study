// Controller : HTTP 요청과 Service 연결 (REST API Controller)
package com.example.memberapi.controller;

import com.example.memberapi.dto.MemberCreateRequest; // 회원 생성 요청 DTO 사용
import com.example.memberapi.dto.MemberResponse; // 응답 DTO 사용
import com.example.memberapi.dto.MemberUpdateRequest; // 회원 수정 요청 DTO 사용
import com.example.memberapi.service.MemberService; // service 사용
import org.springframework.web.bind.annotation.*; // REST API 관련 어노테이션 사용

import java.util.List;

@RestController // REST API Controller -> 메서드가 반환하는 java 객체는 JSON으로 변환
@RequestMapping("/api/members") // 이 Controller의 기본 주소 (API 주소)
public class MemberController {

    private final MemberService memberService; // service 객체 저장

    public MemberController(MemberService memberService) { // 스프링이 service bean 자동으로 넣어줌
        this.memberService = memberService;
    }

    @GetMapping // HTTP GET 요청 처리
    public List<MemberResponse> findAll() {  // 회원 목록 반환
        return memberService.findAll(); // service 호출
    }

    @GetMapping("/{id}") // 경로 변수 사용 : {동적으로 변하는 값}
    public MemberResponse findById(@PathVariable Long id) { // URL의 {id} 값을 변수로 받음
        return memberService.findById(id);
    }
    // curl http://localhost:3100/api/members/1

    @PostMapping // 회원 생성 API
    public MemberResponse create(
            @RequestBody MemberCreateRequest request // @RequestBody : HTTP Body JSON을 객체로 변환
            // MemberCreateRequest request 객체 생성
    ) {
        return memberService.create(request); // 회원 생성 실행
    }
    // curl -X POST http://localhost:3100/api/members -H "Content-Type: application/json" -d "{\"email\":\"newuser@test.com\",\"name\":\"신규회원\",\"password\":\"1234\"}"

    @PutMapping("/{id}") // 회원 수정 API
    public MemberResponse update(
            @PathVariable Long id, // URL 값
            @RequestBody MemberUpdateRequest request // JSON Body 값
    ) {
        return memberService.update(id, request);
    }

    @PatchMapping("/{id}/login-count") // 부분 수정 API
    public MemberResponse increaseLoginCount( // 로그인 횟수 증가
            @PathVariable Long id
    ) {
        return memberService.increaseLoginCount(id);
    }

    @DeleteMapping("/{id}") // 회원 삭제 API
    public String delete(@PathVariable Long id) {
        memberService.delete(id); // 삭제 실행
        return "회원 삭제 완료"; // 응답 문자열 반환
    }
    // curl -X PATCH http://localhost:3100/api/members/22/login-count
}

/**
 * HTTP 요청 받기
 * ↓
 * URL/JSON 데이터 꺼내기
 * ↓
 * Service 호출
 * ↓
 * 결과 JSON 응답
 * */