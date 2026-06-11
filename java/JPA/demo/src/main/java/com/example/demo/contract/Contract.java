package com.example.demo.contract;

import com.example.demo.customer.Customer;
import jakarta.persistence.FetchType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contractNo;

    private String productName;

    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    protected Contract() {
    }

    public Contract(String contractNo, String productName, String status, Customer customer) {
        this.contractNo = contractNo;
        this.productName = productName;
        this.status = status;
        this.customer = customer;
    }

    public Long getId() {
        return id;
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

    public Customer getCustomer() {
        return customer;
    }
}