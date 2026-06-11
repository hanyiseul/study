package com.example.shopping.cart.dto;
import jakarta.validation.constraints.*;
import lombok.*;
@Getter @Setter public class AddCartItemRequest { @NotNull private Long productId; @Min(1) private Integer quantity; }
