package com.example.shopping.cart.dto;
import jakarta.validation.constraints.*;
import lombok.*;
@Getter @Setter public class UpdateCartItemRequest { @Min(1) private Integer quantity; }
