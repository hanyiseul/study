package com.example.shopping.order.controller;

import com.example.shopping.common.response.ApiResponse;
import com.example.shopping.order.dto.*;
import com.example.shopping.order.service.OrderService;
import com.example.shopping.security.CustomUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequiredArgsConstructor @RequestMapping("/api/orders")
public class OrderController {
 private final OrderService orderService;
 @PostMapping public ApiResponse<OrderResponse> create(@AuthenticationPrincipal CustomUserPrincipal p,@Valid @RequestBody CreateOrderRequest r){ return ApiResponse.ok("주문 생성 완료",orderService.createOrder(p.getUserId(),r)); }
 @GetMapping public ApiResponse<List<OrderResponse>> list(@AuthenticationPrincipal CustomUserPrincipal p){ return ApiResponse.ok("내 주문 목록",orderService.findMyOrders(p.getUserId())); }
 @GetMapping("/{id}") public ApiResponse<OrderDetailResponse> detail(@AuthenticationPrincipal CustomUserPrincipal p,@PathVariable Long id){ return ApiResponse.ok("내 주문 상세",orderService.findMyOrderDetail(p.getUserId(),id)); }
}
