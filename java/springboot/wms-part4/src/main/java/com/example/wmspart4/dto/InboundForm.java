package com.example.wmspart4.dto;

public class InboundForm {

    private Long contractId;
    private Integer receivedQuantity;
    private String warehouseName;
    private String storageZone;
    private String palletNo;

    public Long getContractId() {
        return contractId;
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

    public void setContractId(Long contractId) {
        this.contractId = contractId;
    }

    public void setReceivedQuantity(Integer receivedQuantity) {
        this.receivedQuantity = receivedQuantity;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public void setStorageZone(String storageZone) {
        this.storageZone = storageZone;
    }

    public void setPalletNo(String palletNo) {
        this.palletNo = palletNo;
    }
}