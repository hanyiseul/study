package com.example.shopping.order.entity;

import com.example.shopping.common.enums.OrderStatus;
import com.example.shopping.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="orders")
public class Order {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(name="order_number", nullable=false, unique=true) private String orderNumber;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="user_id", nullable=false) private User user;
 @Column(name="total_amount", nullable=false) private Integer totalAmount;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private OrderStatus status;
 @Column(name="receiver_name", nullable=false) private String receiverName;
 @Column(name="receiver_phone", nullable=false) private String receiverPhone;
 @Column(name="delivery_address", nullable=false) private String deliveryAddress;
 @Column(name="ordered_at", nullable=false) private LocalDateTime orderedAt;
 @PrePersist void onCreate(){ orderedAt=LocalDateTime.now(); if(status==null) status=OrderStatus.ORDERED; }
}
