package com.example.securityjpajwt.controller;

import com.example.securityjpajwt.dto.MeResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @GetMapping("/api/public")
    public String publicApi() {
        return "인증 없이 접근 가능한 공개 API입니다.";
    }

    @GetMapping("/api/me")
    public MeResponse me(Authentication authentication) {
        return new MeResponse(
                authentication.getName(),
                authentication.getAuthorities(),
                "인증된 사용자입니다."
        );
    }

    @GetMapping("/api/admin")
    public String adminApi(Authentication authentication) {
        return "관리자 API 접근 성공: " + authentication.getName();
    }
}