package com.example.shopping.admin.controller;

import com.example.shopping.common.response.ApiResponse;
import com.example.shopping.order.dto.OrderResponse;
import com.example.shopping.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequiredArgsConstructor @RequestMapping("/api/admin/orders")
public class AdminOrderController {
 private final OrderService service;
 @GetMapping public ApiResponse<List<OrderResponse>> list(){ return ApiResponse.ok("전체 주문", service.findAllOrdersForAdmin()); }
}
