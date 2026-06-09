package com.example.wmspart4.controller;

import com.example.wmspart4.domain.AppUser;
import com.example.wmspart4.dto.NoticeForm;
import com.example.wmspart4.service.NoticeService;
import com.example.wmspart4.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class NoticeController {

    private final NoticeService noticeService;
    private final UserService userService;

    public NoticeController(NoticeService noticeService, UserService userService) {
        this.noticeService = noticeService;
        this.userService = userService;
    }

    @GetMapping("/admin/notices")
    public String adminNotices(Model model) {
        model.addAttribute("notices", noticeService.findAll());
        model.addAttribute("noticeForm", new NoticeForm());
        model.addAttribute("isAdminPage", true);
        return "notices";
    }

    @PostMapping("/admin/notices")
    public String createNotice(Authentication authentication, NoticeForm form) {
        AppUser user = userService.findByEmail(authentication.getName());
        noticeService.create(user.getId(), form);
        return "redirect:/admin/notices";
    }

    @GetMapping("/customer/notices")
    public String customerNotices(Model model) {
        model.addAttribute("notices", noticeService.findVisible());
        model.addAttribute("isAdminPage", false);
        return "notices";
    }
}