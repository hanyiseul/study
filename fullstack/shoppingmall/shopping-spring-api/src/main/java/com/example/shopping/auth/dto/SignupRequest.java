package com.example.shopping.auth.dto;
import com.example.shopping.common.enums.UserRole;
import jakarta.validation.constraints.*;
import lombok.*;
@Getter @Setter public class SignupRequest { @NotBlank private String name; @Email @NotBlank private String email; @NotBlank private String password; private String phone; @NotNull private UserRole role; private String businessName; private String businessNumber; private String storeName; }
