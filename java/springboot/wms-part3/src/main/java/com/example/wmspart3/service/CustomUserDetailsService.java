package com.example.wmspart3.service;

import com.example.wmspart3.domain.AppUser;
import com.example.wmspart3.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if (!appUser.isActive()) {
            throw new UsernameNotFoundException("비활성 사용자입니다.");
        }

        return new User(
                appUser.getEmail(),
                appUser.getPasswordHash(),
                List.of(new SimpleGrantedAuthority(appUser.getRole()))
        );
    }
}