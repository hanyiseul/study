package com.example.security.service;

import com.example.security.domain.AppUser;
import com.example.security.dto.SignupForm;
import com.example.security.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository repository,
            PasswordEncoder passwordEncoder
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public void signup(SignupForm form) {
        validateSignupForm(form);

        if (repository.findByEmail(form.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(form.getPassword());

        repository.save(form, encodedPassword);
    }

    public AppUser findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    private void validateSignupForm(SignupForm form) {
        if (form.getEmail() == null || form.getEmail().isBlank()) {
            throw new IllegalArgumentException("이메일이 필요합니다.");
        }

        if (form.getPassword() == null || form.getPassword().isBlank()) {
            throw new IllegalArgumentException("비밀번호가 필요합니다.");
        }

        if (form.getName() == null || form.getName().isBlank()) {
            throw new IllegalArgumentException("이름이 필요합니다.");
        }
    }
}
