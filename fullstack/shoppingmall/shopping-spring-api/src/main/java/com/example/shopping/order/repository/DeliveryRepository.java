package com.example.shopping.order.repository;

import com.example.shopping.order.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> { Optional<Delivery> findByOrderId(Long orderId); }
