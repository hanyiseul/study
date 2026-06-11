package com.example.shopping.user.entity;

import com.example.shopping.common.enums.UserRole;
import com.example.shopping.common.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false, unique = true) private String email;
    @Column(name="password_hash", nullable = false) private String passwordHash;
    private String phone;
    @Enumerated(EnumType.STRING) @Column(nullable=false) private UserRole role;
    @Enumerated(EnumType.STRING) @Column(nullable=false) private UserStatus status;
    @Column(name="created_at", nullable=false) private LocalDateTime createdAt;
    @Column(name="updated_at", nullable=false) private LocalDateTime updatedAt;
    @PrePersist void onCreate(){ createdAt=LocalDateTime.now(); updatedAt=createdAt; if(status==null) status=UserStatus.ACTIVE; }
    @PreUpdate void onUpdate(){ updatedAt=LocalDateTime.now(); }
    public void changeStatus(UserStatus status){ this.status=status; }
}
