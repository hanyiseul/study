package com.example.springcorestate.member;

import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
        System.out.println("MemberService 생성자 실행: MemberRepository 주입 완료");
    }

    public String findMember(Long id) {
        System.out.println("MemberService.findMember 실행: 비즈니스 로직 처리");
        String name = memberRepository.findNameById(id);
        return "회원 조회 결과: " + name;
    }
}