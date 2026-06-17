package com.example.demo.product;

public record ProductUpdateRequest(
        String name,
        int price,
        int stock
) {
}