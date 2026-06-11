package com.example.shopping.seller.entity;

import com.example.shopping.common.enums.SellerStatus;
import com.example.shopping.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="sellers")
public class Seller {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @OneToOne(fetch=FetchType.LAZY) @JoinColumn(name="user_id", nullable=false) private User user;
 @Column(name="business_name", nullable=false) private String businessName;
 @Column(name="business_number", nullable=false, unique=true) private String businessNumber;
 @Column(name="store_name", nullable=false) private String storeName;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private SellerStatus status;
 @Column(name="created_at", nullable=false) private LocalDateTime createdAt;
 @Column(name="updated_at", nullable=false) private LocalDateTime updatedAt;
 @PrePersist void onCreate(){ createdAt=LocalDateTime.now(); updatedAt=createdAt; if(status==null) status=SellerStatus.PENDING; }
 @PreUpdate void onUpdate(){ updatedAt=LocalDateTime.now(); }
 public void approve(){ this.status=SellerStatus.APPROVED; }
 public void reject(){ this.status=SellerStatus.REJECTED; }
}
