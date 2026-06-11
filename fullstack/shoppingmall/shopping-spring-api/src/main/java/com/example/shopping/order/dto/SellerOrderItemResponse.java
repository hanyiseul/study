package com.example.shopping.order.dto;
import com.example.shopping.common.enums.DeliveryStatus;
import com.example.shopping.order.entity.*;
import lombok.*;
import java.time.LocalDateTime;
@Getter @AllArgsConstructor public class SellerOrderItemResponse { private Long orderItemId; private String orderNumber; private String productName; private Integer quantity; private Integer orderPrice; private Integer totalPrice; private String buyerName; private DeliveryStatus deliveryStatus; private LocalDateTime orderedAt; public static SellerOrderItemResponse of(OrderItem item, Delivery d){ Order o=item.getOrder(); return new SellerOrderItemResponse(item.getId(),o.getOrderNumber(),item.getProductName(),item.getQuantity(),item.getOrderPrice(),item.getTotalPrice(),o.getUser().getName(),d.getStatus(),o.getOrderedAt()); } }
