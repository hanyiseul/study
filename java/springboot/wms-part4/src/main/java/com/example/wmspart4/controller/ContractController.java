package com.example.wmspart4.controller;

import com.example.wmspart4.dto.ContractForm;
import com.example.wmspart4.service.ContractService;
import com.example.wmspart4.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ContractController {

    private final ContractService contractService;
    private final UserService userService;

    public ContractController(ContractService contractService, UserService userService) {
        this.contractService = contractService;
        this.userService = userService;
    }

    @GetMapping("/admin/contracts")
    public String adminContracts(Model model) {
        model.addAttribute("contracts", contractService.findAll());
        model.addAttribute("customers", userService.findCustomers());
        model.addAttribute("contractForm", new ContractForm());
        return "admin-contracts";
    }

    @PostMapping("/admin/contracts")
    public String createContract(ContractForm form) {
        contractService.create(form);
        return "redirect:/admin/contracts";
    }

    @PostMapping("/admin/contracts/{id}/confirm")
    public String confirmContract(@PathVariable Long id) {
        contractService.confirm(id);
        return "redirect:/admin/contracts";
    }
}