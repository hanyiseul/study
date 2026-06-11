package com.example.shopping.notice.controller;

import com.example.shopping.common.response.ApiResponse;
import com.example.shopping.notice.dto.*;
import com.example.shopping.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequiredArgsConstructor @RequestMapping("/api/notices")
public class NoticeController {
 private final NoticeService noticeService;
 @GetMapping public ApiResponse<List<NoticeResponse>> list(){ return ApiResponse.ok("공지사항 목록",noticeService.findAllNotices()); }
 @GetMapping("/{id}") public ApiResponse<NoticeResponse> detail(@PathVariable Long id){ return ApiResponse.ok("공지사항 상세",noticeService.findNotice(id)); }
}
