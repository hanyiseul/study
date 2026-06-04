package com.example.wmspart1.controller;

import com.example.wmspart1.service.AnalysisService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/analysis";
    }

    @GetMapping("/analysis")
    public String analysis(Model model) {
        var screens = analysisService.getScreens();
        var fields = analysisService.getFields();
        var statuses = analysisService.getStatuses();
        var rules = analysisService.getRules();

        model.addAttribute("screens", screens);
        model.addAttribute("fields", fields);
        model.addAttribute("statuses", statuses);
        model.addAttribute("rules", rules);

        model.addAttribute("screenCount", screens.size());
        model.addAttribute("fieldCount", fields.size());
        model.addAttribute("statusCount", statuses.size());
        model.addAttribute("ruleCount", rules.size());

        return "analysis";
    }
}