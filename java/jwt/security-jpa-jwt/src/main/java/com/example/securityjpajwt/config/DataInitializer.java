package com.example.securityjpajwt.config;

import com.example.securityjpajwt.entity.AppUser;
import com.example.securityjpajwt.entity.UserRole;
import com.example.securityjpajwt.repository.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdminUser(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            String adminEmail = "admin@test.com";

            if (!appUserRepository.existsByEmail(adminEmail)) {
                AppUser admin = new AppUser(
                        adminEmail,
                        passwordEncoder.encode("1234"),
                        UserRole.ADMIN
                );

                appUserRepository.save(admin);
            }
        };
    }
}