package com.example.shopping.product.repository;

import com.example.shopping.common.enums.ProductStatus;
import com.example.shopping.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ProductRepository extends JpaRepository<Product, Long> {
 List<Product> findByStatus(ProductStatus status);
 List<Product> findBySellerId(Long sellerId);
 List<Product> findByNameContainingAndStatus(String name, ProductStatus status);
 List<Product> findByCategoryAndStatus(String category, ProductStatus status);
 long countByStatus(ProductStatus status);
}
