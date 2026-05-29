package com.example.simplecrud.controller;

import com.example.simplecrud.domain.Account;
import com.example.simplecrud.domain.AccountTransaction;
import com.example.simplecrud.dto.TransactionForm;
import com.example.simplecrud.service.TransactionService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/transactions";
    }

    @GetMapping("/transactions")
    public String list(Model model) {
        List<Account> accounts = service.findAllAccounts();
        List<AccountTransaction> transactions = service.findAllTransactions();

        model.addAttribute("accounts", accounts);
        model.addAttribute("transactions", transactions);
        model.addAttribute("transactionForm", new TransactionForm());

        return "transactions";
    }

    @PostMapping("/transactions")
    public String create(@ModelAttribute TransactionForm form, Model model) {
        try {
            service.createTransaction(form);
            return "redirect:/transactions";
        } catch (IllegalArgumentException e) {
            List<Account> accounts = service.findAllAccounts();
            List<AccountTransaction> transactions = service.findAllTransactions();

            model.addAttribute("accounts", accounts);
            model.addAttribute("transactions", transactions);
            model.addAttribute("transactionForm", form);
            model.addAttribute("errorMessage", e.getMessage());

            return "transactions";
        }
    }
}