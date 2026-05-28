// 사용자의 요청 주소를 받는 계층
package com.example.crud.controller;

import com.example.crud.domain.Member;
import com.example.crud.dto.MemberForm;
import com.example.crud.service.MemberService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller // HTML 화면을 반환하는 Controller
public class MemberController {

    private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    // 첫 화면 이동
    @GetMapping("/")
    public String home() {
        return "redirect:/members";
    }

    // 회원 목록 화면
    @GetMapping("/members")
    public String list(Model model) {
        List<Member> members = service.findAllMembers();

        model.addAttribute("members", members);
        model.addAttribute("memberForm", new MemberForm());

        return "members";
    }

    // 회원 등록
    @PostMapping("/members")
    public String create(@ModelAttribute MemberForm form) {
        service.createMember(form);

        return "redirect:/members";
    }

    // 회원 수정 화면
    @GetMapping("/members/{id}/edit")
    public String editForm(@PathVariable Long id, Model model) {
        Member member = service.findMember(id);

        model.addAttribute("member", member);
        model.addAttribute("memberForm", new MemberForm(member.getName(), member.getEmail()));

        return "edit";
    }

    // 회원 수정 처리
    @PostMapping("/members/{id}/edit")
    public String update(
            @PathVariable Long id,
            @ModelAttribute MemberForm form
    ) {
        service.updateMember(id, form);

        return "redirect:/members";
    }

    // 회원 삭제
    @PostMapping("/members/{id}/delete")
    public String delete(@PathVariable Long id) {
        service.deleteMember(id);

        return "redirect:/members";
    }
}