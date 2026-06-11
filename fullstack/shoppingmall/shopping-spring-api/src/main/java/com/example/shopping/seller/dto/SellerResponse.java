package com.example.shopping.seller.dto;
import com.example.shopping.common.enums.SellerStatus;
import com.example.shopping.seller.entity.Seller;
import lombok.*;
import java.time.LocalDateTime;
@Getter @AllArgsConstructor public class SellerResponse { private Long sellerId; private Long userId; private String name; private String email; private String businessName; private String businessNumber; private String storeName; private SellerStatus status; private LocalDateTime createdAt; public static SellerResponse from(Seller s){ return new SellerResponse(s.getId(),s.getUser().getId(),s.getUser().getName(),s.getUser().getEmail(),s.getBusinessName(),s.getBusinessNumber(),s.getStoreName(),s.getStatus(),s.getCreatedAt()); } }
