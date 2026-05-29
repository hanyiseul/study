package com.example.security.controller;

import com.example.security.domain.Account;
import com.example.security.domain.AccountTransaction;
import com.example.security.domain.AppUser;
import com.example.security.dto.TransactionForm;
import com.example.security.service.TransactionService;
import com.example.security.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;

    public TransactionController(
            TransactionService transactionService,
            UserService userService
    ) {
        this.transactionService = transactionService;
        this.userService = userService;
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/transactions";
    }

    @GetMapping("/transactions")
    public String list(Authentication authentication, Model model) {
        AppUser user = userService.findByEmail(authentication.getName());

        List<Account> accounts = transactionService.findAccounts(user.getId());
        List<AccountTransaction> transactions = transactionService.findTransactions(user.getId());

        model.addAttribute("loginUser", user);
        model.addAttribute("accounts", accounts);
        model.addAttribute("transactions", transactions);
        model.addAttribute("transactionForm", new TransactionForm());

        return "transactions";
    }

    @PostMapping("/transactions")
    public String create(
            Authentication authentication,
            @ModelAttribute TransactionForm form,
            Model model
    ) {
        AppUser user = userService.findByEmail(authentication.getName());

        try {
            transactionService.createTransaction(user.getId(), form);
            return "redirect:/transactions";
        } catch (IllegalArgumentException e) {
            List<Account> accounts = transactionService.findAccounts(user.getId());
            List<AccountTransaction> transactions = transactionService.findTransactions(user.getId());

            model.addAttribute("loginUser", user);
            model.addAttribute("accounts", accounts);
            model.addAttribute("transactions", transactions);
            model.addAttribute("transactionForm", form);
            model.addAttribute("errorMessage", e.getMessage());

            return "transactions";
        }
    }
}
