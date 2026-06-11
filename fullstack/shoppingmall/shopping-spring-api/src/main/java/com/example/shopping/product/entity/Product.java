package com.example.shopping.product.entity;

import com.example.shopping.common.enums.ProductStatus;
import com.example.shopping.seller.entity.Seller;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="products")
public class Product {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="seller_id", nullable=false) private Seller seller;
 @Column(nullable=false) private String name;
 @Column(nullable=false) private Integer price;
 @Column(name="stock_quantity", nullable=false) private Integer stockQuantity;
 @Column(nullable=false) private String category;
 @Column(columnDefinition="TEXT") private String description;
 @Column(name="image_url") private String imageUrl;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private ProductStatus status;
 @Column(name="created_at", nullable=false) private LocalDateTime createdAt;
 @Column(name="updated_at", nullable=false) private LocalDateTime updatedAt;
 @PrePersist void onCreate(){ createdAt=LocalDateTime.now(); updatedAt=createdAt; if(status==null) status=ProductStatus.ON_SALE; }
 @PreUpdate void onUpdate(){ updatedAt=LocalDateTime.now(); }
 public void updateProduct(String name,Integer price,Integer stockQuantity,String category,String description,String imageUrl){this.name=name;this.price=price;this.stockQuantity=stockQuantity;this.category=category;this.description=description;this.imageUrl=imageUrl;}
 public void stopSelling(){ this.status=ProductStatus.STOPPED; }
 public void block(){ this.status=ProductStatus.BLOCKED; }
 public void decreaseStock(int quantity){ if(stockQuantity < quantity) throw new IllegalStateException("재고가 부족합니다."); this.stockQuantity -= quantity; }
}
