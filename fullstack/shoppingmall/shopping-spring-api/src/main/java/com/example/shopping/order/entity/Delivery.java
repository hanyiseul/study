package com.example.shopping.order.entity;

import com.example.shopping.common.enums.DeliveryStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="deliveries")
public class Delivery {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @OneToOne(fetch=FetchType.LAZY) @JoinColumn(name="order_id", nullable=false, unique=true) private Order order;
 @Column(name="receiver_name", nullable=false) private String receiverName;
 @Column(name="receiver_phone", nullable=false) private String receiverPhone;
 @Column(nullable=false) private String address;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private DeliveryStatus status;
 @Column(name="shipped_at") private LocalDateTime shippedAt;
 @Column(name="delivered_at") private LocalDateTime deliveredAt;
 public void startShipping(){ if(status!=DeliveryStatus.READY) throw new IllegalStateException("배송 준비 상태에서만 배송 시작이 가능합니다."); status=DeliveryStatus.SHIPPING; shippedAt=LocalDateTime.now(); }
 public void completeDelivery(){ if(status!=DeliveryStatus.SHIPPING) throw new IllegalStateException("배송 중 상태에서만 배송 완료가 가능합니다."); status=DeliveryStatus.DELIVERED; deliveredAt=LocalDateTime.now(); }
}
