package com.example.shopping.user.repository;

import com.example.shopping.common.enums.UserRole;
import com.example.shopping.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
 Optional<User> findByEmail(String email);
 boolean existsByEmail(String email);
 long countByRole(UserRole role);
}
