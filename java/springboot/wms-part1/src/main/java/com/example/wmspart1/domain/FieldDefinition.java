package com.example.wmspart1.domain;

public class FieldDefinition {

    private Long id;
    private String screenId;
    private String fieldType;
    private String fieldName;
    private String fieldLabel;
    private String dataType;
    private Boolean required;
    private String validationRule;
    private String targetObject;

    public FieldDefinition(Long id, String screenId, String fieldType, String fieldName,
                           String fieldLabel, String dataType, Boolean required,
                           String validationRule, String targetObject) {
        this.id = id;
        this.screenId = screenId;
        this.fieldType = fieldType;
        this.fieldName = fieldName;
        this.fieldLabel = fieldLabel;
        this.dataType = dataType;
        this.required = required;
        this.validationRule = validationRule;
        this.targetObject = targetObject;
    }

    public Long getId() {
        return id;
    }

    public String getScreenId() {
        return screenId;
    }

    public String getFieldType() {
        return fieldType;
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getFieldLabel() {
        return fieldLabel;
    }

    public String getDataType() {
        return dataType;
    }

    public Boolean getRequired() {
        return required;
    }

    public String getValidationRule() {
        return validationRule;
    }

    public String getTargetObject() {
        return targetObject;
    }
}