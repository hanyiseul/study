package com.example.wmspart2.controller;

import com.example.wmspart2.domain.Contract;
import com.example.wmspart2.dto.ContractForm;
import com.example.wmspart2.service.ContractService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/contracts";
    }

    @GetMapping("/contracts")
    public String contracts(Model model) {
        List<Contract> contracts = contractService.findContracts();

        model.addAttribute("contractForm", new ContractForm());
        model.addAttribute("contracts", contracts);
        addSummary(model, contracts);

        return "contracts";
    }

    @PostMapping("/contracts")
    public String createContract(ContractForm form, Model model) {
        try {
            contractService.createContract(form);
            return "redirect:/contracts";
        } catch (IllegalArgumentException e) {
            List<Contract> contracts = contractService.findContracts();

            model.addAttribute("errorMessage", e.getMessage());
            model.addAttribute("contractForm", form);
            model.addAttribute("contracts", contracts);
            addSummary(model, contracts);

            return "contracts";
        }
    }

    @PostMapping("/contracts/{id}/confirm")
    public String confirmContract(@PathVariable Long id, Model model) {
        try {
            contractService.confirmContract(id);
            return "redirect:/contracts";
        } catch (RuntimeException e) {
            return redirectWithError(model, e.getMessage());
        }
    }

    @PostMapping("/contracts/{id}/cancel")
    public String cancelContract(@PathVariable Long id, Model model) {
        try {
            contractService.cancelContract(id);
            return "redirect:/contracts";
        } catch (RuntimeException e) {
            return redirectWithError(model, e.getMessage());
        }
    }

    private String redirectWithError(Model model, String message) {
        List<Contract> contracts = contractService.findContracts();

        model.addAttribute("errorMessage", message);
        model.addAttribute("contractForm", new ContractForm());
        model.addAttribute("contracts", contracts);
        addSummary(model, contracts);

        return "contracts";
    }

    private void addSummary(Model model, List<Contract> contracts) {
        long requestedCount = contracts.stream()
                .filter(contract -> "REQUESTED".equals(contract.getContractStatus()))
                .count();

        long confirmedCount = contracts.stream()
                .filter(contract -> "CONFIRMED".equals(contract.getContractStatus()))
                .count();

        long canceledCount = contracts.stream()
                .filter(contract -> "CANCELED".equals(contract.getContractStatus()))
                .count();

        model.addAttribute("totalCount", contracts.size());
        model.addAttribute("requestedCount", requestedCount);
        model.addAttribute("confirmedCount", confirmedCount);
        model.addAttribute("canceledCount", canceledCount);
    }
}