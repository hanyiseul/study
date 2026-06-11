package com.example.shopping.order.dto;
import com.example.shopping.common.enums.PaymentStatus;
import com.example.shopping.order.entity.Payment;
import lombok.*;
import java.time.LocalDateTime;
@Getter @AllArgsConstructor public class PaymentResponse { private Integer amount; private PaymentStatus status; private LocalDateTime paidAt; public static PaymentResponse from(Payment p){ return new PaymentResponse(p.getAmount(),p.getStatus(),p.getPaidAt()); } }
