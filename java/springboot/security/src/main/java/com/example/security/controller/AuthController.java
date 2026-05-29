package com.example.security.controller;

import com.example.security.dto.SignupForm;
import com.example.security.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/signup")
    public String signupForm(Model model) {
        model.addAttribute("signupForm", new SignupForm());
        return "signup";
    }

    @PostMapping("/signup")
    public String signup(@ModelAttribute SignupForm form, Model model) {
        try {
            service.signup(form);
            return "redirect:/login?signup";
        } catch (IllegalArgumentException e) {
            model.addAttribute("signupForm", form);
            model.addAttribute("errorMessage", e.getMessage());
            return "signup";
        }
    }
}
