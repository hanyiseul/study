package com.example.shopping.admin.controller;

import com.example.shopping.common.response.ApiResponse;
import com.example.shopping.seller.dto.SellerResponse;
import com.example.shopping.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequiredArgsConstructor @RequestMapping("/api/admin/sellers")
public class AdminSellerController {
 private final SellerService service;
 @GetMapping public ApiResponse<List<SellerResponse>> list(){ return ApiResponse.ok("판매자 목록", service.findAllSellers()); }
 @GetMapping("/pending") public ApiResponse<List<SellerResponse>> pending(){ return ApiResponse.ok("승인 대기 판매자", service.findPendingSellers()); }
 @PutMapping("/{id}/approve") public ApiResponse<SellerResponse> approve(@PathVariable Long id){ return ApiResponse.ok("판매자 승인", service.approveSeller(id)); }
 @PutMapping("/{id}/reject") public ApiResponse<SellerResponse> reject(@PathVariable Long id){ return ApiResponse.ok("판매자 반려", service.rejectSeller(id)); }
}
