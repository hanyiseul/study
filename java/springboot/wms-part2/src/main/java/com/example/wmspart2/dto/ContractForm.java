package com.example.wmspart2.dto;

public class ContractForm {

    private String customerName;
    private String productName;
    private Integer quantity;
    private String warehouseName;
    private String storageType;
    private String requestMemo;

    public ContractForm() {
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

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public void setStorageType(String storageType) {
        this.storageType = storageType;
    }

    public void setRequestMemo(String requestMemo) {
        this.requestMemo = requestMemo;
    }
}