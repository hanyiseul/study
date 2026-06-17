package com.example.demo.product;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/api/products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    @PutMapping("/api/products/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody ProductUpdateRequest request
    ) {
        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/api/products/{id}/cache")
    public String deleteCache(@PathVariable Long id) {
        productService.deleteCache(id);
        return "cache deleted: product id = " + id;
    }
}