package com.example.shopping.notice.entity;

import com.example.shopping.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="notices")
public class Notice {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="admin_id", nullable=false) private User admin;
 @Column(nullable=false) private String title;
 @Column(columnDefinition="TEXT", nullable=false) private String content;
 @Column(name="created_at", nullable=false) private LocalDateTime createdAt;
 @Column(name="updated_at", nullable=false) private LocalDateTime updatedAt;
 @PrePersist void onCreate(){ createdAt=LocalDateTime.now(); updatedAt=createdAt; }
 @PreUpdate void onUpdate(){ updatedAt=LocalDateTime.now(); }
 public void updateNotice(String title,String content){ this.title=title; this.content=content; }
}
