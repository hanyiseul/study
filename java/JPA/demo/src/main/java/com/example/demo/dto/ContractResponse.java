package com.example.demo.dto;

public class ContractResponse {

    private Long contractId;
    private String contractNo;
    private String productName;
    private String status;
    private String customerName;
    private String customerEmail;

    public ContractResponse(
            Long contractId,
            String contractNo,
            String productName,
            String status,
            String customerName,
            String customerEmail
    ) {
        this.contractId = contractId;
        this.contractNo = contractNo;
        this.productName = productName;
        this.status = status;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
    }

    public Long getContractId() {
        return contractId;
    }

    public String getContractNo() {
        return contractNo;
    }

    public String getProductName() {
        return productName;
    }

    public String getStatus() {
        return status;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }
}