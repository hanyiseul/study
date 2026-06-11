package com.example.shopping.product.dto;
import com.example.shopping.product.entity.Review;
import lombok.*;
import java.time.LocalDateTime;
@Getter @AllArgsConstructor public class ReviewResponse { private Long id; private Long productId; private String productName; private String userName; private Integer rating; private String content; private LocalDateTime createdAt; public static ReviewResponse from(Review r){ return new ReviewResponse(r.getId(),r.getProduct().getId(),r.getProduct().getName(),r.getUser().getName(),r.getRating(),r.getContent(),r.getCreatedAt()); } }
