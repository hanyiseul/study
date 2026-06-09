package com.example.wmspart4.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Contract {

    private Long id;
    private Long customerId;
    private String customerName;
    private String productName;
    private Integer quantity;
    private String warehouseName;
    private String storageType;
    private String requestMemo;
    private String contractStatus;
    private LocalDate contractDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Contract(Long id, Long customerId, String customerName, String productName,
                    Integer quantity, String warehouseName, String storageType,
                    String requestMemo, String contractStatus, LocalDate contractDate,
                    LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.productName = productName;
        this.quantity = quantity;
        this.warehouseName = warehouseName;
        this.storageType = storageType;
        this.requestMemo = requestMemo;
        this.contractStatus = contractStatus;
        this.contractDate = contractDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getProductName() {
        return productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public String getStorageType() {
        return storageType;
    }

    public String getRequestMemo() {
        return requestMemo;
    }

    public String getContractStatus() {
        return contractStatus;
    }

    public LocalDate getContractDate() {
        return contractDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getStatusLabel() {
        if ("REQUESTED".equals(contractStatus)) {
            return "계약요청";
        }

        if ("CONFIRMED".equals(contractStatus)) {
            return "계약확정";
        }

        if ("CANCELED".equals(contractStatus)) {
            return "계약취소";
        }

        return contractStatus;
    }

    public String getStorageTypeLabel() {
        if ("NORMAL".equals(storageType)) {
            return "일반";
        }

        if ("COLD".equals(storageType)) {
            return "냉장";
        }

        if ("FROZEN".equals(storageType)) {
            return "냉동";
        }

        return storageType;
    }

    public boolean isRequested() {
        return "REQUESTED".equals(contractStatus);
    }

    public boolean isConfirmed() {
        return "CONFIRMED".equals(contractStatus);
    }
}