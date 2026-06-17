package com.example.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    @GetMapping("/login")
    public Map<String, Object> login(HttpSession session) {
        session.setAttribute("loginUser", "user01");

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("message", "login success");
        result.put("sessionId", session.getId());
        result.put("loginUser", session.getAttribute("loginUser"));

        return result;
    }

    @GetMapping("/me")
    public Map<String, Object> me(HttpSession session) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("sessionId", session.getId());
        result.put("loginUser", session.getAttribute("loginUser"));
        result.put("authenticated", session.getAttribute("loginUser") != null);

        return result;
    }
}
