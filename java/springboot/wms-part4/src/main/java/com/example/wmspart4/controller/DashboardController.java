package com.example.wmspart4.controller;

import com.example.wmspart4.domain.AppUser;
import com.example.wmspart4.service.ContractService;
import com.example.wmspart4.service.InboundService;
import com.example.wmspart4.service.InventoryService;
import com.example.wmspart4.service.OutboundService;
import com.example.wmspart4.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    private final UserService userService;
    private final ContractService contractService;
    private final InboundService inboundService;
    private final InventoryService inventoryService;
    private final OutboundService outboundService;

    public DashboardController(UserService userService,
                               ContractService contractService,
                               InboundService inboundService,
                               InventoryService inventoryService,
                               OutboundService outboundService) {
        this.userService = userService;
        this.contractService = contractService;
        this.inboundService = inboundService;
        this.inventoryService = inventoryService;
        this.outboundService = outboundService;
    }

    @GetMapping("/customer/dashboard")
    public String customerDashboard(Authentication authentication, Model model) {
        AppUser user = userService.findByEmail(authentication.getName());

        model.addAttribute("email", user.getEmail());
        model.addAttribute("name", user.getName());
        model.addAttribute("contracts", contractService.findByCustomerId(user.getId()).size());
        model.addAttribute("inventories", inventoryService.findByCustomerId(user.getId()).size());
        model.addAttribute("outbounds", outboundService.findByCustomerId(user.getId()).size());

        return "customer-dashboard";
    }

    @GetMapping("/admin/dashboard")
    public String adminDashboard(Authentication authentication, Model model) {
        model.addAttribute("email", authentication.getName());
        model.addAttribute("totalUsers", userService.countAllUsers());
        model.addAttribute("totalContracts", contractService.countAll());
        model.addAttribute("totalInbounds", inboundService.countAll());
        model.addAttribute("totalInventories", inventoryService.countAll());
        model.addAttribute("totalOutbounds", outboundService.countAll());

        return "admin-dashboard";
    }
}