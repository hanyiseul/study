package com.example.wmspart4.controller;

import com.example.wmspart4.dto.SignupForm;
import com.example.wmspart4.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/login";
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
    public String signup(SignupForm form, Model model) {
        try {
            userService.signup(form);
            return "redirect:/login?signup";
        } catch (IllegalArgumentException e) {
            model.addAttribute("signupForm", form);
            model.addAttribute("errorMessage", e.getMessage());
            return "signup";
        }
    }
}