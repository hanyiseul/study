package com.example.shopping.order.repository;

import com.example.shopping.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface OrderRepository extends JpaRepository<Order, Long> {
 List<Order> findByUserIdOrderByOrderedAtDesc(Long userId);
 Optional<Order> findByOrderNumber(String orderNumber);
}
