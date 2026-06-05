package com.example.wmspart3.controller;

import com.example.wmspart3.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    private final UserService userService;

    public DashboardController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/customer/dashboard")
    public String customerDashboard(Authentication authentication, Model model) {
        model.addAttribute("email", authentication.getName());
        return "customer-dashboard";
    }

    @GetMapping("/admin/dashboard")
    public String adminDashboard(Authentication authentication, Model model) {
        model.addAttribute("email", authentication.getName());
        model.addAttribute("totalUsers", userService.countAllUsers());
        model.addAttribute("customerCount", userService.countCustomers());
        model.addAttribute("adminCount", userService.countAdmins());
        return "admin-dashboard";
    }
}