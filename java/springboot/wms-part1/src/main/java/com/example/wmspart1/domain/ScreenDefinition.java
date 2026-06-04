package com.example.wmspart1.domain;

public class ScreenDefinition {

    private Long id;
    private String screenId;
    private String screenName;
    private String userType;
    private String url;
    private String mainFeature;
    private String controllerName;
    private String serviceName;
    private String repositoryName;
    private String tableName;

    public ScreenDefinition(Long id, String screenId, String screenName, String userType,
                            String url, String mainFeature, String controllerName,
                            String serviceName, String repositoryName, String tableName) {
        this.id = id;
        this.screenId = screenId;
        this.screenName = screenName;
        this.userType = userType;
        this.url = url;
        this.mainFeature = mainFeature;
        this.controllerName = controllerName;
        this.serviceName = serviceName;
        this.repositoryName = repositoryName;
        this.tableName = tableName;
    }

    public Long getId() {
        return id;
    }

    public String getScreenId() {
        return screenId;
    }

    public String getScreenName() {
        return screenName;
    }

    public String getUserType() {
        return userType;
    }

    public String getUrl() {
        return url;
    }

    public String getMainFeature() {
        return mainFeature;
    }

    public String getControllerName() {
        return controllerName;
    }

    public String getServiceName() {
        return serviceName;
    }

    public String getRepositoryName() {
        return repositoryName;
    }

    public String getTableName() {
        return tableName;
    }
}