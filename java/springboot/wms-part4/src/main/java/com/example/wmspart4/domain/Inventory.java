package com.example.wmspart4.domain;

import java.time.LocalDateTime;

public class Inventory {

    private Long id;
    private Long contractId;
    private Long customerId;
    private String customerName;
    private String productName;
    private Integer currentQuantity;
    private String warehouseName;
    private String storageZone;
    private String palletNo;
    private String inventoryStatus;
    private LocalDateTime updatedAt;

    public Inventory(Long id, Long contractId, Long customerId, String customerName,
                     String productName, Integer currentQuantity, String warehouseName,
                     String storageZone, String palletNo, String inventoryStatus,
                     LocalDateTime updatedAt) {
        this.id = id;
        this.contractId = contractId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.productName = productName;
        this.currentQuantity = currentQuantity;
        this.warehouseName = warehouseName;
        this.storageZone = storageZone;
        this.palletNo = palletNo;
        this.inventoryStatus = inventoryStatus;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getContractId() {
        return contractId;
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

    public Integer getCurrentQuantity() {
        return currentQuantity;
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

    public String getInventoryStatus() {
        return inventoryStatus;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getStatusLabel() {
        if ("STORED".equals(inventoryStatus)) {
            return "보관중";
        }

        if ("WAITING_OUTBOUND".equals(inventoryStatus)) {
            return "출고대기";
        }

        if ("EMPTY".equals(inventoryStatus)) {
            return "재고없음";
        }

        return inventoryStatus;
    }
}