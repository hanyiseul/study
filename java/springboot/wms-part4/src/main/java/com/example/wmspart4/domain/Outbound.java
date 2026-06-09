package com.example.wmspart4.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Outbound {

    private Long id;
    private Long inventoryId;
    private Long customerId;
    private String customerName;
    private String productName;
    private Integer requestQuantity;
    private String outboundStatus;
    private LocalDate desiredDate;
    private LocalDateTime requestedAt;
    private LocalDateTime completedAt;

    public Outbound(Long id, Long inventoryId, Long customerId, String customerName,
                    String productName, Integer requestQuantity, String outboundStatus,
                    LocalDate desiredDate, LocalDateTime requestedAt, LocalDateTime completedAt) {
        this.id = id;
        this.inventoryId = inventoryId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.productName = productName;
        this.requestQuantity = requestQuantity;
        this.outboundStatus = outboundStatus;
        this.desiredDate = desiredDate;
        this.requestedAt = requestedAt;
        this.completedAt = completedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getInventoryId() {
        return inventoryId;
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

    public Integer getRequestQuantity() {
        return requestQuantity;
    }

    public String getOutboundStatus() {
        return outboundStatus;
    }

    public LocalDate getDesiredDate() {
        return desiredDate;
    }

    public LocalDateTime getRequestedAt() {
        return requestedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public String getStatusLabel() {
        if ("REQUESTED".equals(outboundStatus)) {
            return "출고요청";
        }

        if ("COMPLETED".equals(outboundStatus)) {
            return "출고완료";
        }

        return outboundStatus;
    }

    public boolean isRequested() {
        return "REQUESTED".equals(outboundStatus);
    }
}