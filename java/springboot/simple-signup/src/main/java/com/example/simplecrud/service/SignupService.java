package com.example.simplecrud.service;

import com.example.demo.domain.Member;
import com.example.demo.dto.SignupForm;
import com.example.demo.repository.MemberRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SignupService {

    private final MemberRepository repository;

    public SignupService(MemberRepository repository) {
        this.repository = repository;
    }

    public void signup(SignupForm form) {
        validate(form);

        try {
            repository.save(form);
        } catch (DuplicateKeyException e) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }
    }

    public List<Member> findMembers() {
        return repository.findAll();
    }

    private void validate(SignupForm form) {
        if (form.getEmail() == null || form.getEmail().isBlank()) {
            throw new IllegalArgumentException("이메일을 입력해 주세요.");
        }

        if (form.getPassword() == null || form.getPassword().isBlank()) {
            throw new IllegalArgumentException("비밀번호를 입력해 주세요.");
        }

        if (form.getName() == null || form.getName().isBlank()) {
            throw new IllegalArgumentException("이름을 입력해 주세요.");
        }
    }
}