package com.example.shopping.product.entity;

import com.example.shopping.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="reviews")
public class Review {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="product_id", nullable=false) private Product product;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="user_id", nullable=false) private User user;
 @Column(nullable=false) private Integer rating;
 @Column(columnDefinition="TEXT", nullable=false) private String content;
 @Column(name="created_at", nullable=false) private LocalDateTime createdAt;
 @PrePersist void onCreate(){ createdAt=LocalDateTime.now(); }
}
