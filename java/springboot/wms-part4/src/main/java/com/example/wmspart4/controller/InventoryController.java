package com.example.wmspart4.controller;

import com.example.wmspart4.domain.AppUser;
import com.example.wmspart4.service.InventoryService;
import com.example.wmspart4.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InventoryController {

    private final InventoryService inventoryService;
    private final UserService userService;

    public InventoryController(InventoryService inventoryService, UserService userService) {
        this.inventoryService = inventoryService;
        this.userService = userService;
    }

    @GetMapping("/admin/inventories")
    public String adminInventories(Model model) {
        model.addAttribute("inventories", inventoryService.findAll());
        return "admin-inventories";
    }

    @GetMapping("/customer/inventories")
    public String customerInventories(Authentication authentication, Model model) {
        AppUser user = userService.findByEmail(authentication.getName());
        model.addAttribute("inventories", inventoryService.findByCustomerId(user.getId()));
        return "customer-inventories";
    }
}