package com.example.shopping.security;

import com.example.shopping.common.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomUserPrincipal {
 private Long userId;
 private String email;
 private UserRole role;
}
