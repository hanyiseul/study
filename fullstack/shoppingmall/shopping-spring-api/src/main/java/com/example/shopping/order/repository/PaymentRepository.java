package com.example.shopping.order.repository;

import com.example.shopping.common.enums.PaymentStatus;
import com.example.shopping.order.entity.Payment;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.*;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
 Optional<Payment> findByOrderId(Long orderId);
 @Query("select coalesce(sum(p.amount),0) from Payment p where p.status = :status")
 Integer sumAmountByStatus(@Param("status") PaymentStatus status);
}
