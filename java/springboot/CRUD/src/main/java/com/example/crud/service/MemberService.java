// 처리 흐름을 담당하는 계층 (처리 흐름을 한 곳에 모으기 위해서)

/**
 * 회원 등록 흐름
 *  1. Controller에서 입력값 전달
 *  2. Service에서 등록 처리 호출
 *  3. Repository에서 INSERT 실행
 * */

package com.example.crud.service;

import com.example.crud.domain.Member;
import com.example.crud.dto.MemberForm;
import com.example.crud.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 업무 처리 계층
public class MemberService {

    // service는 Repository를 사용
    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public List<Member> findAllMembers() {
        return repository.findAll();
    }

    public Member findMember(Long id) {
        return repository.findById(id);
    }

    public void createMember(MemberForm form) {
        repository.save(form);
    }

    public void updateMember(Long id, MemberForm form) {
        repository.update(id, form);
    }

    public void deleteMember(Long id) {
        repository.delete(id);
    }
}


/**
 * 고도화 사항 (유효성 검증)
 *  - 이름이 비어 있는지 검사
 *  - 이메일 형식 검사
 *  - 이미 등록된 이메일인지 확인
 *  - 등록 실패 시 오류 처리
 * */