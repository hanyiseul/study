package com.example.shopping.order.dto;
import com.example.shopping.common.enums.DeliveryStatus;
import com.example.shopping.order.entity.Delivery;
import lombok.*;
import java.time.LocalDateTime;
@Getter @AllArgsConstructor public class DeliveryResponse { private String receiverName; private String receiverPhone; private String address; private DeliveryStatus status; private LocalDateTime shippedAt; private LocalDateTime deliveredAt; public static DeliveryResponse from(Delivery d){ return new DeliveryResponse(d.getReceiverName(),d.getReceiverPhone(),d.getAddress(),d.getStatus(),d.getShippedAt(),d.getDeliveredAt()); } }
