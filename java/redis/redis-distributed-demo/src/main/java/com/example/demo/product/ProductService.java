package com.example.demo.product;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Cacheable(value = "product", key = "#id")
    @Transactional(readOnly = true)
    public Product getProduct(Long id) {
        System.out.println("DB 조회 실행: product id = " + id);

        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다. id=" + id));
    }

    @CachePut(value = "product", key = "#id")
    @Transactional
    public Product updateProduct(Long id, ProductUpdateRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다. id=" + id));

        product.update(request.name(), request.price(), request.stock());

        return product;
    }

    @CacheEvict(value = "product", key = "#id")
    public void deleteCache(Long id) {
        System.out.println("캐시 삭제 실행: product id = " + id);
    }
}