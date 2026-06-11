package com.example.shopping.seller.repository;

import com.example.shopping.common.enums.SellerStatus;
import com.example.shopping.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SellerRepository extends JpaRepository<Seller, Long> {
 Optional<Seller> findByUserId(Long userId);
 boolean existsByBusinessNumber(String businessNumber);
 List<Seller> findByStatus(SellerStatus status);
 long countByStatus(SellerStatus status);
}
