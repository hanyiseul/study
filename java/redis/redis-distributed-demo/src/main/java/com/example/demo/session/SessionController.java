package com.example.demo.session;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class SessionController {

    @GetMapping("/api/session/login")
    public Map<String, Object> login(HttpSession session) {
        session.setAttribute("loginUser", "user01");

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("message", "login success");
        result.put("sessionId", session.getId());
        result.put("loginUser", session.getAttribute("loginUser"));

        return result;
    }

    @GetMapping("/api/session/me")
    public Map<String, Object> me(HttpSession session) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("sessionId", session.getId());
        result.put("loginUser", session.getAttribute("loginUser"));

        if (session.getAttribute("loginUser") == null) {
            result.put("authenticated", false);
            result.put("message", "로그인이 필요합니다.");
        } else {
            result.put("authenticated", true);
            result.put("message", "로그인 상태입니다.");
        }

        return result;
    }

    @GetMapping("/api/session/count")
    public Map<String, Object> count(HttpSession session) {
        Integer count = (Integer) session.getAttribute("count");

        if (count == null) {
            count = 0;
        }

        count++;
        session.setAttribute("count", count);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("sessionId", session.getId());
        result.put("count", count);

        return result;
    }
}