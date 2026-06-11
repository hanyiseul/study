package com.example.shopping.notice.dto;
import com.example.shopping.notice.entity.Notice;
import lombok.*;
import java.time.LocalDateTime;
@Getter @AllArgsConstructor public class NoticeResponse { private Long id; private String title; private String content; private String adminName; private LocalDateTime createdAt; private LocalDateTime updatedAt; public static NoticeResponse from(Notice n){ return new NoticeResponse(n.getId(),n.getTitle(),n.getContent(),n.getAdmin().getName(),n.getCreatedAt(),n.getUpdatedAt()); } }
