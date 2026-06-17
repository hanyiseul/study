package com.example.backend.controller;

import com.example.backend.service.StateService;
import com.example.backend.service.StateService.StateResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/state")
public class StateController {

    private final StateService stateService;

    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping("/current")
    public StateResponse current() {
        return stateService.current();
    }

    @PostMapping("/increase")
    public StateResponse increase() {
        return stateService.increase();
    }

    @PostMapping("/reset")
    public StateResponse reset() {
        return stateService.reset();
    }
}
