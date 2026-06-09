package com.example.wmspart4.controller;

import com.example.wmspart4.domain.AppUser;
import com.example.wmspart4.dto.OutboundRequestForm;
import com.example.wmspart4.service.InventoryService;
import com.example.wmspart4.service.OutboundService;
import com.example.wmspart4.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class OutboundController {

    private final OutboundService outboundService;
    private final InventoryService inventoryService;
    private final UserService userService;

    public OutboundController(OutboundService outboundService,
                              InventoryService inventoryService,
                              UserService userService) {
        this.outboundService = outboundService;
        this.inventoryService = inventoryService;
        this.userService = userService;
    }

    @GetMapping("/customer/outbounds")
    public String customerOutbounds(Authentication authentication, Model model) {
        AppUser user = userService.findByEmail(authentication.getName());

        model.addAttribute("outboundForm", new OutboundRequestForm());
        model.addAttribute("inventories", inventoryService.findByCustomerId(user.getId()));
        model.addAttribute("outbounds", outboundService.findByCustomerId(user.getId()));

        return "customer-outbounds";
    }

    @PostMapping("/customer/outbounds")
    public String requestOutbound(Authentication authentication, OutboundRequestForm form) {
        AppUser user = userService.findByEmail(authentication.getName());
        outboundService.request(user.getId(), form);
        return "redirect:/customer/outbounds";
    }

    @GetMapping("/admin/outbounds")
    public String adminOutbounds(Model model) {
        model.addAttribute("outbounds", outboundService.findAll());
        return "admin-outbounds";
    }

    @PostMapping("/admin/outbounds/{id}/complete")
    public String completeOutbound(@PathVariable Long id) {
        outboundService.complete(id);
        return "redirect:/admin/outbounds";
    }
}