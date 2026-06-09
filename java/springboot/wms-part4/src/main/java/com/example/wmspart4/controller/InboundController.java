package com.example.wmspart4.controller;

import com.example.wmspart4.dto.InboundForm;
import com.example.wmspart4.service.ContractService;
import com.example.wmspart4.service.InboundService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class InboundController {

    private final InboundService inboundService;
    private final ContractService contractService;

    public InboundController(InboundService inboundService, ContractService contractService) {
        this.inboundService = inboundService;
        this.contractService = contractService;
    }

    @GetMapping("/admin/inbounds")
    public String adminInbounds(Model model) {
        model.addAttribute("inbounds", inboundService.findAll());
        model.addAttribute("contracts", contractService.findAll());
        model.addAttribute("inboundForm", new InboundForm());
        return "admin-inbounds";
    }

    @PostMapping("/admin/inbounds")
    public String registerInbound(InboundForm form) {
        inboundService.register(form);
        return "redirect:/admin/inbounds";
    }

    @PostMapping("/admin/inbounds/{id}/complete")
    public String completeInbound(@PathVariable Long id) {
        inboundService.complete(id);
        return "redirect:/admin/inbounds";
    }
}