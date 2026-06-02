package com.example.simplecrud.controller;

import com.example.simplecrud.dto.SignupForm;
import com.example.simplecrud.service.SignupService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class SignupController {

    private final SignupService service;

    public SignupController(SignupService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/members";
    }

    @GetMapping("/members")
    public String members(Model model) {
        model.addAttribute("signupForm", new SignupForm());
        model.addAttribute("members", service.findMembers());

        return "members";
    }

    @PostMapping("/members")
    public String signup(@ModelAttribute SignupForm form, Model model) {
        try {
            service.signup(form);
            return "redirect:/members";
        } catch (IllegalArgumentException e) {
            model.addAttribute("signupForm", form);
            model.addAttribute("members", service.findMembers());
            model.addAttribute("errorMessage", e.getMessage());

            return "members";
        }
    }
}