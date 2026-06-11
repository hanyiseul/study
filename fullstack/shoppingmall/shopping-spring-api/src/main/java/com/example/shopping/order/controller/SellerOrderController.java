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

@RestController @RequiredArgsConstructor @RequestMapping("/api/seller/orders")
public class SellerOrderController {
 private final OrderService orderService;
 @GetMapping public ApiResponse<List<SellerOrderItemResponse>> list(@AuthenticationPrincipal CustomUserPrincipal p){ return ApiResponse.ok("판매자 주문 목록",orderService.findSellerOrderItems(p.getUserId())); }
 @PutMapping("/items/{id}/delivery") public ApiResponse<SellerOrderItemResponse> delivery(@AuthenticationPrincipal CustomUserPrincipal p,@PathVariable Long id,@Valid @RequestBody UpdateDeliveryStatusRequest r){ return ApiResponse.ok("배송 상태 변경 완료",orderService.updateDeliveryStatusBySeller(p.getUserId(),id,r)); }
}
