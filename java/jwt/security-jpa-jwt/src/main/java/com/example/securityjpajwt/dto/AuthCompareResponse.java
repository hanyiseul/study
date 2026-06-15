package com.example.securityjpajwt.dto;

public class AuthCompareResponse {

    private String mode;
    private String storage;
    private String clientSend;
    private String serverCheck;
    private String logout;
    private String suitableFor;

    public AuthCompareResponse(
            String mode,
            String storage,
            String clientSend,
            String serverCheck,
            String logout,
            String suitableFor
    ) {
        this.mode = mode;
        this.storage = storage;
        this.clientSend = clientSend;
        this.serverCheck = serverCheck;
        this.logout = logout;
        this.suitableFor = suitableFor;
    }

    public String getMode() {
        return mode;
    }

    public String getStorage() {
        return storage;
    }

    public String getClientSend() {
        return clientSend;
    }

    public String getServerCheck() {
        return serverCheck;
    }

    public String getLogout() {
        return logout;
    }

    public String getSuitableFor() {
        return suitableFor;
    }
}