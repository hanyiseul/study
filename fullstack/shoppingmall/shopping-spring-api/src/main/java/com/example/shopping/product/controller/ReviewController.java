package com.example.shopping.product.controller;

import com.example.shopping.common.response.ApiResponse;
import com.example.shopping.product.dto.*;
import com.example.shopping.product.service.ReviewService;
import com.example.shopping.security.CustomUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequiredArgsConstructor
public class ReviewController {
 private final ReviewService reviewService;
 @GetMapping("/api/products/{productId}/reviews") public ApiResponse<List<ReviewResponse>> product(@PathVariable Long productId){ return ApiResponse.ok("상품 리뷰 목록",reviewService.findByProduct(productId)); }
 @PostMapping("/api/reviews/products/{productId}") public ApiResponse<ReviewResponse> create(@AuthenticationPrincipal CustomUserPrincipal p,@PathVariable Long productId,@Valid @RequestBody ReviewRequest r){ return ApiResponse.ok("리뷰 작성 완료",reviewService.createReview(p.getUserId(),productId,r)); }
 @GetMapping("/api/reviews/me") public ApiResponse<List<ReviewResponse>> me(@AuthenticationPrincipal CustomUserPrincipal p){ return ApiResponse.ok("내 리뷰 목록",reviewService.findMyReviews(p.getUserId())); }
}
