package com.example.shopping.admin.controller;

import com.example.shopping.common.response.ApiResponse;
import com.example.shopping.notice.dto.*;
import com.example.shopping.notice.service.NoticeService;
import com.example.shopping.security.CustomUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController @RequiredArgsConstructor @RequestMapping("/api/admin/notices")
public class AdminNoticeController {
 private final NoticeService service;
 @PostMapping public ApiResponse<NoticeResponse> create(@AuthenticationPrincipal CustomUserPrincipal p,@Valid @RequestBody NoticeRequest r){ return ApiResponse.ok("공지 등록", service.createNotice(p.getUserId(),r)); }
 @PutMapping("/{id}") public ApiResponse<NoticeResponse> update(@PathVariable Long id,@Valid @RequestBody NoticeRequest r){ return ApiResponse.ok("공지 수정", service.updateNotice(id,r)); }
}
