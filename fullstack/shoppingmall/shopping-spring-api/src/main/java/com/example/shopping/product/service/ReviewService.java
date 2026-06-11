package com.example.shopping.product.service;

import com.example.shopping.product.dto.*;
import com.example.shopping.product.entity.*;
import com.example.shopping.product.repository.*;
import com.example.shopping.user.entity.User;
import com.example.shopping.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service @RequiredArgsConstructor
public class ReviewService {
 private final ReviewRepository reviewRepository; private final ProductRepository productRepository; private final UserRepository userRepository;
 @Transactional(readOnly=true) public List<ReviewResponse> findByProduct(Long productId){ return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId).stream().map(ReviewResponse::from).toList(); }
 @Transactional public ReviewResponse createReview(Long userId,Long productId,ReviewRequest r){ Product p=productRepository.findById(productId).orElseThrow(()->new IllegalArgumentException("상품을 찾을 수 없습니다.")); User u=userRepository.findById(userId).orElseThrow(); return ReviewResponse.from(reviewRepository.save(Review.builder().product(p).user(u).rating(r.getRating()).content(r.getContent()).build())); }
 @Transactional(readOnly=true) public List<ReviewResponse> findMyReviews(Long userId){ return reviewRepository.findByUserIdOrderByCreatedAtDesc(userId).stream().map(ReviewResponse::from).toList(); }
}
