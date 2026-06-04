package com.example.wmspart1.service;

import com.example.wmspart1.domain.FieldDefinition;
import com.example.wmspart1.domain.RuleDefinition;
import com.example.wmspart1.domain.ScreenDefinition;
import com.example.wmspart1.domain.StatusDefinition;
import com.example.wmspart1.repository.AnalysisRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalysisService {

    private final AnalysisRepository analysisRepository;

    public AnalysisService(AnalysisRepository analysisRepository) {
        this.analysisRepository = analysisRepository;
    }

    public List<ScreenDefinition> getScreens() {
        return analysisRepository.findAllScreens();
    }

    public List<FieldDefinition> getFields() {
        return analysisRepository.findAllFields();
    }

    public List<StatusDefinition> getStatuses() {
        return analysisRepository.findAllStatuses();
    }

    public List<RuleDefinition> getRules() {
        return analysisRepository.findAllRules();
    }
}