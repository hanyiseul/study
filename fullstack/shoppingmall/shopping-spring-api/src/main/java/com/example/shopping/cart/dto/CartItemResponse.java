package com.example.shopping.cart.dto;
import com.example.shopping.cart.entity.CartItem;
import lombok.*;
@Getter @AllArgsConstructor public class CartItemResponse { private Long id; private Long productId; private String productName; private Integer price; private Integer quantity; private Integer totalPrice; public static CartItemResponse from(CartItem i){ return new CartItemResponse(i.getId(),i.getProduct().getId(),i.getProduct().getName(),i.getProduct().getPrice(),i.getQuantity(),i.getTotalPrice()); } }
