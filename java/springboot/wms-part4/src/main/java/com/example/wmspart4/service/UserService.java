package com.example.wmspart4.service;

import com.example.wmspart4.domain.AppUser;
import com.example.wmspart4.dto.SignupForm;
import com.example.wmspart4.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void signup(SignupForm form) {
        if (isBlank(form.getEmail()) || isBlank(form.getPassword()) || isBlank(form.getName())) {
            throw new IllegalArgumentException("이메일, 비밀번호, 이름을 모두 입력해야 합니다.");
        }

        if (!"ROLE_CUSTOMER".equals(form.getRole()) && !"ROLE_ADMIN".equals(form.getRole())) {
            throw new IllegalArgumentException("사용자 유형을 선택해야 합니다.");
        }

        String email = form.getEmail().trim();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        userRepository.save(
                email,
                passwordEncoder.encode(form.getPassword()),
                form.getName().trim(),
                form.getRole()
        );
    }

    public AppUser findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    public List<AppUser> findCustomers() {
        return userRepository.findCustomers();
    }

    public long countAllUsers() {
        return userRepository.countAll();
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}