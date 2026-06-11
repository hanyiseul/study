package com.example.shopping.order.dto;
import com.example.shopping.order.entity.OrderItem;
import lombok.*;
@Getter @AllArgsConstructor public class OrderItemResponse { private Long id; private Long productId; private String productName; private Integer orderPrice; private Integer quantity; private Integer totalPrice; public static OrderItemResponse from(OrderItem i){ return new OrderItemResponse(i.getId(),i.getProduct().getId(),i.getProductName(),i.getOrderPrice(),i.getQuantity(),i.getTotalPrice()); } }
