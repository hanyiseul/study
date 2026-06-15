package com.example.securityjpajwt.controller;

import com.example.securityjpajwt.dto.AuthCompareResponse;
import com.example.securityjpajwt.dto.LoginRequest;
import com.example.securityjpajwt.dto.LoginResponse;
import com.example.securityjpajwt.dto.SignupRequest;
import com.example.securityjpajwt.entity.AppUser;
import com.example.securityjpajwt.entity.UserRole;
import com.example.securityjpajwt.repository.AppUserRepository;
import com.example.securityjpajwt.security.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider jwtTokenProvider
    ) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (appUserRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("이미 사용 중인 이메일입니다.");
        }

        UserRole role = parseRole(request.getRole());

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        AppUser appUser = new AppUser(
                request.getEmail(),
                encodedPassword,
                role
        );

        appUserRepository.save(appUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("회원가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String accessToken = jwtTokenProvider.createToken(authentication);

        String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        return new LoginResponse(
                accessToken,
                authentication.getName(),
                role,
                jwtTokenProvider.getExpirationMs()
        );
    }

    @GetMapping("/session-vs-jwt")
    public AuthCompareResponse sessionVsJwt() {
        return new AuthCompareResponse(
                "Session vs JWT",
                "Session은 서버 저장소, JWT는 클라이언트 토큰 중심",
                "Session은 JSESSIONID 쿠키, JWT는 Authorization Bearer Header",
                "Session은 서버 세션 조회, JWT는 서명과 만료시간 검증",
                "Session은 서버 세션 삭제, JWT는 토큰 삭제와 만료·폐기 전략 필요",
                "Session은 내부 업무 시스템, JWT는 SPA·모바일·외부 API에 적합"
        );
    }

    private UserRole parseRole(String role) {
        if (role == null || role.isBlank()) {
            return UserRole.USER;
        }

        try {
            return UserRole.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            return UserRole.USER;
        }
    }
}