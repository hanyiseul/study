package com.example.shopping.order.dto;
import jakarta.validation.constraints.*;
import lombok.*;
@Getter @Setter public class CreateOrderRequest { @NotBlank private String receiverName; @NotBlank private String receiverPhone; @NotBlank private String deliveryAddress; }
