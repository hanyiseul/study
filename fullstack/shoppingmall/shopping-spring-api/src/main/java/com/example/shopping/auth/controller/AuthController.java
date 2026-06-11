package com.example.shopping.auth.controller;

import com.example.shopping.auth.dto.*;
import com.example.shopping.auth.service.AuthService;
import com.example.shopping.common.response.ApiResponse;
import com.example.shopping.security.CustomUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController @RequiredArgsConstructor @RequestMapping("/api/auth")
public class AuthController {
 private final AuthService authService;
 @PostMapping("/signup") public ApiResponse<Void> signup(@Valid @RequestBody SignupRequest r){ authService.signup(r); return ApiResponse.ok("회원가입이 완료되었습니다.", null); }
 @PostMapping("/login") public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest r){ return ApiResponse.ok("로그인 성공", authService.login(r)); }
 @GetMapping("/me") public ApiResponse<MeResponse> me(@AuthenticationPrincipal CustomUserPrincipal p){ return ApiResponse.ok("현재 사용자", authService.me(p.getUserId())); }
}
