package com.example.backend.share.security;

// Bean, Configuration 사용을 위한 import
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Spring Security 설정을 위한 import
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

// SecurityFilterChain 사용
import org.springframework.security.web.SecurityFilterChain;


// Spring 설정 클래스임을 의미
// 서버 실행 시 Spring이 읽어서 Bean을 등록함
@Configuration
public class SecurityConfig {

    // SecurityFilterChain 객체를 Spring Bean으로 등록
    // Security의 동작 방식을 정의하는 핵심 메서드
    @Bean
    public SecurityFilterChain securityFilterChain(
            // Spring Security가 제공하는 설정 객체
            HttpSecurity http
    ) throws Exception {

        // CSRF(Cross Site Request Forgery) 보호 기능 비활성화
        // REST API 서버에서는 보통 JWT를 사용하므로 끄는 경우가 많음
        http.csrf(csrf -> csrf.disable());

        // URL 접근 권한 설정
        http.authorizeHttpRequests(auth -> auth

                // 회원가입 API는 로그인 없이 접근 가능
                .requestMatchers("/members/signup")
                .permitAll()

                // 로그인 API도 로그인 없이 접근 가능
                .requestMatchers("/members/login")
                .permitAll()

                // 위에서 허용한 URL을 제외한 모든 요청은
                // 인증된 사용자만 접근 가능
                .anyRequest()
                .authenticated()
        );

        // 지금까지 작성한 Security 설정을 적용하여 반환
        return http.build();
    }
}