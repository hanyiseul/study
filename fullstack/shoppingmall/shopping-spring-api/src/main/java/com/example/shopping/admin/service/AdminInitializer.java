package com.example.shopping.admin.service;

import com.example.shopping.common.enums.*;
import com.example.shopping.user.entity.User;
import com.example.shopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component @RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {
 private final UserRepository userRepository; private final PasswordEncoder passwordEncoder;
 public void run(String... args){ if(!userRepository.existsByEmail("admin@test.com")){ userRepository.save(User.builder().name("관리자").email("admin@test.com").passwordHash(passwordEncoder.encode("1234")).phone("010-0000-0000").role(UserRole.ADMIN).status(UserStatus.ACTIVE).build()); } }
}
