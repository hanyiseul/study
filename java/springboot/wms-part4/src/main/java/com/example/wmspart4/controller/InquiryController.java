package com.example.wmspart4.controller;

import com.example.wmspart4.domain.AppUser;
import com.example.wmspart4.dto.InquiryAnswerForm;
import com.example.wmspart4.dto.InquiryForm;
import com.example.wmspart4.service.InquiryService;
import com.example.wmspart4.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class InquiryController {

    private final InquiryService inquiryService;
    private final UserService userService;

    public InquiryController(InquiryService inquiryService, UserService userService) {
        this.inquiryService = inquiryService;
        this.userService = userService;
    }

    @GetMapping("/customer/inquiries")
    public String customerInquiries(Authentication authentication, Model model) {
        AppUser user = userService.findByEmail(authentication.getName());

        model.addAttribute("inquiryForm", new InquiryForm());
        model.addAttribute("inquiries", inquiryService.findByCustomerId(user.getId()));

        return "customer-inquiries";
    }

    @PostMapping("/customer/inquiries")
    public String createInquiry(Authentication authentication, InquiryForm form) {
        AppUser user = userService.findByEmail(authentication.getName());
        inquiryService.create(user.getId(), form);
        return "redirect:/customer/inquiries";
    }

    @GetMapping("/admin/inquiries")
    public String adminInquiries(Model model) {
        model.addAttribute("answerForm", new InquiryAnswerForm());
        model.addAttribute("inquiries", inquiryService.findAll());

        return "admin-inquiries";
    }

    @PostMapping("/admin/inquiries/{id}/answer")
    public String answerInquiry(@PathVariable Long id, InquiryAnswerForm form) {
        inquiryService.answer(id, form);
        return "redirect:/admin/inquiries";
    }
}