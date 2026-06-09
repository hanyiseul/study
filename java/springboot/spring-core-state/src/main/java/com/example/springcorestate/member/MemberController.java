package com.example.springcorestate.member;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
        System.out.println("MemberController 생성자 실행: MemberService 주입 완료");
    }

    @GetMapping("/members/{id}")
    public String findMember(@PathVariable Long id) {
        System.out.println("MemberController.findMember 실행: HTTP 요청 처리");
        return memberService.findMember(id);
    }
}