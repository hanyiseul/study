package com.example.wmspart4.dto;

import java.time.LocalDate;

public class OutboundRequestForm {

    private Long inventoryId;
    private Integer requestQuantity;
    private LocalDate desiredDate;
    private String requestMemo;

    public Long getInventoryId() {
        return inventoryId;
    }

    public Integer getRequestQuantity() {
        return requestQuantity;
    }

    public LocalDate getDesiredDate() {
        return desiredDate;
    }

    public String getRequestMemo() {
        return requestMemo;
    }

    public void setInventoryId(Long inventoryId) {
        this.inventoryId = inventoryId;
    }

    public void setRequestQuantity(Integer requestQuantity) {
        this.requestQuantity = requestQuantity;
    }

    public void setDesiredDate(LocalDate desiredDate) {
        this.desiredDate = desiredDate;
    }

    public void setRequestMemo(String requestMemo) {
        this.requestMemo = requestMemo;
    }
}