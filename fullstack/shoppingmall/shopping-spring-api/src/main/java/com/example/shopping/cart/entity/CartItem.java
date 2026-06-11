package com.example.shopping.cart.entity;

import com.example.shopping.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="cart_items")
public class CartItem {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="cart_id", nullable=false) private Cart cart;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="product_id", nullable=false) private Product product;
 @Column(nullable=false) private Integer quantity;
 @Column(name="created_at", nullable=false) private LocalDateTime createdAt;
 @Column(name="updated_at", nullable=false) private LocalDateTime updatedAt;
 @PrePersist void onCreate(){ createdAt=LocalDateTime.now(); updatedAt=createdAt; }
 @PreUpdate void onUpdate(){ updatedAt=LocalDateTime.now(); }
 public void increaseQuantity(int q){ this.quantity += q; }
 public void changeQuantity(int q){ if(q<1) throw new IllegalArgumentException("수량은 1 이상이어야 합니다."); this.quantity=q; }
 public int getTotalPrice(){ return product.getPrice()*quantity; }
}
