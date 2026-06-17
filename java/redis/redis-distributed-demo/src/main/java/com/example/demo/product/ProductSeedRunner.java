package com.example.demo.product;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ProductSeedRunner implements CommandLineRunner {

    private final ProductRepository productRepository;

    public ProductSeedRunner(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        productRepository.save(new Product("기계식 키보드", 89000, 30));
        productRepository.save(new Product("무선 마우스", 39000, 50));
        productRepository.save(new Product("USB-C 허브", 45000, 20));
    }
}