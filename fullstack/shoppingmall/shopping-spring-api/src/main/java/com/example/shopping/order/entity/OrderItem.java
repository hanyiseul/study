package com.example.shopping.order.entity;

import com.example.shopping.product.entity.Product;
import com.example.shopping.seller.entity.Seller;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="order_items")
public class OrderItem {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="order_id", nullable=false) private Order order;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="product_id", nullable=false) private Product product;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="seller_id", nullable=false) private Seller seller;
 @Column(name="product_name", nullable=false) private String productName;
 @Column(name="order_price", nullable=false) private Integer orderPrice;
 @Column(nullable=false) private Integer quantity;
 public int getTotalPrice(){ return orderPrice*quantity; }
}
