package com.example.shopping.cart.repository;

import com.example.shopping.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
 List<CartItem> findByCartId(Long cartId);
 Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);
 void deleteByCartId(Long cartId);
}
