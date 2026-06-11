package com.example.shopping.user.dto;
import com.example.shopping.common.enums.*;
import com.example.shopping.user.entity.User;
import lombok.*;
import java.time.LocalDateTime;
@Getter @AllArgsConstructor public class UserResponse { private Long id; private String name; private String email; private String phone; private UserRole role; private UserStatus status; private LocalDateTime createdAt; public static UserResponse from(User u){ return new UserResponse(u.getId(),u.getName(),u.getEmail(),u.getPhone(),u.getRole(),u.getStatus(),u.getCreatedAt()); } }
