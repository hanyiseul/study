package com.example.shopping.auth.service;

import com.example.shopping.auth.dto.*;
import com.example.shopping.common.enums.*;
import com.example.shopping.security.JwtTokenProvider;
import com.example.shopping.seller.entity.Seller;
import com.example.shopping.seller.repository.SellerRepository;
import com.example.shopping.user.entity.User;
import com.example.shopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor
public class AuthService {
 private final UserRepository userRepository; private final SellerRepository sellerRepository; private final PasswordEncoder passwordEncoder; private final JwtTokenProvider jwtTokenProvider;
 @Transactional public void signup(SignupRequest r){
  if(r.getRole()==UserRole.ADMIN) throw new IllegalArgumentException("관리자는 일반 회원가입으로 생성할 수 없습니다.");
  if(userRepository.existsByEmail(r.getEmail())) throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
  User u=User.builder().name(r.getName()).email(r.getEmail()).passwordHash(passwordEncoder.encode(r.getPassword())).phone(r.getPhone()).role(r.getRole()).status(UserStatus.ACTIVE).build();
  userRepository.save(u);
  if(r.getRole()==UserRole.SELLER){
   if(r.getBusinessNumber()==null || r.getStoreName()==null) throw new IllegalArgumentException("판매자 정보가 필요합니다.");
   if(sellerRepository.existsByBusinessNumber(r.getBusinessNumber())) throw new IllegalArgumentException("이미 등록된 사업자번호입니다.");
   sellerRepository.save(Seller.builder().user(u).businessName(r.getBusinessName()).businessNumber(r.getBusinessNumber()).storeName(r.getStoreName()).status(SellerStatus.PENDING).build());
  }
 }
 @Transactional(readOnly=true) public LoginResponse login(LoginRequest r){
  User u=userRepository.findByEmail(r.getEmail()).orElseThrow(()->new BadCredentialsException("login failed"));
  if(u.getStatus()!=UserStatus.ACTIVE) throw new IllegalStateException("비활성화된 계정입니다.");
  if(!passwordEncoder.matches(r.getPassword(),u.getPasswordHash())) throw new BadCredentialsException("login failed");
  return new LoginResponse(jwtTokenProvider.createToken(u.getId(),u.getEmail(),u.getRole()),u.getId(),u.getEmail(),u.getName(),u.getRole());
 }
 @Transactional(readOnly=true) public MeResponse me(Long userId){
  User u=userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("사용자를 찾을 수 없습니다."));
  return new MeResponse(u.getId(),u.getEmail(),u.getName(),u.getRole());
 }
}
