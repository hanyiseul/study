package com.example.shopping.product.controller;

import com.example.shopping.common.response.ApiResponse;
import com.example.shopping.product.dto.*;
import com.example.shopping.product.service.ProductService;
import com.example.shopping.security.CustomUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequiredArgsConstructor @RequestMapping("/api/seller/products")
public class SellerProductController {
 private final ProductService productService;
 @GetMapping public ApiResponse<List<ProductResponse>> list(@AuthenticationPrincipal CustomUserPrincipal p){ return ApiResponse.ok("내 상품 목록",productService.findSellerProducts(p.getUserId())); }
 @GetMapping("/{id}") public ApiResponse<ProductResponse> detail(@AuthenticationPrincipal CustomUserPrincipal p,@PathVariable Long id){ return ApiResponse.ok("내 상품 상세",productService.findSellerProduct(p.getUserId(),id)); }
 @PostMapping public ApiResponse<ProductResponse> create(@AuthenticationPrincipal CustomUserPrincipal p,@Valid @RequestBody ProductRequest r){ return ApiResponse.ok("상품 등록 완료",productService.createProduct(p.getUserId(),r)); }
 @PutMapping("/{id}") public ApiResponse<ProductResponse> update(@AuthenticationPrincipal CustomUserPrincipal p,@PathVariable Long id,@Valid @RequestBody ProductRequest r){ return ApiResponse.ok("상품 수정 완료",productService.updateProduct(p.getUserId(),id,r)); }
 @DeleteMapping("/{id}") public ApiResponse<ProductResponse> stop(@AuthenticationPrincipal CustomUserPrincipal p,@PathVariable Long id){ return ApiResponse.ok("상품 판매 중지 완료",productService.stopSelling(p.getUserId(),id)); }
}
