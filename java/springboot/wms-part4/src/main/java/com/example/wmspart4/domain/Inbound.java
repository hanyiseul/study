package com.example.wmspart4.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Inbound {

    private Long id;
    private Long contractId;
    private String customerName;
    private String productName;
    private Integer receivedQuantity;
    private String warehouseName;
    private String storageZone;
    private String palletNo;
    private String inboundStatus;
    private LocalDate inboundDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Inbound(Long id, Long contractId, String customerName, String productName,
                   Integer receivedQuantity, String warehouseName, String storageZone,
                   String palletNo, String inboundStatus, LocalDate inboundDate,
                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.contractId = contractId;
        this.customerName = customerName;
        this.productName = productName;
        this.receivedQuantity = receivedQuantity;
        this.warehouseName = warehouseName;
        this.storageZone = storageZone;
        this.palletNo = palletNo;
        this.inboundStatus = inboundStatus;
        this.inboundDate = inboundDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getContractId() {
        return contractId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getProductName() {
        return productName;
    }

    public Integer getReceivedQuantity() {
        return receivedQuantity;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public String getStorageZone() {
        return storageZone;
    }

    public String getPalletNo() {
        return palletNo;
    }

    public String getInboundStatus() {
        return inboundStatus;
    }

    public LocalDate getInboundDate() {
        return inboundDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getStatusLabel() {
        if ("REGISTERED".equals(inboundStatus)) {
            return "입고등록";
        }

        if ("COMPLETED".equals(inboundStatus)) {
            return "입고완료";
        }

        return inboundStatus;
    }

    public boolean isRegistered() {
        return "REGISTERED".equals(inboundStatus);
    }
}