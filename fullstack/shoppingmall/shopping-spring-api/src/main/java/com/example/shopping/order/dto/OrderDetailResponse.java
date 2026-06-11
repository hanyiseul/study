package com.example.shopping.order.dto;
import lombok.*;
import java.util.*;
@Getter @AllArgsConstructor public class OrderDetailResponse { private OrderResponse order; private List<OrderItemResponse> items; private PaymentResponse payment; private DeliveryResponse delivery; }
