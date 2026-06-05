package com.example.wmspart3.service;

import com.example.wmspart3.dto.SignupForm;
import com.example.wmspart3.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void signup(SignupForm form) {
        validateSignupForm(form);

        String email = form.getEmail().trim();
        String name = form.getName().trim();
        String role = form.getRole();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        String passwordHash = passwordEncoder.encode(form.getPassword());

        userRepository.save(email, passwordHash, name, role);
    }

    public long countAllUsers() {
        return userRepository.countAll();
    }

    public long countCustomers() {
        return userRepository.countByRole("ROLE_CUSTOMER");
    }

    public long countAdmins() {
        return userRepository.countByRole("ROLE_ADMIN");
    }

    private void validateSignupForm(SignupForm form) {
        if (isBlank(form.getEmail())) {
            throw new IllegalArgumentException("이메일을 입력해야 합니다.");
        }

        if (!form.getEmail().contains("@")) {
            throw new IllegalArgumentException("이메일 형식이 올바르지 않습니다.");
        }

        if (isBlank(form.getPassword())) {
            throw new IllegalArgumentException("비밀번호를 입력해야 합니다.");
        }

        if (form.getPassword().length() < 4) {
            throw new IllegalArgumentException("비밀번호는 4자 이상이어야 합니다.");
        }

        if (isBlank(form.getName())) {
            throw new IllegalArgumentException("이름을 입력해야 합니다.");
        }

        if (!"ROLE_CUSTOMER".equals(form.getRole()) && !"ROLE_ADMIN".equals(form.getRole())) {
            throw new IllegalArgumentException("사용자 유형을 선택해야 합니다.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}