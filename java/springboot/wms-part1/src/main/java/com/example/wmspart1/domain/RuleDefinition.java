package com.example.wmspart1.domain;

public class RuleDefinition {

    private Long id;
    private String businessArea;
    private String ruleName;
    private String ruleDescription;
    private String serviceTarget;

    public RuleDefinition(Long id, String businessArea, String ruleName,
                          String ruleDescription, String serviceTarget) {
        this.id = id;
        this.businessArea = businessArea;
        this.ruleName = ruleName;
        this.ruleDescription = ruleDescription;
        this.serviceTarget = serviceTarget;
    }

    public Long getId() {
        return id;
    }

    public String getBusinessArea() {
        return businessArea;
    }

    public String getRuleName() {
        return ruleName;
    }

    public String getRuleDescription() {
        return ruleDescription;
    }

    public String getServiceTarget() {
        return serviceTarget;
    }
}