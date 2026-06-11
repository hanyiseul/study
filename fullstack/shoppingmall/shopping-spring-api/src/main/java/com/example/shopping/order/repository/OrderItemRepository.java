package com.example.shopping.order.repository;

import com.example.shopping.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
 List<OrderItem> findByOrderId(Long orderId);
 List<OrderItem> findBySellerId(Long sellerId);
}
