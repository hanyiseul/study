package com.example.shopping.user.service;

import com.example.shopping.common.enums.UserStatus;
import com.example.shopping.user.dto.UserResponse;
import com.example.shopping.user.entity.User;
import com.example.shopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service @RequiredArgsConstructor
public class UserService {
 private final UserRepository userRepository;
 @Transactional(readOnly=true) public List<UserResponse> findAllUsers(){ return userRepository.findAll().stream().map(UserResponse::from).toList(); }
 @Transactional public UserResponse deactivate(Long id){ User u=find(id); u.changeStatus(UserStatus.INACTIVE); return UserResponse.from(u); }
 @Transactional public UserResponse activate(Long id){ User u=find(id); u.changeStatus(UserStatus.ACTIVE); return UserResponse.from(u); }
 private User find(Long id){ return userRepository.findById(id).orElseThrow(()->new IllegalArgumentException("회원을 찾을 수 없습니다.")); }
}
