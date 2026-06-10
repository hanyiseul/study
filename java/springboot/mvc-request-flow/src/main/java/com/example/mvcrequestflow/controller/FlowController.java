package com.example.demo.controller;

import com.example.demo.dto.MemberCreateRequest;
import com.example.demo.dto.MemberResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FlowController {

    public FlowController() {
        System.out.println("FlowController 생성자 실행: Controller Bean 생성");
    }

    @GetMapping("/api/hello")
    public String hello(HttpServletRequest request) {
        System.out.println("[Controller] /api/hello 실행");
        System.out.println("[Controller] DispatcherServlet 이후 Controller 도달");
        System.out.println("[Controller] 요청 URI: " + request.getRequestURI());

        return "hello spring mvc";
    }

    @GetMapping("/api/members/{id}")
    public String findMember(
            @PathVariable Long id,
            @RequestParam(required = false) String keyword,
            @RequestHeader(value = "User-Agent", required = false) String userAgent
    ) {
        System.out.println("[Controller] /api/members/{id} 실행");
        System.out.println("[Controller] PathVariable id: " + id);
        System.out.println("[Controller] RequestParam keyword: " + keyword);
        System.out.println("[Controller] RequestHeader User-Agent: " + userAgent);

        return "회원 조회 id=" + id + ", keyword=" + keyword;
    }

    @PostMapping("/api/members")
    public MemberResponse createMember(@RequestBody MemberCreateRequest request) {
        System.out.println("[Controller] POST /api/members 실행");
        System.out.println("[Controller] RequestBody email: " + request.getEmail());
        System.out.println("[Controller] RequestBody name: " + request.getName());

        return new MemberResponse(
                1L,
                request.getEmail(),
                request.getName(),
                "회원 등록 완료"
        );
    }
}