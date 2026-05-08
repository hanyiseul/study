package com.signup.security.config;

import java.beans.JavaBean;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration      
@EnableWebSecurity  // 스프링 시큐리티 설정 빈으로 등록

// 스프링 시큐리티 설정 메소드

public class SecurityConfig {
  // 스프링 시큐리티 설정 메소드
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    log.info("스프링 시큐리티 설정");

    return http.build();
  }

  // 암호화 방식 빈 등록
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}

/**
 * 스프링 시큐리티 설정
 * @param http
 * @return
 * @throws Exception
 */

/**
 * 암호화 방식 빈 등록
 * @return
 */